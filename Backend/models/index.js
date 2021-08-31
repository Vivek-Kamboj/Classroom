const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost/classroom";

mongoose
  .connect(dbUrl, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(`MongoDB connection error : ${err}`));

module.exports = {
  User: require("./User"),
  Subject: require("./subject"),
  Assignment: require("./assignment"),
};
