import React from "react";
import "../assets/styles/components/OfferList.scss";
import ProfileList from "./ProfileList";

const OfferList = ({propertyID, handleClose}) => {
  const header = [
    "Proposed Price",
    "Offered Price",
    "Difference",
    "Accept",
    "Reject",
  ];

  const handleAccept = () => {
    console.log("Accepted");
    handleClose();
}

const handleReject = () => {
    console.log("Rejected");
    handleClose();
  }

  const Accept = () => {
    return (
      <button className="profile_offers_container__list__accept_button" onClick={handleAccept}>
        Accept
      </button>
    );
  };

  const Reject = () => {
    return (
      <button className="profile_offers_container__list__reject_button" onClick={handleReject}>
        Reject
      </button>
    );
  };
  const data = [
    [
      "Proposed Price",
      "Offered Price",
      "Difference",
      <Accept></Accept>,
      <Reject></Reject>
    ],
    [
      "Proposed Price",
      "Offered Price",
      "Difference",
      <Accept></Accept>,
      <Reject></Reject>
    ],
    [
      "Proposed Price",
      "Offered Price",
      "Difference",
      <Accept></Accept>,
      <Reject></Reject>
    ],
  ];
  return (
    <>
      <div className="offer_list_container">
        <div className="offer_list_container__list">
          <ProfileList
            data={data}
            header={header}
            title={`Offers for ${propertyID}`}
          ></ProfileList>
        </div>
      </div>
    </>
  );
};

export default OfferList;
