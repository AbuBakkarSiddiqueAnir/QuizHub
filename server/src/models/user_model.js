const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const quizModel = require("../models/quiz_model");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      minlength: 5,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email address");
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("password can't have 'password' word");
      },
    },
    correctAnswerInPhysics: {
      type: Number,
      trim: true,
      default: 0,
    },
    wrongAnswerInPhysics: {
      type: Number,
      trim: true,
      default: 0,
    },
    correctAnswerInGI: {
      type: Number,
      trim: true,
      default: 0,
    },
    wrongAnswerInGI: {
      type: Number,
      trim: true,
      default: 0,
    },
    correctAnswerInCS: {
      type: Number,
      trim: true,
      default: 0,
    },
    wrongAnswerInCS: {
      type: Number,
      trim: true,
      default: 0,
    },
    correctAnswerInOther: {
      type: Number,
      trim: true,
      default: 0,
    },
    wrongAnsweredInOther: {
      type: Number,
      trim: true,
      default: 0,
    },
    c_answeredQuizIds: [
      {
        quizids: {
          type: String,
        },
      },
    ],
    w_answeredQuizIds: [
      {
        quizids: {
          type: String,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("quiz", {
  ref: "ownerQuiz",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.generateToken = async function (id) {
  const user = this;
  const token = jwt.sign({ id: id.toString() }, "This_is_a_quiz_app!");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.tokens;
  delete userObject.password;
  return userObject;
};

userSchema.statics.findByCredentials = async function (username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("user doesn't exist");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password mismatch");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user["password"] = await bcrypt.hash(user["password"], 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
