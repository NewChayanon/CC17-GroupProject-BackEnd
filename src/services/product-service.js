const prisma = require("../models/prisma");

const productService = {};

// find
productService.getProductById = (productId) =>
  prisma.product.findUnique({ where: { id: productId } });
productService.getAllProductByStoreProfileId = async(storeProfileId) => {
  const dataFormat = await prisma.product.findMany({
    where: { storeProfileId: { in: [storeProfileId] } },
  });
  return dataFormat.map((el)=>{
    const {id, name, description, image, price, unit, ...rest} = el
    return {
      ...rest,
      productId : id,
      productName: name,
      productDescription: description,
      productImage: image,
      productPrice: price,
      productUnit: unit}
  })
}
productService.findFirstProductByProductIdAndStoreProfileId = (
  id,
  storeProfileId
) => prisma.product.findFirst({ where: { id, storeProfileId } });
productService.findManyProductByStoreProfileId = (storeProfileId) =>
  prisma.product.findMany({ where: { storeProfileId } });
productService.findManyStoreProfileSelectIdAndName = () =>
  prisma.product.findMany({ select: { id: true, name: true ,EventItem:true}});

// create
productService.createProduct = async(data) => {
  const dataFormat = await prisma.product.create({ data });
  return {
    productId: dataFormat.id,
    productName: dataFormat.name,
    productDescription: dataFormat.description,
    productImage: dataFormat.image,
    productPrice: dataFormat.price,
    productUnit: dataFormat.unit
  }
}

//update
productService.updateProduct = (id, data) =>
  prisma.product.update({ where: { id }, data: data });

// delete
productService.deleteProductById = (productId) =>
  prisma.product.delete({ where: { id: productId } });

module.exports = productService;
