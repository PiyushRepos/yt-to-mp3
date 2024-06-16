const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = process.env.PORT || 3000;



const fetchAPI = async ()=>{
    
}

// fetchAPI()

app.get("/", (req, res) =>{
  res.render("index.ejs");
});

app.post("/", async (req, res) =>{
  const url = req.body.url;
  if(!url) return;
  const apiRes = `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/custom/?url=${url}&quality=320`;
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.API_KEY,
    'x-rapidapi-host': process.env.API_HOST
  }
};
try {
  const response = await fetch(apiRes, options);
  const result = await response.json();
  res.render("success.ejs", { videoLink: result.dlink });
} catch (error) {
  console.error(error);
}
});

app.listen(PORT, (req, res)=>{
  console.log(`Server is running on port http://localhost:${PORT}`);
});