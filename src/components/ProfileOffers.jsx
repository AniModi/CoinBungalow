import React from "react";
import "../assets/styles/containers/ProfileOffers.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProfileList from "./ProfileList";

const ProfileOffers = () => {
  const handleAccept = () => {
    console.log("Accepted");
  };
  const handleReject = () => {
    console.log("Rejected");
  };
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
      "Property Name",
      "Proposed Price",
      "Offered Price",
      "Difference",
      <Accept/>,
      <Reject/>,
    ],
    [
      "Property Name",
      "Proposed Price",
      "Offered Price",
      "Difference",
      <Accept/>,
      <Reject/>,
    ],
    [
      "Property Name",
      "Proposed Price",
      "Offered Price",
      "Difference",
      <Accept/>,
      <Reject/>,
    ],
  ];
  const header = [
    "Property Name",
    "Proposed Price",
    "Offered Price",
    "Difference",
    "Accept",
    "Reject",
  ];
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="profile_offers_container">
        <div className="profile_offers_container__list">
          <ProfileList data={data} header={header} title="Offers"></ProfileList>
        </div>
      </div>
    </>
  );
};

export default ProfileOffers;
