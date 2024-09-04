import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import toastHandler from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { bookEventsApiHandler } from "../../services/allapis";
import { useEffect, useState } from "react";
import { getCurrentTIme, isValidToBook } from "../../utils/formatDate";

const TicketCnfModal = ({
  event,
  handleClose,
  show,
  selectedData,
  selectedDataHandler,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [ticketAvailablity, setTicketAvailablity] = useState("");

  //   book handler
  const handleTicketBooking = () => {
    if (!token) {
      toastHandler({ alert: "You need to login" });
      return;
    }
    const { date, selectedticket, qty } = selectedData;
    if (!date || !selectedticket || !qty) {
      toastHandler({ info: "select date, ticket type and quantity" });
      return;
    }
    if (!isValidToBook(event?.starttime, date)) {
      toastHandler({ info: "Can't book this ticket" });
      return;
    }
    const detailsToPass = {
      id: event?._id,
      data: { ...selectedData, bookedTime: getCurrentTIme() },
    };
    console.log(detailsToPass);

    dispatch(bookEventsApiHandler(detailsToPass));
    handleCancel();
    handleClose();
  };

  // cancel
  const handleCancel = () => {
    selectedDataHandler({
      ...selectedData,
      qty: "",
    });
  };

  useEffect(() => {
    if (event) {
      let tDetails = event?.tickets.find(
        (val) => val.type === selectedData.selectedticket
      );
      setTicketAvailablity(tDetails?.quantity);
    }
  }, [event, selectedData]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-100">
          <p>
            Ticket type: <span>{selectedData.selectedticket}</span>
          </p>
          <div className="d-flex flex-wrap">
            <p>Qty: </p>
            <span className="ms-3">
              <input
                type="number"
                className="form-control"
                placeholder="number of tickets"
                value={selectedData?.qty}
                onChange={(e) =>
                  selectedDataHandler({ ...selectedData, qty: e.target.value })
                }
              />
            </span>
            <p className="ms-3">Availablity: {ticketAvailablity}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleTicketBooking}>
          confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketCnfModal;
