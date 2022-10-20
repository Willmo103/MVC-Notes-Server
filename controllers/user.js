const { hash } = require("bcrypt");
const User = require("../models/users");
const sign = require("jsonwebtoken").sign;
const { jwtToken, badLogin, serverError, created } = require("../status");

//---->| POST |---->| /new-user |
exports.createUser = async (req, res) => {
  try {
    // verify user doesn't already exist
    const verifyUser = await User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    //check for the user validity
    if (verifyUser) {
      return res
        .status(409)
        .json(conflict(`user with username ${req.body.username}`));
    }
    try {
      // hash the user's password
      const hashedPassword = hash(req.body.password, 10);
      try {
        // build the new USER model with the user's hashed password
        const USER = {
          username: req.body.username,
          password: hashedPassword,
        };
        // create the new user
        const user = await User.create(USER);
        // return the new user with the "created" status code
        return res.status(201).json(created(user));
        // Handle any errors from failed Promises
      } catch (error) {
        return res.status(500).json(serverError(error));
      }
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

//----> POST -----> /login
exports.loginUser = async (req, res) => {
  try {
    //   look for either username or email in body
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    try {
      // compare the req password with the hashed database password
      const match = await compare(req.body.password, user.password);
      if (match) {
        // generate jwt from username
        const token = sign(
          {
            name: user.username,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: process.env.EXPIRE_TIME,
          }
        );
        // return token
        return res.status(200).json(jwtToken(token));
      }
      // handle any errors from failed Promises
    } catch (error) {
      return res.status(400).json(badLogin());
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};
