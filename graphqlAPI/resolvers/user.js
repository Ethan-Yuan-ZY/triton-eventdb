const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const Event = require("./../../models/event");
const User = require("./../../models/user");
const Subscription = require("./../../models/subscription");
const {
  transformDateToString
} = require("./../../globalFunctions/dateFunction");
const {
  findingUserHelper,
  findOneEventHelper,
  findEventsHelper
} = require("./retrieveData");

const standardizeEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: transformDateToString(event._doc.date),
    poster: findingUserHelper.bind(this, event._doc.poster)
  };
};

const standardizeSubscription = subscription => {
  return {
    ...subscription._doc,
    _id: subscription.id,
    user: findingUserHelper.bind(this, subscription._doc.user),
    event: findOneEventHelper.bind(this, subscription._doc.event),
    createdAt: transformDateToString(subscription._doc.createdAt),
    updatedAt: transformDateToString(subscription._doc.updatedAt)
  };
};

module.exports = {
  registerUser: async args => {
    try {
      const currentUser = await User.findOne({ email: args.userInput.email });

      if (currentUser) {
        throw new Error("User has already been created.");
      }
      const hashedUserPassword = await bcrypt.hash(args.userInput.password, 6);

      const user = new User({
        email: args.userInput.email,
        password: hashedUserPassword,
        username: args.userInput.username
      });
      const result = await user.save();

      return { ...result._doc, password: null, id: result.id };
    } catch (err) {
      throw err;
    }
  },
  loginUser: async ({ email, password }) => {
    const user = await User.findOne({ email: email }); // maybe await?
    if (!user) {
      throw new Error("User has not been registered");
    }
    const credentialMatch = await bcrypt.compare(password, user.password);
    if (!credentialMatch) {
      throw new Error("Password entered is incorrect");
    }
    const token = jsonwebtoken.sign(
      { userId: user.id, email: user.email },
      "abcdefg123456",
      {
        expiresIn: "1h"
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  }
};
