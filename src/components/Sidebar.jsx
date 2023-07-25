import React, { useEffect, useState } from "react";
import "../assets/styles/components/Sidebar.scss";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState([
    {
      className: "sidebar_container__items",
      to: "/profile/dashboard",
      text: "Dashboard",
      active: false,
    },
    {
      className: "sidebar_container__items",
      to: "/profile/offers",
      text: "Offer",
      active: false,
    },
    {
      className: "sidebar_container__items",
      to: "/profile/pending-loans",
      text: "Loans",
      active: false,
    },
    {
      className: "sidebar_container__items",
      to: "/profile/loan-actions",
      text: "Loan Actions",
      active: false,
    },
    {
      className: "sidebar_container__items",
      to: "/profile/property-actions",
      text: "Property Actions",
      active: false,
    },
  ]);
  const { pathname } = useLocation();
  useEffect(() => {
    setActive((prev) => {
      return prev.map((item) => {
        if (item.to === pathname) {
          return { ...item, active: true };
        } else {
          return { ...item, active: false };
        }
      });
    });
  }, [pathname]);
  return (
    <div className="sidebar_container">
      {active.map((item, index) => {
        return (
          <Link
            key={index}
            to={item.to}
            className={
              item.active ? item.className + "_active" : item.className
            }
          >
            {item.text}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
