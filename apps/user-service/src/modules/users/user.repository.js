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
  };
}
