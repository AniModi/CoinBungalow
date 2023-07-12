// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IERC721{
   function transferFrom(address from, address to, uint256 tokenId) external;
   function ownerOf(uint256 tokenId) external view returns (address owner);
}

contract PropertyDeal{
   address public nftAddress;

    constructor(address _nftAddress){
        nftAddress = _nftAddress;
    }

    event Listed(uint256 indexed tokenId, uint256 value);

    mapping(uint256 => bool) public isListed;
    mapping(uint256 => uint256) public propertyValue;
    mapping(uint256=>address) public seller;
    mapping(uint256=>address) public buyer;

    function list(uint256 tokenId, uint256 value) public {
        require(IERC721(nftAddress).ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        isListed[tokenId] = true;
        propertyValue[tokenId] = value;
        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);
        seller[tokenId]=msg.sender;
        emit Listed(tokenId, value);
    }
    
    function unlist(uint256 tokenId) public {
        require(isListed[tokenId], "Not listed");
        require(IERC721(nftAddress).ownerOf(tokenId) == address(this), "Not the owner of this NFT");
        isListed[tokenId] = false;
        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);
    }

    function buy(uint256 tokenId) public payable {
        require(isListed[tokenId], "Not listed");
        require(msg.value >= propertyValue[tokenId], "Amount not enough");
        (bool success, ) = payable(seller[tokenId]).call{value: msg.value}("");
        require(success, "Purchase failed!");
        isListed[tokenId] = false;
        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);
        buyer[tokenId]=msg.sender;
    }
    
    function escrowBalance() public view returns (uint256) {
       return address(this).balance;
    }

    receive() external payable{}
}