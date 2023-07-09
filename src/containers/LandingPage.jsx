import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import "../assets/styles/containers/LandingPage.scss";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const refProperty = useRef(null);
  const refFinance = useRef(null);
  const refBanner = useRef(true);
  const isInViewProperty = useInView(refProperty);
  const isInViewFinance = useInView(refFinance);
  const isInViewBanner = useInView(refBanner);
  const propertyAnimateControl = useAnimation();
  const financeAnimateControl = useAnimation();
  const bannerAnimateControl = useAnimation();
  useEffect(() => {
    if (isInViewProperty) {
      propertyAnimateControl.stop();
      propertyAnimateControl.start({ opacity: 1, y: 0 });
    }
    if (!isInViewProperty) {
      propertyAnimateControl.stop();
      propertyAnimateControl.start({ opacity: 0, y: 200 });
    }
    if (isInViewFinance) {
      financeAnimateControl.stop();
      financeAnimateControl.start({ opacity: 1, y: 0 });
    }
    if (!isInViewFinance) {
      financeAnimateControl.stop();
      financeAnimateControl.start({ opacity: 0, y: 200 });
    }
    if (isInViewBanner) {
      bannerAnimateControl.stop();
      bannerAnimateControl.start({ opacity: 1, y: 0 });
    }
    if (!isInViewBanner) {
      bannerAnimateControl.stop();
      bannerAnimateControl.start({ opacity: 0, y: -200 });
    }
  }, [isInViewProperty, isInViewFinance, isInViewBanner, propertyAnimateControl, financeAnimateControl, bannerAnimateControl]);
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
        <motion.div
          className="landing_page_container__properties"
          initial={{ opacity: 0, y: 200 }}
          animate={propertyAnimateControl}
          transition={{ duration: 1 }}
        >
          <div className="landing_page_container__properties__left">
            <div className="landing_page_container__properties__left__title">
              Want to deal in properties?
            </div>
            <div className="landing_page_container__properties__left__body">
                <div className="landing_page_container__properties__left__body__text">
                    Well, we got you covered!
                </div>
                <div className="landing_page_container__properties__left__body__btn_container">
                    <button className="landing_page_container__properties__left__body__btn_container__btn">Explore properties</button>
                    <button className="landing_page_container__properties__left__body__btn_container__btn">List properties</button>
                </div>
            </div>
          </div>
          <div className="landing_page_container__properties__right">
            <div className="landing_page_container__properties__right__circle">
              <div
                className="landing_page_container__properties__right__circle__img"
                ref={refProperty}
              ></div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="landing_page_container__finance"
          initial={{ opacity: 0, y: 200 }}
          animate={financeAnimateControl}
          transition={{ duration: 1 }}
        >
          <div className="landing_page_container__finance__left">
            <div className="landing_page_container__finance__left__circle">
              <div
                className="landing_page_container__finance__left__circle__img"
                ref={refFinance}
              ></div>
            </div>
          </div>
          <div className="landing_page_container__finance__right">
          <div className="landing_page_container__finance__right__title">
              Want to deal in properties?
            </div>
            <div className="landing_page_container__finance__right__body">
                <div className="landing_page_container__finance__right__body__text">
                    Well, we got you covered!
                </div>
                <div className="landing_page_container__finance__right__body__btn_container">
                    <button className="landing_page_container__finance__right__body__btn_container__btn">Explore properties</button>
                    <button className="landing_page_container__finance__right__body__btn_container__btn">List properties</button>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LandingPage;
