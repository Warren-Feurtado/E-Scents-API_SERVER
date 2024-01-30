// require("dotenv/config");
require("dotenv").config();
const Admin = require("../models/admin.model");
const { JSONResponse } = require("../lib/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//CREATE ADMIN "C"
exports.createAdmin = async (req, res) => {
  try {
    if(req.file){
        req.body.photo = req.file.path;

    }

    const { fName, lName, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    const admin = await Admin.create({
      fName,
      lName,
      email,
      password: hashPassword,     
    });

    JSONResponse.success(res, "Admin created successfully.", admin, 201);
  } catch (error) {
    JSONResponse.error(res, "Error creating Admin.", error, 500);
  }
};

//GET ALL ADMIN "R"
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    JSONResponse.success(res, "Admins successfully retreived.", admins, 200);
  } catch (error) {
    JSONResponse.error(res, "Error fetching admins.", error, 500);
  }
};

//GET ALL ADMIN BY ID "R"
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById({ _id: req.params.id });
    JSONResponse.success(res, "Admin Successfully Retreived", admin, 200);
  } catch (error) {
    JSONResponse.error(res, "Error fetching Admin.", error, 500);
  }
};

//Update AND EDIT AN ADMIN "U"
exports.updateAdmin = async (req, res) => {
  try {

    const { fName, lName, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    
    const admin = await Admin.findByIdAndUpdate(
      { _id: req.params.id },
      {
        fName,
        lName,
        email,
        password: hashPassword
      }
    );
    JSONResponse.success(
      res,
      "Admin updated successfully.",
      { admin, new: req.body },
      200
    );
  } catch (error) {
    JSONResponse.error(res, "Error updating Admin", error, 500);
  }
};

//DELETE ADMIN "D"
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndRemove({ _id: req.params.id });
    JSONResponse.success(res, "Admin deleted successfully.", admin, 204);
  } catch (error) {
    JSONResponse.error(res, "Error deleting Admin", error, 500);
  }
};

exports.authenticateAdmin = async (req, res, next) => {
  let { email, password } = req.body;
  let existingAdmin;
  let token;

  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    console.error("Error finding admin: ", err);
    // const error = new Error("Error finding admin");
    return next(err);
  }

  if (!existingAdmin || !bcrypt.compareSync(password, existingAdmin.password)) {
    const error = new Error("Invalid password provided");
    return next(error);
  }

  try {
    token = jwt.sign({ _id: existingAdmin._id }, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Error generating access token: ", err);
    // const error = new Error("Error generating access token");
    return next(err);
  }

  existingAdmin = existingAdmin.toObject();
  console.log(existingAdmin);

  res.status(200).json({
    data: {
      ...existingAdmin,
      token,
    },
  });
};

