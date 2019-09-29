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
  subscriptions: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User has not been authenticated");
    }
    try {
      const subscriptions = await Subscription.find({ user: req.userId });
      return subscriptions.map(subscription => {
        return standardizeSubscription(subscription);
      });
    } catch (err) {
      throw err;
    }
  },

  subscribeEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User has not been authenticated");
    }
    const foundEvent = await Event.findOne({ _id: args.eventId });
    const subscription = new Subscription({
      user: req.userId,
      event: foundEvent
    });

    const resultSubscription = await subscription.save();
    return standardizeSubscription(resultSubscription);
  },
  unsubscribeEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User has not been authenticated");
    }
    try {
      const currSubscription = await Subscription.findById(
        args.subscriptionId
      ).populate("event");

      const returnEvent = standardizeEvent(currSubscription.event);
      await Subscription.deleteOne({ _id: args.subscriptionId });
      return returnEvent;
    } catch (err) {
      throw err;
    }
  }
};
