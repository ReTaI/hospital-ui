import React, { memo, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { patients } from "../../api";
import Header from "../../components/Header";

const MainUser = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [doctor, setDoctor] = useState("");
  const [room, setRoom] = useState(-1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
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
  const handleDateEndChange = (event) => {
    setDateEnd(event.target.value);
  };

  const handleEdit = async (event) => {
    await setCurId(+event.target.dataset.id);
    setFullname(currentPatients[curId].fullname);
    setDoctor(currentPatients[curId].doctor);
    setRoom(currentPatients[curId].room);
    setDateStart(currentPatients[curId].dateStart);
    setDateEnd(currentPatients[curId].dateEnd);
  };

  const handleSave = () => {
    currentPatients[curId].fullname = fullname;
    currentPatients[curId].doctor = doctor;
    currentPatients[curId].room = room;
    currentPatients[curId].dateStart = dateStart;
    currentPatients[curId].dateEnd = dateEnd;
    setCurrentPatients(currentPatients);
    console.log(currentPatients);
  };

  const handleNewPatient = () => {
    navigate("/add_patient");
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex", marginTop: 20 }}>
        <div style={{ width: 1600 }}>
          <Table>
            <thead style={{ background: "#F9F9F9" }}>
              <tr>
                <td>ФИО</td>
                <td>Диагноз</td>
                <td>Лечащий врач</td>
                <td>Дата обращения</td>
                <td>Дата выписки</td>
                <td>Палата</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((person) => {
                return (
                  <tr key={person.id}>
                    <td>{person.fullname}</td>
                    <td>{person.diagnoses}</td>
                    <td>{person.doctor}</td>
                    <td>{person.dateStart}</td>
                    <td>{person.dateEnd}</td>
                    <td>{person.room}</td>
                    <td>
                      <Button
                        type="button"
                        onClick={handleEdit}
                        variant="outlined"
                        style={{ padding: 0 }}
                      >
                        <img
                          src="./edit.png"
                          alt=""
                          style={{ width: 24, height: 24 }}
                          data-id={person.id}
                        />
                      </Button>
                    </td>
                    <td>
                      <a href={"history/" + person.id}>подробнее</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
              <Form.Label>Дата выписки:</Form.Label>
              <Form.Control
                type="date"
                onChange={handleDateEndChange}
                value={dateEnd}
                style={{ background: "#F9F9F9" }}
              />
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleSave}>
              Сохранить
            </Button>

            <Button
              variant="primary"
              type="button"
              onClick={handleNewPatient}
              style={{ display: "block", marginTop: 150, marginLeft: 120 }}
            >
              Добавить пациента
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default memo(MainUser);
