const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRouter = require("./src/routes/users");
const commentRouter = require("./src/routes/comments");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).send("Test");
});

app.use("/users", userRouter);
app.use("/comments", commentRouter);

app.set("PORT", PORT);
app.listen(5000, () => {
  console.log(`listening on ${app.settings.PORT}`);
});
