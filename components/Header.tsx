'use client'
import React, { useEffect, useState } from "react";

const Header = () => {
  const [usuario, setUsuario] = useState("");
  const [rol, setRol] = useState("");

  useEffect(() => {
    // Fetch the values from localStorage once the component mounts
    setUsuario(localStorage.getItem("usuario") || "");
    setRol(localStorage.getItem("rol") || "");
  }, []);

  return (
    <div className="mb-4">
      <div className="w-full p-3 rounded-lg bg-white text-gray-700 shadow-md">
        <p>Bienvenido {usuario}</p>  
      </div>
    </div>
  );
};

export default Header;
