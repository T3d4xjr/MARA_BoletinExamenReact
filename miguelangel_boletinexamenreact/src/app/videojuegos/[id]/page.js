"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";

export default function Videojuego({ params }) {
  const { id } = use(params);
  const [videojuegos, setVideojuegos] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    fecha_lanzamiento: "",
    completado: false,
  });

  async function fecthVideojuego() {
    try {
      const url = `/api/videojuegos/vista?id=${id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setVideojuegos(data);
        setFormData({ ...data });
      } else {
        console.error("Error al obtener la prueba");
      }
    } catch (error) {
      console.error("Hubo un error al buscar la prueba:", error);
    }
  }

  useEffect(() => {
    if (id) {
      fecthVideojuego();
    }
  }, [id]);

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
    if (
      !formData.fecha_lanzamiento ||
      formData.fecha_lanzamiento < fechaActual
    ) {
      alert("La fecha debe ser como mínimo la actual y debe ser obligatoria");
      return false;
    }

    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const response = await fetch("/api/videojuegos/vista", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, id }),
    });

    if (response.ok) {
      const updatedVideojuego = await response.json();
      setVideojuegos(updatedVideojuego);
      setIsEditing(false);
    } else {
      alert("Hubo un problema al actualizar la prueba.");
    }
    fecthVideojuego();
  };

  if (videojuegos && !isEditing) {
    return (
      <div>
        <h1>Titulo: {videojuegos.titulo}</h1>
        <p>Plataforma: {videojuegos.plataforma}</p>
        <p>Genero: {videojuegos.genero}</p>
        <p>Fecha: {videojuegos.fecha_lanzamiento}</p>
        <p>Completado: {videojuegos.completado}</p>
        <button onClick={() => setIsEditing(true)}>Editar</button>
        <Link href="/videojuegos">
          <button>Lista videojuegos</button>
        </Link>
      </div>
    );
  } else if (videojuegos && isEditing) {
    return (
      <form onSubmit={handleUpdate}>
        <label>
          Titulo:
          <input
            type="text"
            name="titulo"
            value={formData.titulo || ""}
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
            value={formData.plataforma || ""}
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
            value={formData.genero || ""}
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
            value={formData.fecha_lanzamiento || ""}
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
        </label>
        <br />
        <button type="submit">Confirmar</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancelar
        </button>
      </form>
    );
  } else {
    return (
      <div>
        <p>No encontrado</p>
      </div>
    );
  }
}
