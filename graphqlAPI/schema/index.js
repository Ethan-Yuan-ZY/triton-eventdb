const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Event {
    _id: ID!
    title: String!
    image: String!
    location: String!
    description: String!
    date: String!
    poster: User!
}

type Comment {
    _id: ID!
    content: String!
    date: String!
    poster: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    username: String!
    postedEvents: [Event!]
}

type authUserInfo{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type Subscription {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

input UserInput {
    email: String!
    password: String!
    username: String!
}

input EventInput {
    title: String!
    image: String!
    location: String!
    description: String!
    date: String!
}

input CommentInput {
    content: String!
    date: String!
}

type RootQuery {
    events: [Event!]!
    subscriptions: [Subscription!]!
    loginUser(email: String!, password: String!): authUserInfo!
}

type RootMutation {
    postEvent(eventInput: EventInput): Event
    postComment(commentInput: CommentInput): Comment
    registerUser(userInput: UserInput): User
    subscribeEvent(eventId: ID!): Subscription!
    unsubscribeEvent(subscriptionId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
