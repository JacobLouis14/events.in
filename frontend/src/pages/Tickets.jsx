import React from "react";
import Appbar from "../components/Appbar";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Card from "../components/Card";

// Filter Section
const TicketFilterSection = () => {
  return (
    <div style={{ paddingTop: "100px", overflow: "hidden" }}>
      {/* filterContainer */}
      <Row
        className="d-flex justify-content-between px-4"
        style={{ minHeight: "160px", backgroundColor: "#edf2f4" }}
      >
        <Col md={10}>
          <Row className="d-flex align-items-center h-100">
            {/* Category div */}
            <Col
              md={4}
              className="d-flex align-items-end"
              style={{ height: "50px" }}
            >
              <h6 className="me-3">Category:</h6>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
            {/* Price div */}
            <Col
              md={4}
              className="d-flex align-items-end"
              style={{ height: "50px" }}
            >
              <h6 className="me-3">Price:</h6>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
            {/* Sort div */}
            <Col
              md={4}
              className="d-flex align-items-end"
              style={{ height: "50px" }}
            >
              <h6 className="me-3">Sort:</h6>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
        {/* Apply button */}
        <Col
          md={2}
          className="h-md-100 mt-4 mt-md-0 d-flex justify-content-center"
        >
          <button
            className="btn rounded-0 text-light fw-bold h-md-100"
            style={{ backgroundColor: "#d90429", width: "110px" }}
          >
            Apply
          </button>
        </Col>
      </Row>
    </div>
  );
};

const TicketCardSection = () => {
  return (
    <div className="py-5 ps-3">
      <Row>
        <Col
          className="d-flex justify-content-center align-items-center"
          md={4}
          sm={6}
          xl={3}
        >
          <Card />
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center"
          md={4}
          sm={6}
          xl={3}
        >
          <Card />
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center"
          md={4}
          sm={6}
          xl={3}
        >
          <Card />
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center"
          md={4}
          sm={6}
          xl={3}
        >
          <Card />
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center"
          md={4}
          sm={6}
          xl={3}
        >
          <Card />
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center"
          md={4}
          sm={6}
          xl={3}
        >
          <Card />
        </Col>
      </Row>
    </div>
  );
};

const Tickets = () => {
  return (
    <div style={{ backgroundColor: "#20242b", minHeight: "100vh" }}>
      <Appbar />
      <TicketFilterSection />
      <TicketCardSection />
    </div>
  );
};

export default Tickets;
