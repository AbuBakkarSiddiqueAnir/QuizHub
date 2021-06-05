const express = require("express");
require("./src/db/mongoose");
const userRouter = require("./src/routes/user_route");
const quizRouter = require("./src/routes/quiz_route");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use((req, res, next) => {
  console.log("i am coming to backend");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(userRouter);
app.use(quizRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});
