import React, { useState } from "react";
import Appbar from "../components/Appbar";
import { Col, Row } from "react-bootstrap";
import Card from "../components/Card";

const ProfileHead = () => {
  return (
    <Row>
      <Col
        className="d-flex justify-content-center align-items-center mt-5"
        md={4}
      >
        <div
          className="border rounded-circle overflow-hidden"
          style={{ height: "250px", width: "250px" }}
        >
          <img
            src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
            alt=""
            width="100%"
            height="100%"
          />
        </div>
      </Col>
      <Col className="mt-5" md={8}>
        <h4>Name</h4>
        <h6>Email</h6>
      </Col>
    </Row>
  );
};

// temp create event comp
const TempCreateEvent = () => {
  return <div>temp create Event</div>;
};

const ProfileManageTab = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  //temp data
  const tabMenu = ["Bookings", "Add Program"];
  const tabMenuDispComp = [<Card ticket={true} />, <TempCreateEvent />];

  return (
    <>
      <div
        className="mt-5 d-flex flex-wrap pt-3 px-5"
        style={{ backgroundColor: "#20242b" }}
      >
        {tabMenu.map((tab, index) => (
          <button
            key={index}
            className="btn text-light me-4 mb-3"
            style={
              selectedTabIndex == index ? { borderBottom: "1px solid" } : {}
            }
            onClick={() => setSelectedTabIndex(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabMenuDispComp.map((comp, index) => (
        <div key={index} style={{ backgroundColor: "#20242b" }} className="p-5">
          {selectedTabIndex === index && comp}
        </div>
      ))}
    </>
  );
};

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
