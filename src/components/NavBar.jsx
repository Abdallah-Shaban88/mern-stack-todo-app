import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

const NavBar = () => {
 const navigate = useNavigate();
 return (
  <Navbar bg="light" expand="lg">
   <Container className="d-flex flex-row flex-nowrap">
    <Navbar.Brand href="/">
     <img src="" width="30" height="30" alt="" />
     <Link to="/" className="navbar-brand">
      MERN Todo App
     </Link>
    </Navbar.Brand>
    <Container className="d-flex justify-content-between">
     <Button
      veriant="primary"
      className="ms-auto me-3"
      onClick={() => navigate("/create")}
     >
      +
     </Button>
     <Navbar.Toggle aria-controls="basic-navbar-nav" />
     <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
       <Link to="/" className="nav-link">
        Todos
       </Link>
       <Link to="/create" className="nav-link">
        Create Todo
       </Link>
      </Nav>
     </Navbar.Collapse>
    </Container>
   </Container>
  </Navbar>
 );
};

export default NavBar;
