import React from "react";
import "../assets/styles/containers/MyNFTPage.scss";
import HouseCard from "../components/HouseCard";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const MyNFTPage = () => {
  const props = [
//     {
//     image:
//       "https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=1380&t=st=1688985038~exp=1688985638~hmac=e07c8fd49bea88bb8dd3df993178ec1c2b9c9c434df44392629f40e5dc2b4bb4",
//     title: "House",
//     address: "1234 Street",
//     data: {
//       rows: ["Bedrooms", "Bathrooms", "Area"],
//       columns: ["3", "2", "2000 sqft"],
//     },
//   }
  ];
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
