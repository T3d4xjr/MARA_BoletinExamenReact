"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function ListVideojuegos() {
  const [videojuegos, setVideojuegos] = useState([]);

  async function fecthVideojuegos() {
    const response = await fetch("/api/videojuegos");
    const body = await response.json();
    setVideojuegos(body);
  }
  useEffect(() => {
    fecthVideojuegos();
  }, []);
  async function deleteVideojuego(deleteId) {
    if (window.confirm("¿Desea eliminar el videojuego?")) {
      await fetch("/api/videojuegos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });
      window.alert("Se a eliminado el juego con exito");
      fecthVideojuegos();
    }
  }
  if (videojuegos.length === 0) {
    return <p>No hay videojuegos disponibles.</p>;
  }
  return (
    <div>
      <h1>Lista de videojuegos</h1>
      {videojuegos.length === 0 ? (
        <p>No hay videojuegos encontradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Plataforma</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {videojuegos.map((videojuego) => (
              <tr key={videojuego.id}>
                <td>
                  <Link href={`/videojuegos/${videojuego.id}`}>
                    {videojuego.titulo}
                  </Link>
                </td>
                <td>{videojuego.plataforma}</td>
                <td>
                  <button
                    className="eliminar"
                    onClick={() => deleteVideojuego(videojuego.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link href="/videojuegos/add">
        <button>Añadir videojuegos</button>
      </Link>
    </div>
  );
}
