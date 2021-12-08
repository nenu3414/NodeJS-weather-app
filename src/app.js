//Header Files [path, express and hbs]
const path = require("path");
const express = require("express");
const hbs = require("hbs");

//Util Files
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Instantiating Express
const app = express();

// Define paths for Express Config
const publicPathDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPathDirectory));

//Home Page
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    fName: "Neenad",
  });
});

//About Page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    fName: "Neenad",
  });
});

//Help Page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    fName: "Neenad",
  });
});

//Weather Forecast
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address is required",
    });
  }
  geocode(
    req.query.address,
    (error, { location, latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// Help Page [404]
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    fName: "Neenad",
    errorMsg: "Help Article Not Found",
  });
});

//404 Page
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    fName: "Neenad",
    errorMsg: "Page Not Found",
  });
});

// Listening to port
app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
