import React, { useEffect, useState } from "react";
import Appbar from "../../components/Appbar";
import "./ticketDetails.css";
import Footer from "../../components/Footer";
import DetailsHead from "../../components/ticketdetails/detailsHead";
import DetailBody from "../../components/ticketdetails/detailbody";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificEventData } from "../../services/allapis";

const TicketDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);

  const getEventData = async () => {
    const res = await getSpecificEventData(id);
    if (res.status == 200) {
      setEventData(res.data.data);
    }
    if (res.status == 204) {
      alert("no Content found");
      navigate("/");
    }
    if (res.status < 200 && res.status >= 300) {
      navigate("/");
    }
  };

  useEffect(() => {
    getEventData();
  }, [id]);

  return (
    <>
      <Appbar absPos={true} />
      {!eventData && <div>LOading</div>}
      {eventData && (
        <>
          <DetailsHead event={eventData} />
          <DetailBody event={eventData} />
        </>
      )}
      <Footer />
    </>
  );
};

export default TicketDetails;
