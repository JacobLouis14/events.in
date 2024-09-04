const eventsModel = require("../models/evnts");
const userModel = require("../models/user");
const { isDateInclude } = require("../utils/isdateinclude");

// user Data
const userDataHandler = async (req, res) => {
  const { userId } = req.user;
  if (!userId) return res.status(401).json({ message: "unauthorized" });
  try {
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res
        .status(406)
        .json({ message: "user not found", desc: "check passing id" });
    }
    return res.status(200).json({ message: "success", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error", error });
  }
};

// booking events handler
const eventBookHandler = async (req, res) => {
  try {
    const { userId } = req.user;
    const bookedEventId = req.params.id;
    const { date, selectedticket, qty, bookedTime } = req.body;

    const isEventExists = await eventsModel.findById(bookedEventId);
    if (!isEventExists) {
      return res.status(400).json({ message: "No event found" });
    }

    const isTicketAvailable = isEventExists.tickets.some((ticket) => {
      if (ticket.type === selectedticket) {
        return (
          ticket.quantity >= qty &&
          isDateInclude({
            startDate: isEventExists.startdate,
            endDate: isEventExists.enddate,
            checkDate: date,
          })
        );
      }
    });
    if (!isTicketAvailable) {
      return res.status(400).json({ message: "Ticket not available" });
    }

    // booking procedure
    const updateWithBookings = await userModel.findByIdAndUpdate(userId, {
      $push: {
        bookings: {
          eventId: bookedEventId,
          tickettype: selectedticket,
          quantity: qty,
          selectdate: date,
          bookedTime,
        },
      },
    });

    if (!updateWithBookings) {
      throw new Error("cant update in mongo db");
    }
    const ticket = isEventExists.tickets.find((t) => t.type === selectedticket);
    if (!ticket) throw new Error("Ticket not found");

    ticket.quantity -= qty;

    const updateEvent = await eventsModel.findByIdAndUpdate(bookedEventId, {
      tickets: isEventExists.tickets,
    });
    if (!updateEvent) {
      throw new Error("cant update in mongo db");
    }
    const updatedUser = await userModel.findById(userId);
    return res
      .status(200)
      .json({ message: "booked successfully", data: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internel server error", error });
  }
};

// cancel event handler
const eventCancelHandler = async (req, res) => {
  try {
    const { eventId, tickettype, quantity, bookedTime } = req.body;
    const { userId } = req.user;
    console.log(req.body);

    // updating events part
    const isEventExists = await eventsModel.findById(eventId);
    if (!isEventExists) {
      return res.status(400).json({ message: "Event not found" });
    }

    let ticketData = isEventExists.tickets;
    ticketData.forEach((ticket) => {
      if (ticket.type === tickettype) {
        ticket.quantity += parseInt(quantity);
      }
    });
    const updatedEventData = await eventsModel.findByIdAndUpdate(eventId, {
      tickets: ticketData,
    });
    if (!updatedEventData) {
      return res.status(400).json({
        message: "Can't cancel ticket",
        error: "can't update event data, maybe eventId is false",
      });
    }

    // updating user part
    const user = await userModel.findById({ _id: userId });
    const updatedUserBookings = user.bookings.filter(
      (event) =>
        event.eventId != eventId ||
        event.tickettype != tickettype ||
        event.quantity != quantity ||
        event.bookedTime != bookedTime
    );

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        bookings: updatedUserBookings,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({
        message: "Error in cancelling ticket",
        error: "can't update user data, maybe userId is false",
      });
    }
    return res
      .status(200)
      .json({ message: "Cancel Success", data: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internel server Error", error });
  }
};

module.exports = {
  userDataHandler,
  eventBookHandler,
  eventCancelHandler,
};
