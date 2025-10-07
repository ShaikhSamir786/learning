import { User } from "../models/user-model";

export const resolvers = {
  Query: {
    users: async () => await User.findAll(),
  },
  Mutation: {
    createUser: async (_: any, { name, Email }: { name: string; Email: string }) => {
      return await User.create({ name: name, email: Email });
    },

    updateUser: async (
      _: any,
      { id, name, email }: { id: number; name?: string; email?: string }
    ) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      if (name) user.name = name;
      if (email) user.email = email;

      await user.save();
      return user;
    },

    deleteUser: async (_: any, { id }: { id: number }) => {
      const deletedCount = await User.destroy({ where: { id } });
      return deletedCount > 0;
    },
  },
};