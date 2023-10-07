const jwt = require("jsonwebtoken");

const generateRefreshToken = (id) => {
  const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
  console.log("refreshToken assinado: ", refreshToken);
  return refreshToken;
};

module.exports = { generateRefreshToken };
