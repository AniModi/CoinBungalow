// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract PropertyNFT is ERC721Enumerable{
   using Counters for Counters.Counter;
   Counters.Counter private tokenIds;

    mapping(uint256 => string) private _tokenURIs;

   constructor() ERC721("Property", "PPY") {}

   function totalSupply() public view override(ERC721Enumerable) returns (uint256) {
        return tokenIds.current();
   }

   function mint(string memory uri) public returns (uint256){
     tokenIds.increment();
     uint256 newTokenId = tokenIds.current();
     _mint(msg.sender, newTokenId);
     _setTokenURI(newTokenId, uri);
      
      return newTokenId;
   } 

   function setTokenURI(uint256 tokenId, string memory uri) public {
     require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved or owner");
     _setTokenURI(tokenId, uri);
   }

   function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = uri;
    }

}
