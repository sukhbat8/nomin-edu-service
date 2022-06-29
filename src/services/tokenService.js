const jwt = require("jsonwebtoken");

const getToken = (payload, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.TOKEN_SECRET, options, (err, token) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const verifyToken = (req, res, next) => {
  const rawToken = req.header("Authorization");
  if (!rawToken || !rawToken.startsWith("Bearer ")) {
    res.status(401).json({
      code: 500,
      error: "Unauthorized",
    });
  } else {
    const token = rawToken.substring(7);
    try {
      req.user = jwt.verify(token, process.env.TOKEN_SECRET);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        code: 500,
        error: err,
      });
    }
  }
};

module.exports = {
  getToken,
  verifyToken,
};
