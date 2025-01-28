"use client";
import { useState } from "react";
import Link from "next/link";

export default function AddPrueba() {
  const [formData, setFormData] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    fecha_lanzamiento: "",
    completado: false, 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const validate = () => {
    if (!formData.titulo) {
      alert("El titulo es obligatorio.");
      return false;
    }

    if (!formData.plataforma) {
      alert("La plataforma es obligatoria.");
      return false;
    }

    const fechaActual = new Date().toISOString().split("T")[0];
    if (!formData.fecha_lanzamiento || formData.fecha_lanzamiento < fechaActual) {
      alert("La fecha debe ser como mínimo la actual y debe ser obligatoria");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
        return;
      }

    const response = await fetch("/api/videojuegos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videojuego: formData }), 
    });
    if (response.ok) {
      alert("Videojuego añadida con éxito.");
      window.location.href = "/videojuegos";
    } else {
      alert("Hubo un problema al añadir la Videojuego.");
    }
  };

  return (
    <div>
      <h1>Añadir Videojuego</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Plataforma:
          <input
            type="text"
            name="plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Genero
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Fecha:
          <input
            type="date"
            name="fecha_lanzamiento"
            value={formData.fecha_lanzamiento}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Completado:
          <input
            type="checkbox"
            name="completado"
            checked={formData.completado}
            onChange={handleChange}
          />
          Si está marcado, asignar valor true
        </label>
        <br />
        <button type="submit">Añadir</button>
        <Link href="/videojuegos">
          <button type="button">Cancelar</button>
        </Link>
      </form>
    </div>
  );
}
