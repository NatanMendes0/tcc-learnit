const jwt = require("jsonwebtoken");

const generateRefreshToken = (id) => {
  const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log("refreshToken", refreshToken);
  return refreshToken;
};

module.exports = { generateRefreshToken };
