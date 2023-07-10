import React, { useEffect, useRef } from "react";
import "../assets/styles/components/HouseCard.scss";
import CardTable from "./CardTable";
import { motion, useAnimation, useInView } from "framer-motion";

const HouseCard = ({ props }) => {
  const { image, data, title, address } = props;
  const refCard = useRef(null);
  const isInView = useInView(refCard, {once: true});
  const cardAnimateControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      cardAnimateControl.stop();
      cardAnimateControl.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 },
      });
    } else {
      cardAnimateControl.stop();
      cardAnimateControl.start({
        opacity: 0,
        x: -100,
      });
    }
  }, [isInView, cardAnimateControl]);
  return (
    <motion.div 
    className="house_card_container" 
    ref={refCard}
    animate={cardAnimateControl}
    initial={{opacity: 0, x: -100}}
    duration={0.5}
    >
      <div className="house_card_container__left">
        <div className="house_card_container__left__image_container">
          <img
            src={image}
            alt="house"
            className="house_card_container__left__image_container__image"
          />
        </div>
      </div>
      <div className="house_card_container__right">
        <div className="house_card_container__right__title_container">
          <div className="house_card_container__right__title_container__title">
            {title}
          </div>
          <div className="house_card_container__right__title_container__subtitle">
            {address}
          </div>
        </div>{" "}
        <div className="house_card_container__right__description">
          <div className="house_card_container__right__description__table">
            <CardTable props = {data}></CardTable>
          </div>
        </div>{" "}
        <div className="house_card_container__right__price">
          <div className="house_card_container__right__price__title">Price</div>
          <div className="house_card_container__right__price__price">
            ₹ 1.5 Cr
          </div>
        </div>{" "}
      </div>
    </motion.div>
  );
};

export default HouseCard;
