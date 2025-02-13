const jwt = require("jsonwebtoken");

function jwtGenerator(id) {
  const payload = { id };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
