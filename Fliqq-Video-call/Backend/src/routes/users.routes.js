import { Router } from "express";
import { addToHistory, getUserHistory, login, register, googleAuth, getUserDetails, updateUserDetails } from "../controllers/user.controller.js";

const router = Router();
router.route("/login").post(login);
router.route("/register").post(register)
router.route("/add_to_activity").post(addToHistory)
router.route("/get_all_activity").post(getUserHistory)
router.route("/oauth").post(googleAuth)
router.route("/get_user_details").get(getUserDetails)
router.route("/update_user_details").post(updateUserDetails)

export default router;
