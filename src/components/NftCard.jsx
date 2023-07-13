import React, { useEffect, useRef } from 'react';
import '../assets/styles/components/NftCard.scss';
import CardTable2 from './CardTable2';
import { useAnimation, useInView, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const NftCard = ({props}) => {
    const {image, data} = props;
    const refCard = useRef(null);
  const refCardEnd = useRef(null);
  const isInView = useInView(refCard);
  const isInViewEnd = useInView(refCardEnd);
  const cardAnimateControl = useAnimation();
  useEffect(() => {
    if (isInView) {
      cardAnimateControl.stop();
      cardAnimateControl.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 },
      });
    } else if(!isInViewEnd) {
      cardAnimateControl.stop();
      cardAnimateControl.start({
        opacity: 0,
        x: -100,
      });
    }
  },[isInView, cardAnimateControl, isInViewEnd] );

  const {pathname} = useLocation();
  const navigate = useNavigate();

  const handleDetail = () => {
    console.log(pathname);
    if(pathname === "/buy-house" || pathname === "/buy-land") {
      navigate("/buy/:id");
    }
    else if(pathname === "/sell-house" || pathname === "/sell-land" || pathname === "/my-nfts") {
      navigate("/my-nfts/:id");
    }
    else if(pathname === "/lend") {
      navigate("/lend/:id");
    }
  };

    return (
        <motion.div className='nft_card_container' ref={refCardEnd}
        initial={{ opacity: 0, x: -100 }}
        animate={cardAnimateControl}
        duration={0.5}
        onClick={handleDetail}
        >
            <div className='nft_card_container__image_container'>
                <img src={image} alt='nft card' className='nft_card_container__image_container__image'></img>
            </div>
            <div className='nft_card_container__info_container' ref={refCard}>
                <CardTable2 props = {data}></CardTable2>
            </div>
        </motion.div>
    );
};

export default NftCard;