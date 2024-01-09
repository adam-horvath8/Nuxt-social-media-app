const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//routers
// const postRouter = require("./routes/Posts");
// app.use("/posts", postRouter);

// const commentsRouter = require("./routes/Comments");
// app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

app.listen(3004, () => {
  console.log("server running");
});
