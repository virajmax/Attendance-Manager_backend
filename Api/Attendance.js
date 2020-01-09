const express = require("express");
const router = express.Router();
const attendance = require("../Logic/Attendance");

router.put("/mark/:id", (req, res) => {
  console.log("handling attendance mark");
  attendance.mark(req, res);
});

router.get("/bydate/:date", (req, res) => {
  console.log("handling get attendance by date");
  attendance.getAttendanceByDate(req, res, req.params.date);
});

router.get("/", (req, res) => {
  console.log("handling get all attendance");
  attendance.getAllAttendance(req, res);
});

router.put("/makeholiday/:date", (req, res) => {
  console.log("handling make holiday");
  attendance.makeHoliday(req, res, req.params.date);
});

module.exports = router;
