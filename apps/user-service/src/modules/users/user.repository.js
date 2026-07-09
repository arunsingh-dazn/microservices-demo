import User from "../../models/users/user.model.js";

export function createUserRepository() {
  return {
    async create(payload) {
      return User.create(payload);
    },

    async findByEmail(email) {
      return User.findOne({ email });
    },

    async findByEmailForLogin(email) {
      return User.findOne({ email }).select("+password");
    },

    async findById(id) {
      return User.findById(id);
    },

    async updateRefreshToken(userId, refreshToken) {
      return User.findByIdAndUpdate(
        userId,
        {
          refreshToken,
        },
        {
          new: true,
        },
      );
    },
  };
}
