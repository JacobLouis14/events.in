const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwtauth");

const registerUser = async (req, res) => {
  const { email, password, mobile, name, userType } = req.body;

  try {
    const isUserExist = await userModel.findOne({
      $or: [{ email }, { mobile }],
    });
    if (isUserExist) {
      return res.status(406).json({ message: "Alredy Exists" });
    }

    const bcryptSalt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, bcryptSalt);

    const savedUser = await new userModel({
      email,
      password: passwordHash,
      mobile,
      name,
      usertype: userType,
    }).save();
    return res.status(200).json({
      message: "creation successfull",
      savedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExist = await userModel.findOne({ email });
    if (!isUserExist) {
      return res.status(406).json({ message: "User Not Found" });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordMatch) {
      return res.status(406).json({ message: "Invalid Credentials" });
    }
    const accessToken = generateAccessToken(isUserExist);
    const refreshToken = generateRefreshToken(isUserExist);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000, // 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    res.status(200).json({
      massage: "login success",
      token: accessToken,
      user: isUserExist,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internel server error", error });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { cookies } = req;
    if (!cookies?.jwt)
      return res
        .status(401)
        .json({ message: "Unauthorized", desc: "Redirect to login" });

    const token = cookies.jwt;
    jwt.verify(
      token,
      process.env.JWTREFRESHTOKENKEY,
      async (error, decoded) => {
        if (error) {
          return res
            .status(401)
            .json({ message: "Unauthorized", desc: "Redirect to login" });
        }

        const foundUser = await userModel.findOne({ _id: decoded.userId });

        if (!foundUser)
          return res
            .status(401)
            .json({ message: "Unauthorized", desc: "Redirect to login" });

        const accessToken = generateAccessToken(foundUser);
        return res.status(200).json({
          message: "Refresh Successfull",
          token: accessToken,
          user: foundUser,
        });
      }
    );
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", desc: "Redirect to login" });
  }
};

const dummyProtected = (req, res) => {
  try {
    res.status(200).json({ message: "Success", req: req.cookies });
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  dummyProtected,
};
