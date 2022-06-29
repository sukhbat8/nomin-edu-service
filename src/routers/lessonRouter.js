const express = require("express");
const { verifyToken } = require("../services/tokenService");
const { getLessons , getLevels, getManagers, getTeachers, saveLessons} = require("../services/lessonService");

const router = express.Router();

router.get("/getLessons", (req, res) => {
    getLessons()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});
router.get("/getLevels", verifyToken,  (req, res) => {
    getLevels()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});
router.get("/getTeachers", verifyToken,  (req, res) => {
    getTeachers(req.query.lesson_id)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});
router.get("/getManagers", verifyToken,  (req, res) => {
    getManagers(req.query)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});
router.post("/saveLessons",verifyToken, (req, res) => {
    const data = req.body;
    saveLessons(data)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;