const express = require("express");
const {
  getCategory,
  addCategory,
  deleteCategory,
} = require("../controllers/categories");
const { isAuthorized } = require("../middlewares/isAuthorized");
const router = express.Router();

// getAll category
router.get("/getallcategory", getCategory);

// add Category
router.post("/addcategory", isAuthorized, addCategory);

// delete Category
router.delete("/deleteCategory/:id", isAuthorized, deleteCategory);

module.exports = router;
