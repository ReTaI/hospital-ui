import React, { memo, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";

import { users } from "../../api";
import Header from "../../components/Header";

const MainAdmin = () => {
  // const { fullname } = useSelector((store) => store.authReducer);
  const [fullname, setFullname] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [curId, setCurId] = useState(0);
  const [currentUsers, setcurrentUsers] = useState([...users]);

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

  const handleEdit = async (event) => {
    event.preventDefault();
    await setCurId(+event.target.dataset.id);
    setFullname(currentUsers[curId].fullname);
    setPosition(currentUsers[curId].position);
    setAddress(currentUsers[curId].address);
    setEmail(currentUsers[curId].email);
    setPhone(currentUsers[curId].phone);
  };

  const handleSave = () => {
    currentUsers[curId].fullname = fullname;
    currentUsers[curId].position = position;
    currentUsers[curId].address = address;
    currentUsers[curId].email = email;
    currentUsers[curId].phone = phone;
    setcurrentUsers(currentUsers);
    console.log(currentUsers);
  };
  const handleDelete = (event) => {
    event.preventDefault();
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
              {users.map((person) => {
                return (
                  <tr key={person.id}>
                    <td>{person.fullname}</td>
                    <td>{person.position}</td>
                    <td>
                      <a href="#" onClick={handleEdit} data-id={person.id}>
                        Редактировать
                      </a>
                    </td>
                    <td>
                      <a href="#" onClick={handleDelete} data-id={person.id}>
                        Удалить
                      </a>
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
