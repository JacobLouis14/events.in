import React from "react";
import "../../pages/home/home.css";
import { Col, Row } from "react-bootstrap";
import { localiseDate } from "../../utils/formatDate";

const LandingCarousel = ({ caourosel }) => {
  return (
    <div className="carosel-Container" draggable={false}>
      <div className="darkOverly"></div>
      <img
        className="w-100 h-100"
        style={{ objectFit: "cover" }}
        src={caourosel?.banner?.url}
      />
      <div className="carouselDetailContainer">
        <Row className="text-light">
          <Col md={6} className="col-wrapper">
            <div className="nameWrapper">
              <h4 className="mb-0">{caourosel?.title}</h4>
              <p className="mb-0">{localiseDate(caourosel?.startdate)}</p>
              <p>{caourosel?.category}</p>
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex flex-column align-items-end col-wrapper detail-container"
          >
            <button className="btn mb-4 rounded-1">Book Now</button>
            <p className="text-md-end">{caourosel?.desc}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LandingCarousel;
