import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  filterEventsApiHandler,
  getCategoriesApiHandler,
} from "../../services/allapis";

const TicketFilterSection = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.category);

  //   state
  const [filter, setFilter] = useState({
    category: "",
    price: "",
    sort: "",
  });

  //   filter Handler
  const handleFilter = (e) => {
    e.preventDefault();
    if (e.target.value == 0) {
      switch (e.target.name) {
        case "category":
          setFilter({ ...filter, category: "" });
          break;
        case "price":
          setFilter({ ...filter, price: "" });
          break;
        case "sort":
          setFilter({ ...filter, sort: "" });
          break;
        default:
          break;
      }
      return;
    }
    switch (e.target.name) {
      case "category":
        setFilter({ ...filter, category: e.target.value });
        break;
      case "price":
        setFilter({ ...filter, price: e.target.value });
        break;
      case "sort":
        setFilter({ ...filter, sort: e.target.value });
        break;
      default:
        break;
    }
  };

  //   filter Apply handler
  const filterApplyHandler = () => {
    dispatch(filterEventsApiHandler(filter));
  };

  useEffect(() => {
    dispatch(getCategoriesApiHandler());
  }, []);

  return (
    <div style={{ paddingTop: "100px", overflow: "hidden" }}>
      {/* filterContainer */}
      <Row
        className="d-flex justify-content-between px-4"
        style={{ minHeight: "160px", backgroundColor: "#edf2f4" }}
      >
        <Col md={10}>
          <Row className="d-flex align-items-center h-100">
            {/* Category div */}
            <Col
              md={4}
              className="d-flex align-items-end"
              style={{ height: "50px" }}
            >
              <h6 className="me-3">Category:</h6>
              <Form.Select
                aria-label="Default select example"
                onInput={(e) => handleFilter(e)}
                name="category"
              >
                <option value={0}>Don't selected</option>
                {isLoading && <option disabled>Loading</option>}
                {!isLoading &&
                  data &&
                  data?.map((cat, index) => (
                    <option value={cat.type} key={index}>
                      {cat.type}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            {/* Price div */}
            <Col
              md={4}
              className="d-flex align-items-end"
              style={{ height: "50px" }}
            >
              <h6 className="me-3">Price:</h6>
              <Form.Select
                aria-label="Default select example"
                onInput={(e) => handleFilter(e)}
                name="price"
              >
                <option value={0}>Don't selected</option>
                <option value="<1000">Below 1000</option>
                <option value="1000-2000">1000 - 2000</option>
                <option value=">2000">above 2000</option>
              </Form.Select>
            </Col>
            {/* Sort div */}
            <Col
              md={4}
              className="d-flex align-items-end"
              style={{ height: "50px" }}
            >
              <h6 className="me-3">Sort:</h6>
              <Form.Select
                aria-label="Default select example"
                onInput={(e) => handleFilter(e)}
                name="sort"
              >
                <option value={0}>Don't selected</option>
                <option value="1">price low to high</option>
                <option value="2">price high to low</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
        {/* Apply button */}
        <Col
          md={2}
          className="h-md-100 mt-4 mt-md-0 d-flex justify-content-center"
        >
          <button
            className="btn rounded-0 text-light fw-bold h-md-100"
            style={{ backgroundColor: "#d90429", width: "110px" }}
            onClick={filterApplyHandler}
          >
            Apply
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default TicketFilterSection;
