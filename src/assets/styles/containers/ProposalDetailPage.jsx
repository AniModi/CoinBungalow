import React from "react";
import "../assets/styles/components/ProposalDetailPage.scss";
import Navbar from "../../../components/Navbar";

const ProposalDetailPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="proposal_detail_page_container">
        <div className="proposal_detail_page_container__title">
          <div className="proposal_detail_page_container__title__title">
            {"Title"}
          </div>
          <div className="proposal_detail_page_container__title__body">
            {"title"}
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
            {"Price:"}
          </div>
          <div className="proposal_detail_page_container__price__body">
            {"$100"}
          </div>
        </div>
        <div className="proposal_detail_page_container__titleDeed">
          <div className="proposal_detail_page_container__titleDeed__title">
            {"Title Deed"}
          </div>
          <div className="proposal_detail_page_container__titleDeed__body">
            {"link"}
          </div>
        </div>
        <div className="proposal_detail_page_container__images">
          <div className="proposal_detail_page_container__images__title">
            {"Images:"}
          </div>
          <div className="proposal_detail_page_container__images__body">
            {"link"}
          </div>
        </div>
        <div className="proposal_detail_page_container__button_container">
          <button className="proposal_detail_page_container__button_container__button">
            {"Upvote"}
          </button>
          <button className="proposal_detail_page_container__button_container__button">
            {"Downvote"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProposalDetailPage;
