const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        if (decoded.role === "admin") {
          next();
        } else {
          return res.json("Not Admin");
        }
      }
    });
  }
};

const UserController = {
  dashboard: (req, res) => {
    res.json("Success");
  },

  register: (req, res) => {
    const {
      name,
      email,
      phone,
      age,
      sex,
      blood,
      selectedDivision,
      selectedDistrict,
      imageUrl,
      password,
    } = req.body;
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        UserModel.create({
          name,
          email,
          phone,
          age,
          sex,
          blood,
          selectedDivision,
          selectedDistrict,
          imageUrl,
          password: hash,
        })
          .then((user) => res.json("Success"))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },

  login: (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, role: user.role },
              JWT_SECRET,
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ Status: "Success", role: user.role });
          } else {
            return res.json("The password is incorrect");
          }
        });
      } else {
        return res.json("no record Found");
      }
    });
  },
  getAllUsers: (req, res) => {
    // Retrieve all users from the database
    UserModel.find({})
      .then((users) => res.json(users))
      .catch((err) =>
        res.status(500).json({ message: "Internal server error" })
      );
  },

  me: (req, res) => {
    const token = req.cookies.token;

    // Check if token is provided
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is missing" });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      // Token is valid, retrieve user information from database
      UserModel.findOne({ email: decoded.email })
        .then((user) => {
          if (user) {
            return res.json({ user });
          } else {
            return res.status(404).json({ message: "User not found" });
          }
        })
        .catch((err) =>
          res.status(500).json({ message: "Internal server error" })
        );
    });
  },
  logout: (req, res) => {
    // Clear the token cookie by setting it to an empty value and expiring it
    res.cookie("token", "", { expires: new Date(0) });
    res.json("Logout successful");
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
};
module.exports = { UserController, verifyUser };
