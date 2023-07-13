import React from "react";
import "../assets/styles/containers/BuyCardDetailPage.scss";
import DetailCardDetails from "../components/DetailCardDetails";

const BuyCardDetailPage = () => {
  const handleInterest = () => {};
    const handleRevoke = () => {};
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
      <div className="buy_card_detail_container">
      <DetailCardDetails buttons={<Buttons></Buttons>}></DetailCardDetails>
      </div>
    </>
  );
};

export default BuyCardDetailPage;
