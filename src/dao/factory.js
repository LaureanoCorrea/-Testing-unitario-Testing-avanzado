import { configObject, connectDB } from "../config/connectDB.js";

let UserDao;
let ProductDao;
let CartsDao;

switch (configObject.persistence) {
  case "FILE":
    // const UserDaoFile = import("./File/userDaoFile").default;
    // UserDao = UserDaoFile;
    break;

  case "MEMORY":
    break;

  default:
    connectDB();

   await import("./Mongo/userDaoMongo.js").then((module) => {
      UserDao = module.default;
    });

    await import("./Mongo/productsDaoMongo.js").then((module) => {
      ProductDao = module.default;
    });

    await import("./Mongo/cartsDaoMongo.js").then((module) => {
      CartsDao = module.default;
    });
    break;
}

export { UserDao, ProductDao, CartsDao };
