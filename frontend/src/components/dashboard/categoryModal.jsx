import React, { useState } from "react";
import "../../pages/dash/dashboard.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { categoryAddApiHandler } from "../../services/allapis";

const AddCategoryModal = ({ show, handleClose }) => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  // cancel handler
  const categoryModalCancelHandler = () => {
    setCategory("");
  };

  // Add Category Handler
  const categoryAddHandler = () => {
    const categoryData = {
      categoryName: category,
    };
    dispatch(categoryAddApiHandler(categoryData));
    categoryModalCancelHandler();
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        categoryModalCancelHandler(), handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={categoryModalCancelHandler}>
          Cancel
        </Button>
        <Button variant="primary" onClick={categoryAddHandler}>
          Add Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryModal;
