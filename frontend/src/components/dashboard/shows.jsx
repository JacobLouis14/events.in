import React, { useEffect, useState } from "react";
import "../../pages/dash/dashboard.css";
import { Col, Row } from "react-bootstrap";
import ShowLandscapeCard from "../../components/ShowLandscapeCard";
import AddShowModal from "./showModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsApiHandler } from "../../services/allapis";

const ShowsDashboard = () => {
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const addShowModalOpen = () => setShowAddModal(true);
  const addShowModalClose = () => setShowAddModal(false);
  const { events, isLoading, error } = useSelector((state) => state.events);

  // retriving shows list
  useEffect(() => {
    dispatch(getAllEventsApiHandler());
  }, [dispatch]);

  return (
    <div className="">
      <div className="action-bar pt-5">
        <Row className="w-100 d-flex justify-content-center h-100">
          <Col className="mb-4 h-100 " md={10}>
            <div className="search-container mb-4 d-flex">
              <input
                className="form-control"
                type="text"
                placeholder="search"
              />
              <button className="btn btn-light ms-2">Search</button>
            </div>
          </Col>
          <Col className="d-flex justify-content-center h-100" md={2}>
            <button
              className="btn btn-danger ms-5"
              onClick={() => addShowModalOpen()}
            >
              Add Shows
            </button>
          </Col>
        </Row>
      </div>
      <div className="shows-list-container">
        {isLoading && <p className="text-light">Loading</p>}
        {!isLoading && events && (
          <Row className="w-100">
            {events?.map((event, index) => (
              <Col className="d-flex justify-content-center" md={4} key={index}>
                <div className="card-wrapper">
                  <ShowLandscapeCard event={event} />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <AddShowModal show={showAddModal} handleClose={addShowModalClose} />
    </div>
  );
};

export default ShowsDashboard;
