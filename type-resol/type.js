const typeDefs = `
  scalar DateTime
  scalar EmailAddress
  scalar URL

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: EmailAddress!
    verified: Boolean!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    eventsCreated: [Event!]!
    eventsInvited: [Event!]!
  }

  type Event {
    id: ID!
    title: String!
    description: String
    date: DateTime!
    location: String!
    createdBy: User!
    invitedUsers: [User!]!
    invitedEmails: [EmailAddress!]!
    status: EventStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthPayload {
    token: String!
    user: User!
    expiresIn: String!
  }

  type MutationResponse {
    success: Boolean!
    message: String!
    code: String
  }

  type EventMutationResponse {
    success: Boolean!
    message: String!
    event: Event
    code: String
  }

  type UserMutationResponse {
    success: Boolean!
    message: String!
    user: User
    token: String
    code: String
  }

  enum EventStatus {
    SCHEDULED
    CANCELLED
    COMPLETED
    DRAFT
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: EmailAddress!
    password: String!
  }

  input LoginInput {
    email: EmailAddress!
    password: String!
  }

  input CreateEventInput {
    title: String!
    description: String
    date: DateTime!
    location: String!
    invitedEmails: [EmailAddress!]
  }

  input UpdateEventInput {
    title: String
    description: String
    date: DateTime
    location: String
    invitedEmails: [EmailAddress!]
    status: EventStatus
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    email: EmailAddress
    isActive: Boolean
  }

  type Query {
    # User Queries
    users: [User!]!
    user(id: ID!): User
    me: User
    searchUsers(query: String!): [User!]!
    
    # Event Queries
    events(
      status: EventStatus
      fromDate: DateTime
      toDate: DateTime
      limit: Int
      offset: Int
    ): [Event!]!
    event(id: ID!): Event
    myEvents: [Event!]!
    eventsInvitedTo: [Event!]!
    upcomingEvents(limit: Int = 10): [Event!]!
  }

  type Mutation {
    # Auth Mutations
    registerUser(input: RegisterInput!): UserMutationResponse!
    loginUser(input: LoginInput!): UserMutationResponse!
    logoutUser: MutationResponse!
    refreshToken: UserMutationResponse!
    verifyEmail(token: String!): MutationResponse!
    resendVerificationEmail: MutationResponse!
    forgotPassword(email: EmailAddress!): MutationResponse!
    resetPassword(token: String!, newPassword: String!): MutationResponse!
    
    # User Profile Mutations
    updateProfile(input: UpdateUserInput!): UserMutationResponse!
    changePassword(currentPassword: String!, newPassword: String!): MutationResponse!
    deactivateUser: MutationResponse!
    
    # Event Mutations
    createEvent(input: CreateEventInput!): EventMutationResponse!
    updateEvent(eventId: ID!, input: UpdateEventInput!): EventMutationResponse!
    deleteEvent(eventId: ID!): MutationResponse!
    cancelEvent(eventId: ID!): EventMutationResponse!
    inviteToEvent(eventId: ID!, emails: [EmailAddress!]!): EventMutationResponse!
    removeFromEvent(eventId: ID!, email: EmailAddress!): EventMutationResponse!
    
    # Admin Mutations (if needed)
    adminUpdateUser(userId: ID!, input: UpdateUserInput!): UserMutationResponse!
  }

  type Subscription {
    # Real-time subscriptions
    eventCreated: Event!
    eventUpdated(eventId: ID!): Event!
    eventDeleted: ID!
    userInvitedToEvent: Event!
  }
`;

module.exports = { typeDefs };