import React from "react";
import "../assets/styles/containers/LoanCardDetailPage.scss";
import DetailCardDetails from "../components/DetailCardDetails";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { writeContract } from "wagmi/actions";
import { LoanAbi, LoanAddress } from "../constants";

const LoanCardDetailPage = () => {
  const { pathname } = useLocation();
  const recordId = pathname.split("/")[2];

  const handleLend = async () => {
    try{
    const tokenId = recordId.slice(42);
    const { hash } = await writeContract({
      address: LoanAddress,
      abi: LoanAbi,
      functionName: "lend",
      args: [tokenId],
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
