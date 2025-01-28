import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqkibetxkyuvatwtliiw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2liZXR4a3l1dmF0d3RsaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI0MTUsImV4cCI6MjA1MjMzODQxNX0.yDbwxZeM40joOCmpSpT00SJzv0kMbhZhKRUqYakS4W0";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    const { data, error } = await supabase
      .from("videojuego")
      .select("id,titulo,plataforma")
      .order("titulo", { ascending: true });
  
    if (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  
    return new Response(JSON.stringify(data), { status: 200 });
  }
  export async function DELETE(req) {

    const { id } = await req.json();
    const { data, error } = await supabase
      .from("videojuego")
      .delete()
      .eq("id", id);
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  
    return new Response(
      JSON.stringify({ message: "Artículo eliminado correctamente", data }),
      { status: 200 }
    );
  }