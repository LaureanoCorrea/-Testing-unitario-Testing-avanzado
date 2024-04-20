import productsModel from "../Mongo/models/products.model.js";

class ProductDaoMongo {
  constructor() {
    this.product = productsModel;
  }

  async get({ limit = 10, page = 1, category = "", sort = 1 }) {
    return await this.product.paginate(
      category.length !== 0 ? { category: category } : {},
      { limit, page, lean: true, sort: { price: sort } }
    );
  }

  async getById(pid) {
    return await product.findOne({ _id: pid }).lean();
  }

  async create(newProduct) {
    return await this.product.create(newProduct); // return newProduct
  }

  async update(pid, updateProduct) {
    return await this.product.findByIdAndUpdate({ _id: pid }, updateProduct, {
      new: true,
    });
  }

  async remove(pid) {
    return await this.product.findByIdAndUpdate(
      { _id: pid },
      { isActive: false },
      { new: true }
    );
  }
}
export default ProductDaoMongo;
// import productsModel from "../Mongo/models/products.model.js";

// class ProductDaoMongo {
//   constructor() {
//     this.productsModel = productsModel;
//   }

//   async get(filter = {}, options = {}) {
//     await this.productsModel.paginate(filter, {
//       ...options,
//       lean: true,
//     });
//   }

//   async create(data) {
//     await this.productsModel.create(data);
//   }

//   async update(productId, newData) {
//     await this.productsModel.findByIdAndUpdate(productId, newData, {
//       new: true,
//     });
//   }

//   async delete(productId) {
//     await this.productsModel.findByIdAndDelete(productId);
//   }
// }

// export default ProductDaoMongo;
