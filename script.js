import { config } from "dotenv";

import express from "express";
import bodyparser from "body-parser";
// const cors = require("cors");

// const express = require("express");
// const bodyparser = require("body-parser");
const router = express.Router();

config();

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const app = express();

const port = process.env.PORT || 4000;
const API_KEY = "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";
// app.use(express.json());
// app.use(cors());
/**
 *
 * body parser for post methods
 *
 */
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

/**
 *
 * Set header methods
 *
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET,DELETE");
  next();
});

/**
 *
 * Mongoose connect
 *
 */
app.listen(port, () => {
  console.log(port);
});

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: API_KEY,
  })
);

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// userInterface.prompt();
// userInterface.on("line", async (input) => {
//   const response = await openAi.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   });
//   console.log(response.data.choices[0].message.content);
//   userInterface.prompt();
// });

app.get("/", (req, res) => {
  // console.log("This is port");
  res.send("THis is 3000 port" + port);
});

app.post("/getdata", async (req, res) => {
  let input = req.body.data;
  console.log("LINE85", process.env.OPEN_AI_API_KEY);
  try {
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    // console.log(response.data.choices[0].message.content);

    // res.send({
    //   result: response.data.choices[0].message.content,
    // });

    res.status(200).send(response.data.choices[0].message.content.toString());
  } catch (e) {
    console.log("ERROR", e);
    // res.send("Error occured", input);
    res.status(500).send("Error it is ");
  }
});
