import React, { useEffect, useState } from "react";
import "../assets/styles/containers/InvestPage.scss";
import Navbar from "../components/Navbar";
import NftCard from "../components/NftCard";
import SLideshowCard from "../components/SlideshowCard";
import { AnimatePresence } from "framer-motion";
import { readContract } from 'wagmi/actions'
import { LoanAddress, LoanAbi, PnftAddress} from "../constants";
import { Polybase } from "@polybase/client";
const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/CB",
});
const db_metadata = db.collection('PropertyNFTMetadata')

const InvestPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [props, setProps] = useState([
  //   {
  //   image:
  //     "https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=1380&t=st=1689062150~exp=1689062750~hmac=1a2f68851582688e6965bd8e0b4d3b69a9bce55582fd23e8e7292f43fd0f3547",
  //   data: {
  //     rows: [
  //       "Value",
  //       "Lending Amount",
  //       "Interest Rate",
  //       "Loan Term",
  //       "Credit Score",
  //       "Pin Code",
  //     ],
  //     columns: ["1000", "500", "5%", "1 month", "700", "12345"],
  //   },
  // }
])

  const [slideshow, setSlideshow] = useState([
    // {
    //   image:
    //     "https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=1380&t=st=1689062150~exp=1689062750~hmac=1a2f68851582688e6965bd8e0b4d3b69a9bce55582fd23e8e7292f43fd0f3547",
    //   data: {
    //     rows: [
    //       "Value",
    //       "Lending Amount",
    //       "Interest Rate",
    //       "Loan Term",
    //       "Credit Score",
    //       "Pin Code",
    //     ],
    //     columns: ["1000", "500", "5%", "1 month", "700", "12345"],
    //   },
    // },
    // {
    //   image:
    //     "https://img.freepik.com/free-photo/3d-electric-car-building_23-2148972401.jpg?size=626&ext=jpg",
    //   data: {
    //     rows: [
    //       "Value",
    //       "Lending Amount",
    //       "Interest Rate",
    //       "Loan Term",
    //       "Credit Score",
    //       "Pin Code",
    //     ],
    //     columns: ["1000", "500", "5%", "1 month", "700", "12345"],
    //   },
    // },
  ])
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshow.length);
      return () => clearInterval(interval);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, slideshow.length]);

  const loadMetadata = async (tokenIds) => {
    let props = [];
    for(let i=0; i<tokenIds.length; i++){
      const _tokenId = tokenIds[i].toString()
      const recordId = PnftAddress+_tokenId
      const { data } = await db_metadata.record(recordId).get()
      const loanRequest = await readContract({
        address: LoanAddress,
        abi: LoanAbi,
        functionName: "loanRequest",
        args: [_tokenId],
      })
      let borrowerAddress = loanRequest[1].toString();
      borrowerAddress = borrowerAddress.slice(0, 6) + "..." + borrowerAddress.slice(-4);
      const interest = loanRequest[2].toString()/100;
      const loan_data = loanRequest[5].split(', ');
      const amount = loan_data[0];
      const duration = loan_data[1];
      props.push({
        id: recordId,
        image: data.image,
        title: data.type,
        address: data.address,
        location: data.location,
        value: data.value,
        data: {
           rows: ['Borrower','Loan Amount', 'APR', 'Loan Term', 'Credit Score'],
           columns: [borrowerAddress, amount+' MATIC', interest+'%', duration, 'h']
        }
        })
      }
      let slideshow = []
      for(let i=0; i<props.length && i<3; i++)
      slideshow.push(props[i])
      setSlideshow(slideshow)
      if(props.length<4) return;
      setProps(props)
  }

  useEffect(() => {
    async function loadList(){
     const ListedLoans = await readContract({
        address: LoanAddress,
        abi: LoanAbi,
        functionName: "getLoanRequests",
     })
     let listedLoans = await Promise.all(ListedLoans.map(async (loan) => {
      const _tokenId = loan.tokenId
      const isListed = await readContract({
        address: LoanAddress,
        abi: LoanAbi,
        functionName: "loanRequestExists",
        args: [_tokenId],
      })
      if (isListed)
      return loan
    }))
    listedLoans = listedLoans.filter((loan) => loan !== undefined)
    if(listedLoans[0] === undefined) return;
      const tokenIds = listedLoans.map((loan) => loan.tokenId)
      if(tokenIds.length === 0) return;
      await loadMetadata(tokenIds)
    }
    try{
    loadList();
    } catch(err){
      console.log(err)
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="invest_page_container">
        <div className="invest_page_container__new_arrivals">
          <div className="invest_page_container__new_arrivals__container">
            { (slideshow.length>0) &&
            <AnimatePresence>
              <SLideshowCard props={slideshow[currentSlide]} key = {currentSlide}></SLideshowCard>
            </AnimatePresence>}
          </div>
        </div>
      </div>
      { (props.length>0) &&
      <div className="invest_page_container__card_list">
        {props.map((prop, index) => {
            return <NftCard key={index} props={prop}></NftCard>
          })}
      </div>}
    </>
  );
};

export default InvestPage;
