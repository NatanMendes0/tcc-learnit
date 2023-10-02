const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5h" });
  console.log("token", token);
  return token;
};

module.exports = { generateToken };
