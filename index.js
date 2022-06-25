const express = require("express");
const { json } = require("express");
// const flights = require("./controllers/flightController");
// const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const flights = require('./models/flight.json');

// Express Init
const app = express();

// Middleware Init
app.use(json({ extended: false }));
app.use(express.urlencoded({ extended: true }))

app.use("/flights", routes);


// Start Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
