const express = require("express");
const { verifyToken } = require("../services/tokenService");
const { saveUser, loginUser, getUserInfo } = require("../services/userService");

const router = express.Router();

router.post("/saveUser", (req, res) => {
    const data = req.body;
    saveUser(data)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});
router.post("/loginUser",  (req, res) => {
    const loginInfo = req.body;
    loginUser(loginInfo)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});
router.get("/getUserInfo", verifyToken, (req, res) => {
    const user = (req.user);
    getUserInfo(user)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });


module.exports = router;