const prisma = require("../models/prisma");

const productService = {};

// find
productService.getProductById = (productId) =>
  prisma.product.findUnique({ where: { id: productId } });
productService.getAllProductByStoreProfileId = (storeProfileId) =>
  prisma.product.findMany({
    where: { storeProfileId: { in: [storeProfileId] } },
  });
productService.findFirstProductByProductIdAndStoreProfileId = (
  id,
  storeProfileId
) => prisma.product.findFirst({ where: { id, storeProfileId } });
productService.findManyProductByStoreProfileId = (storeProfileId) =>
  prisma.product.findMany({ where: { storeProfileId } });

// create
productService.createProduct = (data) => prisma.product.create({ data });

//update
productService.updateProduct = (id, data) =>
  prisma.product.update({ where: { id }, data: data });

// delete
productService.deleteProductById = (productId) =>
  prisma.product.delete({ where: { id: productId } });

module.exports = productService;
