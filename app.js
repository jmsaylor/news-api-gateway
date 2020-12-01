const express = require("express");
const app = express();
const fetch = require("node-fetch");

const key = process.env.NEWS_KEY;
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.get("/monitor", (req, res) => {
  console.log("hello");
  res.send();
});

app.post("/", async (req, res) => {
  const { action, data } = req.body;

  switch (action) {
    case "searchTerm":
      try {
        res.send(await searchNewsArticles(data));
      } catch (error) {
        console.error(error.message);
        res.status(500);
      }
      break;
    case "topHeadlines":
      try {
        res.send(await getTopHeadlines());
      } catch (error) {
        console.error(error);
        res.status(500);
      }
      break;
    default:
      res.send({ message: "Invalid action type" }).status(400);
      break;
  }
});

const newsURI = "http://newsapi.org/v2/";

const searchNewsArticles = async (query) => {
  const date = "2020-11-29";
  const url =
    newsURI +
    `everything?q=${query}&from=${date}&sortBy=popularity&apiKey=${key}`;

  try {
    const articles = await fetch(url);
    return await articles.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTopHeadlines = async () => {
  const url = newsURI + `top-headlines?country=us&apiKey=${key}`;

  try {
    const articles = await fetch(url);
    return await articles.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
