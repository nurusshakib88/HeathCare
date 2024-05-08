const express = require("express");
const router = express.Router();
const { UserController, verifyUser } = require("../controllers/UserControler");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", UserController.me);
router.get("/logout", UserController.logout);
router.get("/dashboard", verifyUser, UserController.dashboard);
router.get("/users/all", UserController.getAllUsers);
router.delete("/users/deleteuser/:id", UserController.deleteUser);

module.exports = router;
