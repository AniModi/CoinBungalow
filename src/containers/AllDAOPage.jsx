import React, { useState } from "react";
import "../assets/styles/containers/DAOPage.scss";
import Navbar from "../components/Navbar";
import DAOCard from "../components/DAOCard";
import DAOForm from "../components/DAOForm";

const AllDAOPage = () => {
  const props = {
    title: "DAO Name",
    date: "12/12/2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl",
  };
  const [active, setActive] = useState("All DAOs");

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
                (active === "All DAOs" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              All DAOs
            </div>
            <div
              className={
                "dao_page_container__banner__tabs__value" +
                (active !== "All DAOs" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              Create DAO
            </div>
          </div>
        </div>
        {active === "All DAOs" && (
          <div className="dao_page_container__proposals">
            <div className="dao_page_container__proposals__proposal">
              <DAOCard props={props}></DAOCard>
            </div>
            <div className="dao_page_container__proposals__proposal">
              <DAOCard props={props}></DAOCard>
            </div>
            <div className="dao_page_container__proposals__proposal">
              <DAOCard props={props}></DAOCard>
            </div>
          </div>
        )}
        {active !== "All DAOs" && (
          <div className="dao_page_container__form">
            <div className="dao_page_container__form__container">
              <DAOForm></DAOForm>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllDAOPage;
