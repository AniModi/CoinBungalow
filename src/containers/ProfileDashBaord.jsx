import React from "react";
import "../assets/styles/containers/ProfileDashBoard.scss";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardBox from "../components/DashboardBox";
import { useEffect, useState } from "react";
import { getAccount, readContract, writeContract } from "wagmi/actions";
import { SbtAddress, SbtAbi } from "../constants";
import { Polybase } from "@polybase/client";
import Loader from "../components/Loader";

const db = new Polybase({
  defaultNamespace:
    "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/ProfileSBT",
});
const db_metadata = db.collection("SBTMetadata");

const ProfileDashBoard = () => {
  const [image, setImage] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const rows = [
    "Total NFTs",
    "Total Sales",
    "Total Purchases",
    "Borrowed",
    "Lent",
    "Credit Score",
  ];
  const cols = ["10", "10", "10", "10", "10", creditScore];
  const [profileMinted, setProfileMinted] = useState(false);

  useEffect(() => {
    async function getSBT() {
      if (profileMinted) return;
      const account = getAccount();
      const isMinted = await readContract({
        abi: SbtAbi,
        address: SbtAddress,
        functionName: "isMinted",
        args: [account.address],
      });
      // console.log(isMinted, profileMinted); return;
      if (isMinted) {
        const recordId = SbtAddress + account.address;
        const { data } = await db_metadata.record(recordId).get();
        if (data === null) return;
        setImage(data.image);
        setCreditScore(data.creditScore);
        setIsLoading(false);
        return;
      }
      const imageId = Math.floor(Math.random() * 39) + 1;
      const recordId = SbtAddress + account.address;
      const url = `https://beige-asleep-chinchilla-881.mypinata.cloud/ipfs/QmfFJZEfRJFf5auRT1PfjKWukmsHgwDxcv8FCeMaUB4ck5/${imageId}.png`;
      try {
        await db_metadata.create([recordId, "700", url]);
      } catch (e) {
        console.log(e);
      }
      setProfileMinted(true);
      try {
        await writeContract({
          address: SbtAddress,
          abi: SbtAbi,
          functionName: "mint",
          args: [account.address],
        });
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }
    getSBT();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      {isLoading === true ? (
        <Loader></Loader>
      ) : (
        <>
          <Sidebar></Sidebar>
          <div className="profile_dashboard_container">
            <div className="profile_dashboard_container__top">
              <div className="profile_dashboard_container__top__items">
                <DashboardBox type="Loans Applied" amount="1000"></DashboardBox>
              </div>
              <div className="profile_dashboard_container__top__items">
                <DashboardBox
                  type="Loans sanctioned"
                  amount="1000"
                ></DashboardBox>
              </div>
              <div className="profile_dashboard_container__top__items">
                <DashboardBox
                  type="Properties Listed"
                  amount="1000"
                ></DashboardBox>
              </div>
              <div className="profile_dashboard_container__top__items">
                <DashboardBox
                  type="Properties sold"
                  amount="1000"
                ></DashboardBox>
              </div>
            </div>
            <div className="profile_dashboard_container__profile_container">
              <div className="profile_dashboard_container__profile_container__title">
                Profile
              </div>
              <div className="profile_dashboard_container__profile_container__main">
                <div className="profile_dashboard_container__profile_container__main__image__container">
                  <img
                    src={image.slice(0, 103) + "1.png"}
                    alt="profile"
                    className="profile_dashboard_container__profile_container__main__image"
                  />
                </div>
                <div className="profile_dashboard_container__profile_container__main__info">
                  <div className="profile_dashboard_container__profile_container__main__info__table">
                    <div className="profile_dashboard_container__profile_container__main__info__table__rows">
                      {rows.map((row, index) => {
                        return (
                          <div
                            className="profile_dashboard_container__profile_container__main__info__table__rows__entry"
                            key={index}
                          >
                            {row}
                          </div>
                        );
                      })}
                    </div>
                    <div className="profile_dashboard_container__profile_container__main__info__table__cols">
                      {cols.map((col, index) => {
                        return (
                          <div
                            className="profile_dashboard_container__profile_container__main__info__table__cols__entry"
                            key={index}
                          >
                            {col}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileDashBoard;
