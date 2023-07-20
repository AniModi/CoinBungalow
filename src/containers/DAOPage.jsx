import React, { useState } from "react";
import "../assets/styles/containers/DAOPage.scss";
import Navbar from "../components/Navbar";
import ProposalCard from "../components/ProposalCard";
import ProposalForm from "../components/ProposalForm";

const DAOPage = () => {
  const props = {
    title: "Proposal Title",
    date: "12/12/2021 - 12/12/2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl",
  };
  const [active, setActive] = useState("DAO");

  const handleTabs = (e) => {
    setActive(e.target.textContent);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="dao_page_container">
        <div className="dao_page_container__banner">
          <div className="dao_page_container__banner__tabs">
            <div
              className={
                "dao_page_container__banner__tabs__value" +
                (active === "DAO" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              DAO
            </div>
            <div
              className={
                "dao_page_container__banner__tabs__value" +
                (active === "All Proposals" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              All Proposals
            </div>
            <div
              className={
                "dao_page_container__banner__tabs__value" +
                (active === "Create Proposal" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              Create Proposal
            </div>
          </div>
        </div>
        {active==="DAO" && <div className="dao_page_container__text_box">
          <div className="dao_page_container__text_box__title">Coin Bungalow DAO</div>
          <div className="dao_page_container__text_box__subtitle">19 July 2023<br/>Established by 0x</div>
          <div className="dao_page_container__text_box__body__left__subheading">Description</div>
          <div className="dao_page_container__text_box__body__left"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui odit unde iste sapiente laborum nihil reprehenderit nobis hic beatae sunt eos, facilis enim omnis tempore architecto expedita exercitationem quam illum!</div>
          <div className="dao_page_container__text_box__body__left__subheading">DAO goal</div>
          <div className="dao_page_container__text_box__body__left"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Id fuga corporis omnis fugit nostrum rerum, a quaerat libero ipsam modi sed tempore corrupti, quo, voluptatum deleniti eligendi consequuntur veritatis totam.</div>
          <div className="dao_page_container__text_box__body__left__subheading">Subscription: $0.5/month</div>
          <button className="dao_page_container__text_box__body__right__button">Join community</button>
          </div>
        }
        {active === "All Proposals" && (
          <div className="dao_page_container__proposals">
            <div className="dao_page_container__proposals__proposal">
              <ProposalCard props={props}></ProposalCard>
            </div>
            <div className="dao_page_container__proposals__proposal">
              <ProposalCard props={props}></ProposalCard>
            </div>
            <div className="dao_page_container__proposals__proposal">
              <ProposalCard props={props}></ProposalCard>
            </div>
          </div>
        )}
        {active === "Create Proposal" && (
          <div className="dao_page_container__form">
            <div className="dao_page_container__form__container">
              <ProposalForm></ProposalForm>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DAOPage;
