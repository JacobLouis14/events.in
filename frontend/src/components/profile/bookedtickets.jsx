import React, { useEffect, useState } from "react";
import Card from "../Card";
import { useSelector } from "react-redux";
import { getSpecificEventData } from "../../services/allapis";

const BookedTickets = () => {
  const { user } = useSelector((state) => state.auth);
  const [bookedEvents, setBookedEvents] = useState([]);

  const initialDataHandler = async () => {
    try {
      const tempBooking = user?.bookings || [];
      if (tempBooking?.length != 0) {
        const eventPromises = tempBooking?.map(async (e) => {
          const res = await getSpecificEventData(e.eventId);
          return res.data.data;
        });

        const events = await Promise.all(eventPromises);
        setBookedEvents([...bookedEvents, ...events]);
      } else {
        setBookedEvents([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialDataHandler();
  }, [user?.bookings]);

  return (
    <div className="d-flex flex-wrap">
      {user?.bookings?.length === 0 && <p>No data</p>}
      {user?.bookings?.length > 0 &&
        user?.bookings?.map((ticket, index) => {
          const eventsToSend = bookedEvents?.find(
            (val) => val._id == ticket.eventId
          );

          return (
            <div className="me-3" key={index}>
              <Card
                ticket={true}
                event={eventsToSend}
                bookingDetails={ticket}
              />
            </div>
          );
        })}
    </div>
  );
};
export default BookedTickets;
