import React, { memo, useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";

import Header from "../../components/Header";

const MainAdmin = () => {
  const [fullname, setFullname] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [curId, setCurId] = useState(0);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [error, setError] = useState('');

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };
  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось получить данные");
        }
        return response;
      })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUsers(data);
      })
      .catch((error) => setError(error.toString()));
  }, []);

  const handleEdit = async (event) => {
    await setCurId(+event.target.dataset.id);
    setFullname(currentUsers[+event.target.dataset.id-1].fullname);
    setPosition(currentUsers[+event.target.dataset.id-1].position);
    setAddress(currentUsers[+event.target.dataset.id-1].address);
    setEmail(currentUsers[+event.target.dataset.id-1].email);
    setPhone(currentUsers[+event.target.dataset.id-1].phone);
  };

  const handleSave = () => {
    if (!(fullname && position && address && email && phone)) {
      setError('Поля не могут быть пустыми');
      return;
    }
    fetch("http://localhost:3000/users/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        fullname,
        address,
        email,
        phone,
        position,
        id: curId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось отредактировать данные");
        }
        return response;
      })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUsers(data);
        setFullname("");
        setPosition("");
        setEmail("");
        setPhone("");
        setAddress("");
        setError("");
      })
      .catch((error) => setError(error.toString()));
  };
  const handleDelete = (event) => {
    fetch(`http://localhost:3000/users/delete/${event.target.dataset.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка удаления");
        }
        return response;
      })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUsers(data);
      })
      .catch((error) => setError(error.toString()));
  };
  return (
    <>
      <Header fullname="Администратор" />
      <div style={{ display: "flex", marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            width: "50%",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
          }}
        >
          <Form style={{ width: "80%" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ФИО:</Form.Label>
              <Form.Control
                type="text"
                onChange={handleFullnameChange}
                value={fullname}
                style={{ background: "#F9F9F9" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Должность:</Form.Label>
              <Form.Control
                type="text"
                onChange={handlePositionChange}
                value={position}
                style={{ background: "#F9F9F9" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Адрес проживания:</Form.Label>
              <Form.Control
                type="text"
                onChange={handleAddressChange}
                value={address}
                style={{ background: "#F9F9F9" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Почта:</Form.Label>
              <Form.Control
                type="text"
                onChange={handleEmailChange}
                value={email}
                style={{ background: "#F9F9F9" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Номер телефона:</Form.Label>
              <Form.Control
                type="text"
                onChange={handlePhoneChange}
                value={phone}
                style={{ background: "#F9F9F9" }}
              />
            </Form.Group>
            <div style={{ color: "red", paddingBottom: 15 }}>{error}</div>

            <Button variant="primary" type="button" onClick={handleSave}>
              Сохранить
            </Button>
          </Form>
        </div>
        <div style={{ width: 1600 }}>
          <Table>
            <thead style={{ background: "#F9F9F9" }}>
              <tr>
                <td>ФИО</td>
                <td>Должность</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {currentUsers?.map((person) => {
                return (
                  <tr key={person.id}>
                    <td>{person.fullname}</td>
                    <td>{person.position}</td>
                    <td>
                      <Button href="#" onClick={handleEdit} data-id={person.id}>
                        Редактировать
                      </Button>
                    </td>
                    <td>
                      <Button href="#" onClick={handleDelete} data-id={person.id} variant='danger'>
                        Удалить
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default memo(MainAdmin);
