import React, { useEffect } from "react";
import "../../pages/home/home.css";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesApiHandler } from "../../services/allapis";

const CategorySection = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoriesApiHandler());
  }, [dispatch]);

  return (
    <div>
      <div className="trendingHeader">
        <h3 style={{ fontSize: "70px", lineHeight: "50px" }}>
          What u looking for?
        </h3>
      </div>
      <div
        className="justify-content-center py-5 d-flex align-items-center"
        style={{ backgroundColor: "#20242b" }}
      >
        {isLoading && <div>Loading</div>}
        {!isLoading && data && (
          <Row className="w-100">
            {data?.map((cat, index) => (
              <Col
                md={4}
                sm={6}
                lg={3}
                className="mb-4 d-flex justify-content-center align-items-center"
                key={index}
              >
                <div className="cat-container rounded-4">
                  <img
                    draggable={false}
                    src="https://img.freepik.com/free-photo/group-people-drinking-beer-bar_1340-32839.jpg?t=st=1722450048~exp=1722453648~hmac=81e36e1feb3f0930f8dffa848969af4d42597f2937a632c0811717bd590032b2&w=1060"
                    alt="Category Image"
                    height="100%"
                    width="100%"
                  />
                  <h4 className="centered">{cat.type}</h4>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
