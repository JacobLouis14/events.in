const eventsModel = require("../models/evnts");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

// firebase config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_apikey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
};
initializeApp(firebaseConfig);

// all events get Handler
const getAllEvents = async (req, res) => {
  try {
    const allEvents = await eventsModel.find({});

    if (!allEvents)
      return res
        .status(204)
        .json({ message: "No events found", data: allEvents });

    return res.status(200).json({ data: allEvents });
  } catch (error) {
    return res.status(500).json({ message: "Internel server error", error });
  }
};

// get spesific event Handler
const getSpecificEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await eventsModel.findOne({ _id: id });
    if (!event) return res.status(204).json({ message: "No event found" });

    return res.status(200).json({ data: event });
  } catch (error) {
    return res.status(500).json({ message: "Internel server error", error });
  }
};

// post event Handler
const addEvent = async (req, res) => {
  try {
    const { userId } = req.user;

    const {
      title,
      desc,
      startdate,
      enddate,
      tickettypes,
      category,
      starttime,
      endtime,
    } = req.body;

    if (
      !title ||
      !desc ||
      !startdate ||
      !tickettypes ||
      !category ||
      !starttime
    ) {
      return res.status(400).json({ message: "need complete data" });
    }

    if (req.files.length < 2)
      return res.status(400).json({ message: "Need images" });

    const isEventExists = await eventsModel.findOne({
      title: { $regex: title.toLowerCase(), $options: "i" },
    });
    if (isEventExists)
      return res.status(200).json({ message: "Alredy exists" });

    // Image upload to firestore
    const storage = getStorage();

    // poster
    const posterRef = ref(
      storage,
      `eventsPoster/${title + "-poster-" + userId}`
    );
    const posterMetaData = { contentType: req.files.poster[0].mimetype };
    const posterSnapShot = await uploadBytesResumable(
      posterRef,
      req.files.poster[0].buffer,
      posterMetaData
    );
    const posterImageRef = await getDownloadURL(posterSnapShot.ref);
    const posterImageData = {
      name: title + "-poster-" + userId,
      url: posterImageRef,
    };
    // banner
    const bannerRef = ref(
      storage,
      `eventsBanner/${title + "-banner-" + userId}`
    );
    const eventsMetaData = { contentType: req.files.banner[0].mimetype };
    const bannerSnapShot = await uploadBytesResumable(
      bannerRef,
      req.files.banner[0].buffer,
      eventsMetaData
    );
    const bannerImageRef = await getDownloadURL(bannerSnapShot.ref);
    const bannerImageData = {
      name: title + "-banner-" + userId,
      url: bannerImageRef,
    };

    // date handling
    const sd = new Date(startdate);
    let ed;
    if (enddate) {
      ed = new Date(enddate);
    }

    // parsing the tickettypes
    const parsedTicketTypes = JSON.parse(tickettypes);

    const savedEvent = await new eventsModel({
      title,
      desc,
      startdate: sd,
      enddate: ed,
      category,
      tickets: parsedTicketTypes,
      poster: posterImageData,
      banner: bannerImageData,
      starttime,
      endtime,
    }).save();

    return res
      .status(200)
      .json({ message: "Successfull event creation", data: savedEvent });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server error", error: error });
  }
};

// delete post Handler
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id required" });

    const isEventExists = await eventsModel.findById({ _id: id });
    if (!isEventExists)
      return res.status(406).json({ message: "Event not exits" });

    const storage = getStorage();
    const posterRef = ref(storage, `eventsPoster/${isEventExists.poster.name}`);
    const bannerRef = ref(storage, `eventsBanner/${isEventExists.banner.name}`);

    try {
      await deleteObject(posterRef);
      await deleteObject(bannerRef);
    } catch (error) {
      throw error;
    }

    const deleteEvent = await eventsModel.deleteOne({ _id: id });
    if (deleteEvent.deletedCount != 1)
      throw new Error("something went wrong in deleting data from database");

    const remainingEvents = await eventsModel.find({});

    if (remainingEvents.length == 0) {
      return res
        .status(204)
        .json({ message: "Delete successfull, No events found" });
    }

    return res
      .status(200)
      .json({ message: "Successfully deleted", data: remainingEvents });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internel server Error", error });
  }
};

// filtered events Handler
const filterEvents = async (req, res) => {
  try {
    const { category, price, sort } = req.query;

    // no query returning all data
    if (!category && !price && !sort) {
      const events = await eventsModel.find({});
      return res.status(200).json({ message: "all events", data: events });
    }

    let minPrice;
    let maxPrice;
    // correcting price data
    switch (price) {
      case "<1000":
        minPrice = 0;
        maxPrice = 999;
        break;
      case ">2000":
        minPrice = 2001;
        maxPrice = Infinity;
        break;
      case "1000-2000":
        minPrice = 1000;
        maxPrice = 2000;
        break;
      default:
        break;
    }

    // filtered handler
    const filteredData = await eventsModel.find({
      $and: [
        category ? { category: category } : {},
        price
          ? {
              tickets: {
                $elemMatch: {
                  price: {
                    $gte: minPrice,
                    $lte: maxPrice,
                  },
                },
              },
            }
          : {},
      ],
    });

    if (filteredData.length === 0) {
      return res
        .status(204)
        .json({ message: "No events Found", data: filteredData });
    }

    // sort handler
    if (sort) {
      switch (sort) {
        case "1":
          filteredData.sort((a, b) => {
            const aMinPrice = Math.min(...a.tickets.map((t) => t.price));
            const bMinPrice = Math.min(...b.tickets.map((t) => t.price));
            console.log(`a-min ${aMinPrice}`);
            console.log(`b-min ${bMinPrice}`);
            return aMinPrice - bMinPrice;
          });
          break;
        case "2":
          filteredData.sort((a, b) => {
            const aMaxPrice = Math.max(...a.tickets.map((t) => t.price));
            const bMaxPrice = Math.max(...b.tickets.map((t) => t.price));
            return bMaxPrice - aMaxPrice;
          });
          break;
        default:
          break;
      }
    }

    return res.status(200).json({ message: "success", data: filteredData });
  } catch (error) {
    return res.status(500).json({ message: "Internel server error", error });
  }
};

module.exports = {
  getAllEvents,
  getSpecificEvent,
  addEvent,
  deleteEvent,
  filterEvents,
};
