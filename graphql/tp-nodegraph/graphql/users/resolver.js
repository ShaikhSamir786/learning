const { User}= require("../../models/authmodels");

const { Event}= require("../../models/event-model");


const userResolvers = {
     Query: {
    users: async () => await User.findAll(),
    user: async (_, { id }) => await User.findByPk(id)
     

     },

     Mutation :{
            registerUser: async (_, { firstName, lastName, email, password }) => {
  try {
    // Input validation
    if (!firstName || !lastName || !email || !password) {
      throw new Error('All fields are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password: hashed 
    });

    // Ensure user was created
    if (!user) {
      throw new Error('Failed to create user in database');
    }

    // Return the user (make sure it has all required fields from your schema)
    return user;

  } catch (error) {
    console.error('User registration error:', error);
    
    // Handle specific error types
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Email already registered');
    }
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      throw new Error(`Invalid input: ${messages.join(', ')}`);
    }
    
    throw new Error(error.message || 'Registration failed');
  }
},

     loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Invalid password");
      return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "24h" });
    },

     }


}

module.exports = { userResolvers}