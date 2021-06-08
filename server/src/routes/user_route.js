const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const { ownerQuiz, withoutOwnerQuiz } = require("../models/quiz_model");
const auth = require("../middleware/auth");
const user_controller = require("../controllers/user_controller")
const singupRequest = require("../requests/auth/signup_request")
const loginRequest = require("../requests/auth/login_request")

router.post("/user", singupRequest.validators, singupRequest.validate, user_controller.createUser);
router.post("/user/login", loginRequest.validators, loginRequest.validate, user_controller.userLogin);

router.use(auth)
router.get("/users/profile/all",  user_controller.allUsersInfo);
router.post("/user/logout",  user_controller.userLogout);
router.get("/user/profile",  user_controller.usersProfile);
router.patch("/user/profile",  user_controller.updateUserProfile);
router.delete("/user/profile", user_controller.deleteUserAccount);
router.patch("/user/profile/physics/correct-ans",  user_controller.physicsCorrectAnswer);
router.patch("/user/profile/physics/wrong-ans", user_controller.physicsWrongAnswer);
router.patch("/user/profile/cs/correct-ans",  user_controller.csCorrectAnswer);
router.patch("/user/profile/cs/wrong-ans",  user_controller.csWrongAnswer);
router.patch("/user/profile/gi/correct-ans",  user_controller.giCorrectAnswer);
router.patch("/user/profile/gi/wrong-ans",  user_controller.giWrongAnswer);
router.patch("/user/profile/other/correct-ans",  user_controller.otherCorrectAnswer);
router.patch("/user/profile/other/wrong-ans", user_controller.otherWrongAnswer);

module.exports = router;
