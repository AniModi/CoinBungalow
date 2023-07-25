import React, {useState, useEffect} from "react";
import "../assets/styles/components/ProposalDetailPage.scss";
import Navbar from "../../../components/Navbar";
import { useLocation } from "react-router-dom";
import { readContract, writeContract, getAccount, waitForTransaction } from "wagmi/actions";
import { DAOaddress, DAOabi } from "../../../constants";
import { db_proposals } from "../../../dao_database"
import { parseEther, formatEther} from 'viem'

const ProposalDetailPage = () => {
  const { pathname } = useLocation();
  const proposalId = pathname.split("/")[4];
  const daoId = pathname.split("/")[2].split(',')[1];
  const account = getAccount();
  
  const [props, setProps] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [ comments, setComments ] = useState([]);

  const [isPopup, setIsPopup] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [trigger, setTrigger] = useState(0);

  const handleDonationInput = (e)=> setDonationAmount(e.target.value);
  const handlePopup = ()=> setIsPopup(true);
  const handleClose = ()=> setIsPopup(false);

  const post = async ()=>{
    try{
       await writeContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: 'postComment',
        args: [proposalId, message]
      })
      setMessage('')
      setTrigger(trigger+1)
    }
    catch(e){
      console.log(e)
    }
  }

  const vote = async ()=>{
    if(hasVoted) return;
    try{
    const {hash} = await writeContract({
      address: DAOaddress,
      abi: DAOabi,
      functionName: 'vote',
      args: [daoId, proposalId]
    })
    setTrigger(trigger+1)
  } catch(e){
    console.log(e)
  }
  }
  const donate = async ()=>{
    try{
    const amount = parseEther(donationAmount)
   const {hash} = await writeContract({
      address: DAOaddress,
      abi: DAOabi,
      functionName: 'donate',
      args: [proposalId],
      value: amount
    })
    setDonationAmount(0)
  }
    catch(e){ console.log(e)}
  }

  useEffect(()=>{
    async function loadProposal(){
      const recordId = pathname.split("/")[2].split(',')[0]+'/'+daoId+'/'+proposalId;
      const proposal = await readContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: 'proposals',
        args: [proposalId]
      })
      const { data } = await db_proposals.record(recordId).get();
      setProps({
        title: data.title,
        description: data.description,
        issuer: data.issuer,
        started: data.started,
        ends: data.ends,
        requirement: data.cost,
        reference: data.reference,
        votes: proposal[4],
        donation: proposal[3]
      })
    }
    loadProposal()
  }, [])

  useEffect(()=>{
    async function checkVote(){
      const hasVoted = await readContract({
          address: DAOaddress,
          abi: DAOabi,
          functionName: 'hasVoted',
          args: [daoId, proposalId, account.address]
      })
      setHasVoted(hasVoted)
    }
    checkVote()
  }, [trigger])

  useEffect(()=>{
     async function loadComments(){
      const comments = await readContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: 'getComments',
        args: [proposalId]
      })
      setComments(comments)
     }
      loadComments()
  }, [trigger])

  return (
    <>
      <Navbar></Navbar>
      <div className="proposal_detail_page_container">
        <div className="proposal_detail_page_container__title">
          <div className="proposal_detail_page_container__title__body">
            {props.title}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Issuer"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {props.issuer}
          </div>
        </div>
        <div className="proposal_detail_page_container__date">
          <div className="proposal_detail_page_container__date__title">
            {"Duration"}
          </div>
          <div className="proposal_detail_page_container__date__body">
            {props.started +'-'+ props.ends}
          </div>
        </div>
        <div className="proposal_detail_page_container__description">
          <div className="proposal_detail_page_container__description__title">
            {"Description"}
          </div>
          <div className="proposal_detail_page_container__description__body">
            {props.description}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Requirement"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {props.requirement+" MATIC"}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Total donation"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {props.donation!==undefined && formatEther(props.donation)+" MATIC"}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Votes"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {props.votes!==undefined &&  props.votes.toString()}
          </div>
        </div>
        <div className="proposal_detail_page_container__titleDeed">
          <div className="proposal_detail_page_container__titleDeed__title">
            {"Reference"}
          </div>:
          <div className="proposal_detail_page_container__titleDeed__body">
            {<a href={props.reference} target="_blank" style={{color: 'lightskyblue'}}>Visit</a>} &#x2197;
          </div>
        </div>
        
        <div className="proposal_detail_page_container__button_container">
          <button className="proposal_detail_page_container__button_container__button" onClick={vote}>
            {hasVoted?("Already voted!"):("Vote")}&#128077;
          </button>
          <button className="proposal_detail_page_container__button_container__button" onClick={handlePopup}>
            {"Donate"}&#128512;
          </button>
        </div>
      </div>
      { isPopup &&
      <div className='popup_container'>
        <input className='popup_container__input' type="number" placeholder="Donation Amount..." onChange={handleDonationInput} />
        <div className='popup_container__button_container'>
        <button className='popup_container__button_container__button' onClick={handleClose}>Close</button>
        <button className='popup_container__button_container__button' onClick={donate}>Donate</button>
        </div>
      </div> }
      <div className="proposal_detail_page_container__title">
      <div className="proposal_detail_page_container__title__body">
          &nbsp;&nbsp;&nbsp;&nbsp;Comments
      </div>
      <hr style={{color: "whitesmoke", width: '94%', marginLeft: '3rem', opacity: 0.4, borderStyle: 'solid', borderRadius: 5, borderWidth: 3}}/>
      </div>
      <div className="proposal_comment_section">
        <div className="proposal_comment_section__input">
          <input className="proposal_comment_section__input_textarea" type="text" placeholder="Your comment..." value={message} onChange={(e)=>(setMessage(e.target.value))}/>
          <button className="proposal_comment_section__input_button" onClick={post}>Post</button>
        </div>
        <div className="proposal_comment_section__comment_list">
          { comments && comments.length>0 && comments.map((comment, index)=>{
          return <div className="proposal_comment_section__comment_list__item" key={index}>
            <div className="proposal_comment_section__comment_list__item__user">&#128511; {comment.commenter}</div>
            <div className="proposal_comment_section__comment_list__item__text">{comment.message}</div>
          </div>})}
        </div>
      </div>
    </>
  );
};

export default ProposalDetailPage;
