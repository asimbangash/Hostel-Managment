const express = require("express");
const path = require("path");
const cors = require("cors");
const userRouter = require("./src/routes/user.routes");
const postHostelRouter = require("./src/routes/postHostel.routes.js");
const bookHostelRouter = require("./src/routes/bookHostel.routes.js");
const subscribeNewsRetter = require("./src/routes/Newsletter.routes.js");
const searchHostelRouter = require("./src/routes/searchHostel.routes.js");
const reviewsRouter = require("./src/routes/reviews.routes.js");
const contactRouter = require("./src/routes/contactMess.routes.js");
const bookRoomRouter = require("./src/routes/bookYourRoom.routes.js");
const resetRouter = require("./src/routes/resetPass.routes.js");
require("dotenv");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "uploads")));

// route declaration;
app.use("/api/v1/users", userRouter);
app.use("/api/v1/login", userRouter);
app.use("/api/v1/posthostel", postHostelRouter);
app.use("/api/v1/bookhostel", bookHostelRouter);
app.use("/api/v1/subscribe", subscribeNewsRetter);
app.use("/api/v1/searchhostel", searchHostelRouter);
app.use("/api/v1/pass", resetRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/contactmess", contactRouter);
app.use("/api/v1/bookyourroom", bookRoomRouter);

module.exports = app;
