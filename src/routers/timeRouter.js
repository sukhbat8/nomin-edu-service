const express = require("express");
const { verifyToken } = require("../services/tokenService");
const { saveCalendar, saveRegister } = require("../services/timeService");

const router = express.Router();

router.post("/saveCalendar",  (req, res) => {
    const calendar = req.body;
    saveCalendar(calendar)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});
router.post("/saveRegister",  (req, res) => {
    const register = req.body;
    saveRegister(register)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});



module.exports = router;