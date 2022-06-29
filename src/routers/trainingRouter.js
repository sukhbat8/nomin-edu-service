const express = require("express");
const { verifyToken } = require("../services/tokenService");
const { getTraining } = require("../services/trainingService");

const router = express.Router();

router.get("/getTraining", verifyToken, (req, res) => {
    getTraining()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;