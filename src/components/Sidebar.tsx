"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  IoCartOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoBarChartOutline,
  IoCubeOutline,
  IoHomeOutline,
  IoExitOutline,
  IoReaderOutline,
  IoFlowerOutline,
} from "react-icons/io5";
import { ModalLogout } from "./ModalLogout";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [modalLogout, setModalLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <div className="md:w-full lg:w-44 lg:h-screen bg-gray-800 text-white shadow-lg p-2 lg:flex lg:flex-col justify-between">
        <ul className="md:flex md:flex-col md:items-center md:justify-center lg:items-start">
          <li className="mb-4 ">
            <Link href="/administracion">
              <p className="block p-2 text-gray-500 text-md font-bold text-center lg:text-left">
                ADMINISTRACIÓN
              </p>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/administracion">
              <div
                className={`flex md:w-40 items-center justify-center md:justify-center lg:justify-start p-2 rounded-sm ${
                  pathname === "/administracion"
                    ? "bg-blue-500"
                    : "hover:bg-gray-600"
                }`}
              >
                <IoHomeOutline color="white" size={16} className="mr-2" />
                <span className="pl-2">Inicio</span>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/administracion/pedidos">
              <div
                className={`flex md:w-40 items-center justify-center md:justify-center lg:justify-start p-2 rounded-sm ${
                  pathname === "/administracion/pedidos"
                    ? "bg-blue-500"
                    : "hover:bg-gray-600"
                }`}
              >
                <IoCartOutline color="white" size={16} className="mr-2" />
                <span className="pl-2">Pedidos</span>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/administracion/clientes">
              <div
                className={`flex md:w-40 items-center justify-center md:justify-center lg:justify-start p-2 rounded-sm ${
                  pathname === "/administracion/clientes"
                    ? "bg-blue-500"
                    : "hover:bg-gray-600"
                }`}
              >
                <IoPeopleOutline color="white" size={16} className="mr-2" />
                <span className="pl-2">Clientes</span>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/administracion/productos">
              <div
                className={`flex md:w-40 items-center justify-center md:justify-center lg:justify-start p-2 rounded-sm ${
                  pathname === "/administracion/productos"
                    ? "bg-blue-500"
                    : "hover:bg-gray-600"
                }`}
              >
                <IoFlowerOutline color="white" size={16} className="mr-2" />
                <span className="pl-2">Productos</span>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/administracion/proveedores">
              <div
                className={`flex md:w-40 items-center justify-center md:justify-center lg:justify-start p-2 rounded-sm ${
                  pathname === "/administracion/proveedores"
                    ? "bg-blue-500"
                    : "hover:bg-gray-600"
                }`}
              >
                <IoReaderOutline color="white" size={16} className="mr-2" />
                <span className="pl-2">Proveedores</span>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/administracion/finanzas">
              <div
                className={`flex md:w-40 items-center justify-center md:justify-center lg:justify-start p-2 rounded-sm ${
                  pathname === "/administracion/finanzas"
                    ? "bg-blue-500"
                    : "hover:bg-gray-600"
                }`}
              >
                <IoBarChartOutline color="white" size={16} className="mr-2" />
                <span className="pl-2">Finanzas</span>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/administracion/usuarios">
              <div
                className={`flex md:w-40 items-center justify-center md:justify-center lg:justify-start p-2 rounded-sm ${
                  pathname === "/administracion/usuarios"
                    ? "bg-blue-500"
                    : "hover:bg-gray-600"
                }`}
              >
                <IoPersonOutline color="white" size={16} className="mr-2" />
                <span className="pl-2">Usuarios</span>
              </div>
            </Link>
          </li>
        </ul>
        <div className="mt-auto md:flex md:justify-center lg:justify-start">
          <button
            onClick={() => setModalLogout(true)}
            className="w-full text-left"
          >
            <div className="flex items-center justify-center md:justify-center lg:justify-start p-2 hover:bg-gray-600 rounded-sm">
              <IoExitOutline color="white" size={16} className="mr-2" />
              <span className="pl-2">Salir</span>
            </div>
          </button>
        </div>
      </div>

      <ModalLogout
        show={modalLogout}
        onClose={() => {
          return setModalLogout(false);
        }}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
