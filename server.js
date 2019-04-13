require('dotenv').config();
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();


// configure middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// setting up database
const mongoose = require("mongoose");
const mongoURL = process.env.PROD_MONGODB || "mongodb://localhost:27017/googlebooks"
mongoose.connect(mongoURL, {useNewUrlParser: true})
  .then(() => {
    console.log("🗄 ==> Successfully connected to mongoDB.");
  })
  .catch((err) => {
    console.log(`Error connecting to mongoDB: ${err}`);
  });

// connect to api routes
  require("./routes/api-routes")(app);



app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
