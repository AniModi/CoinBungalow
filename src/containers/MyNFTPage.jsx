import React, { useState, useEffect } from "react";
import "../assets/styles/containers/MyNFTPage.scss";
import HouseCard from "../components/HouseCard";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Polybase } from "@polybase/client";
import { getAccount, readContract } from "wagmi/actions";
import { PnftAddress, PnftAbi } from "../constants";

const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/CB",
});
const db_metadata = db.collection('PropertyNFTMetadata')

const MyNFTPage = () => {
  const account = getAccount()
  const [props, setProps] = useState([]);

  const loadMetadata = async (tokenIds) => {
    let props = [];
    for(let i=0; i<tokenIds.length; i++){
      const _tokenId = tokenIds[i].toString()
      const recordId = PnftAddress+_tokenId
      const { data } = await db_metadata.record(recordId).get()
      props.push({
        id: recordId,
        image: data.image,
        title: data.type,
        address: data.address,
        location: data.location,
        value: data.value,
        data: {
           rows: ['Age', 'Area', "Description"],
           columns: [data.age, data.size+' sqft', data.description]
        }
        })
      }
      setProps(props)
  }

  useEffect(() => {
    async function loadNfts(){
      let nfts = await readContract({
        address: PnftAddress,
        abi: PnftAbi,
        functionName: "balanceOf",
        args: [account.address]
      })
      if(nfts.toString() === '0') return;
      nfts = parseInt(nfts.toString())
      let tokenIds = []
      for(let i = 0; i < nfts; i++){
        const _tokenId = await readContract({
          address: PnftAddress,
          abi: PnftAbi,
          functionName: "tokenOfOwnerByIndex",
          args: [account.address, i]
        })
        tokenIds.push(_tokenId)
      }
      
      await loadMetadata(tokenIds);
    }
    loadNfts()
    // loadMetadata([0])
  }, []);

  return (
    <>
    <Navbar></Navbar>
    <div className="my_nft_page_container">
      <div className="my_nft_page_container__title">My NFTs</div>
      {(props.length > 0) ? 
      (<div className="my_nft_page_container__content">
        {props.map((item, index) => {
            return <HouseCard key={index} props = {item} />;
        })}
      </div>
      ) : <div className="my_nft_page_container__content_empty">
            You don't have any NFTs yet
            <Link to={"/add-nft"} className="my_nft_page_container__content_empty__btn">Add NFT</Link>
        </div>}
    </div>
    </>
  );
};

export default MyNFTPage;
