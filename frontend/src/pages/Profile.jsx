import React from "react";
import Appbar from "../components/Appbar";
import ProfileHead from "../components/profile/profilehead";
import ProfileManageTab from "../components/profile/manageTab";

const Profile = () => {
  return (
    <>
      <div style={{ backgroundColor: "#20242b" }}>
        <Appbar />
      </div>
      <ProfileHead />
      <ProfileManageTab />
    </>
  );
};

export default Profile;
