import React, {useState, useEffect} from "react";
import "../assets/styles/components/ProposalDetailPage.scss";
import Navbar from "../../../components/Navbar";
import { useLocation } from "react-router-dom";
import { readContract, writeContract } from "wagmi/actions";
import { DAOaddress, DAOabi, PnftAbi, PnftAddress } from "../../../constants";
import { db_properties } from "../../../dao_database";

const PropertyProposalDetailPage = () => {
  const { pathname } = useLocation();
  const proposalId = pathname.split("/")[4];
  const daoId = pathname.split("/")[2];
  const issuer = proposalId.split(".")[0];
  const tid = proposalId.split(".")[1];

  const [props, setProps] = useState({})
  const [executed, setExecuted] = useState(false)

  const execute = async () => {
    if(executed){
      return;
    }
    try{
        const { hash } = await writeContract({
            address: PnftAddress,
            abi: PnftAbi,
            functionName: 'mintTo',
            args: [issuer]
        })

        setExecuted(true)

    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
  async function loadMetadata(){

    const recordId = PnftAddress+tid;
    const { data } = await db_properties.record(recordId).get();
    setProps({
        title: data.type,
        desc: data.description,
        address: data.address,
        location: data.location,
        pin: data.pincode,
        titleDeed: data.titleDeed,
        images: data.images,
        value: data.value,
    });
     
  }
    loadMetadata();
  }, [])

  useEffect(()=>{
    async function loadOwnership(){
      const ownerOf = await readContract({
        address: PnftAddress,
        abi: PnftAbi,
        functionName: 'ownerOf',
        args: [tid]
      })
      
      if(ownerOf === issuer){
        setExecuted(true)
      }
    }
    loadOwnership();
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <div className="proposal_detail_page_container">
        <div className="proposal_detail_page_container__title">
          <div className="proposal_detail_page_container__title__body">
            {props.title}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Issuer"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {issuer}
          </div>
        </div>
        <div className="proposal_detail_page_container__date">
          <div className="proposal_detail_page_container__date__title">
            {"Value"}
          </div>
          <div className="proposal_detail_page_container__date__body">
            {props.value+" MATIC"}
          </div>
        </div>
        <div className="proposal_detail_page_container__description">
          <div className="proposal_detail_page_container__description__title">
            {"Description"}
          </div>
          <div className="proposal_detail_page_container__description__body">
           {props.desc}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Address"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {props.address}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Location"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {props.location}
          </div>
        </div>
        <div className="proposal_detail_page_container__price">
          <div className="proposal_detail_page_container__price__title">
            {"Pin"}
          </div>:
          <div className="proposal_detail_page_container__price__body">
            {props.pin}
          </div>
        </div>
        <div className="proposal_detail_page_container__titleDeed">
          <div className="proposal_detail_page_container__titleDeed__title">
            {"Title Deed"}
          </div>:
          <div className="proposal_detail_page_container__titleDeed__body">
            {<a href={props.titleDeed} style={{color: 'lightskyblue'}}>Visit</a>} &#x2197;
          </div>
        </div>
        <div className="proposal_detail_page_container__images">
          <div className="proposal_detail_page_container__images__title">
            {"Images"}
          </div>:
          <div className="proposal_detail_page_container__images__body">
          {<a href={props.images} style={{color: 'lightskyblue'}}>Visit</a>} &#x2197;
          </div>
        </div>
        <div className="proposal_detail_page_container__button_container">
          <button className="proposal_detail_page_container__button_container__button" onClick={execute}>
           { executed ? ("Proposal executed") : ("Verify and Execute")} &#x2714;
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyProposalDetailPage;
