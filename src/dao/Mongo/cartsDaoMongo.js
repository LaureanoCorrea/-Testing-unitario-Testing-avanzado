import cartsModel from "../Mongo/models/carts.model.js";

class CartDaoMongo {
  constructor() {
    this.cartsModel = cartsModel;
  }

  async get() {
    return this.cartsModel.find({});
  }

  async getBy(filter, lean = false) {
    const query = this.cartsModel.findById(filter);
    return lean ? query.lean().exec() : query.exec();
  }

  async create({ userEmail }) {
    return this.cartsModel.create({ userEmail, products: [] });
  }

  async update(cid, product) {
    const updatedCart = await this.cartModel.findOneAndUpdate(
      { _id: cid, "products.product": product.id },
      { $inc: { "products.$.quantity": product.quantity } },
      { new: true }
    );

    return (
      updatedCart ||
      (await this.cartModel.findOneAndUpdate(
        { _id: cid },
        {
          $push: {
            products: { product: product.id, quantity: product.quantity },
          },
        },
        { new: true, upsert: true }
      ))
    );
  }
  //  async update(cartId, newData) {
  //   return this.cartsModel.findByIdAndUpdate(cartId, newData, { new: true });
  // }

  async add(cid, productId, quantity) {
    let cart = await this.cartsModel.findOne({ cid });
    console.log("CART-DAO", cart);
    const existingProductIndex = cart.products.findIndex(
      (item) => item.product === productId
    );
    existingProductIndex !== -1
      ? (cart.products[existingProductIndex].quantity += quantity)
      : cart.products.push({ product: productId, quantity });
    await cart.save();
    return cart;
  }
  //  async add(cartId, productId, quantity) {
  //   return this.cartsModel.findByIdAndUpdate(
  //     cartId,
  //     { $push: { products: { product: productId, quantity } } },
  //     { new: true }
  //   );
  // }

  async deleteCart(cid) {
    return await this.cartModel.findByIdAndDelete(cid);
  }
  
  async delete(cartId, productId = null) {
    const updateQuery = productId
      ? { $pull: { products: { _id: productId } } }
      : { $set: { products: [] } };

    return this.cartsModel.findByIdAndUpdate(cartId, updateQuery, {
      new: true,
    });
  }
}

export default CartDaoMongo;

// class CartManagerMongo {
//   constructor() {
//     this.cartsModel = cartsModel;
//   }

//   async get() {
//     try {
//       return await this.cartsModel.find({});
//     } catch (error) {
//       throw new Error("Error al obtener los carritos");
//     }
//   }

//   async getBy(filter, lean = false) {
//     try {
//       let query = this.cartsModel.findById(filter);
//       if (lean) {
//         query = query.lean();
//       }
//       const cart = await query.exec();
//       if (!cart) {
//         throw new Error("Carrito no encontrado");
//       }
//       return cart;
//     } catch (error) {
//       throw new Error(`Error obteniendo carrito: ${error.message}`);
//     }
//   }

//   async create(data) {
//     try {
//       const cart = await this.cartsModel.create(data);
//       return cart;
//     } catch (error) {
//       throw new Error(`Error creando carrito: ${error.message}`);
//     }
//   }

//   async update(cartId, newData) {
//     try {
//       const updatedCart = await this.cartsModel.findByIdAndUpdate(
//         cartId,
//         newData,
//         { new: true }
//       );
//       if (!updatedCart) {
//         throw new Error("Carrito no encontrado");
//       }
//       return updatedCart;
//     } catch (error) {
//       throw new Error(`Error actualizando carrito: ${error.message}`);
//     }
//   }

//   async add(cartId, productId, quantity) {
//     try {
//       const updatedCart = await this.cartsModel.findByIdAndUpdate(
//         cartId,
//         { $push: { products: { product: productId, quantity } } },
//         { new: true }
//       );
//       if (!updatedCart) {
//         throw new Error("Carrito no encontrado");
//       }
//       return updatedCart;
//     } catch (error) {
//       throw new Error(`Error añadiendo producto al carrito: ${error.message}`);
//     }
//   }

//   async delete(cartId, productId = null) {
//     try {
//       if (productId) {
//         // Si se proporciona productId, se elimina el producto del carrito
//         const updatedCart = await this.cartsModel.findByIdAndUpdate(
//           cartId,
//           { $pull: { products: { _id: productId } } },
//           { new: true }
//         );
//         if (!updatedCart) {
//           throw new Error("Carrito no encontrado");
//         }
//         return updatedCart;
//       } else {
//         // Si no se proporciona productId, se vacía el carrito
//         const updatedCart = await this.cartsModel.findByIdAndUpdate(
//           cartId,
//           { $set: { products: [] } },
//           { new: true }
//         );
//         if (!updatedCart) {
//           throw new Error("Carrito no encontrado");
//         }
//         return updatedCart;
//       }
//     } catch (error) {
//       throw new Error(`Error eliminando del carrito: ${error.message}`);
//     }
//   }
// }

// export default CartManagerMongo;
