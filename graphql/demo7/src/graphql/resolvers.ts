import { User } from "../models/user-model";

export const resolvers = {
  Query: {
    // 📌 Fetch all users
    users: async () => {
      return await User.findAll();
    },
  },

  Mutation: {
    // 📌 Create a new user
    createUser: async (
      _ : any,
      { name, Email }: { name: string; Email: string }
    ) => {
      if (!name || !Email) {
        throw new Error("Name and Email are required");
      }

      // ✅ normalize email field name
      return await User.create({
        name,
        email: Email,
      });
    },

    // 📌 Update an existing user by ID
    updateUser: async (
      _  :any,
      { id, name, email }: { id: number; name?: string; email?: string }
    ) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;

      await user.save();
      return user;
    },

    // 📌 Delete a user by ID
    deleteUser: async (_ : any, { id }: { id: number }) => {
      const deletedCount = await User.destroy({ where: { id } });
      return deletedCount > 0; // true if at least 1 row was deleted
    },
  },
};
