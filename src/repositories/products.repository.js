class ProductRepository {
  constructor(productDao) {
    this.dao = productDao;
  }

  getProducts = async () => await this.dao.get();
  getProduct = async (filter) => await this.dao.get(filter);
  createProduct = async (newProduct) => await this.dao.create(newProduct);
  updateProduct = async (pid, productToUpdate) =>
    await this.dao.create(pid, productToUpdate);
  deleteProduct = async (pid) => await this.dao.create(pid);
}
export default ProductRepository;

// class ProductRepository {
//   constructor(productDao) {
//     this.dao = productDao;
//   }

//   async getProducts(filter = {}, options = {}) {
//
//         const result = await this.dao.paginate(filter, options);
//         return result;
//
//   }

//   async createProduct(data) {
//     try {
//       return await this.dao.create(data);
//     } catch (error) {
//       throw new Error(`Error creando producto: ${error.message}`);
//     }
//   }

//   async updateProduct(productId, newData) {
//     try {
//       return await this.dao.update(productId, newData);
//     } catch (error) {
//       throw new Error(`Error actualizando producto: ${error.message}`);
//     }
//   }

//   async deleteProduct(productId) {
//     try {
//       return await this.dao.delete(productId);
//     } catch (error) {
//       throw new Error(`Error eliminando producto: ${error.message}`);
//     }
//   }
// }

// export default ProductRepository;

// class ProductRepository {
//     constructor(productDao) {
//       this.dao = productDao;
//     }

//     async getProducts(filter = {}, options = {}) {
//       try {
//         if (options.limit && options.page) {
//           const result = await this.dao.paginate(filter, {
//             ...options,
//             lean: true,
//           });
//           return result;
//         } else if (filter._id !== undefined) {
//           const product = await this.productsModel.findById(filter._id).lean();
//           if (!product) {
//             throw new Error("Producto no encontrado");
//           }
//           return product;
//         } else {
//           const products = await this.productsModel.find(filter).lean();
//           return products;
//         }
//       } catch (error) {
//         throw new Error(`Error obteniendo productos: ${error.message}`);
//       }
//     }

//     async createProduct(data) {
//       try {
//         return await this.dao.create(data);
//       } catch (error) {
//         throw new Error(`Error creando producto: ${error.message}`);
//       }
//     }

//     async updateProduct(productId, newData) {
//       try {
//         return await this.dao.update(productId, newData);
//       } catch (error) {
//         throw new Error(`Error actualizando producto: ${error.message}`);
//       }
//     }

//     async deleteProduct(productId) {
//       try {
//         return await this.dao.delete(productId);
//       } catch (error) {
//         throw new Error(`Error eliminando producto: ${error.message}`);
//       }
//     }
//   }

//   export default ProductRepository;
