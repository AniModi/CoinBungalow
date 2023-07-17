import React, { useState, useEffect } from "react";
import "../assets/styles/components/ProfilePendingLoans.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProfileList from "../components/ProfileList";
import PayLoanBox from "../components/PayLoanBox";
import { AnimatePresence, motion } from "framer-motion";
import { readContract, writeContract, getAccount } from "wagmi/actions";
import { formatEther } from 'viem'
import { LoanAbi, LoanAddress, PnftAddress } from '../constants';
import { Polybase } from "@polybase/client";
const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/CB",
});
const db_metadata = db.collection('PropertyNFTMetadata')

const ProfilePendingLoans = () => {
  const account = getAccount();
  const [showPayment, setShowPayment] = useState(false); // State variable to control the visibility of payment section
  const [loanId, setLoanId] = useState(""); // State variable to store the loan id of the loan to be paid
  const handleClose = () => {
    setShowPayment(false); // Hide payment section when Close button is clicked
  };

  const handleAccept = (loanId) => {
    setShowPayment(true); // Show payment section when Pay button is clicked
    setLoanId(loanId); // Set the loan id of the loan to be paid
  };


  const Button = ({ loanId, loanAmount }) => {
    const handleClick = async () => {
      // handleAccept(loanId);
      try{
         const { hash } = await writeContract({
            address: LoanAddress,
            abi: LoanAbi,
            functionName: "repay",
            args: [loanId],
            value: loanAmount
         })
      }
      catch(err){ console.log(err) }
    };

    return (
      <button
        className="profile_pending_loans_container__list__accept_button"
        onClick={handleClick}
      >
        Repay
      </button>
    );
  };

  const [data, setData] = useState([
    // [
    //   "Property Name",
    //   "Proposed Price",
    //   "Offered Price",
    //   "Difference",
    //   "Difference",
    //   "Difference",
    //   <Button loanId={0} />,
    // ],
  ]);

  const loadMetadata = async (userLoans) => {
    // console.log(tokenIds)
     let details = []
     for(let i=0; i<userLoans.length; i++){
      const _tokenId = userLoans[i].tokenId.toString()
      const recordId = PnftAddress+_tokenId
      const { data } = await db_metadata.record(recordId).get()
      const interest = userLoans[i].apr.toString()/100;
      const amount = formatEther(userLoans[i].value);
      const timeLeft = (userLoans[i].deadline.toString()-Math.floor(Date.now() / 1000))/(60*60*24);
      details.push([data.type, data.value+' MATIC', amount+' MATIC', interest+'%', parseInt(timeLeft)+' days', <Button loanId={_tokenId} loanAmount={userLoans[i].value} />])
     }
     setData(details)
  }

  useEffect(() => {
    async function loadUserLoans(){
     const fulfilledLoans = await readContract({
       address: LoanAddress,
       abi: LoanAbi,
       functionName: "getFulfilledLoans",
    })

    let userLoans = await Promise.all(fulfilledLoans.map(async (loan) => {
     const _tokenId = loan.tokenId
     const repayTracker = await readContract({
        address: LoanAddress,
        abi: LoanAbi,
        functionName: "repayTracker",
        args: [_tokenId]
      })
      const isClosed = repayTracker[3]
     if (!isClosed && loan.borrower === account.address)
     return loan
   }))
   userLoans = userLoans.filter((loan) => loan !== undefined)
   if(userLoans[0] === undefined) return;
  //  const tokenIds = userLoans.map((loan) => loan.tokenId)
     await loadMetadata(userLoans)
    }
     loadUserLoans();

 }, []);

  const header = [
    "Collateral",
    "Value",
    "Repay Amount",
    "APR",
    "Time left",
    "Action"
  ];

  return (
    <>
      <Navbar />
      <Sidebar></Sidebar>
      <div className="profile_pending_loans_container">
        <div className="profile_pending_loans_container__list">
          <ProfileList data={data} header={header} title="Pending Loans"></ProfileList>
        </div>
        {/* <AnimatePresence mode="wait">
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
        </AnimatePresence> */}
      </div>
    </>
  );
};

export default ProfilePendingLoans;
