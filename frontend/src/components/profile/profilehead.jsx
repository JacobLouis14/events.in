import React from "react";
import { Col, Row } from "react-bootstrap";
import LogOutBtn from "../auth/logout";

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
        <LogOutBtn />
      </Col>
    </Row>
  );
};

export default ProfileHead;
