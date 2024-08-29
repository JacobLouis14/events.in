import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Appbar = ({ absPos }) => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const [menuIndex, setMenuIndex] = useState(0);
  let [menu, setmenu] = useState([
    { title: "Home", nav: "/" },
    { title: "Ticket", nav: "/tickets" },
    { title: "About", nav: "/about" },
    token != ""
      ? { title: "Profile", nav: "/profile" }
      : { title: "Login", nav: "/login" },
  ]);

  const initialMenuHandler = () => {
    const currentPath = location.pathname;
    const index = menu.findIndex((item) => item.nav === currentPath);
    setMenuIndex(index);
  };

  // index change logic
  const indexChangeHandler = (index) => {
    setMenuIndex(index);
  };

  useEffect(() => {
    initialMenuHandler();
  }, [location.pathname, menu]);

  useEffect(() => {
    const updateMenu = [
      { title: "Home", nav: "/" },
      { title: "Ticket", nav: "/tickets" },
      { title: "About", nav: "/about" },
      {
        title: token ? "Profile" : "Login",
        nav: token ? "/profile" : "/login",
      },
    ];
    setmenu(updateMenu);
    // console.log(`from appbar ${token}`);
  }, [token]);

  return (
    <Navbar
      expand="lg"
      className={`bg-transparent ${
        absPos ? "position-absolute" : ""
      } w-100 z-1`}
      style={{
        fontFamily: "Jost",
        fontWeight: 200,
        top: `${absPos ? "30px" : ""}`,
        paddingTop: `${absPos ? "" : "38px"}`,
      }}
    >
      <Container fluid className="">
        <Navbar.Brand href="#home" className="text-light">
          <img src="src/assets/Events (1).png" alt="" width="150px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-3">
            {menu.map((item, index) => (
              <Link
                to={item.nav}
                key={index}
                className="me-4 text-light text-decoration-none"
                style={{
                  borderBottom:
                    menuIndex === index ? "2px solid #D90429" : "none",
                }}
                onClick={() => indexChangeHandler(index)}
              >
                {item.title}
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Appbar;
