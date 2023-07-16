// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/AutomationCompatible.sol';

interface IERC721{
   function transferFrom(address from, address to, uint256 tokenId) external;
   function ownerOf(uint256 tokenId) external view returns (address owner);
}

contract Loan is AutomationCompatibleInterface{
  address public nftAddress;
  constructor(address _nftAddress){
    nftAddress = _nftAddress;
  }
  
  struct LoanRequest{
    uint256 tokenId;
    address borrower;
    uint256 apr;
    uint256 duration;
    uint256 value;
    string data;
  }

  struct LoanFulfilled{
    uint256 tokenId;
    address lender;
    address borrower;
    uint256 apr;
    uint256 duration;
    uint256 value;
    uint256 timestamp;
    uint256 deadline;
  }

  struct RepayTracker{
    uint256 amount;
    uint256 paid;
    uint256 deadline;
    bool closed;
  }

   LoanRequest[] public loanRequests;
   LoanFulfilled[] public fulfilledLoans;
   mapping (uint256 => bool) public loanRequestExists;
   mapping (uint256 => address) public lender;
   mapping (uint256 => LoanRequest) public loanRequest;
   mapping (uint256 => LoanFulfilled) public loanFulfilled;
   mapping (uint256 => RepayTracker) public repayTracker;

    function getLoanRequests() public view returns (LoanRequest[] memory) {
          return loanRequests;
     }

    function getLoan(uint256 tokenId, uint256 value, uint256 apr, uint256 duration, string memory data) public {
        require(IERC721(nftAddress).ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        loanRequestExists[tokenId] = true;
        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);
        LoanRequest memory _loanRequest = LoanRequest(tokenId, msg.sender, apr, duration, value, data);
        loanRequests.push(_loanRequest);
        loanRequest[tokenId]=_loanRequest;
    }

    function cancelLoan(uint256 tokenId) public {
        require(loanRequestExists[tokenId], "Does not exist !");
        require(IERC721(nftAddress).ownerOf(tokenId) == address(this), "Not the owner of this NFT");
        loanRequestExists[tokenId] = false;
        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);
    }

    function lend(uint256 tokenId) payable public{
        require(loanRequestExists[tokenId], "Does not exist !");
        LoanRequest memory _loanRequest = loanRequest[tokenId];
        require(msg.value >= _loanRequest.value, "Loan amount not enough");
        (bool success, ) = payable(_loanRequest.borrower).call{value: msg.value}("");
        require(success, "Transfer failed!");
        loanRequestExists[tokenId] = false;
        loanFulfilled[tokenId] = LoanFulfilled(tokenId,
        msg.sender, _loanRequest.borrower, _loanRequest.apr, 
        _loanRequest.duration, _loanRequest.value, block.timestamp, block.timestamp + _loanRequest.duration);
        fulfilledLoans.push(loanFulfilled[tokenId]);
        lender[tokenId]=msg.sender;
        repayTracker[tokenId]=RepayTracker(_loanRequest.value, 0, block.timestamp + _loanRequest.duration, false);
    }

    function repay(uint256 tokenId) payable public{
        RepayTracker memory _repayTracker = repayTracker[tokenId];
        require(block.timestamp <= _repayTracker.deadline, "Loan deadline passed !");
        require(!_repayTracker.closed, "Loan already closed !");
        require(msg.value == _repayTracker.amount, "Loan amount not enough");
        (bool success, ) = payable(lender[tokenId]).call{value: msg.value}("");
        require(success, "Transfer failed!");
        repayTracker[tokenId].paid += msg.value;
        repayTracker[tokenId].closed = true;
    }

    function _defaultLoan(uint256 tokenId) internal{
      IERC721(nftAddress).transferFrom(address(this), loanFulfilled[tokenId].lender, tokenId);
      repayTracker[tokenId].closed = true;
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory performData) {
        LoanFulfilled[] memory _fulfilledLoans = fulfilledLoans;
        for(uint256 i=0; i<_fulfilledLoans.length; i++){
            if(repayTracker[_fulfilledLoans[i].tokenId].closed) continue;
            upkeepNeeded = (block.timestamp > _fulfilledLoans[i].deadline);
            if(upkeepNeeded){
                performData = abi.encode(_fulfilledLoans[i].tokenId);
                break;
            }
        }

        return (upkeepNeeded, performData);
    }
    
    function performUpkeep(bytes calldata performData ) external override  {
      uint256 tokenId = abi.decode(performData, (uint256));
        _defaultLoan(tokenId);
    }
}