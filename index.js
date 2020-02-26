const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const routeLoginSignUp = require("./Api/LoginSignUp");
const api = require("./Api/Api.js");
const middleware = require("./Config/middleware");
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

var previousDate;
var currentDate;

const interval = setInterval(function() {
  console.log("checking time");
  currentDate = new Date().getDate();
  if(previousDate != currentDate){
    attendance.resetAtMidNight();
  }
  previousDate = currentDate;
}, 300000);

app.listen(port, () => {
  console.log(`Server running at port ` + port);
  console.log(Date().toString());
  previousDate = new Date().getDate();
});
