import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
/**
 * @desc    Get all products (Public)
 * @route   GET /api/products
 */
export const getProducts = async (req, res, next) => {
  try {
    const { category , search} = req.query;
    let filter = {};

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
    
      if (!categoryDoc) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
      filter.category = categoryDoc._id;
    }

    if(search){
      filter.name ={$regex: search , $options : 'i'};
    }

    const products = await Product.find(filter).populate("category")
    // .where('isActive').equals(true);
    return res.json({ success: true, data: products });
  } catch (error) {
    console.error("Error in getProducts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, categoryId, stock } = req.body;

    if (!name || !price || !description || !categoryId || !stock) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const categoryExist = await category.findById(categoryId);
    if (!categoryExist)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category: categoryId,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Instead of hard delete, mark inactive
    product.isActive = false;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product deleted (soft delete)",
    });
  } catch (error) {
    next(error);
  }
};
