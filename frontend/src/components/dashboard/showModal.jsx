import React, { useEffect, useRef, useState } from "react";
import "../../pages/dash/dashboard.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import toastHandler from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  eventAddApiHandler,
  getCategoriesApiHandler,
} from "../../services/allapis";

const AddShowModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [ticketType, setTicketType] = useState({
    type: "",
    quantity: "",
    price: "",
    desc: "",
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
    startime: "",
    endtime: "",
  });
  const [posterpreview, setPosterPreview] = useState("");
  const [bannerpreview, setBannerPreview] = useState("");
  const [posterRef, setposterRef] = useState(0);
  const [bannerRef, setBannerRef] = useState(0);

  // category initial handling
  const { data } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategoriesApiHandler());
  }, []);
  const category = data;

  // ticket type Adding
  const AddTicketTypeHandler = () => {
    const { type, quantity, price, desc } = ticketType;
    if (!type || !quantity || !price || !desc) {
      toastHandler({ error: "plese fill the fields" });
      return;
    }
    setCreatedTickets([...createdTickets, ticketType]);
    setTicketType({
      type: "",
      quantity: "",
      price: "",
      desc: "",
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
  const eventAddHandler = () => {
    const {
      title,
      banner,
      category,
      desc,
      enddate,
      poster,
      startdate,
      startime,
      endtime,
    } = eventData;
    if (
      !title ||
      !banner ||
      !category ||
      !desc ||
      !poster ||
      !startdate ||
      !startime ||
      createdTickets.length == 0
    ) {
      return toastHandler({ error: "plese fill the fields completly" });
    }
    console.log(eventData);
    // formdata
    const eventFormData = new FormData();
    eventFormData.append("title", title);
    eventFormData.append("banner", banner);
    eventFormData.append("category", category);
    eventFormData.append("desc", desc);
    eventFormData.append("poster", poster);
    eventFormData.append("startdate", startdate);
    eventFormData.append("enddate", enddate);
    eventFormData.append("starttime", startime);
    eventFormData.append("endtime", endtime);
    eventFormData.append("tickettypes", JSON.stringify(createdTickets));
    dispatch(eventAddApiHandler(eventFormData));
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
    setTicketType({ type: "", quantity: "", price: "", desc: "" });
    if (posterRef == 0 && bannerRef == 0) {
      setBannerRef(1);
      setposterRef(1);
    } else {
      setBannerRef(0);
      setposterRef(0);
    }
  };

  // image display
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
        <Modal.Title>Add Shows</Modal.Title>
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
                  <Accordion className="mb-4" key={index}>
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>{val.type}</Accordion.Header>
                      <Accordion.Body>
                        <h6>Ticket type: {val.type}</h6>
                        <p className="mb-0">Price: {val.price}</p>
                        <p className="mb-0">Qunatity: {val.quantity}</p>
                        <p className="mb-0">Description: {val.desc}</p>
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
                    type="number"
                    placeholder="Quantity"
                    className="form-control mb-3"
                    value={ticketType.quantity}
                    onChange={(e) =>
                      setTicketType({ ...ticketType, quantity: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Price per Ticket"
                    className="form-control mb-3"
                    value={ticketType.price}
                    onChange={(e) =>
                      setTicketType({ ...ticketType, price: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="desc about ticket, eg: its the nearest section to stage"
                    className="form-control mb-3"
                    value={ticketType.desc}
                    onChange={(e) =>
                      setTicketType({ ...ticketType, desc: e.target.value })
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
          {/* date & time */}
          <div className="d-flex justify-content-around">
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
              <p>Start time</p>
              <input
                type="time"
                className="form-control mb-3"
                value={eventData.startime}
                onChange={(e) =>
                  setEventData({ ...eventData, startime: e.target.value })
                }
              />
            </div>
            <div>
              <p>End time if applicable</p>
              <input
                type="time"
                className="form-control mb-3"
                value={eventData.endtime}
                onChange={(e) =>
                  setEventData({ ...eventData, endtime: e.target.value })
                }
              />
            </div>
          </div>
          <Form.Select
            className="mb-4"
            onChange={(e) =>
              setEventData({ ...eventData, category: e.target.value })
            }
          >
            <option>Select Category</option>
            {category.map((item, index) => (
              <option key={index} value={item.type}>
                {item.type}
              </option>
            ))}
          </Form.Select>
          <label
            htmlFor="showPoster"
            className="shadow"
            style={{ width: "150px" }}
          >
            <p className="text-center">Poster Image</p>
            <input
              id="showPoster"
              type="file"
              className="d-none"
              key={posterRef}
              onChange={(e) => handlePosterImageUpload(e)}
            />
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
              key={bannerRef}
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
        <Button variant="primary" onClick={eventAddHandler}>
          Add Shows
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddShowModal;
