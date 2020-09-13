const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const indexRouter = require("./src/routes");
const userRouter = require("./src/routes/users");
const commentRouter = require("./src/routes/comments");

const app = express();
const PORT = 5000;

app.set("PORT", PORT);
app.set("view engine", "html");
nunjucks.configure("src/views", {
  express: app,
  watch: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(5000, () => {
  console.log(`listening on ${app.settings.PORT}`);
});
