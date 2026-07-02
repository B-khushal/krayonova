import { supabase } from "./client";

export function subscribeToTable(table: string, callback: (payload: any) => void) {
  const channel = supabase
    .channel(`${table}-realtime-changes`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
