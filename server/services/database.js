const mongoose = require("mongoose");
const mongoUrl = process.env.MONGURL;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log(`Connection succesfull to Mongo database`);
  })
  .catch((err) => {
    console.log(`Error in connection to Mongo Database${err}`);
  });
