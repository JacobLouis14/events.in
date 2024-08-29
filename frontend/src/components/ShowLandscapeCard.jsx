import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteEventApiHandler } from "../services/allapis";
import { localiseDate } from "../utils/formatDate";

// admin shows details modal
const DetailModal = ({ event, show, handleClose }) => {
  return (
    <Modal show={show} size="xl" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5} className="d-flex flex-column">
            <p>Poster</p>
            <img src={event?.poster.url} alt="" height="80%" />
            <p>Banner</p>
            <img
              src={event?.banner.url}
              alt=""
              style={{ maxHeight: "300px" }}
              width="100%"
            />
          </Col>
          <Col md={7}>
            <div>
              <p className="ms-2 mb-0">Title:</p>
              <p
                className="ms-2 mt-2 fw-bold"
                style={{ wordWrap: "break-word", fontFamily: "Kodchasan" }}
              >
                {event?.title}
              </p>
              {/* break */}
              <p className="ms-2 mb-0">Category:</p>
              <p
                className="ms-2 mt-2 fw-bold"
                style={{ wordWrap: "break-word", fontFamily: "Kodchasan" }}
              >
                {event?.category}
              </p>
              {/* break */}
              <p className="ms-2 mb-0">Description:</p>
              <p
                className="ms-2 mt-2 fw-bold"
                style={{ wordWrap: "break-word", fontFamily: "Kodchasan" }}
              >
                {event?.desc}
              </p>
              {/* break */}
              <p className="ms-2 mb-0">Startdate:</p>
              <p
                className="ms-2 mt-2 fw-bold"
                style={{ wordWrap: "break-word", fontFamily: "Kodchasan" }}
              >
                {localiseDate(event?.startdate)}
              </p>
              {/* break */}
              {event?.enddate && (
                <>
                  <p className="ms-2 mb-0">Enddate:</p>
                  <p
                    className="ms-2 mt-2 fw-bold"
                    style={{ wordWrap: "break-word", fontFamily: "Kodchasan" }}
                  >
                    {localiseDate(event?.enddate)}
                  </p>
                </>
              )}
              {/* break */}
              <p className="ms-2 mb-1">Tickets:</p>
              {event?.tickets.map((ticket, index) => (
                <div className="d-flex ms-4" key={index}>
                  <div className="d-inline-block me-3">
                    <p className="ms-2 mb-0">
                      type:
                      <span className="ms-2 fw-semibold">{ticket.type}</span>
                    </p>
                  </div>
                  <div className="d-inline-block me-3">
                    <p className="ms-2 mb-0">
                      price:
                      <span className="ms-2 fw-semibold">{ticket.price}</span>
                    </p>
                  </div>
                  <div className="d-inline-block">
                    <p className="ms-2 mb-0">
                      qty:
                      <span className="ms-2 fw-semibold">
                        {ticket.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

// admin shows edit modal
const EditModal = ({ show, handleClose }) => {
  const [ticketType, setTicketType] = useState({
    type: "",
    quantity: "",
    price: "",
  });
  const [createdTickets, setCreatedTickets] = useState([]);
  const [eventData, setEventData] = useState({
    title: "",
    desc: "",
    startdate: "",
    enddate: "",
    ticketTypes: [],
    poster: "",
    banner: "",
    category: "",
  });
  const [posterpreview, setPosterPreview] = useState("");
  const [bannerpreview, setBannerPreview] = useState("");

  const category = ["Comedy", "clubs/pubs", "Social"];

  // ticket type Adding
  const AddTicketTypeHandler = () => {
    setCreatedTickets([...createdTickets, ticketType]);
    setTicketType({
      type: "",
      quantity: "",
      price: "",
    });
  };

  // poster image handler
  const handlePosterImageUpload = (e) => {
    const file = e.target.files[0];
    setEventData({ ...eventData, poster: file });
  };

  // Banner image handler
  const handleBannerImageUpload = (e) => {
    const file = e.target.files[0];
    setEventData({ ...eventData, banner: file });
  };

  // Event Add HAndler
  const eventAddApiHandler = () => {
    eventData.ticketTypes = createdTickets;
    console.log(eventData);
  };

  // cancel Handler
  const eventCancelHandler = () => {
    setEventData({
      title: "",
      desc: "",
      startdate: "",
      enddate: "",
      ticketTypes: [],
      poster: "",
      banner: "",
      category: "",
    });
    setBannerPreview("");
    setPosterPreview("");
    setCreatedTickets([]);
    setTicketType({ type: "", quantity: "", price: "" });
  };

  useEffect(() => {
    if (eventData.poster) {
      setPosterPreview(URL.createObjectURL(eventData.poster));
    }
    if (eventData.banner) {
      setBannerPreview(URL.createObjectURL(eventData.banner));
    }
  }, [eventData.poster, eventData.banner]);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        eventCancelHandler(), handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Shows</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="title"
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
          />
          <textarea
            name=""
            id=""
            placeholder="description"
            className="form-control mb-3"
            value={eventData.desc}
            onChange={(e) =>
              setEventData({ ...eventData, desc: e.target.value })
            }
          />
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Create Ticket Type</Accordion.Header>
              <Accordion.Body>
                {createdTickets.map((val, index) => (
                  <Accordion className="mb-4">
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>{val.type}</Accordion.Header>
                      <Accordion.Body>
                        <h6>Ticket type: {val.type}</h6>
                        <p className="mb-0">Price: {val.price}</p>
                        <p>Qunatity: {val.quantity}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
                <div>
                  <input
                    type="text"
                    placeholder="Ticket Name"
                    className="form-control mb-3"
                    value={ticketType.type}
                    onChange={(e) =>
                      setTicketType({ ...ticketType, type: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    className="form-control mb-3"
                    value={ticketType.quantity}
                    onChange={(e) =>
                      setTicketType({ ...ticketType, quantity: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Price per Ticket"
                    className="form-control mb-3"
                    value={ticketType.price}
                    onChange={(e) =>
                      setTicketType({ ...ticketType, price: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-primary"
                    onClick={AddTicketTypeHandler}
                  >
                    Add Ticket type
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <p>Starting Date</p>
          <input
            type="date"
            className="form-control mb-3"
            placeholder="title"
            value={eventData.startdate}
            onChange={(e) =>
              setEventData({ ...eventData, startdate: e.target.value })
            }
          />
          <p>* Ending Date if applicable</p>
          <input
            type="date"
            className="form-control mb-3"
            placeholder="title"
            value={eventData.enddate}
            onChange={(e) =>
              setEventData({ ...eventData, enddate: e.target.value })
            }
          />
          <Form.Select
            className="mb-4"
            onChange={(e) =>
              setEventData({ ...eventData, category: e.target.value })
            }
          >
            <option>Select Category</option>
            {category.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
          <label
            htmlFor="showPoster"
            className="shadow"
            style={{ width: "150px" }}
            onChange={(e) => handlePosterImageUpload(e)}
          >
            <p className="text-center">Poster Image</p>
            <input id="showPoster" type="file" className="d-none" />
            <img
              src={
                posterpreview
                  ? posterpreview
                  : "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
              }
              alt=""
              className="w-100 h-100"
              style={{ objectFit: "contain" }}
            />
          </label>
          <label
            htmlFor="showBanner"
            className="ms-md-5 mt-4 mt-md-0 shadow"
            style={{ width: "150px" }}
          >
            <p className="text-center">Banner Image</p>
            <input
              id="showBanner"
              type="file"
              className="d-none"
              onChange={(e) => handleBannerImageUpload(e)}
            />
            <img
              src={
                bannerpreview
                  ? bannerpreview
                  : "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
              }
              alt=""
              className="w-100 h-100"
            />
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={eventCancelHandler}>
          Cancel
        </Button>
        <Button variant="primary" onClick={eventAddApiHandler}>
          Add Shows
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ShowLandscapeCard = ({ event }) => {
  const dispatch = useDispatch();
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  // detail modal handlers
  const modalOpenHandler = () => setDetailModalShow(true);
  const modalCloseHandler = () => setDetailModalShow(false);

  // edit modal handlers
  const editModalOpenHandler = () => setEditModalShow(true);
  const editModalCloseHandler = () => setEditModalShow(false);

  // delete event Handler
  const deleteEventHandler = (id) => {
    dispatch(deleteEventApiHandler(id));
  };

  return (
    <div className="d-flex bg-light" style={{ maxWidth: "450px" }}>
      <img
        src={event?.poster.url}
        alt="poster"
        className="w-25"
        style={{ maxHeight: "150px" }}
      />
      <div className="px-3 py-2 w-100">
        <h6 className="d-inline-block text-truncate" style={{ width: "200px" }}>
          {event?.title}
        </h6>
        <p className="d-inline-block text-truncate" style={{ width: "200px" }}>
          {event?.desc}
        </p>
        <div>
          <button
            className="btn btn-primary me-1 mt-1"
            onClick={modalOpenHandler}
          >
            details
          </button>
          <button
            className="btn btn-primary me-1 mt-1"
            onClick={editModalOpenHandler}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mt-1"
            onClick={() => deleteEventHandler(event._id)}
          >
            Delete
          </button>
        </div>
      </div>
      <DetailModal
        event={event}
        show={detailModalShow}
        handleClose={modalCloseHandler}
      />
      <EditModal
        event={event}
        show={editModalShow}
        handleClose={editModalCloseHandler}
      />
    </div>
  );
};

export default ShowLandscapeCard;
