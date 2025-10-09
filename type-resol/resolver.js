// resolvers.js
const { User } = require("../models/authmodels");
const { Event } = require("../models/event-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const resolvers = {
  Query: {
    users: async () => await User.findAll(),
    user: async (_, { id }) => await User.findByPk(id),
    me: async (_, __, { userId }) => {
      if (!userId) throw new Error("Unauthorized");
      return await User.findByPk(userId);
    },
    searchUsers: async (_, { query }) => {
      return await User.findAll({
        where: {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${query}%` } },
            { lastName: { [Op.iLike]: `%${query}%` } },
            { email: { [Op.iLike]: `%${query}%` } }
          ]
        }
      });
    },
    events: async (_, { status, fromDate, toDate, limit = 50, offset = 0 }) => {
      const where = {};
      
      if (status) where.status = status;
      if (fromDate || toDate) {
        where.date = {};
        if (fromDate) where.date[Op.gte] = fromDate;
        if (toDate) where.date[Op.lte] = toDate;
      }

      return await Event.findAll({
        where,
        limit,
        offset,
        include: ["creator"],
        order: [['date', 'ASC']]
      });
    },
    event: async (_, { id }) => await Event.findByPk(id, { include: ["creator", "invitedUsers"] }),
    myEvents: async (_, __, { userId }) => {
      if (!userId) throw new Error("Unauthorized");
      return await Event.findAll({
        where: { createdBy: userId },
        include: ["creator"],
        order: [['date', 'ASC']]
      });
    },
    eventsInvitedTo: async (_, __, { userId }) => {
      if (!userId) throw new Error("Unauthorized");
      const user = await User.findByPk(userId);
      if (!user) throw new Error("User not found");
      return await user.getEventsInvited();
    },
    upcomingEvents: async (_, { limit = 10 }, { userId }) => {
      const where = {
        date: { [Op.gte]: new Date() }
      };
      
      if (userId) {
        where[Op.or] = [
          { createdBy: userId },
          // Add logic for events user is invited to
        ];
      }

      return await Event.findAll({
        where,
        limit,
        include: ["creator"],
        order: [['date', 'ASC']]
      });
    },
  },

  Mutation: {
    // Auth Mutations
    registerUser: async (_, { input }) => {
      try {
        const { firstName, lastName, email, password } = input;

        // Input validation
        if (!firstName || !lastName || !email || !password) {
          return {
            success: false,
            message: 'All fields are required',
            user: null,
            token: null,
            code: 'MISSING_FIELDS'
          };
        }

        if (password.length < 6) {
          return {
            success: false,
            message: 'Password must be at least 6 characters long',
            user: null,
            token: null,
            code: 'INVALID_PASSWORD'
          };
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return {
            success: false,
            message: 'Email already registered',
            user: null,
            token: null,
            code: 'EMAIL_EXISTS'
          };
        }

        // Hash password and create user
        const hashed = await bcrypt.hash(password, 12);
        const user = await User.create({ 
          firstName, 
          lastName, 
          email, 
          password: hashed,
          verified: false,
          isActive: true
        });

        if (!user) {
          return {
            success: false,
            message: 'Failed to create user in database',
            user: null,
            token: null,
            code: 'CREATION_FAILED'
          };
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: user.id, email: user.email }, 
          process.env.JWT_SECRET, 
          { expiresIn: "24h" }
        );

        return {
          success: true,
          message: 'User registered successfully',
          user,
          token,
          code: 'SUCCESS'
        };

      } catch (error) {
        console.error('User registration error:', error);
        
        if (error.name === 'SequelizeValidationError') {
          const messages = error.errors.map(err => err.message);
          return {
            success: false,
            message: `Invalid input: ${messages.join(', ')}`,
            user: null,
            token: null,
            code: 'VALIDATION_ERROR'
          };
        }
        
        return {
          success: false,
          message: error.message || 'Registration failed',
          user: null,
          token: null,
          code: 'UNKNOWN_ERROR'
        };
      }
    },

    loginUser: async (_, { input }) => {
      try {
        const { email, password } = input;
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
          return {
            success: false,
            message: "User not found",
            user: null,
            token: null,
            code: 'USER_NOT_FOUND'
          };
        }

        if (!user.isActive) {
          return {
            success: false,
            message: "Account is deactivated",
            user: null,
            token: null,
            code: 'ACCOUNT_DEACTIVATED'
          };
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return {
            success: false,
            message: "Invalid password",
            user: null,
            token: null,
            code: 'INVALID_PASSWORD'
          };
        }

        const token = jwt.sign(
          { id: user.id, email: user.email }, 
          process.env.JWT_SECRET, 
          { expiresIn: "24h" }
        );

        return {
          success: true,
          message: "Login successful",
          user,
          token,
          code: 'SUCCESS'
        };

      } catch (error) {
        console.error('Login error:', error);
        return {
          success: false,
          message: error.message || 'Login failed',
          user: null,
          token: null,
          code: 'UNKNOWN_ERROR'
        };
      }
    },

    logoutUser: async (_, __, { userId }) => {
      // In a real app, you might blacklist the token
      return {
        success: true,
        message: "Logged out successfully",
        code: 'SUCCESS'
      };
    },

    refreshToken: async (_, __, { userId }) => {
      if (!userId) throw new Error("Unauthorized");
      
      const user = await User.findByPk(userId);
      if (!user) throw new Error("User not found");

      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: "24h" }
      );

      return {
        success: true,
        message: "Token refreshed",
        user,
        token,
        code: 'SUCCESS'
      };
    },

    // Event Mutations
    createEvent: async (_, { input }, { userId }) => {
      try {
        if (!userId) throw new Error("Unauthorized");

        const event = await Event.create({
          ...input,
          createdBy: userId,
          status: 'SCHEDULED'
        });

        return {
          success: true,
          message: "Event created successfully",
          event,
          code: 'SUCCESS'
        };

      } catch (error) {
        console.error('Create event error:', error);
        return {
          success: false,
          message: error.message || 'Failed to create event',
          event: null,
          code: 'CREATION_FAILED'
        };
      }
    },

    updateEvent: async (_, { eventId, input }, { userId }) => {
      try {
        const event = await Event.findByPk(eventId);
        if (!event) {
          return {
            success: false,
            message: "Event not found",
            event: null,
            code: 'NOT_FOUND'
          };
        }

        if (event.createdBy !== userId) {
          return {
            success: false,
            message: "Not authorized to update this event",
            event: null,
            code: 'UNAUTHORIZED'
          };
        }

        await event.update(input);

        return {
          success: true,
          message: "Event updated successfully",
          event,
          code: 'SUCCESS'
        };

      } catch (error) {
        console.error('Update event error:', error);
        return {
          success: false,
          message: error.message || 'Failed to update event',
          event: null,
          code: 'UPDATE_FAILED'
        };
      }
    },

    deleteEvent: async (_, { eventId }, { userId }) => {
      try {
        const event = await Event.findByPk(eventId);
        if (!event) {
          return {
            success: false,
            message: "Event not found",
            code: 'NOT_FOUND'
          };
        }

        if (event.createdBy !== userId) {
          return {
            success: false,
            message: "Not authorized to delete this event",
            code: 'UNAUTHORIZED'
          };
        }

        await event.destroy();

        return {
          success: true,
          message: "Event deleted successfully",
          code: 'SUCCESS'
        };

      } catch (error) {
        console.error('Delete event error:', error);
        return {
          success: false,
          message: error.message || 'Failed to delete event',
          code: 'DELETE_FAILED'
        };
      }
    },

    cancelEvent: async (_, { eventId }, { userId }) => {
      try {
        const event = await Event.findByPk(eventId);
        if (!event) {
          return {
            success: false,
            message: "Event not found",
            event: null,
            code: 'NOT_FOUND'
          };
        }

        if (event.createdBy !== userId) {
          return {
            success: false,
            message: "Not authorized to cancel this event",
            event: null,
            code: 'UNAUTHORIZED'
          };
        }

        await event.update({ status: 'CANCELLED' });

        return {
          success: true,
          message: "Event cancelled successfully",
          event,
          code: 'SUCCESS'
        };

      } catch (error) {
        console.error('Cancel event error:', error);
        return {
          success: false,
          message: error.message || 'Failed to cancel event',
          event: null,
          code: 'CANCEL_FAILED'
        };
      }
    },

    // Placeholder mutations for future implementation
    verifyEmail: async (_, { token }) => ({
      success: true,
      message: "Email verification placeholder",
      code: 'SUCCESS'
    }),

    resendVerificationEmail: async (_, __, { userId }) => ({
      success: true,
      message: "Verification email sent placeholder",
      code: 'SUCCESS'
    }),

    forgotPassword: async (_, { email }) => ({
      success: true,
      message: "Password reset email sent placeholder",
      code: 'SUCCESS'
    }),

    resetPassword: async (_, { token, newPassword }) => ({
      success: true,
      message: "Password reset successful placeholder",
      code: 'SUCCESS'
    }),

    updateProfile: async (_, { input }, { userId }) => ({
      success: true,
      message: "Profile updated placeholder",
      user: await User.findByPk(userId),
      code: 'SUCCESS'
    }),

    changePassword: async (_, { currentPassword, newPassword }, { userId }) => ({
      success: true,
      message: "Password changed placeholder",
      code: 'SUCCESS'
    }),

    deactivateUser: async (_, __, { userId }) => ({
      success: true,
      message: "Account deactivated placeholder",
      code: 'SUCCESS'
    }),

    inviteToEvent: async (_, { eventId, emails }, { userId }) => ({
      success: true,
      message: "Invitations sent placeholder",
      event: await Event.findByPk(eventId),
      code: 'SUCCESS'
    }),

    removeFromEvent: async (_, { eventId, email }, { userId }) => ({
      success: true,
      message: "User removed from event placeholder",
      event: await Event.findByPk(eventId),
      code: 'SUCCESS'
    }),
  },

  Event: {
    createdBy: async (event) => await User.findByPk(event.createdBy),
    invitedUsers: async (event) => {
      // Implement logic to get invited users based on invitedEmails
      return await User.findAll({
        where: {
          email: event.invitedEmails || []
        }
      });
    },
  },

  User: {
    eventsCreated: async (user) => await Event.findAll({ 
      where: { createdBy: user.id },
      order: [['date', 'ASC']]
    }),
    eventsInvited: async (user) => {
      return await Event.findAll({
        where: {
          invitedEmails: {
            [Op.contains]: [user.email]
          }
        },
        order: [['date', 'ASC']]
      });
    },
  },
};

module.exports = resolvers;