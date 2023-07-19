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
  const [active, setActive] = useState("All Proposals");

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
                (active === "All Proposals" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              All Proposals
            </div>
            <div
              className={
                "dao_page_container__banner__tabs__value" +
                (active !== "All Proposals" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              Create Proposal
            </div>
          </div>
        </div>
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
        {active !== "All Proposals" && (
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
