import React from "react";
import "../assets/styles/components/DashboardBox.scss";
import {FaUniversity, FaMoneyCheckAlt, FaHome,FaDollarSign} from "react-icons/fa";

const DashboardBox = ({ type, amount }) => {
  const icons = {
    "Loans Applied": <FaUniversity />,
    "Loans sanctioned": <FaMoneyCheckAlt />,
    "Properties Listed": <FaHome />,
    "Properties sold": <FaDollarSign />,
  };
  return (
    <div className="dashboard_box_container">
      <div className="dashboard_box_container__box_left">
        <div className="inner_box">
          {icons[type]}
        </div>
      </div>
      <div className="dashboard_box_container__box_right">
        <div className="box_type">
          <p>{type}</p>
        </div>
        <div className="box_amount">
          <p>{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardBox;
