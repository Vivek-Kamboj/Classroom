const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
const mw = require("../middleware");

// Create Assignment
router.post("/", mw.auth.verify, ctrl.assignment.create);
// Get Assignment details
router.get("/:assignmentId", mw.auth.verify, ctrl.assignment.get);
// Get Assignments list for a subject
router.get("/", mw.auth.verify, ctrl.assignment.assList);
// Post Assignment response
router.post("/:assignmentId/response", mw.auth.verify, ctrl.assignment.response);
// Give marks
// Update Assignment
router.put("/:assignmentId", mw.auth.verify, ctrl.assignment.update);
// Delete Assignment
router.delete("/:assignmentId", mw.auth.verify, ctrl.assignment.deleteAssignment);// bacha hai

module.exports = router;
