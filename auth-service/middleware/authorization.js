const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.id; // Fix: Use `id` directly

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json("Not Authorized");
  }
};
