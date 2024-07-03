const prisma = require("../models/prisma")

const productService = {}

// find
productService.getProductById = (productId) => prisma.product.findUnique({where:{id:productId}})

productService.getAllProductByStoreProfileId = (storeProfileId) => prisma.product.findMany({
  where: {storeProfileId: {in: [storeProfileId]}}
})

// create
productService.createProduct = (data) => prisma.product.create({data})

//update
productService.updateProductById = (id) => prisma.product.update({where:{id}})

// delete
productService.deleteProductById = (productId) => prisma.product.delete({where:{id:productId}})

module.exports = productService;