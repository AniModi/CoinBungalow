import React, { useState, useEffect} from "react";
import "../assets/styles/containers/DAOPage.scss";
import Navbar from "../components/Navbar";
import DAOCard from "../components/DAOCard";
import DAOForm from "../components/DAOForm";
import { readContract } from "wagmi/actions";
import { DAOaddress, DAOabi } from '../constants'
import { db_metadata } from '../dao_database'

const AllDAOPage = () => {
  const [props, setProps] = useState([
  //   {
  //   title: "DAO Name",
  //   date: "12/12/2021",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl",
  // }
])
  const [active, setActive] = useState("All DAOs");

  const handleTabs = (e) => {
    setActive(e.target.textContent);
  };

   const loadMetadata = async (all_daos)=>{
      let _props = []
       for(const dao of all_daos){
           const dao_id = dao.id;
           const recordId = DAOaddress +'/'+ dao_id.toString();
            const { data } = await db_metadata.record(recordId).get();
            const members = await readContract({
                address: DAOaddress,
                abi: DAOabi,
                functionName: 'getMembersByDAO',
                args: [dao_id]
              })
              _props.push({
                id: recordId,
                name: data.name,
                date: data.started,
                fee: data.fee,
                members: members.length+1
              })
       }
     setProps(_props);
   }

  useEffect(() => {
   async function loadDaos(){
    let allDaos;
    try{
      allDaos = await readContract({
        address: DAOaddress,
        abi: DAOabi,
        functionName: "getAllDaos",
        args: []
     })
     console.log(allDaos)
     await loadMetadata(allDaos)
    } catch(e){console.log(e)}
   }
    loadDaos();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="dao_page_container">
        <div className="dao_page_container__banner">
          <div className="dao_page_container__banner__tabs">
            <div
              className={
                "dao_page_container__banner__tabs__value" +
                (active === "All DAOs" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              All DAOs
            </div>
            <div
              className={
                "dao_page_container__banner__tabs__value" +
                (active !== "All DAOs" ? "_active" : "")
              }
              onClick={handleTabs}
            >
              Create DAO
            </div>
          </div>
        </div>
        {active === "All DAOs" && (
          <div className="dao_page_container__proposals">
            { props && props.map((prop, index) => {
              return <div className="dao_page_container__proposals__proposal">
              <DAOCard key={index} props={prop}></DAOCard>
            </div>
          })}
          </div>
        )}
        {active !== "All DAOs" && (
          <div className="dao_page_container__form">
            <div className="dao_page_container__form__container">
              <DAOForm></DAOForm>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllDAOPage;
