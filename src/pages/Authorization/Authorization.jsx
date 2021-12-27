import React, { useState, memo } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Authorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSignin = () => {
    if (!(login && password)) {
      setError("Введите всю информацию");
      return;
    }
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Неправильное имя пользователя или пароль');
        }
        return response;
      })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("role", data.role);
        navigate(data.role === 2 ? '/main/admin' : '/main');
      })
      .catch((error) => setError(error.toString()));
  };
  const handleNurse = () => {
    localStorage.setItem('role', 0);
    navigate("/main");
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
      <Form style={{ width: "30%" }}>
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
        <div style={{ color: "red", paddingBottom: 15 }}>{error}</div>
        <div style={{ display: "flex" }}>
          <Button variant="primary" type="button" onClick={handleNurse}>
            Войти как медсестра
          </Button>
          <div style={{ width: "48%" }} />
          <Button variant="primary" type="button" onClick={handleSignin}>
            Войти
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default memo(Authorization);
