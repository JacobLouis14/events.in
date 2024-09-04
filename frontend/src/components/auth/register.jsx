import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import toastHandler from "../../utils/toast";
import { registerApiHandler } from "../../services/allapis";

const RegisterView = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    userType: "admin",
  });
  const [registerDataisValid, setRegisterDataisValid] = useState({
    name: true,
    email: true,
    password: true,
    mobile: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  // validation handler
  const validateHandler = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "name":
        setRegisterData({
          ...registerData,
          name: e.target.value,
        });
        if (/^[a-z A-Z]*$/.test(e.target.value)) {
          setRegisterDataisValid({
            ...registerDataisValid,
            name: true,
          });
        } else {
          setRegisterDataisValid({
            ...registerDataisValid,
            name: false,
          });
        }
        break;
      case "email":
        setRegisterData({
          ...registerData,
          email: e.target.value,
        });
        if (/^[a-z A-Z@.1-9]*$/.test(e.target.value)) {
          setRegisterDataisValid({
            ...registerDataisValid,
            email: true,
          });
        } else {
          setRegisterDataisValid({
            ...registerDataisValid,
            email: false,
          });
        }
        break;
      case "mobile":
        setRegisterData({
          ...registerData,
          mobile: e.target.value,
        });
        if (e.target.value.length <= 10) {
          setRegisterDataisValid({
            ...registerDataisValid,
            mobile: true,
          });
        } else {
          setRegisterDataisValid({
            ...registerDataisValid,
            mobile: false,
          });
        }
        break;
      case "password":
        setRegisterData({
          ...registerData,
          password: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = registerData;
    if (
      !name ||
      !email ||
      !password ||
      !registerDataisValid.name ||
      !registerDataisValid.email ||
      !registerDataisValid.password
    ) {
      toastHandler({ info: "Fill the form Completly/Correctly" });
      return;
    }
    const res = await registerApiHandler(registerData);
    console.log(res);
    if (res.status == 200) {
      toastHandler({ data: res.data.message });
    } else {
      toastHandler({ error: res.data.message });
      return;
    }
    navigate("/login");
  };

  return (
    <div>
      <h2
        className="text-center mb-3"
        style={{ fontFamily: "Jomhuria", fontSize: "80px" }}
      >
        Register
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={(e) => validateHandler(e)}
            value={registerData.name}
          />
          {!registerDataisValid.name && (
            <Form.Text className="text-danger">Enter valid data</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => validateHandler(e)}
            name="email"
            value={registerData.email}
          />
          {registerDataisValid.email ? (
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          ) : (
            <Form.Text className="text-danger">Enter valid email</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicMobile">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter mobile no"
            onChange={(e) => validateHandler(e)}
            name="mobile"
            value={registerData.mobile}
          />
          {!registerDataisValid.mobile && (
            <Form.Text className="text-danger">
              Enter valid mobile number
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => validateHandler(e)}
            name="password"
            value={registerData.password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Show password"
            onChange={() => setShowPassword(!showPassword)}
          />
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
