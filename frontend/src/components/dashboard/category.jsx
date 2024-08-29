import React, { useState, useEffect } from "react";
import "../../pages/dash/dashboard.css";
import Table from "react-bootstrap/Table";
import AddCategoryModal from "./categoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryDeleteApiHandler,
  getCategoriesApiHandler,
} from "../../services/allapis";

const CategoryDashboard = () => {
  const dispatch = useDispatch();
  const [showCategoryAddModal, setShowCategoryAddModal] = useState(false);
  const handleModalOpen = () => setShowCategoryAddModal(true);
  const handleModalClose = () => setShowCategoryAddModal(false);
  const { error, isLoading, data } = useSelector((state) => state.category);

  // delete Handler
  const categoryDeleteHandler = (id) => {
    dispatch(categoryDeleteApiHandler(id));
  };

  useEffect(() => {
    dispatch(getCategoriesApiHandler());
  }, []);

  return (
    <div className="pt-5 d-flex flex-column">
      <button
        className=" ms-auto btn btn-danger mb-4 me-3"
        onClick={handleModalOpen}
      >
        Add Category
      </button>
      <div className="d-flex justify-content-center">
        <div className="w-75">
          {isLoading && <h5 className="text-light">Loading</h5>}
          {error && <h5 className="text-light">Something went wrong</h5>}
          {!error && !isLoading && data == "" && (
            <h5 className="text-light">No Data</h5>
          )}
          {!error && !isLoading && data != "" && (
            <Table responsive bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((cat, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{cat.type}</td>
                    <td className="d-flex justify-content-evenly">
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleModalOpen}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => categoryDeleteHandler(cat._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
      <AddCategoryModal
        show={showCategoryAddModal}
        handleClose={handleModalClose}
      />
    </div>
  );
};

export default CategoryDashboard;
