const express = require("express");
const axios = require("axios");
const cors = require("cors");
const sdk = require("api")("@yelp-developers/v1.0#1a49qh16lkmfd5xn");

const app = express();
const port = 3001; // Choose a port for your server

app.use(express.json());
app.use(cors());

const apiKey =
  "aQt_Th1T2kOYbKbS463k24x4E20q_MRL-6qr4X_ebk2RJk9a4os--pO7UcRN7AdTZ7RaicdoE_lJGabw94TgzwLTCsqNK4-iXSytyeHHd51adnKKZoZVoKruaX3iZXYx";

sdk.auth("Bearer " + apiKey);

const fetchBusinessDetails = async (businessId) => {
  try {
    const businessResponse = await axios.get(
      `https://api.yelp.com/v3/businesses/${businessId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return businessResponse.data; // This contains business details, including photos
  } catch (error) {
    console.error("Error fetching business details:", error);
    return null;
  }
};

const fetchAllBusinessPhotos = async (businesses) => {
  const detailsPromises = businesses.map((business) =>
    fetchBusinessDetails(business.id)
  );
  const details = await Promise.all(detailsPromises);
  return details.map((detail) => (detail ? detail.photos : [])); // Extract photos from each detail
};

// Yelp Fusion API endpoint proxy
app.get("/search", async (req, res) => {
  try {
    // Replace with your Yelp API key

    const { latitude, longitude, term, location, categories, price, radius } =
      req.query;

    const attr = categories
      .split(",")
      .map((cat) => (cat += "=true"))
      .join(",");

    let params = {
      term,
      latitude: Number(latitude),
      longitude: Number(longitude),
      categories,
      radius: Math.round(Number(radius)),
      open_now: true,
    };
    if (price) {
      params["price"] = price;
    }

    const response = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: params,
      }
    );

    const ret = response.data;

    res.json(ret);
  } catch (error) {
    console.error("Error making Yelp API request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Yelp API" });
  }
});

app.get("/business-details/:id", async (req, res) => {
  const businessId = req.params.id;

  try {
    // Fetch business details to get initial photos
    const businessResponse = await axios.get(
      `https://api.yelp.com/v3/businesses/${businessId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const { photos } = businessResponse.data;
    const allPhotos = [...photos]; // Start with the business photos

    // Fetch reviews for the business
    const reviewsResponse = await axios.get(
      `https://api.yelp.com/v3/businesses/${businessId}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Loop over the reviews and add any photos to the allPhotos array
    reviewsResponse.data.reviews.forEach((review) => {
      if (review.public_response && review.public_response.photo_url) {
        allPhotos.push(review.public_response.photo_url);
      }
    });

    res.json(allPhotos);
  } catch (error) {
    console.error("Error fetching business details or reviews:", error);
    res.json([]);
  }
});

app.get("/yelp-categories", async (req, res) => {
  try {
    const response = await axios.get("https://api.yelp.com/v3/categories", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    console.log(response.data);

    // Send the list of categories to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching categories from Yelp:", error);
    res.status(500).send("Error fetching categories");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
