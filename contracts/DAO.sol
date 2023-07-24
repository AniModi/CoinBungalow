//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; 

contract DAO{
 uint256 dao_counter;
 uint256 proposal_counter;
 uint256 member_counter;
 uint256 vote_counter;
 uint256 comment_counter;

struct dao_struct{
    uint256 id;
    string uri;
    address organizer;
    bool closed;
}

struct proposal_struct{
    uint256 id;
    uint256 dao_id;
    string uri;
    uint256 donation;
    uint256 votes;
}

struct member_struct{
    uint256 dao_id;
    address person;
}

struct vote_struct{
    uint256 dao_id;
    uint256 proposal_id;
    address person;
}

struct comment_struct{
    uint256 id;
    uint256 proposal_id;
    string message;
}

 mapping(uint256=>dao_struct) public daos;
 mapping(uint256=>proposal_struct) public proposals;
 mapping(uint256=>member_struct) public members;
 mapping(uint256=>vote_struct) public votes;
 mapping(uint256=>comment_struct) public comments;

 function createDAO(string memory _uri) public returns(uint256){
     daos[dao_counter]=dao_struct(dao_counter,_uri,msg.sender,false);
     dao_counter++;

     return dao_counter;
 }

 function getAllDaos() public view returns(dao_struct[] memory){
     dao_struct[] memory _daos=new dao_struct[](dao_counter);
     for(uint i=0;i<dao_counter;i++){
         _daos[i]=daos[i];
     }
     return _daos;
 }

 function joinDAO(uint256 _dao_id) public{
     members[member_counter]=member_struct(_dao_id,msg.sender);
     member_counter++;
 }

 function createProposal(uint256 _dao_id, string memory _uri) public returns (uint256){
   proposals[proposal_counter]=proposal_struct(proposal_counter,_dao_id,_uri,0,0);
    proposal_counter++;
    return proposal_counter;
 }

 function getAllProposals() public view returns(proposal_struct[] memory){
     proposal_struct[] memory _proposals=new proposal_struct[](proposal_counter);
     for(uint i=0;i<proposal_counter;i++){
         _proposals[i]=proposals[i];
     }
     return _proposals;
 }

 function getAllProposalsByDAO(uint256 _dao_id) public view returns(proposal_struct[] memory){
     proposal_struct[] memory _proposals=new proposal_struct[](proposal_counter);
     uint256 counter=0;
     for(uint i=0;i<proposal_counter;i++){
         if(proposals[i].dao_id==_dao_id){
             _proposals[counter]=proposals[i];
             counter++;
         }
     }
     return _proposals;
 }

 function donate(uint256 _proposal_id) public payable{
    require(msg.value>0,"You need to send some ether");
    proposals[_proposal_id].donation+=msg.value;
 }

 function isPersonJoined(uint256 dao_id, address _person) public view returns (bool){
    for(uint i=0;i<member_counter;i++){
        if(members[i].person==_person && members[i].dao_id==dao_id){
            return true;
        }
    }
    return false;
 }

 function getMembersByDAO(uint256 _dao_id) public view returns(address[] memory){
     address[] memory _members=new address[](member_counter);
     uint256 counter=0;
     for(uint i=0;i<member_counter;i++){
         if(members[i].dao_id==_dao_id){
             _members[counter]=members[i].person;
             counter++;
         }
     }
     return _members;
 }

 function vote(uint256 _dao_id, uint256 _proposal_id) public {
    votes[vote_counter]=vote_struct(_dao_id,_proposal_id,msg.sender);
    vote_counter++;
    proposals[_proposal_id].votes++;
 }

 function hasVoted(uint256 _dao_id, uint256 _proposal_id, address person) public view returns(bool){
        for(uint i=0;i<vote_counter;i++){
            if(votes[i].dao_id==_dao_id && votes[i].proposal_id==_proposal_id && votes[i].person==person){
                return true;
            }
        }
        return false;
 }

 function getVotes(uint256 _dao_id, uint256 _proposal_id) public view returns(uint256){
     uint256 counter=0;
     for(uint i=0;i<vote_counter;i++){
         if(votes[i].dao_id==_dao_id && votes[i].proposal_id==_proposal_id){
             counter++;
         }
     }
     return counter;
 }

 function postComment(uint256 _proposal_id, string memory message) public returns(uint256) {
     comments[comment_counter]=comment_struct(comment_counter,_proposal_id,message);
     comment_counter++;
        return comment_counter;
 }

 function getComments(uint256 _proposal_id) public view returns(comment_struct[] memory){
     comment_struct[] memory _comments=new comment_struct[](comment_counter);
     uint256 counter=0;
     for(uint i=0;i<comment_counter;i++){
         if(comments[i].proposal_id==_proposal_id){
             _comments[counter]=comments[i];
             counter++;
         }
     }
     return _comments;
 }

}