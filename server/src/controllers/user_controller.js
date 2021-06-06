const userModel = require("../models/user_model");
const { ownerQuiz, withoutOwnerQuiz } = require("../models/quiz_model");

exports.createUser = async (req, res) => {
  const user = new userModel(req.body);
  console.log(req.body);
  try {
    const returnedUser = await user.save();
    const token = await user.generateToken(returnedUser._id);
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(404).send({ err });
  }
};

//routes for all users information for home pages

exports.allUsersInfo = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (!users) res.status(404).send("couldn't fetch users data.");
    else res.status(200).send({ users });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.userLogin = async (req, res) => {
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
};

exports.userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send({ operation: "logout successfully" });
  } catch (err) {
    res.send("couldn't log out");
  }
};

exports.usersProfile = async (req, res) => {
  res.status(200).send(req.user);
};

exports.updateUserProfile = async (req, res) => {
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
};

exports.deleteUserAccount = async (req, res) => {
  console.log(req.user._id.toString());
  try {
    await ownerQuiz.deleteMany({ owner: req.user._id });
    await userModel.findOneAndDelete({ _id: req.user._id });
    res.status(200).send({ user: req.user });
  } catch (err) {
    res.send({ operation: "couldn't delete user account", err });
  }
};

//physics correct ans

exports.physicsCorrectAnswer = async (req, res) => {
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
};

//physics wrong ans

exports.physicsWrongAnswer = async (req, res) => {
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
};

//cs correct answer

exports.csCorrectAnswer = async (req, res) => {
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
};

//cs wrong ans

exports.csWrongAnswer = async (req, res) => {
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
};

//gi correct answer

exports.giCorrectAnswer = async (req, res) => {
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
};

//wrong ans in gi

exports.giWrongAnswer = async (req, res) => {
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
};

//other correct answer

exports.otherCorrectAnswer = async (req, res) => {
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
};

//wrong ans in other

exports.otherWrongAnswer = async (req, res) => {
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
};
