import React, { useState } from "react";
import "../assets/styles/containers/MyCardDetailPage.scss";
import DetailCardDetails from "../components/DetailCardDetails";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { PdealAddress, PdealAbi, PnftAbi, PnftAddress } from '../constants'
import { readContract, writeContract } from "wagmi/actions";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/CB",
});

const db_metadata = db.collection("PropertyNFTMetadata");

const MyCardDetailPage = () => {
  const { pathname } = useLocation();
  const recordId = pathname.split("/")[2];

    const [collateral, setCollateral] = useState(false);
    const handleClose = () => {
        setCollateral(false);
    }
    const handleCollateral = () => {
        setCollateral(true);
    };
    const fetchPrice = async () => {
      const { data } = await db_metadata.record(recordId).get()
      return data.value;
    }
    const handleSell = async () => {
      try{
       const price = await fetchPrice();
       const tokenId = recordId.slice(42)
       
       const response = await writeContract({
          address: PnftAddress,
          abi: PnftAbi,
          functionName: "approve",
          args: [PdealAddress, tokenId]
        })
       const { hash } = await writeContract({
          address: PdealAddress,
          abi: PdealAbi,
          functionName: "list",
          args: [tokenId, price]
       })
      } catch (e) { console.log(e) }
       
    };
  const Buttons = () => {
    return (
      <div className="my_card_detail_page_container__button_container">
        <button className="my_card_detail_page_container__button_container__button" onClick={handleCollateral}>
            Collateralize
        </button>
        <button className="my_card_detail_page_container__button_container__button" onClick={handleSell}>
            List for Sale
        </button>
      </div>
    );
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="my_card_detail_page_container">
        <DetailCardDetails buttons={<Buttons></Buttons>} recordId = {recordId} collateral = {collateral} handleClose = {handleClose}></DetailCardDetails>
      </div>
    </>
  );
};

export default MyCardDetailPage;
