import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const RegisterView = () => {
  return (
    <div>
      <h2
        className="text-center mb-3"
        style={{ fontFamily: "Jomhuria", fontSize: "80px" }}
      >
        Register
      </h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Show password" />
        </Form.Group>
        <button className="btn btn-danger d-flex ms-auto">Submit</button>
      </Form>
      <p className="mt-4 text-center">
        Already have an account?, Click here to <Link to="/login">login</Link>
      </p>
    </div>
  );
};

export default RegisterView;
