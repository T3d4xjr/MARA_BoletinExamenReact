import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqkibetxkyuvatwtliiw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);

// Función GET para obtener datos
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { data, error } = await supabase
      .from("videojuego")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("Error al obtener los datos:", err);
    return new Response(
      JSON.stringify({ error: "Hubo un problema al obtener los datos." }),
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, titulo, plataforma, genero, fecha_lanzamiento, completado } = body;

    if (!body.titulo || body.titulo.trim() === "") {
      return new Response(
        JSON.stringify({ error: "El titulo no puede estar vacío." }),
        { status: 400 }
      );
    }

    if (!body.plataforma || body.plataforma.trim() === "") {
      return new Response(
        JSON.stringify({ error: "El titulo no puede estar vacío." }),
        { status: 400 }
      );
    }

    const fechaActual = new Date().toISOString().split("T")[0];
    if (body.fecha_lanzamiento < fechaActual) {
      return new Response(
        JSON.stringify({ error: "La fecha debe ser como mínimo la actual." }),
        { status: 400 }
      );
    }


    const { data, error } = await supabase
      .from("videojuego")
      .update({ titulo, plataforma, genero, fecha_lanzamiento, completado })
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al actualizar:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("Error inesperado al actualizar:", err);
    return new Response(
      JSON.stringify({ error: "Hubo un problema al actualizar la prueba." }),
      { status: 500 }
    );
  }
}
