import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/styles/containers/DAOPage.scss";
import Navbar from "../components/Navbar";
import ProposalCard from "../components/ProposalCard";
import PropertyProposalCard from "../components/PropertyProposalCard";
import ProposalForm from "../components/ProposalForm";
import { readContract, writeContract, getAccount } from "wagmi/actions"
import {DAOaddress, DAOabi, PnftAddress} from "../constants";
import { db_metadata, db_proposals, db_properties} from "../dao_database";

const DAOPage = () => {
  const {pathname} = useLocation();
  const daoId = pathname.split('/')[3];
  const recordId = pathname.split('/')[2]+"/"+daoId;
  
  const account = getAccount();
  const [daoDetails, setDaoDetails] = useState({});
  const [isMember, setIsMember] = useState(false);
  
  const [props, setProps] = useState([{
    // title: "Proposal Title",
    // date: "12/12/2021 - 12/12/2021",
    // description:
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl",
  }])
  const [propertyProps, setPropertyProps] = useState([{}])

  const [active, setActive] = useState("DAO");

  useEffect(()=>{
    async function loadMetadata(){
      const { data } = await db_metadata.record(recordId).get();
      const dao = await readContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: 'daos',
        args: [daoId]
      })
      const organizer = dao[2]
      setDaoDetails({
        name: data.name,
        description: data.description,
        goal: data.goal,
        fee: data.fee,
        started: data.started,
        organizer
      });
      let isMember = await readContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: 'isPersonJoined',
        args: [daoId, account.address]
      })
      isMember = isMember||(account.address === organizer);
       isMember = (account.address === organizer);
      setIsMember(isMember)
    }
    loadMetadata();
  },[])

  const join = async () => {
    try{
      await writeContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: 'joinDAO',
        args: [daoId]
      })
    }
    catch(err){
      console.log(err);
    }
  }

  const loadProposalsData = async (proposals) => {
      let _props = [], _propertyProps = [];
      for(const proposal of proposals){
        if(proposal.uri==='') continue;
        if(proposal.uri==='uri'){
        const _recordId = recordId+"/"+proposal.id;
        const { data } = await db_proposals.record(_recordId).get();
        _props.push({
          id: _recordId,
          title: data.title,
          date: data.started+" - "+data.ends,
          description: data.description,
        })
      }
      else{
        const _recordId = PnftAddress+proposal.uri.split(', ')[1];
        const { data } = await db_properties.record(_recordId).get();
        _propertyProps.push({
          dao_id: 0,
          pid: proposal.uri.split(', ')[1],
          value: data.value,
          description: data.description,
          issuer: proposal.uri.split(', ')[0]
        })
      }

      }
      setProps(_props);
      setPropertyProps(_propertyProps);
  }

  useEffect(()=>{
    async function loadProposals(){
      let proposals = await readContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: 'getAllProposalsByDAO',
        args: [daoId]
      })
      proposals = proposals.filter((prop)=>prop.id.toString()!==daoId);
      proposals = proposals.map((prop)=>({id: prop.id.toString(), uri: prop.uri}));

      await loadProposalsData(proposals);
    }
    loadProposals();
  }, [])

  const handleTabs = (e) => {
    setActive(e.target.textContent);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="dao_page_container">
        <div className="dao_page_container__banner">
          <div className="dao_page_container__banner__tabs">
            <div
              className={
                "dao_page_container__banner__tabs__value" +
                (active === "DAO" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              DAO
            </div>
            <div
              className={
                "dao_page_container__banner__tabs__value" +
                (active === "All Proposals" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              All Proposals
            </div>
            
            <div
              className={
                "dao_page_container__banner__tabs__value" +
                (active === "Create Proposal" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              Create Proposal
            </div>

          </div>
        </div>
        {active==="DAO" && <div className="dao_page_container__text_box">
          <div className="dao_page_container__text_box__title">{daoDetails.name}</div>
          <div className="dao_page_container__text_box__subtitle">{daoDetails.started}<br/>Established by {daoDetails.organizer}</div>
          <div className="dao_page_container__text_box__body__left__subheading">Description</div>
          <div className="dao_page_container__text_box__body__left">{daoDetails.description}</div>
          <div className="dao_page_container__text_box__body__left__subheading">DAO goal</div>
          <div className="dao_page_container__text_box__body__left">{daoDetails.goal}</div>
          <div className="dao_page_container__text_box__body__left__subheading">Membership Fee: ${daoDetails.fee}/month</div>
          {!isMember && <button className="dao_page_container__text_box__body__right__button">Join community</button>}
          </div>
        }
        {active === "All Proposals" && (
          <div className="dao_page_container__proposals">
            { props && props.map((prop, index)=>{
            return <div className="dao_page_container__proposals__proposal">
              <ProposalCard key={index} props={prop}></ProposalCard>
            </div>
            })}
            { propertyProps && propertyProps.map((prop, index)=>{
            return <div className="dao_page_container__proposals__proposal">
              <PropertyProposalCard key={index} props={prop} isMember={isMember}/>
            </div>
            })}
          </div>
        )}
        {active === "Create Proposal" && isMember &&(
          <div className="dao_page_container__form">
            <div className="dao_page_container__form__container">
              <ProposalForm daoId={daoId}></ProposalForm>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DAOPage;
