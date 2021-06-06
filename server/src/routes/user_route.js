const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const { ownerQuiz, withoutOwnerQuiz } = require("../models/quiz_model");
const auth = require("../middleware/auth");
const user_controller = require("../controllers/user_controller")

router.post("/user", user_controller.createUser);
router.get("/users/profile/all", auth, user_controller.allUsersInfo);
router.post("/user/login", user_controller.userLogin);
router.post("/user/logout", auth, user_controller.userLogout);
router.get("/user/profile", auth, user_controller.usersProfile);
router.patch("/user/profile", auth, user_controller.updateUserProfile);
router.delete("/user/profile", auth, user_controller.deleteUserAccount);
router.patch("/user/profile/physics/correct-ans", auth, user_controller.physicsCorrectAnswer);
router.patch("/user/profile/physics/wrong-ans", auth, user_controller.physicsWrongAnswer);
router.patch("/user/profile/cs/correct-ans", auth, user_controller.csCorrectAnswer);
router.patch("/user/profile/cs/wrong-ans", auth, user_controller.csWrongAnswer);
router.patch("/user/profile/gi/correct-ans", auth, user_controller.giCorrectAnswer);
router.patch("/user/profile/gi/wrong-ans", auth, user_controller.giWrongAnswer);
router.patch("/user/profile/other/correct-ans", auth, user_controller.otherCorrectAnswer);
router.patch("/user/profile/other/wrong-ans", auth, user_controller.otherWrongAnswer);

module.exports = router;
