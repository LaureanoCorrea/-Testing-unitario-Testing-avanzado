// import { UserDaoMongo } from "../dao/UserDaoMongo.js";
// import { CartManagerMongo } from "../dao/CartManagerMongo.js";
// import { generateToken } from "../utils/jsonwebtoken.js";
// import { createHash, isValidPassword } from "../utils/hashBcrypt.js";

// class SessionService {
//   constructor() {
//     this.userService = new UserDaoMongo();
//     this.cartManager = new CartManagerMongo();
//   }

//   async registerUser(userData) {
//     try {
//       const existingUser = await this.userService.getBy({ email: userData.email });
//       if (existingUser) {
//         throw new Error("El usuario ya existe");
//       }

//       const newUser = await this.userService.create(userData);

//       // Crear un carrito de compras asociado al nuevo usuario
//       const newCart = await this.cartManager.create({ products: [] });

//       // Actualizar el usuario con el ID del carrito
//       await this.userService.update(newUser._id, { cart: newCart._id });
//       console.log("newUser", newUser);
//       console.log("newCart", newCart);
//       return { newUser, newCart };
//     } catch (error) {
//       throw new Error(`Error al registrar usuario: ${error.message}`);
//     }
//   }

//   async loginUser(email, password) {
//     try {
//       const user = await this.userService.getBy({ email });
//       if (!user || !isValidPassword({ password: user.password }, password)) {
//         throw new Error("Credenciales inválidas");
//       }

//       // Obtener el carrito del usuario
//       const cart = await this.cartManager.getBy(user.cart);

//       // Generar el token
//       const token = generateToken({
//         first_name: user.first_name,
//         id: user._id,
//         role: user.role,
//         cart: cart._id,
//       });

//       return { user, cart, token };
//     } catch (error) {
//       throw new Error(`Error al iniciar sesión: ${error.message}`);
//     }
//   }
// }

// export default SessionService;
