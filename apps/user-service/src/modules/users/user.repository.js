import User from "../../models/users/user.model.js";

export function createUserRepository() {
  return {
    async create(payload) {
      return User.create(payload);
    },

    async findByEmail(email) {
      return User.findOne({ email });
    },

    async findById(id) {
      return User.findById(id);
    },
  };
}
