import { db } from "../config/db.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in getProducts function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
      [name, price, image]
    );

    // MySQL does not support RETURNING *, so fetch the inserted row
    const [newProduct] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in createProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a single product
export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [product] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (!product[0]) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?",
      [name, price, image, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const [updatedProduct] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    res.status(200).json({ success: true, data: updatedProduct[0] });
  } catch (error) {
    console.log("Error in updateProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch product first to return after deletion
    const [product] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (!product[0]) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await db.query("DELETE FROM products WHERE id = ?", [id]);

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
