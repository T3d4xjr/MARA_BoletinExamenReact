import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqkibetxkyuvatwtliiw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const body = await request.json();
    const videojuego = body.videojuego;

    if (!videojuego.titulo || videojuego.titulo.trim() === "") {
      return new Response(
        JSON.stringify({ error: "El titulo no puede estar vacío." }),
        { status: 400 }
      );
    }

    if (!videojuego.plataforma || videojuego.plataforma.trim() === "") {
      return new Response(
        JSON.stringify({ error: "El titulo no puede estar vacío." }),
        { status: 400 }
      );  
    }

    const fechaActual = new Date().toISOString().split("T")[0];
    if (videojuego.fecha_lanzamiento < fechaActual) {
      return new Response(
        JSON.stringify({ error: "La fecha debe ser como mínimo la actual." }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
    .from("videojuego")
    .insert([
      {
        titulo: videojuego.titulo,
        plataforma: videojuego.plataforma,
        genero: videojuego.genero,
        fecha_lanzamiento: videojuego.fecha_lanzamiento,
        completado: videojuego.completado,
      },
    ]);

    if (error) {
      console.error("Error al insertar en Supabase:", error);
      return new Response(
        JSON.stringify({ error: "Hubo un problema al añadir la prueba." }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ success: "Prueba añadida con éxito." }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error en la API:", err);
    return new Response(
      JSON.stringify({ error: "Hubo un problema al procesar la solicitud." }),
      { status: 500 }
    );
  }
}
