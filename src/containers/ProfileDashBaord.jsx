import React from "react";
import "../assets/styles/containers/ProfileDashBoard.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardBox from "../components/DashboardBox";

const ProfileDashBoard = () => {
    const image =  "https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=1380&t=st=1688985038~exp=1688985638~hmac=e07c8fd49bea88bb8dd3df993178ec1c2b9c9c434df44392629f40e5dc2b4bb4";

    const rows = ["Name", "Total NFTs", "Total Sales", "Total Purchases", "Borrowed", "Lent", "Credit Score"];
    const cols = ["Alex", "10", "10", "10", "10", "10", "10"];

  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="profile_dashboard_container">
        <div className="profile_dashboard_container__top">
          <div className="profile_dashboard_container__top__items">
            <DashboardBox type="Loans Applied" amount="1000"></DashboardBox>
          </div>
          <div className="profile_dashboard_container__top__items">
            <DashboardBox type="Loans sanctioned" amount="1000"></DashboardBox>
          </div>
          <div className="profile_dashboard_container__top__items">
            <DashboardBox type="Properties Listed" amount="1000"></DashboardBox>
          </div>
          <div className="profile_dashboard_container__top__items">
            <DashboardBox type="Properties sold" amount="1000"></DashboardBox>
          </div>
        </div>
        <div className="profile_dashboard_container__profile_container">
            <div className="profile_dashboard_container__profile_container__title">Profile</div>
            <div className="profile_dashboard_container__profile_container__main">
                <div className="profile_dashboard_container__profile_container__main__image__container">
                    <img src = {image} alt="profile" className="profile_dashboard_container__profile_container__main__image" />
                </div>
                <div className="profile_dashboard_container__profile_container__main__info">
                    <div className="profile_dashboard_container__profile_container__main__info__table">
                        <div className="profile_dashboard_container__profile_container__main__info__table__rows">
                            {rows.map((row, index) => {
                                return <div className="profile_dashboard_container__profile_container__main__info__table__rows__entry" key={index}>{row}</div>
                            })}
                        </div>
                        <div className="profile_dashboard_container__profile_container__main__info__table__cols">
                            {cols.map((col, index) => {
                                return <div className="profile_dashboard_container__profile_container__main__info__table__cols__entry" key={index}>{col}</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDashBoard;
