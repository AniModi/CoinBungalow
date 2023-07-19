import React, { useEffect, useRef } from "react";
import "../assets/styles/components/LandingPageSectionDao.scss";
import { motion, useAnimation, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPageSectionDao = () => {
  const refSubtitle = useRef(true);
  const isInViewSubtitle = useInView(refSubtitle);
  const subtitleAnimationControl = useAnimation();
  const refBanner = useRef(true);
  const isInViewBanner = useInView(refBanner);
  const bannerAnimateControl = useAnimation();
  useEffect(() => {
    if (isInViewSubtitle) {
      subtitleAnimationControl.stop();
      subtitleAnimationControl.start({
        width: "0%",
      });
    } else {
      subtitleAnimationControl.stop();
      subtitleAnimationControl.start({
        width: "100%",
      });
    }
  }, [refSubtitle, isInViewSubtitle, subtitleAnimationControl]);
  useEffect(() => {
    if (isInViewBanner) {
      bannerAnimateControl.stop();
      bannerAnimateControl.start({ opacity: 1, x: 0 });
    }
    if (!isInViewBanner) {
      bannerAnimateControl.stop();
      bannerAnimateControl.start({ opacity: 0, x: "-100%" });
    }
  }, [isInViewBanner, bannerAnimateControl]);

  const navigate = useNavigate()
  const onClick = () => {
    navigate("/dao");
  }
  return (
    <>
      <div className="landing_page_section_dao_container">
        <motion.div
          className="landing_page_section_dao_container__banner"
          initial={{ opacity: 1 }}
          animate={bannerAnimateControl}
          ref={refBanner}
          transition={{ duration: 0.2 }}
        ></motion.div>
        <div className="landing_page_section_dao_container__text">
          <div
            className="landing_page_section_dao_container__text__title"
          >
            Explore the DAO Ecosystem
            <motion.div
              className="landing_page_section_dao_container__text__title__fill"
              initial={{ width: "100%" }}
              animate={subtitleAnimationControl}
              transition={{ duration: 0.2 }}
            ></motion.div>
          </div>
          <div
            className="landing_page_section_dao_container__text__subtitle"
            ref={refSubtitle}
          >
            Discover the Power of Decentralized Autonomous Organization
            <motion.div
              className="landing_page_section_dao_container__text__subtitle__fill"
              initial={{ width: "100%" }}
              animate={subtitleAnimationControl}
              transition={{ duration: 0.2 }}
            ></motion.div>
          </div>
          <div className="landing_page_section_dao_container__text__body">
            <div className="landing_page_section_dao_container__text__body__left">
              Experience the inclusive and transparent nature of our DAO, where
              every voice matters. Get a glimpse of the innovative ideas and
              community-driven projects that emerge from this collaborative
              ecosystem.
            </div>
            <div className="landing_page_section_dao_container__text__body__right">
              <motion.button
                className="landing_page_section_dao_container__text__body__right__button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClick}
              >
                Explore DAO
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPageSectionDao;
