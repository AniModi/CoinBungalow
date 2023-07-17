import React from "react";
import "../assets/styles/components/Loader.scss";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
      Loading...
    </div>
  );
};

export default Loader;
