const bcrypt = require("bcryptjs");

const Event = require("./../../models/event");
const User = require("./../../models/user");
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
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return standardizeEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  postEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User has not been authenticated");
    }
    const event = new Event({
      title: args.eventInput.title,
      image: args.eventInput.image,
      location: args.eventInput.location,
      description: args.eventInput.description,
      date: new Date(args.eventInput.date),
      poster: req.userId
    });
    let createdEvent;
    try {
      const resultEvent = await event.save();

      createdEvent = standardizeEvent(resultEvent);
      const posterUser = await User.findById(req.userId);

      if (!posterUser) {
        throw new Error("User cannot be found");
      }
      posterUser.postedEvents.push(event);
      await posterUser.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
