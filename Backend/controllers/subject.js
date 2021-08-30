const db = require("../models");

const create = async (req, res) => {
  var subject = { ...req.body };
  if (!subject.name || !subject.teacher || !subject.code) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log(subject);
  try {
    const newSubject = await db.Subject.create(subject);

    console.log("newSubject created");
    res.status(200).json(newSubject);
  } catch (err) {
    console.log("Server error.", err);
    return res.status(500).json({
      message: "Something went wrong when creating a new Subject",
    });
  }
};

const get = async (req, res) => {
  //   console.log(req.params.subjectId);
  try {
    await db.Subject.findOne({ _id: req.params.subjectId })
      .populate("teacher")
      .exec(function (err, subject) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Something went wrong when trying to get subject details",
          });
        } else {
          res.status(200).json(subject);
        }
      });
  } catch (err) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong when trying to get subject details",
    });
  }
};

const update = async (req, res) => {
  try {
    var updatedSubject = await db.Subject.findByIdAndUpdate(
      req.params.subjectId,
      req.body
    );
    res.status(200).json(updatedSubject);
  } catch (error) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong while updating Subject. Try again!",
    });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await db.Subject.findByIdAndRemove(
      req.params.subjectId
    );

    if (!deletedSubject) {
      return res.status(500).json({
        message: "Subject not found. Try again!",
      });
    }
    res.status(200).json({
      message: "Successfully deleted the Subject.",
    });
  } catch (error) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong while deleting Subject. Try again!",
    });
  }
};

module.exports = {
  create,
  get,
  update,
  deleteSubject,
};
