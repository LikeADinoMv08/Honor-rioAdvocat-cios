import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainFlow from "./pages/MainFlow";

export default function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Login setUsuario={setUsuario} />} />
      <Route
        path="/gerador"
        element={<MainFlow usuario={usuario} setUsuario={setUsuario} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
