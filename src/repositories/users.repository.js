import UserDto from "../dto/userDto.js";

class UserRepository {
  constructor(userDao) {
    this.dao = userDao;
  }

  getUsers = async (filter) => {
    await this.dao.get(filter);
  };

  getUser = async (email) => {
    await this.dao.getBy(email);
  };

  createUser = async (newUser) => {
    const newUserDto = new UserDto(newUser); // Transformar el DTO a objeto de usuario
    return await this.dao.create(newUserDto);
  };

  getUserById = async (uid) => {
    await this.dao.get({ _id: uid });
  };

  async updateUser(uid, userToUpdate) {
    await this.dao.update({ _id: uid }, userToUpdate);
  }

  deleteUser = async (uid) => {
    await this.dao.delete({ _id: uid });
  };
}

export default UserRepository;
