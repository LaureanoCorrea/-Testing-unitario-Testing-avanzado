import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import { generateToken } from "../utils/jsonwebtoken.js";
import { cartService, userService } from "../repositories/index.js";



class SessionsController {
  constructor() {
    this.userService = userService
    this.cartService = cartService
  }

  async register(req, res) {
    const { first_name, last_name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await this.userService.getUsers({ email });
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        // Crear el nuevo usuario
        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
        };

        const { newUser: createdUser, newCart } = await this.userService.createUser(newUser);

        res.status(201).render("exito", { name: newUser.first_name });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}


  async login(req, res) {
    try {
      const { email, password } = req.body;
  
      const user = await this.userService.getUser({ email });
      console.log("USERLOGIN", user);
      console.log("USERmail", email);
      if (!user || !isValidPassword( { password: user.password }, password))
        return res.status(401).send("Credenciales inválidas");
      console.log("USER", req.user);
  
      const token = generateToken({
        first_name: user.first_name,
        id: user._id,
        role: user.role,
        cid: user.cid,
      });
      res.cookie("cookieToken", token, {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true,
      });
      res.redirect("/products");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).send("Error (products) interno del servidor");
    }
  };

  failLogin(req, res) {
    res.send({ status: "error", message: "Login Fails" });
  }

  logout(req, res) {
    res.clearCookie("cookieToken");
    res.redirect("/login");
  }
}

export default SessionsController;
