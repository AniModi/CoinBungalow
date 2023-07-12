import React, { useEffect, useState } from "react";
import "../assets/styles/components/Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("navbar_container__menu__hide");
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .enable()
        .then(() => {
          setIsConnected(true);
        })
        .catch(() => {
          setIsConnected(false);
        });
    } else {
      setIsConnected(false);
    }
  }, [isConnected]);
  const connect = () => {
    console.log("Connect clicked");
  };
  const handleMenu = () => {
    if (menu === "navbar_container__menu__hide")
      setMenu("navbar_container__menu");
    else setMenu("navbar_container__menu__hide");
    console.log("Menu clicked");
  };
  return (
    <>
      <div className="navbar_container">
        <div className="navbar_container__left" onClick={handleMenu}>
          Menu
        </div>
        <div className="navbar_container__right">
          {isConnected ? (
            <div className="navbar_container__right__connected">
              Connected!
            </div>
          ) : (
            <div
              className="navbar_container__right__disconnected"
              onClick={connect}
            >
              Connect
            </div>
          )}
        </div>
        <div className={menu}>
          <div className="navbar_container__menu__content">
            <Link
              className="navbar_container__menu__content__item"
              to={"/my-nfts"}
              onClick={handleMenu}
            >
              My NFTs
            </Link>
            <Link
              className="navbar_container__menu__content__item"
              to={"/add-nft"}
              onClick={handleMenu}
            >
              Add NFT
            </Link>
            <Link
              className="navbar_container__menu__content__item"
              to={"/buy-house"}
              onClick={handleMenu}
            >
              Buy House
            </Link>
            <Link
              className="navbar_container__menu__content__item"
              to={"/sell-house"}
              onClick={handleMenu}
            >
              Sell House
            </Link>
            <Link
              className="navbar_container__menu__content__item"
              to={"/buy-land"}
              onClick={handleMenu}
            >
              Buy Land
            </Link>
            <Link
              className="navbar_container__menu__content__item"
              to={"/sell-land"}
              onClick={handleMenu}
            >
              Sell Land
            </Link>
            <Link
              className="navbar_container__menu__content__item"
              to={"/lend"}
              onClick={handleMenu}
            >
              Lend Money
            </Link>
            <Link
              className="navbar_container__menu__content__item"
              to={"/borrow"}
              onClick={handleMenu}
            >
              Borrow Money
            </Link>
            <Link
              className="navbar_container__menu__content__item"
              to={"/my-profile"}
              onClick={handleMenu}
            >
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
