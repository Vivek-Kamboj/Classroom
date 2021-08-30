const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
const mw = require("../middleware");

// Create Assignment
router.post("/", mw.auth.verify, ctrl.assignment.create);
// Get Assignment details
router.get("/:assignmentId", mw.auth.verify, ctrl.assignment.get);
// Get Assignments list for a subject
// Post Assignment response
// Update Assignment
router.put("/:assignmentId", mw.auth.verify, ctrl.assignment.update);
// Delete Assignment
router.delete("/:assignmentId", mw.auth.verify, ctrl.assignment.deleteAssignment);

module.exports = router;
