import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsApiHandler } from "../../services/allapis";

const TicketCardSection = () => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEventsApiHandler());
  }, [dispatch]);

  return (
    <div className="py-5 px-3">
      {isLoading && <p className="text-light">Loading</p>}
      {!isLoading && events && (
        <Row>
          {events?.map((event, index) => (
            <Col
              className="d-flex justify-content-center align-items-center"
              md={4}
              sm={6}
              xl={3}
              key={index}
            >
              <Card event={event} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default TicketCardSection;
