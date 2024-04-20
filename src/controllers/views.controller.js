import { cartService, productService, userService } from "../repositories/index.js";

class ViewController {
  constructor() {
    this.cartService = cartService
    this.userService = userService
    this.productService = productService
  }

  async login(req, res) {
    res.render("login", { style: "index.css" });
  }

  async register(req, res) {
    res.render("register", { style: "index.css" });
  }

  async products(req, res) {
    const { limit = 10, page = 1, sort = "", query = "" } = req.query;
    try {
      const options = {
        limit,
        page,
        sort: sort || {},
        query,
        lean: true,
      };

      const cartId = req.cookies.cartId;
      const cart = this.cartService
        ? await this.cartService.getById(cartId)
        : null;
        if (!cart) {
        }
      const {
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page: currentPage,
      } = await this.productService.getProducts({}, options);

      const user = req.user;
      const username = req.user.first_name;
      const role = user ? user.role : "";

      res.render("products", {
        username,
        role,
        cartId,
        products: products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page: currentPage,
        userId: req.user.id,
        style: "index.css",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async cart(req, res) {
    try {
      const cartId = req.user.cart;
      const cart = await this.cartService.getById(cartId, true);
      const username = req.user.first_name;
      const role = req.user.role;
      res.render("cart", { cartId, cart, username, role, style: "index.css" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async realtimeProducts(req, res) {
    try {
      const products = await this.productService.getProducts({});
      res.render("realTimeProducts", {
        productos: products,
        style: "index.css",
      });
    } catch (error) {
      console.log(error);
      res.json("Error al intentar obtener la lista de productos!");
      return;
    }
  }

  async productDetails(req, res) {
    const { pid } = req.params;
    try {
      const product = await this.productService.getProduct({_id: pid });
      const username = req.user.first_name;
      const role = req.user.role;
      const cartId = req.user.cart;

      res.render("productDetails", {
        username,
        role,
        cartId,
        userId: req.user.id,
        product,
        style: "index.css",
      });
    } catch (error) {
      console.log(error);
      res.json("Error al intentar obtener el producto!");
      return;
    }
  }

  async productAdded(req, res) {
    try {
      const { productId } = req.params;
      const pid = productId;
      const product = await this.productService.getProduct({_id: pid });
      const username = req.user.first_name;
      const role = req.user.role;

      res.render("product-added", {
        username,
        role,
        product,
        style: "index.css",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Error interno del servidor" });
    }
  }
}

export default ViewController;
