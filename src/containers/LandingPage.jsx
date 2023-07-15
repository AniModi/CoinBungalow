import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import "../assets/styles/containers/LandingPage.scss";
import Navbar from "../components/Navbar";
import LandingPageSection from "../components/LandingPageSection";
import LandingPageSectionFlipped from "../components/LandingPageSectionFlipped";

const LandingPage = () => {
  const refBanner = useRef(true);
  const isInViewBanner = useInView(refBanner);
  const bannerAnimateControl = useAnimation();
  

  const data = [
    {
      title: "Want to deal in properties?",
      body: "Well, we got you covered!",
      img: "https://i.imgur.com/xXYkKFA.png",
      url1: "/buy-house",
      url2: "/sell-house",
      text1: "Buy a property",
      text2: "Sell a property",
    },
    {
      title: "Want to deal in properties?",
      body: "Well, we got you covered!",
      img: "https://i.imgur.com/53cIK90.png",
      url1: "/borrow",
      url2: "/lend",
      text1: "Borrow",
      text2: "Lend",
    },
    {
      title: "Want to deal in Land?",
      body: "Well, we got you covered!",
      img: "https://img.freepik.com/premium-photo/include-landscape-real-estate-green-field-crop-agricultural-planttract-land-housing-subdivision-aerial-view-land-positioning-point-area_43780-7524.jpg",
      url1: "/buy-land",
      url2: "/sell-land",
      text1: "Buy a Land",
      text2: "Sell a Land",
    }
  ]

  useEffect(() => {
    if (isInViewBanner) {
      bannerAnimateControl.stop();
      bannerAnimateControl.start({ opacity: 1, y: 0 });
    }
    if (!isInViewBanner) {
      bannerAnimateControl.stop();
      bannerAnimateControl.start({ opacity: 0, y: -200 });
    }
  }, [isInViewBanner, bannerAnimateControl]);
  return (
    <>
        <Navbar></Navbar>
      <div className="landing_page_container">
        <motion.div
          className="landing_page_container__banner"
          initial={{ opacity: 1 }}
          animate={bannerAnimateControl}
          transition={{ duration: 1 }}
        >
          <div
            className="landing_page_container__banner__img"
            ref={refBanner}
          ></div>
          <div className="landing_page_container__banner__text_box">
            <div className="landing_page_container__banner__text_box__title">
              Welcome to CoinBungalow
            </div>
            <div className="landing_page_container__banner__text_box__body">
              Explore our diverse collection of exceptional properties, tailored
              to suit your unique needs. Find your perfect match today!
            </div>
          </div>
        </motion.div>
        <LandingPageSection props = {data[0]}></LandingPageSection>
        <LandingPageSectionFlipped props = {data[1]}></LandingPageSectionFlipped>
        <LandingPageSection props = {data[2]}></LandingPageSection>
      </div>
    </>
  );
};

export default LandingPage;
