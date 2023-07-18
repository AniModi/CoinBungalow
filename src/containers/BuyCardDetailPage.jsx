import React, {useState, useEffect} from "react";
import "../assets/styles/containers/BuyCardDetailPage.scss";
import DetailCardDetails from "../components/DetailCardDetails";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import { PdealAddress, PdealAbi } from '../constants'
import { writeContract } from "wagmi/actions";
import { parseEther} from 'viem'
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/CB",
});

const db_metadata = db.collection("PropertyNFTMetadata");

const BuyCardDetailPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const recordId = pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(false);
  
  const fetchPrice = async () => {
    const { data } = await db_metadata.record(recordId).get()
    return parseEther(data.value);
  }

  const handleInterest = async () => {
    try{
      const tokenId = recordId.slice(42)
      setIsLoading(true)
      const price = await fetchPrice();
    const {hash} = await writeContract({
      address: PdealAddress,
      abi: PdealAbi,
      functionName: "buy",
      args: [tokenId],
      value: price
    })
    setIsLoading(false)
    } catch (e) { console.log(e) }
  };
    const handleRevoke = () => {
        navigate("/buy-house");
    };
  const Buttons = () => {
    return (
      <div className="buy_card_detail_container__button_container">
        <button className="buy_card_detail_container__button_container__button" onClick={handleInterest}>
            Show interest
        </button>
        <button className="buy_card_detail_container__button_container__button" onClick={handleRevoke}>
            Revoke Interest
        </button>
      </div>
    );
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="buy_card_detail_container">
        {isLoading && <Loader></Loader>}
      <DetailCardDetails buttons={<Buttons></Buttons>} recordId={recordId}></DetailCardDetails>
      </div>
    </>
  );
};

export default BuyCardDetailPage;
