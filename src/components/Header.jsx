import React, { memo } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = ({ fullname }) => {
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('fullname');
    localStorage.removeItem('role');
    nav('/');
  }
  return (
    <Navbar bg="light" style={{ width: "100%" }}>
      <Container style={{ margin: 0, width: "100vw", maxWidth: 1920 }}>
        <Navbar.Brand>{fullname}</Navbar.Brand>
        <div style={{ width: "100%" }} />
        <Button variant="danger" style={{ justifySelf: "flex-end" }} onClick={handleLogout}>
          Выйти
        </Button>
      </Container>
    </Navbar>
  );
};

export default memo(Header);
