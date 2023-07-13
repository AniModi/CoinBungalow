import React from 'react';
import "../assets/styles/containers/ProfilePropertyActions.scss";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProfileList from '../components/ProfileList';


const ProfilePropertyActions = () => {
  const handleCancel = (propertyID) => {
  };


  const Button = ({ propertyID }) => {
    const handleClick = () => {
      handleCancel(propertyID);
    };

    return (
      <button
        className="profile_loan_actions_container__list__reject_button"
        onClick={handleClick}
      >
        Cancel
      </button>
    );
  };

  const data = [
    [
      "Property Name",
      "Proposed Price",
      "Offered Price",
      "Difference",
      <Button propertyID={0} />,
    ],
  ];

  const header = [
    "Property Name",
    "Proposed Price",
    "Offered Price",
    "Difference",
    "Pay",
  ];
    return(
        <>
        <Navbar/>
        <Sidebar></Sidebar>
        <div className="profile_pending_loans_container">
        <div className="profile_pending_loans_container__list">
          <ProfileList data={data} header={header}></ProfileList>
        </div>
        </div>
        </>
    );
};

export default ProfilePropertyActions;