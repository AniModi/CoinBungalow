import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";
import "../assets/styles/components/LandingPageSection.scss";
import { useNavigate } from 'react-router-dom';


const LandingPageSection = ({props}) => {
    const {title, body, img, url1, url2, text1, text2} = props;
    const navigate = useNavigate();
    const handleClick = (e) => {
      if(e.target.textContent === text1) {
        navigate(url1);
      }
      else navigate(url2);
    }
    const [style, setStyle] = useState({
        backgroundImage: `url(${img})`,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
    });
    useEffect(() => {
        setStyle({
            backgroundImage: `url(${img})`,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
        });
    }, [img]);
    const sectionRef = useRef(true);
    const isInViewSection = useInView(sectionRef);
  const sectionControl = useAnimation();

    useEffect(() => {
        if (isInViewSection) {
            sectionControl.stop();
            sectionControl.start({ opacity: 1, x: 0 });
        }
        if (!isInViewSection) {
            sectionControl.stop();
            sectionControl.start({ opacity: 0, x: 200 });
        }
    }, [isInViewSection, sectionControl]);
    return (
        <>
        <motion.div
          className="landing_page_section"
          initial={{ opacity: 0, x: 200 }}
          animate={sectionControl}
          transition={{ duration: 1 }}
        >
          <div className="landing_page_section__left">
            <div className="landing_page_section__left__title">
              {title}
            </div>
            <div className="landing_page_section__left__body">
                <div className="landing_page_section__left__body__text">
                    {body}
                </div>
                <div className="landing_page_section__left__body__btn_container">
                    <motion.button className="landing_page_section__left__body__btn_container__btn" onClick={handleClick} whileHover={{scale:1.1}} whileTap={{scale:0.9}}>{text1}</motion.button>
                    <motion.button className="landing_page_section__left__body__btn_container__btn" onClick={handleClick} whileHover={{scale:1.1}} whileTap={{scale:0.9}}>{text2}</motion.button>
                </div>
            </div>
          </div>
          <div className="landing_page_section__right">
            <div className="landing_page_section__right__circle">
              <div
                className="landing_page_section__right__circle__img"
                ref={sectionRef}
                style={style}
              ></div>
            </div>
          </div>
        </motion.div>
        </>
    );
}

export default LandingPageSection;