import React from "react";
import "../assets/styles/components/SLideshowCard.scss";
import CardTable from "./CardTable";
import { motion } from "framer-motion";
const SLideshowCard = ({ props, key }) => {
  const { image, data } = props;

  return (
      <motion.div
        className="slideshow_card_container"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ease: "easeInOut"}}
        key={key}
      >
        <div className="slideshow_card_container__left">
          <div className="slideshow_card_container__left__image_container">
            <img
              src={image}
              alt="house"
              className="slideshow_card_container__left__image_container__image"
            />
          </div>
        </div>
        <div className="slideshow_card_container__right">
          <div className="slideshow_card_container__right__title_container">
            <div className="slideshow_card_container__right__title_container__title">
              New arrivals
            </div>
          </div>{" "}
          <div className="slideshow_card_container__right__description">
            <div className="slideshow_card_container__right__description__table">
              <CardTable props={data}></CardTable>
            </div>
          </div>{" "}
          <div className="slideshow_card_container__right__price">
            <div className="slideshow_card_container__right__price__title">
              Price
            </div>
            <div className="slideshow_card_container__right__price__price">
              ₹ 1.5 Cr
            </div>
          </div>{" "}
        </div>
      </motion.div>
  );
};

export default SLideshowCard;
