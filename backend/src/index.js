const app = require("../app");
const { connectDB } = require("./db");

require("dotenv").config();

let PORT = process.env.PORT || 8000;

console.log(process.env.P0RT);

connectDB("mongodb://127.0.0.1:27017/HostelManagement")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection fialed", error);
  });
