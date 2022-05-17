import React, { memo, useState } from "react";
import { useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const MainUser = () => {
  const navigate = useNavigate();
  const currentRole = !(+localStorage.getItem("role"));

  const [fullname, setFullname] = useState("");
  const [doctor, setDoctor] = useState("");
  const [room, setRoom] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [curId, setCurId] = useState(0);
  const [currentPatients, setCurrentPatients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/patients")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось получить данные");
        }
        return response;
      })
      .then((res) => res.json())
      .then((data) => {
        setCurrentPatients(data);
      })
      .catch((error) => setError(error.toString()));
  }, []);

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
    await setCurId(+event.target.dataset.id - 1);
    setFullname(currentPatients[+event.target.dataset.id - 1].fullname);
    setDoctor(currentPatients[+event.target.dataset.id - 1].doctor);
    setRoom(currentPatients[+event.target.dataset.id - 1].room);
    setDateStart(currentPatients[+event.target.dataset.id - 1].dateStart);
    setDateEnd(currentPatients[+event.target.dataset.id - 1].dateEnd);
  };

  const handleSave = () => {
    if (!(fullname && doctor && room && dateStart)) {
      setError("Поля не могут быть пустыми");
      return;
    }
    fetch("http://localhost:3000/patients/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        fullname,
        doctor,
        room,
        dateStart,
        dateEnd,
        id: curId + 1,
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
        setCurrentPatients(data);
        setFullname("");
        setDoctor("");
        setRoom("");
        setDateStart("");
        setDateEnd("");
        setError("");
      })
      .catch((error) => setError(error.toString()));
  };

  const handleNewPatient = () => {
    navigate("/add_patient");
  };

  return (
    <>
      <Header fullname={localStorage.getItem("fullname")} />
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
                disabled={currentRole}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Лечащий врач:</Form.Label>
              <Form.Control
                type="text"
                onChange={handleDoctorChange}
                value={doctor}
                style={{ background: "#F9F9F9" }}
                disabled={currentRole}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Палата:</Form.Label>
              <Form.Control
                type="number"
                onChange={handleRoomChange}
                value={room}
                style={{ background: "#F9F9F9" }}
                disabled={currentRole}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Дата поступления:</Form.Label>
              <Form.Control
                type="date"
                onChange={handleDateStartChange}
                value={dateStart}
                style={{ background: "#F9F9F9" }}
                disabled={currentRole}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Дата выписки:</Form.Label>
              <Form.Control
                type="date"
                onChange={handleDateEndChange}
                value={dateEnd}
                style={{ background: "#F9F9F9" }}
                disabled={currentRole}
              />
            </Form.Group>
            <div style={{ color: "red", paddingBottom: 15 }}>{error}</div>

            <Button
              variant="primary"
              type="button"
              onClick={handleSave}
              disabled={currentRole}
            >
              Сохранить
            </Button>

            <Button
              variant="primary"
              type="button"
              onClick={handleNewPatient}
              style={{ display: "block", marginTop: 150, marginLeft: 120 }}
              disabled={currentRole}
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
