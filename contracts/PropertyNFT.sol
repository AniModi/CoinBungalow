// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PropertyNFT is ERC721URIStorage{
   using Counters for Counters.Counter;
   Counters.Counter tokenIds;

   constructor() ERC721("Property", "PPY") {}

   function totalSupply() public view returns (uint256){
    return tokenIds.current();
   }

   function mint(string memory uri) public returns (uint256){
     tokenIds.increment();
     uint256 newTokenId = tokenIds.current();
     _mint(msg.sender, newTokenId);
     _setTokenURI(newTokenId, uri);
      
      return newTokenId;
   } 

   function setTokenURI(uint256 _tokenid, string memory _uri) public{
     _setTokenURI(_tokenid, _uri);
   }


}
