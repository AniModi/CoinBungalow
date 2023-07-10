import React, { useEffect, useRef } from "react";
import "../assets/styles/containers/HouseListPage.scss";
import Navbar from "../components/Navbar";
import HouseCard from "../components/HouseCard";
import { motion, useAnimation, useInView } from "framer-motion";

const HouseListPage = () => {
  const refBanner = useRef(true);
  const isInViewBanner = useInView(refBanner);
  const bannerAnimateControl = useAnimation();
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

  const props = {
    image: "https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=1380&t=st=1688985038~exp=1688985638~hmac=e07c8fd49bea88bb8dd3df993178ec1c2b9c9c434df44392629f40e5dc2b4bb4",
    title: "House",
    address: "1234 Street",
    data: {
      rows: ["Bedrooms", "Bathrooms", "Area"],
      columns: ["3", "2", "2000 sqft"],
    },
  };
  return (
    <>
      <Navbar />
      <div className="house_list_page_container">
        <motion.div
          className="house_list_page_container__banner"
          ref={refBanner}
          initial={{ opacity: 1 }}
          animate={bannerAnimateControl}
          transition={{ duration: 1 }}
        ></motion.div>
        <div className="house_list_page_container__searchbox_section">
          <div className="house_list_page_container__searchbox_section__searchbox">
            <input type="text" placeholder="Enter a location" />
          </div>
          <div className="house_list_page_container__searchbox_section__search_btn_container">
            <button>Search</button>
          </div>
        </div>
        <div className="house_list_page_container__house_list_section">
          <HouseCard props={props}></HouseCard>
          <HouseCard props={props}></HouseCard>
          <HouseCard props={props}></HouseCard>
          <HouseCard props={props}></HouseCard>
          <HouseCard props={props}></HouseCard>
          <HouseCard props={props}></HouseCard>
          <HouseCard props={props}></HouseCard>
          <HouseCard props={props}></HouseCard>
          <HouseCard props={props}></HouseCard>
          <HouseCard props={props}></HouseCard>
          <HouseCard props={props}></HouseCard>
        </div>
      </div>
    </>
  );
};

export default HouseListPage;
