const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const axios = require("axios");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  const url = req.body.url;
  if (!url) return;
  const options = {
    method: 'GET',
    url: 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/custom/',
    params: {
      url: url,
      quality: '320'
    },
    headers: {
      'x-rapidapi-key': process.env.API_KEY,
      'x-rapidapi-host': process.env.API_HOST
    }
  };
  
  try {
    const response = await axios.request(options);
    const data = await response.data;
    console.log(data);
    res.render("success.ejs", { data });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
