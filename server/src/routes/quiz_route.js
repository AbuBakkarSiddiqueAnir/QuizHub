const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const quiz_controller = require("../controllers/quiz_controller")
const { ownerQuiz, withoutOwnerQuiz } = require("../models/quiz_model");

router.post("/quiz/profile", auth, quiz_controller.createQuiz);
router.get("/quiz/profile/:id", auth, quiz_controller.getSingleQuiz);
router.get("/quiz/profile/", auth, quiz_controller.queryingQuiz);
router.patch("/quiz/profile/:id", auth, quiz_controller.updateQuiz);
router.delete("/quiz/profile/:id", auth, quiz_controller.deleteQuiz);
router.delete("/quiz/profile", auth, quiz_controller.deleteAllQuizes);
router.post("/quiz/mass_quizess", quiz_controller.insertMassQuizess);
router.get("/quiz/mass_quizess", auth, quiz_controller.fetchMassQuizess);
router.get("/quiz/mass_quizess/physics", auth, quiz_controller.queringPhysicsQuiz);
router.get("/quiz/mass_quizess/cs", auth, quiz_controller.queryingCsQuiz);
router.get("/quiz/mass_quizess/gi", auth, quiz_controller.queringGiQuiz);
router.get("/quiz/mass_quizess/other", auth, quiz_controller.queringOtherQuiz);
router.get("/quiz/test/physics", auth, quiz_controller.displayPhysicsQuiz);
router.get("/quiz/test/cs", auth, quiz_controller.displayCsQuiz);
router.get("/quiz/test/gi", auth, quiz_controller.displayGiQuiz);
router.get("/quiz/test/other", auth, quiz_controller.displayOtherQuiz);

module.exports = router;
