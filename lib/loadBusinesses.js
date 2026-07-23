import { createClient } from "@supabase/supabase-js";

export default async function loadBusinesses() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "published")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error loading businesses:", error);
    return [];
  }

  return data;
}
