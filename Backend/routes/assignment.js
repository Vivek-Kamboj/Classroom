const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// Create Assignment
router.post("/", ctrl.assignment.create);
// Get Assignment details
router.get("/:assignmentId", ctrl.assignment.get);
// Get Assignments list for a subject
// Post Assignment response
// Update Assignment
router.put("/:assignmentId", ctrl.assignment.update);
// Delete Assignment
router.delete("/:assignmentId", ctrl.assignment.deleteAssignment);

module.exports = router;
