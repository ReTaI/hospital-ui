import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Authorization from "./pages/Authorization/Authorization";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Authorization />
    </div>
  );
}

export default App;
