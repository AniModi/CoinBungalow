import React,  { useState, useEffect } from 'react';
import "../assets/styles/components/ProfileLoanActions.scss";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProfileList from '../components/ProfileList';
import { readContract, writeContract, getAccount } from 'wagmi/actions'
import { LoanAbi, LoanAddress, PnftAddress } from '../constants';
import { Polybase } from "@polybase/client";
const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/CB",
});
const db_metadata = db.collection('PropertyNFTMetadata')

const ProfileLoanActions = () => {
  const account = getAccount()
  const handleCancel = async (loanId) => {
    try{
      await writeContract({
        address: LoanAddress,
        abi: LoanAbi,
        functionName: "cancelLoan",
        args: [loanId],
      })
    }
    catch(err){ console.log(err) }
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
        Withdraw
      </button>
    );
  };

  const [data, setData] = useState([
    // [
    //   "Property Name",
    //   "Proposed Price",
    //   "Offered Price",
    //   "Difference",
    //   'apr',
    //   <Button loanId={0} />,
    // ],
  ])

  
  const loadMetadata = async (tokenIds) => {
    // console.log(tokenIds)
     let details = []
     for(let i=0; i<tokenIds.length; i++){
      const _tokenId = tokenIds[i].toString()
      const recordId = PnftAddress+_tokenId
      const { data } = await db_metadata.record(recordId).get()
      const loanRequest = await readContract({
        address: LoanAddress,
        abi: LoanAbi,
        functionName: "loanRequest",
        args: [_tokenId],
      })
      const interest = loanRequest[2].toString()/100;
      const loan_data = loanRequest[5].split(', ');
      details.push([data.type, data.value+' MATIC', loan_data[0]+' MATIC', interest+'%', loan_data[1], <Button loanId={_tokenId} />])
     }
     setData(details)
  }

  useEffect(() => {
    async function loadUserLoans(){
     const listedLoans = await readContract({
       address: LoanAddress,
       abi: LoanAbi,
       functionName: "getLoanRequests",
    })

    let userLoans = await Promise.all(listedLoans.map(async (loan) => {
     const _tokenId = loan.tokenId
     const isListed = await readContract({
       address: LoanAddress,
       abi: LoanAbi,
       functionName: "loanRequestExists",
       args: [_tokenId],
     })
     if (isListed && loan.borrower === account.address)
     return loan
   }))
   userLoans = userLoans.filter((loan) => loan !== undefined)

     if(userLoans[0] === undefined) return;
     const tokenIds = userLoans.map((loan) => loan.tokenId)
     await loadMetadata(tokenIds)
    }
     loadUserLoans();

 }, []);

  const header = [
    "Collateral",
    "Value",
    "Loan Amount",
    "APR",
    "Loan Term",
    "Action",
  ];
    return(
        <>
        <Navbar/>
        <Sidebar></Sidebar>
        <div className="profile_loan_actions_container">
        <div className="profile_loan_actions_container__list">
          <ProfileList data={data} header={header} title = "Applied Loans"></ProfileList>
        </div>
        </div>
        </>
    );
};

export default ProfileLoanActions;