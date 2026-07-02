import { supabase } from "./client";

export async function fetchTableCollection(table: string) {
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw error;
  return data;
}

export async function fetchTableDocument(table: string, id: string) {
  const { data, error } = await supabase.from(table).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}
