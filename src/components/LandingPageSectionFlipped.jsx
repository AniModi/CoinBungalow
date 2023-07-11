import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";
import "../assets/styles/components/LandingPageSectionFlipped.scss";
import { Link } from 'react-router-dom';


const LandingPageSectionFlipped = ({props}) => {
    const {title, body, img, url1, url2, text1, text2} = props;
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
          className="landing_page_section_flipped"
          initial={{ opacity: 0, x: 200 }}
          animate={sectionControl}
          transition={{ duration: 1 }}
        >
          
          <div className="landing_page_section__right">
            <div className="landing_page_section__right__circle">
              <div
                className="landing_page_section__right__circle__img"
                ref={sectionRef}
                style={style}
              ></div>
            </div>
          </div>
          <div className="landing_page_section__left">
            <div className="landing_page_section__left__title">
              {title}
            </div>
            <div className="landing_page_section__left__body">
                <div className="landing_page_section__left__body__text">
                    {body}
                </div>
                <div className="landing_page_section__left__body__btn_container">
                    <Link className="landing_page_section__left__body__btn_container__btn" to = {url1}>{text1}</Link>
                    <Link className="landing_page_section__left__body__btn_container__btn" to={url2}>{text2}</Link>
                </div>
            </div>
          </div>
        </motion.div>
        </>
    );
}

export default LandingPageSectionFlipped;