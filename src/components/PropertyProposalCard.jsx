import React, { useEffect, useRef } from "react";
import "../assets/styles/components/ProposalCard.scss";
import { motion, useAnimation, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PropertyProposalCard = ({ props, isMember }) => {
  const refCard = useRef(null);
  const refCardEnd = useRef(null);
  const isInView = useInView(refCard);
  const isInViewEnd = useInView(refCardEnd);
  const cardAnimateControl = useAnimation();

  const daoId = props.dao_id;
  const proposalId = props.issuer+'.'+props.pid;

  useEffect(() => {
    if (isInView) {
      cardAnimateControl.stop();
      cardAnimateControl.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 },
      });
    } else if (!isInViewEnd) {
      cardAnimateControl.stop();
      cardAnimateControl.start({
        opacity: 0,
        x: -100,
      });
    }
  }, [isInView, cardAnimateControl, isInViewEnd]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/dao/${daoId}/propertyProposal/${proposalId}`);
  };
  return (
    <>
      <motion.div
        className="proposal_card_container"
        ref={refCardEnd}
        animate={cardAnimateControl}
        initial={{ opacity: 0, x: -100 }}
        duration={0.5}
      >
        <div className="proposal_card_container__title">Property NFT</div>
        <div className="proposal_card_container__date">Value: {props.value}</div>
        <div className="proposal_card_container__description">
          <div className="proposal_card_container__description__title">
            Description
          </div>
          <div className="proposal_card_container__description__body">
            {props.description}
          </div>
          { isMember && <div className="proposal_card_container__description__button_container">
            <motion.button
              className="proposal_card_container__description__button_container__button"
              whileHover={{ scale: 1.1 }}
              ref={refCard}
              whileTap={{ scale: 0.9 }}
              onClick={handleClick}
            >
              View
            </motion.button>
          </div>}
        </div>
      </motion.div>
    </>
  );
};

export default PropertyProposalCard;
