const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const routeLoginSignUp = require("./Api/LoginSignUp");
const api = require("./Api/Api.js");
const middleware = require("./Config/middleware");
const shedule = require("node-schedule");
const attendance = require("./Logic/Attendance");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "<body style='background-color:pink'><marquee style='background-color:white; color:red'><h1>Welcome to Attendance Manager Application!</h1></marquee></body>"
  );
});

app.use("/", routeLoginSignUp);
app.use("/api", middleware.checkToken, api);

shedule.scheduleJob("0 1 0 * * *", () => {
  attendance.resetAtMidNight();
});

app.listen(port, () => {
  console.log(`Server running at port ` + port);
});
