import React, { useState, useEffect } from 'react';
import "../assets/styles/containers/ProfilePropertyActions.scss";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProfileList from '../components/ProfileList';
import { readContract, getAccount } from 'wagmi/actions'
import { PdealAbi, PdealAddress, PnftAddress } from '../constants';
import { Polybase } from "@polybase/client";
const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/CB",
});
const db_metadata = db.collection('PropertyNFTMetadata')

const ProfilePropertyActions = () => {
  const account = getAccount()
  const Button = ({ propertyID }) => {
    const handleClick = () => {
      handleCancel(propertyID);
    };
    return (
      <button
        className="profile_loan_actions_container__list__reject_button"
        onClick={handleClick}
      >
        Cancel
      </button>
    );
  };
    
  const [data, setData] = useState([
    [
      "Property",
      "Address",
      "Location",
      "Value",
      <Button propertyID={0} />,
    ],
  ]);

  const handleCancel = (propertyID) => {
    alert("Cancel Property " + propertyID);
  };

  const loadMetadata = async (tokenIds) => {
     let details = []
     for(let i=0; i<tokenIds.length; i++){
      const _tokenId = tokenIds[i].toString()
      const recordId = PnftAddress+_tokenId
      const { data } = await db_metadata.record(recordId).get()
      details.push([data.type, data.address, data.location, data.value+' MATIC', <Button propertyID={_tokenId} />])
     }
     setData(details)
  }

    useEffect(() => {
       async function loadUserProps(){
        const listedProperties = await readContract({
          address: PdealAddress,
          abi: PdealAbi,
          functionName: "getListedProperties",
       })

       const userProps = listedProperties.filter(async (property) => {
        const _tokenId = property.tokenId
        const isListed = await readContract({
          address: PdealAddress,
          abi: PdealAbi,
          functionName: "isListed",
          args: [_tokenId],
        })
        if(isListed && property.seller === account.address)
        return property;
      })
        const tokenIds = userProps.map((property) => property.tokenId)
        await loadMetadata(tokenIds)
       }
        loadUserProps();

    }, []);


  const header = [
    "Property",
    "Address",
    "Location",
    "Value",
    "Action",
  ];
    return(
        <>
        <Navbar/>
        <Sidebar></Sidebar>
        <div className="profile_pending_loans_container">
        <div className="profile_pending_loans_container__list">
          <ProfileList data={data} header={header}></ProfileList>
        </div>
        </div>
        </>
    );
};

export default ProfilePropertyActions;