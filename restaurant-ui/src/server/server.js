const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001; // Choose a port for your server

app.use(express.json());
app.use(cors());

// Yelp Fusion API endpoint proxy
app.get("/search", async (req, res) => {
  try {
    const apiKey =
      "aQt_Th1T2kOYbKbS463k24x4E20q_MRL-6qr4X_ebk2RJk9a4os--pO7UcRN7AdTZ7RaicdoE_lJGabw94TgzwLTCsqNK4-iXSytyeHHd51adnKKZoZVoKruaX3iZXYx"; // Replace with your Yelp API key

    const {
      latitude,
      longitude,
      term,
      location,
      categories,
      price,
      attributes,
      radius,
    } = req.query;

    const attr = categories
      .split(",")
      .map((cat) => (cat += "=true"))
      .join(",");

    let params = {
      term,
      latitude: Number(latitude),
      longitude: Number(longitude),
      categories,
      price,
      attributes: attr,
      radius: Number(radius),
      open_now: true,
    };

    params = {
      term: "restaurants",
      latitude: 33.0854246,
      longitude: -96.7633405,
      categories: "Indian",
      price: "1,2",
      attributes: "outdoor_seating=true",
      radius: 8047, // Rounded to the nearest integer
      open_now: true,
    };

    const response = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: params,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error making Yelp API request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Yelp API" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
