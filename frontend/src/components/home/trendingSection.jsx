import React from "react";
import "../../pages/home/home.css";
import { Col, Row } from "react-bootstrap";
import Card from "../../components/Card";

const TrendingSection = ({ tevents }) => {
  return (
    <div>
      <div className="trendingHeader">
        <h3 style={{ fontSize: "70px" }}>Trending Now</h3>
      </div>
      <div className="trendingBody ps-5 py-5 d-flex align-items-center">
        <Row className="w-100">
          {tevents?.map((event, index) => (
            <Col
              md={4}
              sm={6}
              lg={3}
              className="d-flex justify-content-center align-items-center"
              key={index}
            >
              <Card event={event} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TrendingSection;
