"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { fetchCollectionServer, fetchDocumentServer } from "@/lib/actions";
import { supabase } from "@/lib/supabase/client";

// Helper to recursively restore .toDate() method to serialized Firestore timestamps
const sanitizeTimestamps = (obj: any): any => {
  if (!obj || typeof obj !== "object") return obj;

  if (obj.seconds !== undefined && obj.nanoseconds !== undefined) {
    return {
      ...obj,
      toDate: () => new Date(obj.seconds * 1000)
    };
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeTimestamps);
  }

  const result: any = {};
  for (const [key, val] of Object.entries(obj)) {
    result[key] = sanitizeTimestamps(val);
  }
  return result;
};

// Map collection names to public PostgreSQL tables for realtime mapping
function getTableFromCollection(collectionName: string): string {
  switch (collectionName) {
    case "users": return "users";
    case "services": return "services";
    case "projects": return "portfolio";
    case "posts": return "blog_posts";
    case "testimonials": return "testimonials";
    case "leads": return "leads";
    case "settings": return "settings";
    case "media": return "media";
    case "audit_logs": return "audit_logs";
    case "careers": return "careers";
    default: return collectionName;
  }
}
const enableRealtime = process.env.NODE_ENV === "production";

export function useDocument<T>(collectionName: string, id: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(Boolean(collectionName && id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !collectionName) {
      return;
    }
    let active = true;

    const loadData = () => {
      fetchDocumentServer(collectionName, id).then((docData) => {
        if (active) {
          setData(sanitizeTimestamps(docData) as T);
          setError(null);
          setLoading(false);
        }
      }).catch(err => {
        console.error("useDocument fetch error:", err);
        if (active) {
          setError("We could not load this record right now. Please refresh and try again.");
          setLoading(false);
        }
      });
    };

    setLoading(true);
    loadData();

    let channel: ReturnType<typeof supabase.channel> | null = null;

    if (enableRealtime) {
      // Set up Realtime listener for the document in production only.
      const table = getTableFromCollection(collectionName);
      channel = supabase
        .channel(`doc-${collectionName}-${id}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table, filter: `id=eq.${id}` },
          () => {
            loadData();
          }
        )
        .subscribe();
    }

    return () => {
      active = false;
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [collectionName, id]);

  return { data, loading, error };
}

export function useCollection<T>(collectionName: string, options?: {
  orderBy?: { field: string, direction?: "asc" | "desc" },
  filters?: { field: string, operator: any, value: any }[]
}) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(Boolean(collectionName));
  const [error, setError] = useState<string | null>(null);
  const orderByField = options?.orderBy?.field;
  const orderByDirection = options?.orderBy?.direction || "asc";

  useEffect(() => {
    if (!collectionName) {
      return;
    }
    let active = true;

    const loadData = () => {
      fetchCollectionServer(collectionName).then((items) => {
        if (active) {
          let processed = sanitizeTimestamps(items) as T[];

          // Handle sorting programmatically
          if (orderByField) {
            processed = [...processed].sort((a: any, b: any) => {
              const aVal = a[orderByField];
              const bVal = b[orderByField];
              if (aVal < bVal) return orderByDirection === "asc" ? -1 : 1;
              if (aVal > bVal) return orderByDirection === "asc" ? 1 : -1;
              return 0;
            });
          }

          setData(processed);
          setError(null);
          setLoading(false);
        }
      }).catch(err => {
        console.error("useCollection fetch error:", err);
        if (active) {
          setError("We could not load this collection right now. Please refresh and try again.");
          setLoading(false);
        }
      });
    };

    setLoading(true);
    loadData();

    let channel: ReturnType<typeof supabase.channel> | null = null;

    if (enableRealtime) {
      // Set up Realtime listener for the whole table in production only.
      const table = getTableFromCollection(collectionName);
      channel = supabase
        .channel(`col-${collectionName}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table },
          () => {
            loadData();
          }
        )
        .subscribe();
    }

    return () => {
      active = false;
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [collectionName, orderByField, orderByDirection]);

  return { data, loading, error };
}
