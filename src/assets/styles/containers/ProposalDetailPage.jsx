import React, {useState} from "react";
import "../assets/styles/components/ProposalDetailPage.scss";
import Navbar from "../../../components/Navbar";
import { useLocation } from "react-router-dom";
import { writeContract } from "wagmi/actions";
import { DAOaddress, DAOabi } from "../../../constants";
import { parseEther} from 'viem'

const ProposalDetailPage = () => {
  const { pathname } = useLocation();
  const proposalId = pathname.split("/")[4];
  const daoId = pathname.split("/")[2];

  const [isPopup, setIsPopup] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonationInput = (e)=> setDonationAmount(e.target.value);
  const handlePopup = ()=> setIsPopup(true);
  const handleClose = ()=> setIsPopup(false);

  const vote = async ()=>{
    try{
    const {hash} = await writeContract({
      address: DAOaddress,
      abi: DAOabi,
      functionName: 'vote',
      args: [daoId, proposalId]
    })
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

  return (
    <>
      <Navbar></Navbar>
      <div className="proposal_detail_page_container">
        <div className="proposal_detail_page_container__title">
          <div className="proposal_detail_page_container__title__body">
            {"title"}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Issuer"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {"0x"}
          </div>
        </div>
        <div className="proposal_detail_page_container__date">
          <div className="proposal_detail_page_container__date__title">
            {"Duration"}
          </div>
          <div className="proposal_detail_page_container__date__body">
            {"12/2/22 - 12/2/23"}
          </div>
        </div>
        <div className="proposal_detail_page_container__description">
          <div className="proposal_detail_page_container__description__title">
            {"Description"}
          </div>
          <div className="proposal_detail_page_container__description__body">
            {
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima cum voluptates excepturi sequi similique, unde eos quos minus rem delectus suscipit fugiat blanditiis doloribus laudantium eius, ea quas sit officia."
            }
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Requirement"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {"$100"}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Treasury"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {"$100"}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Votes"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {"1"}
          </div>
        </div>
        <div className="proposal_detail_page_container__titleDeed">
          <div className="proposal_detail_page_container__titleDeed__title">
            {"Reference"}
          </div>:
          <div className="proposal_detail_page_container__titleDeed__body">
            link &#x2197;
          </div>
        </div>
        <div className="proposal_detail_page_container__titleDeed">
          <div className="proposal_detail_page_container__titleDeed__title">
            {"Title Deed"}
          </div>:
          <div className="proposal_detail_page_container__titleDeed__body">
            {"link"} &#x2197;
          </div>
        </div>
        <div className="proposal_detail_page_container__images">
          <div className="proposal_detail_page_container__images__title">
            {"Images"}
          </div>:
          <div className="proposal_detail_page_container__images__body">
            {"link"} &#x2197;
          </div>
        </div>
        <div className="proposal_detail_page_container__button_container">
          <button className="proposal_detail_page_container__button_container__button" onClick={vote}>
            {"Vote"}&#128077;
          </button>
          <button className="proposal_detail_page_container__button_container__button" onClick={handlePopup}>
            {"Donate"}&#128512;
          </button>
        </div>
      </div>
      { isPopup &&
      <div className='popup_container'>
        <input className='popup_container__input' type="number" placeholder="Donation Amount..."onChange={handleDonationInput} />
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
          <input className="proposal_comment_section__input_textarea" type="text" placeholder="Your comment..."/>
          <button className="proposal_comment_section__input_button">Post</button>
        </div>
        <div className="proposal_comment_section__comment_list">
          <div className="proposal_comment_section__comment_list__item">
            <div className="proposal_comment_section__comment_list__item__user">&#128511; 0x6b</div>
            <div className="proposal_comment_section__comment_list__item__text">Hi</div>
          </div>
          <div className="proposal_comment_section__comment_list__item">
            <div className="proposal_comment_section__comment_list__item__user">&#128511; 0x..</div>
            <div className="proposal_comment_section__comment_list__item__text">Helo</div>
          </div>
          <div className="proposal_comment_section__comment_list__item">
            <div className="proposal_comment_section__comment_list__item__user">&#128511; 0x..</div>
            <div className="proposal_comment_section__comment_list__item__text">Hey</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalDetailPage;
