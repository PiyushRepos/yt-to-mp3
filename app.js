const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config();
const axios = require('axios')

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index.ejs", { videoLink: null });
});

app.post("/", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  const apiRes = `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/custom/?url=${url}&quality=320`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.API_KEY,
      'x-rapidapi-host': process.env.API_HOST
    }
  };

  try {
    const result = await axios.get(apiRes, options);
    console.log(result.data.dlink);
    res.render("index.ejs", { videoLink: result.data.dlink});
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});