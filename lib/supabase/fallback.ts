type QueryResult = { data: any; error: null };

const terminalResult = async (data: any = null): Promise<QueryResult> => ({ data, error: null });

function createBuilderStub(data: any = []) {
  const builder = new Proxy(
    {},
    {
      get(_target, prop) {
        if (prop === "then") {
          return undefined;
        }

        const name = String(prop);

        if (["maybeSingle", "single", "insert", "update", "upsert", "delete", "rpc"].includes(name)) {
          return async () => terminalResult(data);
        }

        if (["select", "eq", "neq", "gt", "gte", "lt", "lte", "ilike", "like", "in", "contains", "overlaps", "order", "limit", "range", "match", "or", "filter", "not"].includes(name)) {
          return () => builder;
        }

        return () => builder;
      },
    }
  );

  return builder;
}

function createChannelStub() {
  const channel = {
    on: () => channel,
    subscribe: () => ({})
  };

  return channel;
}

export function createFallbackSupabaseClient() {
  const builder = createBuilderStub([]);

  return {
    from: () => builder,
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: (callback: (event: string, session: null) => void) => {
        const subscription = {
          unsubscribe: () => {}
        };

        queueMicrotask(() => callback("INITIAL_SESSION", null));

        return {
          data: { subscription }
        };
      }
    },
    channel: () => createChannelStub(),
    removeChannel: () => {}
  };
}

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}