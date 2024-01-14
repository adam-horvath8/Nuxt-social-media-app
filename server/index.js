const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const profilesRouter = require("./routes/Profiles");
app.use("/profile", profilesRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

app.listen(3004, () => {
  console.log("server running");
});
