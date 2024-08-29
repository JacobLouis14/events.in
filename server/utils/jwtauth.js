const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  try {
    return jwt.sign(
      { userId: user._id, usertype: user.usertype },
      process.env.JWTACCESSTOKENKEY,
      {
        expiresIn: "30m",
      }
    );
  } catch (error) {
    return error;
  }
};

const generateRefreshToken = (user) => {
  try {
    return jwt.sign(
      { userId: user._id, usertype: user.usertype },
      process.env.JWTREFRESHTOKENKEY,
      {
        expiresIn: "1h", //"30d",
      }
    );
  } catch (error) {
    return error;
  }
};

module.exports = { generateAccessToken, generateRefreshToken };
