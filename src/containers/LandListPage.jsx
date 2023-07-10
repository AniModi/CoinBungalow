import React, { useEffect, useRef } from "react";
import "../assets/styles/containers/LandListPage.scss";
import Navbar from "../components/Navbar";
import HouseCard from "../components/HouseCard";
import { motion, useAnimation, useInView } from "framer-motion";

const LandListPage = () => {
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
    image: "https://img.freepik.com/free-photo/location-symbol-land-sale_23-2149764132.jpg?w=1060&t=st=1688985001~exp=1688985601~hmac=efcec615efbf73763456ca6af283df0185268f9697695b7ece13410d84001dc5",
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
      <div className="land_list_page_container">
        <motion.div
          className="land_list_page_container__banner"
          ref={refBanner}
          initial={{ opacity: 1 }}
          animate={bannerAnimateControl}
          transition={{ duration: 1 }}
        ></motion.div>
        <div className="land_list_page_container__searchbox_section">
          <div className="land_list_page_container__searchbox_section__searchbox">
            <input type="text" placeholder="Enter a location" />
          </div>
          <div className="land_list_page_container__searchbox_section__search_btn_container">
            <button>Search</button>
          </div>
        </div>
        <div className="land_list_page_container__house_list_section">
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

export default LandListPage;
