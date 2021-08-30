const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
    return true;
  }
  return false;
}

const signup = async (req, res) => {
  var user = { ...req.body };
  if (!user.name || !user.email || !user.password || !user.isTeacher) {
    return res.status(400).json({ message: "All fields are required" });
  }
  user.isTeacher = user.isTeacher === "true" ? true : false;
  if (!validateEmail(req.body.email))
    return res.status(400).json({
      message: "Please login with proper email",
    });
  db.User.findOne({ email: user.email }, (err, foundUser) => {
    if (err) return res.status(400).json({ message: "Bad request, try again" });
    if (foundUser)
      return res.status(400).json({
        message: "Email is already been registered.",
      });
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Something went wrong, try again" });
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Something went wrong, try again" });

        const { email, name, isTeacher } = req.body;
        const newUser = {
          email: email,
          password: hash,
          name: name,
          isTeacher: isTeacher,
        };

        db.User.create(newUser, (err, createdUser) => {
          if (err) {
            // console.log(err);
            return res.status(500).json({
              message: "Something went wrong, Please try again",
            });
          }
          /* jwt */
          jwt.sign(
            { foo: createdUser._id, email: createdUser.email },
            `${process.env.JWT_SECRET}`,
            { expiresIn: "10h" },
            (err, jwt) => {
              if (err)
                return res.status(403).json({
                  message: "Access Forbidden",
                });
              res.status(200).json({ jwt, userId: createdUser._id });
            }
          );
        });
      });
    });
  });
};

//===============Login==================
const signIn = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Please enter both your email and password",
    });
  }
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err)
      return res.status(500).json({
        message: "Something went wrong. Please try again",
      });

    if (!validateEmail(req.body.email))
      return res.status(400).json({
        message: "Please login with proper email",
      });

    if (!foundUser) {
      return res.status(400).json({
        message:
          "Email address is not associated with any account. Please check and try again",
      });
    }

    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({
          message: "Something went wrong. Please try again",
        });

      if (isMatch) {
        /* jwt */
        jwt.sign(
          { foo: foundUser._id, email: foundUser.email },
          `${process.env.JWT_SECRET}`,
          { expiresIn: "10h" },
          (err, jwt) => {
            if (err)
              return res.status(403).json({
                message: "Access Forbidden",
              });
            res.status(200).json({ jwt, userId: foundUser._id });
          }
        );
      } else {
        return res.status(400).json({
          message: "Email or Password is not correct.",
        });
      }
    });
  });
};
//==================================

const getUsers = async (req, res) => {
  try {
    await db.Subject.findOne({ _id: req.query.subjectId })
      .populate("students")
      .exec(function (err, Subject) {
        if (err) console.log(err);
        else {
          res.status(200).json(Subject.students);
        }
      });
  } catch (err) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong when trying to get all students",
    });
  }
};

const getUserDetails = async (req, res) => {
  // res.send(req.params.userId);
  try {
    await db.User.findOne({ _id: req.params.userId }).exec(function (
      err,
      user
    ) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(user);
      }
    });
  } catch (err) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong when trying to get user",
    });
  }
};

module.exports = {
  signup,
  signIn,
  getUsers,
  getUserDetails,
};
