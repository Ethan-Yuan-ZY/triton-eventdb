const Event = require("./../../models/event");
const User = require("./../../models/user");
const Subscription = require("./../../models/subscription");
const {
  transformDateToString
} = require("./../../globalFunctions/dateFunction");

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

const findingUserHelper = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      postedEvents: findEventsHelper.bind(this, user._doc.postedEvents)
    };
  } catch (err) {
    throw err;
  }
};

const findEventsHelper = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return standardizeEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const findOneEventHelper = async eventId => {
  try {
    const oneEvent = await Event.findById(eventId);
    return standardizeEvent(oneEvent);
  } catch (err) {
    throw err;
  }
};

exports.findingUserHelper = findingUserHelper;
exports.findEventsHelper = findEventsHelper;
exports.findOneEventHelper = findOneEventHelper;
