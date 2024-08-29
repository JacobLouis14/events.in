import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#20242b" }}>
      <Row className="d-flex align-items-end">
        <Col md={6} className="py-4 px-5 text-light">
          <h3 style={{ fontFamily: "Jomhuria", fontSize: "60px" }}>About</h3>
          <p style={{ fontFamily: "Jomolhari" }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            odio labore, sint incidunt fugit accusantium, fugiat ut voluptate
            expedita autem eum iure dolores porro doloribus nulla assumenda
            aliquam ipsa mollitia Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quod velit explicabo quasi ullam reiciendis
            consequuntur nihil deleniti veniam quas aliquid, laborum expedita
            nulla delectus, facere eveniet sit nostrum, perspiciatis sed!
          </p>
        </Col>
        <Col md={6} className="py-4 px-5">
          <FloatingLabel controlId="floatingTextarea2" label="Leave a message">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
            />
            <div className="mt-4 d-flex">
              <button className="btn btn-danger w-25 me-4">Send</button>
              <div className="ms-auto">
                <FontAwesomeIcon
                  icon={faFacebook}
                  size="2xl"
                  style={{ color: "#ffffff" }}
                  className="me-3"
                />
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="2xl"
                  style={{ color: "#ffffff" }}
                />
              </div>
            </div>
          </FloatingLabel>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
