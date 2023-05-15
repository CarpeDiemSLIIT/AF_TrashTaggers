import Post from "../models/Post.js";
import Report from "../models/Report.js";
import User from "../models/User.js";

export const getAllReports = async (req, res) => {
  try {
    const report = await Report.find()
      .populate("user")
      .populate({ path: "post", populate: { path: "author" } });
    res.status(200).json(report);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addNewReport = async (req, res) => {
  const { reason } = req.body;
  const { _id } = req.user;
  const { pid } = req.params;
  const newReport = new Report({
    reason,
    user: _id,
    post: pid,
  });
  try {
    await newReport.save();
    const newReportWithPopulate = await Report.findById(newReport._id)
      .populate("user")
      .populate({ path: "post", populate: { path: "author" } });
    res.status(201).json(newReportWithPopulate);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//resolve the report
export const resolveReport = async (req, res) => {
  const { pid } = req.params;

  try {
    const users = await Report.findByIdAndUpdate(pid, { status: "resolved" });
    const report = await Report.find()
      .populate("user")
      .populate({ path: "post", populate: { path: "author" } });
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//resolve the report
export const resolveReportBanCreator = async (req, res) => {
  const { reportID } = req.body;
  const { id } = req.params;

  try {
    const users = await User.findByIdAndUpdate(id, { status: "suspend" });

    await Report.findByIdAndUpdate(reportID, { status: "resolved" });
    const report = await Report.find()
      .populate("user")
      .populate({ path: "post", populate: { path: "author" } });
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//resolve the report
export const resolveReportRemovePost = async (req, res) => {
  const { reportID } = req.body;
  const { pid } = req.params;

  try {
    const posts = await Post.findByIdAndUpdate(pid, { status: "deleted" });

    await Report.findByIdAndUpdate(reportID, { status: "resolved" });
    const report = await Report.find()
      .populate("user")
      .populate({ path: "post", populate: { path: "author" } });
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
