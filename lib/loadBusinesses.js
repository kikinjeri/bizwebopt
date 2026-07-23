"use server";

import { createServerClient } from "./supabase/server";

export default async function loadBusiness() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "published")
    .eq("active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error loading businesses:", error);
    return [];
  }

  return data || [];
}
