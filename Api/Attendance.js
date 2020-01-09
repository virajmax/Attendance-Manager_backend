const express = require("express");
const router = express.Router();
const attendance = require("../Logic/Attendance");

router.get("/mark/:id", (req, res) => {
  attendance.mark(req, res);
});

router.get("/today", (req, res) => {
  attendance.getTodayAttendance(req, res);
});

router.get("/bydate/:date", (req, res) => {
  attendance.getAttendanceByDate(req, res, req.params.date);
});

router.get("/bydaterange/:fromdate/:todate", (req, res) => {
    console.log("handling attendance by date range")
  attendance.getAttendanceByDateRange(
    req,
    res,
    req.params.fromdate,
    req.params.todate
  );
});
module.exports = router;
