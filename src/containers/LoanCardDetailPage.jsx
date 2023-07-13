import React from "react";
import "../assets/styles/containers/LoanCardDetailPage.scss";
import DetailCardDetails from "../components/DetailCardDetails";
import Navbar from "../components/Navbar";

const LoanCardDetailPage = () => {
  const handleLend = () => {};
  const Buttons = () => {
    return (
      <div className="loan_card_detail_container__button_container">
        <button
          className="loan_card_detail_container__button_container__button"
          onClick={handleLend}
        >
          Lend Money
        </button>
      </div>
    );
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="loan_card_detail_container">
        <DetailCardDetails buttons={<Buttons></Buttons>}></DetailCardDetails>
      </div>
    </>
  );
};

export default LoanCardDetailPage;
