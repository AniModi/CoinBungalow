import React, { useState } from "react";
import "../assets/styles/components/ProfilePendingLoans.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProfileList from "../components/ProfileList";
import PayLoanBox from "../components/PayLoanBox";
import { AnimatePresence, motion } from "framer-motion";

const ProfilePendingLoans = () => {
  const [showPayment, setShowPayment] = useState(false); // State variable to control the visibility of payment section
  const [loanId, setLoanId] = useState(""); // State variable to store the loan id of the loan to be paid
  const handleClose = () => {
    setShowPayment(false); // Hide payment section when Close button is clicked
  };

  const handleAccept = (loanId) => {
    setShowPayment(true); // Show payment section when Pay button is clicked
    setLoanId(loanId); // Set the loan id of the loan to be paid
  };


  const Button = ({ loanId }) => {
    const handleClick = () => {
      handleAccept(loanId);
    };

    return (
      <button
        className="profile_pending_loans_container__list__accept_button"
        onClick={handleClick}
      >
        Pay
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

  return (
    <>
      <Navbar />
      <Sidebar></Sidebar>
      <div className="profile_pending_loans_container">
        <div className="profile_pending_loans_container__list">
          <ProfileList data={data} header={header}></ProfileList>
        </div>
        <AnimatePresence mode="wait">
          {showPayment && (
            <motion.div
              className="profile_pending_loans_container__payment_section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              exit={{ opacity: 0 }}
            >
              <PayLoanBox loanId={loanId} handleClose={handleClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProfilePendingLoans;
