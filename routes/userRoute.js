const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const Router = express.Router();

Router.route("/register").post(registerUser);

Router.route("/login").post(loginUser);

Router.route("/password/forgot").post(forgotPassword);

Router.route("/logout").get(logout);

Router.route("/password/reset/:token").put(resetPassword);

Router.route("/me").get(isAuthenticatedUser, getUserDetails);

Router.route("/password/update").put(isAuthenticatedUser, updatePassword);

Router.route("/me/update").put(isAuthenticatedUser, updateProfile);

Router.route("/admin/users").get(
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUser
);

Router.route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = Router;
