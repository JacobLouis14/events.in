import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLoginApi } from "../../redux/slices/authslice";

const LoginView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // submit Handler
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      alert("complete the form");
    }
    const res = await dispatch(authLoginApi(loginData));
    console.log(res);
    if (res.payload.token) {
      const redirect = sessionStorage.getItem("redirect");
      const isLogOut = sessionStorage.getItem("isLogOut");
      if (isLogOut) {
        sessionStorage.removeItem("isLogOut");
      }
      if (redirect) {
        sessionStorage.removeItem("redirect");
        navigate(redirect, { replace: true });
      } else {
        navigate("/");
      }
    }

    clearForm();
  };

  // clear formData
  const clearForm = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h2
        className="text-center mb-3"
        style={{ fontFamily: "Jomhuria", fontSize: "80px" }}
      >
        Login
      </h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Show password" />
        </Form.Group>
        <button
          className="btn btn-danger d-flex ms-auto"
          onClick={(e) => loginSubmitHandler(e)}
        >
          Submit
        </button>
      </Form>
      <p className="mt-4 text-center">
        New user?, Click here to <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginView;
