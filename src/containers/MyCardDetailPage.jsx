import React, { useState } from "react";
import "../assets/styles/containers/MyCardDetailPage.scss";
import DetailCardDetails from "../components/DetailCardDetails";
import Navbar from "../components/Navbar";

const MyCardDetailPage = () => {
    const loanId = "1";
    const [collateral, setCollateral] = useState(false);
    const handleClose = () => {
        setCollateral(false);
    }
    const handleCollateral = () => {
        setCollateral(true);
    };
    const handleSell = () => {};
  const Buttons = () => {
    return (
      <div className="my_card_detail_page_container__button_container">
        <button className="my_card_detail_page_container__button_container__button" onClick={handleCollateral}>
            Collateralize
        </button>
        <button className="my_card_detail_page_container__button_container__button" onClick={handleSell}>
            Sell
        </button>
      </div>
    );
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="my_card_detail_page_container">
        <DetailCardDetails buttons={<Buttons></Buttons>} collateral = {collateral} handleClose = {handleClose} loanId = {loanId}></DetailCardDetails>
      </div>
    </>
  );
};

export default MyCardDetailPage;
