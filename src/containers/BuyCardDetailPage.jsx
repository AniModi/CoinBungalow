import React from "react";
import "../assets/styles/containers/BuyCardDetailPage.scss";
import DetailCardDetails from "../components/DetailCardDetails";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

const BuyCardDetailPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const recordId = pathname.split("/")[2];
  const handleInterest = () => {
    
  };
    const handleRevoke = () => {
        navigate("/buy-house");
    };
  const Buttons = () => {
    return (
      <div className="buy_card_detail_container__button_container">
        <button className="buy_card_detail_container__button_container__button" onClick={handleInterest}>
            Show interest
        </button>
        <button className="buy_card_detail_container__button_container__button" onClick={handleRevoke}>
            Revoke Interest
        </button>
      </div>
    );
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="buy_card_detail_container">
      <DetailCardDetails buttons={<Buttons></Buttons>} recordId={recordId}></DetailCardDetails>
      </div>
    </>
  );
};

export default BuyCardDetailPage;
