import usersModel from "../Mongo/models/users.model.js";
import cartsModel from "./models/carts.model.js";

class UserDaoMongo {
  constructor() {
    this.usersModel = usersModel;
    this.cartsModel = cartsModel;
  }

  async get() {
    return await this.usersModel.find({});
  }

  async getBy(email) {
    console.log("Searching user by email:", email);
    const user = await this.usersModel.findOne({ email: email.email }); // Pasar solo el valor del correo electrónico como cadena
    console.log("User found:", user);
    return user;
}

async getUser(filter) {
  return await this.usersModel.findOne(filter);
}

  async create(newUser) {
    const user = await this.usersModel.create(newUser);
    const newCart = await this.cartsModel.create({
      userEmail: newUser.email,
      products: [],
    });
    user.cid = newCart._id;
    await user.save();
    return user;
  }

  // async create(newUser) {
  //   try {
  //     const user = await this.usersModel.create(newUser);
  //     return user;
  //   } catch (error) {
  //     throw new Error(`Error al crear el usuario: ${error.message}`);
  //   }
  // }

async update(uid, userToUpdate) {
  const updated = await this.usersModel.findByIdAndUpdate({ _id: uid }, userToUpdate, {
    new: true,
  });
  return updated;
}


  async delete(uid) {
    return await this.usersModel.deleteOne({ _id: uid });
  }
}

export default UserDaoMongo;
