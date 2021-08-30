const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
const mw = require("../middleware");

// Create Subject
router.post("/", mw.auth.verify, ctrl.subject.create);
// Get Subject data
router.get("/:subjectId", mw.auth.verify, ctrl.subject.get);
// Join Subject
// Update Subject
router.put("/:subjectId", mw.auth.verify, ctrl.subject.update);
// Delete Subject
router.delete("/:subjectId", mw.auth.verify, ctrl.subject.deleteSubject);

module.exports = router;
