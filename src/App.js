import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Authorization from "./pages/Authorization/Authorization";
import MainAdmin from "./pages/MainPage/MainAdmin";
import MainUser from "./pages/MainPage/MainUser";
import MedicalHistory from "./pages/MedicalHistory";
import AddPatient from "./pages/AddPatient";
import store from "./redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authorization />} />
            <Route path="/main" element={<MainUser />} />
            <Route path="/main/admin" element={<MainAdmin />} />
            <Route path="history" element={<MedicalHistory />} />
            <Route path="/add_patient" element={<AddPatient />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
