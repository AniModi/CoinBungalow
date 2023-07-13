import React from 'react';
import "../assets/styles/components/ProfileLoanActions.scss";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProfileList from '../components/ProfileList';


const ProfileLoanActions = () => {
  const handleCancel = (loanId) => {
  };


  const Button = ({ loanId }) => {
    const handleClick = () => {
      handleCancel(loanId);
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
      <Button loanId={0} />,
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
        <div className="profile_loan_actions_container">
        <div className="profile_loan_actions_container__list">
          <ProfileList data={data} header={header}></ProfileList>
        </div>
        </div>
        </>
    );
};

export default ProfileLoanActions;