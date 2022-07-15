const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8000;

app.use(cors());
app.use(express.json());

const characters = {
  "harry potter": {
    birthday: "July 31, 1980",
    house: "Gryffindor",
    patronus: "Stag",
    boggart: "Dementor",
    wand: "Holly",
    parents: "James Potter and Lily Potter",
    bloodStatus: "Pure-blood",
    children: [
      "James Sirius Potter",
      "Lily Luna Potter",
      "Albus Severus Potter",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg",
  },

  "hermione granger": {
    birthday: "September 19, 1979",
    house: "Gryffindor",
    patronus: "Otter",
    boggart:
      "Professor McGonagall telling her that she failed her exams (failure in general)",
    wand: "Vine",
    parents: "Mr. Granger and Mrs. Granger",
    bloodStatus: "Muggle-born",
    image:
      "https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg",
  },
  "ron weasley": {
    birthday: "March 1, 1980",
    house: "Gryffindor",
    patronus: "Jack Russell Terrier",
    boggart: "Aragog",
    wand: "Willow",
    parents: "Arthur Weasley and Molly Weasley",
    bloodStatus: "Pure-blood",
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg",
  },

  "draco malfoy": {
    birthday: "June 5, 1980",
    house: "Slytherin",
    patronus: "Dragon",
    boggart: "Lord Voldemort",
    wand: "Hawthorn and later Elder Wand",
    parents: "Lucius Malfoy and Narcissa Malfoy",
    children: ["Scorpius Hyperion Malfoy"],
    bloodStatus: "Pure-blood",
    image:
      "https://upload.wikimedia.org/wikipedia/en/f/f9/Draco_Malfoy_poster.jpg",
  },

  unknown: {
    birthday: "Unknown",
    house: "Unknown",
    patronus: "Unknown",
    boggart: "Unknown",
    wand: "Unknown",
    parents: "Unknown",
    children: ["Unknown"],
    bloodStatus: "Unknown",
  },
};
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Serving Up JSON / This is a network request
app.get("/api/:characterName", (req, res) => {
  // get objects based on property name
  const charactersName = req.params.characterName.toLowerCase();

  if (characters[charactersName]) {
    res.json(characters[charactersName]);
  } else {
    res.json(characters["unknown"]);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
