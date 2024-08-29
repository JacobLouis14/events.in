import { Divider } from "@mui/material";
import React from "react";
import { Col, Modal, Row } from "react-bootstrap";

const Ticket = ({ show, handleClose }) => {
  return (
    <div>
      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-5">
          <div className="shadow p-3 rounded-3">
            <Row>
              <Col className="mb-4">
                <img
                  src="https://pbs.twimg.com/media/Dz1I9IlUYAAOG2x.jpg"
                  alt=""
                  width="110px"
                  height="150px"
                />
              </Col>
              <Col>
                <h6>Surnburn festival 2024</h6>
                <p className="mb-1">06/02/24 | 06:30</p>
                <p className="mb-1">stadium : kottayam</p>
                <h6>2 - tickets | Vip</h6>
                <h6>350 ₹</h6>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Ticket;
