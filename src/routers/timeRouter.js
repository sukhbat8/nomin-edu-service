const express = require("express");
const { verifyToken } = require("../services/tokenService");
const { saveCalendar, saveRegister, getCalendar } = require("../services/timeService");

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
router.post("/saveRegister", verifyToken,  (req, res) => {
    const register = req.body;
    saveRegister(register)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});
router.get("/getCalendar", verifyToken,  (req, res) => {
    console.log(req.query);
    getCalendar()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});



module.exports = router;