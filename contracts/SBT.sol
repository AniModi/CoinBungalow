// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract SBT is ERC721, Ownable{
   using Counters for Counters.Counter;
   Counters.Counter private tokenIds;

    mapping(address => bool) public sbts;

   constructor() ERC721("Soul", "SBT") {}

   function totalSupply() public view returns (uint256) {
        return tokenIds.current();
   }

   function isMinted(address _address) public view returns (bool) {
        return sbts[_address];
   }

   function mint(address _to) public returns (uint256){
    require(!sbts[_to], "Already minted");
     tokenIds.increment();
     uint256 newTokenId = tokenIds.current();
     _mint(_to, newTokenId);
      sbts[_to] = true;
      return newTokenId;
   } 

}
