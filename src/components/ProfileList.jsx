import React from "react";
import "../assets/styles/components/ProfileList.scss";
import ProfileListItem from "./ProfileListItem";

const ProfileList = ({data, header}) => {
  return (
    <>
      <div className="profile_list_container">
        <div className="profile_list_container__header">
          <div className="profile_list_container__header__title">Listed Properties</div>
        </div>
        <div className="profile_list_container__list">
          <div className="profile_list_container__list__header">
            <ProfileListItem props = {header} index = {-1}></ProfileListItem>
          </div>
          <div className="profile_list_container__list__item">
            {data.map((item, index) => {
              return (
                <ProfileListItem props = {item} index = {index}></ProfileListItem>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileList;
