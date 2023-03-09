import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Asteroid from "./components/Asteroid/Asteroid";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asteroid" element={<Asteroid />} />
      </Routes>
    </div>
  );
}

export default App;
