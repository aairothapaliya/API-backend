const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors=require("cors");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const errors = require("./middleware/errors.js");


mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api", require("./routes/product.routes"));
app.use("/api", require("./routes/user.routes"));
app.use(errors.errorHandler);

app.listen(4000, function () {
  console.log("Ready to Go! http://localhost:4000"); 
});
 