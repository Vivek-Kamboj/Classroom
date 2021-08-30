const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
const mw = require("../middleware");

// Sign up
router.post("/signup", ctrl.user.signup); // login issme bacha hai!
// Sign IN
router.post("/signin", ctrl.user.signIn);
// Get Dashbord of User
router.get("/:userId", mw.auth.verify, ctrl.user.getUserDetails);
// Get List of user for particular subject
router.get("/", mw.auth.verify, ctrl.user.getUsers);

module.exports = router;
