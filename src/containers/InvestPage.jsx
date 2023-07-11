import React, { useEffect, useState } from "react";
import "../assets/styles/containers/InvestPage.scss";
import Navbar from "../components/Navbar";
import NftCard from "../components/NftCard";
import SLideshowCard from "../components/SlideshowCard";
import { AnimatePresence } from "framer-motion";

const InvestPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const props = {
    image:
      "https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=1380&t=st=1689062150~exp=1689062750~hmac=1a2f68851582688e6965bd8e0b4d3b69a9bce55582fd23e8e7292f43fd0f3547",
    data: {
      rows: [
        "Value",
        "Lending Amount",
        "Interest Rate",
        "Loan Term",
        "Credit Score",
        "Pin Code",
      ],
      columns: ["1000", "500", "5%", "1 month", "700", "12345"],
    },
  };

  const slideshow = [
    {
      image:
        "https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=1380&t=st=1689062150~exp=1689062750~hmac=1a2f68851582688e6965bd8e0b4d3b69a9bce55582fd23e8e7292f43fd0f3547",
      data: {
        rows: [
          "Value",
          "Lending Amount",
          "Interest Rate",
          "Loan Term",
          "Credit Score",
          "Pin Code",
        ],
        columns: ["1000", "500", "5%", "1 month", "700", "12345"],
      },
    },
    {
      image:
        "https://img.freepik.com/free-photo/3d-electric-car-building_23-2148972401.jpg?size=626&ext=jpg",
      data: {
        rows: [
          "Value",
          "Lending Amount",
          "Interest Rate",
          "Loan Term",
          "Credit Score",
          "Pin Code",
        ],
        columns: ["1000", "500", "5%", "1 month", "700", "12345"],
      },
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshow.length);
      return () => clearInterval(interval);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, slideshow.length]);
  return (
    <>
      <Navbar></Navbar>
      <div className="invest_page_container">
        <div className="invest_page_container__new_arrivals">
          <div className="invest_page_container__new_arrivals__container">
            <AnimatePresence>
              <SLideshowCard props={slideshow[currentSlide]} key = {currentSlide}></SLideshowCard>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="invest_page_container__card_list">
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
        <NftCard props={props}></NftCard>
      </div>
    </>
  );
};

export default InvestPage;
