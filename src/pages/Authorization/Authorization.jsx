import React, { useState, memo } from "react";
import { Form, Button } from "react-bootstrap";

const Authorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSignin = () => {
    console.log(login, password);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Введите логин:</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@mail.ru"
            onChange={handleLoginChange}
            value={login}
            style={{ background: "#F9F9F9" }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Введите пароль:</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            onChange={handlePasswordChange}
            value={password}
            style={{ background: "#F9F9F9" }}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleSignin}>
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default memo(Authorization);
