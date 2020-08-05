const express = require("express");

const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use('/', userRoutes);
app.use('/', authRoutes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/funcept",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
)
  .then(() => console.log('Database Connected'));

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
