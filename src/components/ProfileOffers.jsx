import React, { useState } from "react";
import "../assets/styles/containers/ProfileOffers.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProfileList from "./ProfileList";
import Loader from "./Loader";
import OfferList from "./OfferList";

const ProfileOffers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [propertyID, setPropertyID] = useState(null);

  const handleClick = (id) => {
    if (showDetails === true) setShowDetails(false);
    else setShowDetails(true);

    setPropertyID(id);
  };

  const Button = ({ propertyID }) => {
    const handleClickUtil = () => {
      handleClick(propertyID);
    };
    return (
      <button
        className="profile_offers_container__list__accept_button"
        onClick={handleClickUtil}
      >
        Show offers
      </button>
    );
  };

  const data = [
    [
      "Property Name",
      "Proposed Price",
      "Offered Price",
      "Difference",
      <Button propertyID={1} />,
    ],
    [
      "Property Name",
      "Proposed Price",
      "Offered Price",
      "Difference",
      <Button propertyID={2} />,
    ],
    [
      "Property Name",
      "Proposed Price",
      "Offered Price",
      "Difference",
      <Button propertyID={3} />,
    ],
  ];

  const header = [
    "Property Name",
    "Proposed Price",
    "Offered Price",
    "Difference",
    "Show Offers",
  ];

  return (
    <>
      <Navbar />
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          {showDetails === false ? (
            <div className="profile_offers_container">
              <div className="profile_offers_container__list">
                <ProfileList data={data} header={header} title="Offers" />
              </div>
            </div>
          ) : (
            <OfferList propertyID={propertyID} handleClose={handleClick} />
          )}
        </>
      )}
    </>
  );
};

export default ProfileOffers;
