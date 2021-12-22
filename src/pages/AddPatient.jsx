import React, { memo, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { patients } from "../api";
import Header from "../components/Header";

const AddPatient = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [doctor, setDoctor] = useState("");
  const [room, setRoom] = useState(-1);
  const [dateStart, setDateStart] = useState("");
  const [insurance, setInsurance] = useState("");
  const [curId, setCurId] = useState(0);
  const [currentPatients, setCurrentPatients] = useState([...patients]);

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };
  const handleDoctorChange = (event) => {
    setDoctor(event.target.value);
  };
  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };
  const handleDateStartChange = (event) => {
    setDateStart(event.target.value);
  };
  const handleInsuranceChange = (event) => {
    setInsurance(event.target.value);
  };

  const handleSave = () => {
    currentPatients.push({ fullname, doctor, room, dateStart, insurance });
    setCurrentPatients(currentPatients);
  };

  const handleBack = () => {
    navigate("/main");
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
        }}
      >
        <Form style={{ width: "30%" }}>
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
            <Form.Label>Лечащий врач:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleDoctorChange}
              value={doctor}
              style={{ background: "#F9F9F9" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Палата:</Form.Label>
            <Form.Control
              type="number"
              onChange={handleRoomChange}
              value={room}
              style={{ background: "#F9F9F9" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Дата поступления:</Form.Label>
            <Form.Control
              type="date"
              onChange={handleDateStartChange}
              value={dateStart}
              style={{ background: "#F9F9F9" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Номер страховки:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleInsuranceChange}
              value={insurance}
              style={{ background: "#F9F9F9" }}
            />
          </Form.Group>

          <div style={{ display: "flex", width: "100%" }}>
            <Button variant="danger" type="button" onClick={handleBack}>
              Назад
            </Button>
            <div style={{ width: "100%" }} />
            <Button
              variant="primary"
              type="button"
              onClick={handleSave}
              style={{ justifySelf: "flex-end" }}
            >
              Сохранить
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default memo(AddPatient);
