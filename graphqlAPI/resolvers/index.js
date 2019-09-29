const userResolver = require("./user");
const eventResolver = require("./event");
const subcriptionResolver = require("./subscription");

const rootResolver = {
  ...userResolver,
  ...eventResolver,
  ...subcriptionResolver
};

module.exports = rootResolver;
