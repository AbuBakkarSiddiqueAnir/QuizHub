const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const { ownerQuiz, withoutOwnerQuiz } = require("../models/quiz_model");
const auth = require("../middleware/middleware");

router.post("/user", async (req, res) => {
  const user = new userModel(req.body);
  console.log(req.body);
  try {
    const returnedUser = await user.save();
    const token = await user.generateToken(returnedUser._id);
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(404).send({ err });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await userModel.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateToken(user._id);
    res.status(200).send({ user, token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send({ operation: "logout successfully" });
  } catch (err) {
    res.send("couldn't log out");
  }
});

router.get("/user/profile", auth, async (req, res) => {
  res.status(200).send(req.user);
});

router.patch("/user/profile", auth, async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = ["username", "email", "password"];
  const isOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isOperation) res.status(404).send("invalid updates!!!!");

  try {
    const user = await userModel.findById(req.user._id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/user/profile", auth, async (req, res) => {
  console.log(req.user._id.toString());
  try {
    await ownerQuiz.deleteMany({ owner: req.user._id });
    await userModel.findOneAndDelete({ _id: req.user._id });
    res.status(200).send({ user: req.user });
  } catch (err) {
    res.send({ operation: "couldn't delete user account", err });
  }
});

//physics correct ans

router.patch("/user/profile/physics/correct-ans", auth, async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne(
      { _id: req.body.loggedInUser_id },
      {
        $set: {
          correctAnswerInPhysics: req.body.noOfanswers,
          c_answeredQuizIds: req.body.arrayAnswersIds,
        },
      }
    );
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
    res.send({ operation: "couldn't add your correct ans to database" });
  }
});


//physics wrong ans

router.patch("/user/profile/physics/wrong-ans", auth, async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne(
      { _id: req.body.loggedInUser_id },
      {
        $set: {
          wrongAnswerInPhysics: req.body.noOfanswers,
          w_answeredQuizIds: req.body.arrayAnswersIds,
        },
      }
    );
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
    res.send({ operation: "couldn't add your correct ans to database" });
  }
});



//cs correct answer

router.patch("/user/profile/cs/correct-ans", auth, async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne(
      { _id: req.body.loggedInUser_id },
      {
        $set: {
          correctAnswerInCS: req.body.noOfanswers,
          c_answeredQuizIds: req.body.arrayAnswersIds,
        },
      }
    );
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
    res.send({ operation: "couldn't add your correct ans to database" });
  }
});

//cs wrong ans

router.patch("/user/profile/cs/wrong-ans", auth, async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne(
      { _id: req.body.loggedInUser_id },
      {
        $set: {
          wrongAnswerInCS: req.body.noOfanswers,
          w_answeredQuizIds: req.body.arrayAnswersIds,
        },
      }
    );
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
    res.send({ operation: "couldn't add your correct ans to database" });
  }
});


//gi correct answer

router.patch("/user/profile/gi/correct-ans", auth, async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne(
      { _id: req.body.loggedInUser_id },
      {
        $set: {
          correctAnswerInGI: req.body.noOfanswers,
          c_answeredQuizIds: req.body.arrayAnswersIds,
        },
      }
    );
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
    res.send({ operation: "couldn't add your correct ans to database" });
  }
});

//wrong ans in gi

router.patch("/user/profile/gi/wrong-ans", auth, async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne(
      { _id: req.body.loggedInUser_id },
      {
        $set: {
          wrongAnswerInGI: req.body.noOfanswers,
          w_answeredQuizIds: req.body.arrayAnswersIds,
        },
      }
    );
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
    res.send({ operation: "couldn't add your correct ans to database" });
  }
});


//other correct answer

router.patch("/user/profile/other/correct-ans", auth, async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne(
      { _id: req.body.loggedInUser_id },
      {
        $set: {
          correctAnswerInOther: req.body.noOfanswers,
          c_answeredQuizIds: req.body.arrayAnswersIds,
        },
      }
    );
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
    res.send({ operation: "couldn't add your correct ans to database" });
  }
});


//wrong ans in other

router.patch("/user/profile/other/wrong-ans", auth, async (req, res) => {
  try {
    const updatedUser = await userModel.updateOne(
      { _id: req.body.loggedInUser_id },
      {
        $set: {
          wrongAnsweredInOther: req.body.noOfanswers,
          w_answeredQuizIds: req.body.arrayAnswersIds,
        },
      }
    );
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
    res.send({ operation: "couldn't add your correct ans to database" });
  }
});



module.exports = router;
