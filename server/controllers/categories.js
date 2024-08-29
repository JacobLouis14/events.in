const categoryModel = require("../models/category");

// get all category Handler
const getCategory = async (req, res) => {
  try {
    const categoryData = await categoryModel.find({});
    if (categoryData.length === 0)
      return res.status(204).json({ message: "No Content" });

    return res.status(200).json({ message: "Success", data: categoryData });
  } catch (error) {
    return res.status(500).json({ message: "Internel server error", error });
  }
};

// add category Data
const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName)
      return res.status(400).json({ message: "required Category name/value" });

    const isCategoryExists = await categoryModel.findOne({
      type: { $regex: categoryName.toLowerCase(), $options: "i" },
    });
    if (isCategoryExists)
      return res.status(400).json({ message: "Already Exists" });

    const savedCategory = await new categoryModel({
      type: categoryName,
    }).save();
    return res.status(200).json({ message: "Success", data: savedCategory });
  } catch (error) {
    return res.status(500).json({ message: "Internel Server error", error });
  }
};

// delete Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Need id" });

    const isCategoryExists = await categoryModel.findById(id);
    if (!isCategoryExists)
      return res.status(400).json({ message: "Category not exists" });

    const deleteAck = await categoryModel.deleteOne({ _id: id });
    if (deleteAck.deletedCount != 1)
      throw new Error("error in deleteing data from mongo DB");

    const remainingCategory = await categoryModel.find({});
    if (remainingCategory.length === 0) {
      return res.status(204).json({ message: "No Content" });
    }

    return res
      .status(200)
      .json({ message: "Delete Success", data: remainingCategory });
  } catch (error) {
    return res.status(500).json({ message: "Internel server error", error });
  }
};

module.exports = { getCategory, addCategory, deleteCategory };
