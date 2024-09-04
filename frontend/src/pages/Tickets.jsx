import React from "react";
import Appbar from "../components/Appbar";
import TicketFilterSection from "../components/tickets/TicketFilterSection";
import TicketCardSection from "../components/tickets/TicketCardSection";

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
