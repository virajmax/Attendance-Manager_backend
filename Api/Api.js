const express = require("express");
const router = express.Router();
const routeUser = require("./User");
const routeAttendance = require("./Attendance");

router.use('/user', routeUser);
router.use("/attendance", routeAttendance);

module.exports = router;