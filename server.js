const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// const characters = {
//   "albus dumbledore": {
//     name: "Albus Percival Wulfric Brian Dumbledore",
//     birthday: "1881",
//     house: "Gryffindor",
//     patronus: "Phoenix",
//     boggart: "The corpse of his sister, Ariana",
//     wand: "Elder Wand",
//     parents: "Percival Dumbledore and Kendra Dumbledore",
//     bloodStatus: "Half-blood",
//     children: ["Credence Dumbledore"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/en/f/fe/Dumbledore_and_Elder_Wand.JPG",
//   },
//   "severus snape": {
//     name: "Severus Snape",
//     birthday: "January 9, 1960",
//     house: "Slytherin",
//     patronus: "Doe",
//     boggart: "Lord Voldemort",
//     wand: "Ebony",
//     parents: "Tobias Snape and Eileen Snape",
//     bloodStatus: "Half-blood",
//     children: ["none"],
//     image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Ootp076.jpg",
//   },
//   "minerva mcgonagall": {
//     name: "Minerva McGonagall",
//     birthday: "October 4, 1935",
//     house: "Gryffindor",
//     patronus: "Cat",
//     boggart: "Lord Voldemort",
//     wand: "Fir Wood",
//     parents: "Robert McGonagall and Isobel Ross",
//     bloodStatus: "Half-blood",
//     children: ["none"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/en/e/ea/McGonagall_%28screenshot%29.jpg",
//   },
//   "harry potter": {
//     name: "Harry James Potter",
//     birthday: "July 31, 1980",
//     house: "Gryffindor",
//     patronus: "Stag",
//     boggart: "Dementor",
//     wand: "Holly",
//     parents: "James Potter and Lily Potter",
//     bloodStatus: "Pure-blood",
//     children: [
//       "James Sirius Potter",
//       "Lily Luna Potter",
//       "Albus Severus Potter",
//     ],
//     image:
//       "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg",
//   },

//   "hermione granger": {
//     name: "Hermione Jean Granger",
//     birthday: "September 19, 1979",
//     house: "Gryffindor",
//     patronus: "Otter",
//     boggart:
//       "Professor McGonagall telling her that she failed her exams (failure in general)",
//     wand: "Vine",
//     parents: "Mr. Granger and Mrs. Granger",
//     bloodStatus: "Muggle-born",
//     children: ["Rose Granger-Weasley", "Hugo Granger-Weasley"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg",
//   },
//   "ron weasley": {
//     name: "Ronald Bilius Weasley",
//     birthday: "March 1, 1980",
//     house: "Gryffindor",
//     patronus: "Jack Russell Terrier",
//     boggart: "Aragog",
//     wand: "Willow",
//     parents: "Arthur Weasley and Molly Weasley",
//     children: ["Rose Granger-Weasley", "Hugo Granger-Weasley"],
//     bloodStatus: "Pure-blood",
//     image:
//       "https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg",
//   },

//   "draco malfoy": {
//     name: "Draco Lucius Malfoy",
//     birthday: "June 5, 1980",
//     house: "Slytherin",
//     patronus: "Dragon",
//     boggart: "Lord Voldemort",
//     wand: "Hawthorn and later Elder Wand",
//     parents: "Lucius Malfoy and Narcissa Malfoy",
//     children: ["Scorpius Hyperion Malfoy"],
//     bloodStatus: "Pure-blood",
//     image: "https://upload.wikimedia.org/wikipedia/en/1/16/Draco_Mal.JPG",
//   },

//   "neville longbottom": {
//     name: "Neville Longbottom",
//     birthday: "July 30, 1980",
//     house: "Gryffindor",
//     patronus: "Stag",
//     boggart: "Dementor",
//     wand: "Core",
//     parents: "Frank Longbottom and Alice Longbottom",
//     children: ["Unknown"],
//     bloodStatus: "Pure-blood",
//     image:
//       "https://upload.wikimedia.org/wikipedia/en/7/75/Neville_Longbottom.jpeg",
//   },

//   unknown: {
//     name: "Unknown",
//     birthday: "Unknown",
//     house: "Unknown",
//     patronus: "Unknown",
//     boggart: "Unknown",
//     wand: "Unknown",
//     parents: "Unknown",
//     children: ["Unknown"],
//     bloodStatus: "Unknown",
//   },
// };
let db,
  connectionString = process.env.DB_STRING,
  dbName = "Harry-Potter-Api";

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);

    db = client.db("Harry-Potter-Api");
  }
);

app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//       res.sendFile(__dirname + "/index.html");
//     });

// Serving Up JSON / This is a network request
app.get("/api/:characterName", (req, res) => {
  // get objects based on property name
  const charactersName = req.params.characterName.toLowerCase();

  db.collection("character-info")
    .find({ name: charactersName })
    .toArray()
    .then((results) => {
      console.log(results);
      res.json(results[0]);
    })
    .catch((error) => console.log(error));
});

// POST
app.post("/api", (req, res) => {
  console.log("post heard");
  db.collection("character-info")
    .insertOne(req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// PUT
app.put("/updateEntry", (req, res) => {
  console.log(req.body);
  Object.keys(req.body).forEach((key) => {
    if (
      req.body[key] === null ||
      req.body[key] === undefined ||
      req.body[key] === ""
    ) {
      delete req.body[key];
    }
  });
  console.log(req.body);
  db.collection("character-info")
    .findOneAndUpdate({ name: req.body.name }, { $set: req.body })
    .then((result) => {
      console.log(result);
      res.json("Success");
    })
    .catch((error) => console.log(error));
});

// Port Listening
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
