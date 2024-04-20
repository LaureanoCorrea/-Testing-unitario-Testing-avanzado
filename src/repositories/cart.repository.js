class CartRepository {
  constructor(cartDao) {
    this.dao = cartDao;
  }

  async get(filter) {
    try {
      return await this.dao.get(filter);
    } catch (error) {
      throw new Error("Error al obtener los carritos");
    }
  }

  async getById(filter, lean = false) {
    try {
      return await this.dao.getBy(filter, lean);
    } catch (error) {
      throw new Error(`Error obteniendo carrito: ${error.message}`);
    }
  }

  async create({ userEmail }) {
    try {
      return await this.dao.create({ userEmail, products: [] });
    } catch (error) {
      throw new Error(`Error creando carrito: ${error.message}`);
    }
  }

  async update(cartId, newData) {
    try {
      return await this.dao.update(cartId, newData);
    } catch (error) {
      throw new Error(`Error actualizando carrito: ${error.message}`);
    }
  }

  async addProduct(cartId, productId, quantity) {
    try {
      return await this.dao.add(cartId, productId, quantity);
    } catch (error) {
      throw new Error(`Error añadiendo producto al carrito: ${error.message}`);
    }
  }

  async deleteProduct(cartId, productId = null) {
    try {
      return await this.dao.delete(cartId, productId);
    } catch (error) {
      throw new Error(`Error eliminando producto del carrito: ${error.message}`);
    }
  }
}

export default CartRepository;
