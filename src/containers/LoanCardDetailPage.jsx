import React from "react";
import "../assets/styles/containers/LoanCardDetailPage.scss";
import DetailCardDetails from "../components/DetailCardDetails";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { readContract, writeContract } from "wagmi/actions";
import { parseEther } from "viem";
import { LoanAbi, LoanAddress } from "../constants";

const LoanCardDetailPage = () => {
  const { pathname } = useLocation();
  const recordId = pathname.split("/")[2];

  const handleLend = async () => {
    try{
    const tokenId = recordId.slice(42);
    const loan_data = await readContract({
      address: LoanAddress,
      abi: LoanAbi,
      functionName: "loanRequest",
      args: [tokenId],
    })
    let amount = loan_data[5].split(', ')[0]
    amount = parseEther(amount)
    const { hash } = await writeContract({
      address: LoanAddress,
      abi: LoanAbi,
      functionName: "lend",
      args: [tokenId],
      value: amount
    });
  } catch (e) { console.log(e) }
  };

  const Buttons = () => {
    return (
      <div className="loan_card_detail_container__button_container">
        <button
          className="loan_card_detail_container__button_container__button"
          onClick={handleLend}
        >
          Lend Money
        </button>
      </div>
    );
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="loan_card_detail_container">
        <DetailCardDetails buttons={<Buttons></Buttons>} recordId={recordId}></DetailCardDetails>
      </div>
    </>
  );
};

export default LoanCardDetailPage;
