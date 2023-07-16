import React from "react";
import "../assets/styles/components/SLideshowCard.scss";
import CardTable from "./CardTable";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
const SLideshowCard = ({ props, key }) => {
  const { id, image, data } = props;
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const handleDetail = () => {
    console.log(pathname);
    if(pathname === "/buy-house" || pathname === "/buy-land") {
      navigate(`/buy/${id}`);
    }
    else if(pathname === "/sell-house" || pathname === "/sell-land" || pathname === "/my-nfts") {
      navigate(`/my-nfts/${id}`);
    }
    else if(pathname === "/lend") {
      navigate(`/lend/${id}`);
    }
  };
  return (
      <motion.div
        className="slideshow_card_container"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ease: "easeInOut"}}
        key={key}
        onClick={handleDetail}
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
              Value
            </div>
            <div className="slideshow_card_container__right__price__price">
              {props.value} MATIC
            </div>
          </div>{" "}
        </div>
      </motion.div>
  );
};

export default SLideshowCard;
