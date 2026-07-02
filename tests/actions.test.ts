import { beforeEach, describe, expect, it, vi } from "vitest";
import { createDocServer, deleteDocServer, updateDocServer } from "@/lib/actions";

const mockCreateClient = vi.hoisted(() => vi.fn());
const mockSupabaseAdminFrom = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/server", () => ({
  createClient: mockCreateClient,
}));

vi.mock("@/lib/supabase/admin", () => ({
  supabaseAdmin: {
    from: mockSupabaseAdminFrom,
  },
}));

function buildSupabaseMock(overrides?: Record<string, unknown>) {
  const single = vi.fn().mockResolvedValue({ data: { id: "generated-id" }, error: null });
  const upsert = vi.fn().mockResolvedValue({ error: null });
  const deleteResult = vi.fn().mockResolvedValue({ error: null });
  const updateResult = vi.fn().mockResolvedValue({ error: null });

  const tableChain: any = {
    insert: vi.fn(() => ({ select: vi.fn(() => ({ single })) })),
    update: vi.fn(() => ({ eq: updateResult })),
    delete: vi.fn(() => ({ eq: deleteResult })),
    upsert,
    select: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ data: null, error: null }), maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }) })),
  };

  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1", email: "admin@krayonova.com" } }, error: null }),
    },
    from: vi.fn(() => tableChain),
    ...overrides,
  };
}

describe("server CRUD actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabaseAdminFrom.mockResolvedValue({ error: null });
  });

  it("creates mapped portfolio records with auth protection", async () => {
    const supabase = buildSupabaseMock();
    mockCreateClient.mockResolvedValue(supabase);

    const id = await createDocServer("projects", { name: "Launch Pad", clientName: "Acme" });

    expect(id).toBe("generated-id");
    expect(supabase.from).toHaveBeenCalledWith("portfolio");
    const insertArg = supabase.from.mock.results[0].value.insert.mock.calls[0][0];
    expect(insertArg.title).toBe("Launch Pad");
    expect(insertArg.client).toBe("Acme");
  });

  it("updates mapped service records", async () => {
    const supabase = buildSupabaseMock();
    mockCreateClient.mockResolvedValue(supabase);

    await updateDocServer("services", "service-1", { title: "Brand Strategy", status: "active" });

    expect(supabase.from).toHaveBeenCalledWith("services");
    const updateArg = supabase.from.mock.results[0].value.update.mock.calls[0][0];
    expect(updateArg.title).toBe("Brand Strategy");
    expect(updateArg.status).toBe("active");
  });

  it("deletes lead records after auth verification", async () => {
    const supabase = buildSupabaseMock();
    mockCreateClient.mockResolvedValue(supabase);

    await deleteDocServer("leads", "lead-1");

    expect(supabase.from).toHaveBeenCalledWith("leads");
    expect(supabase.from.mock.results[0].value.delete).toHaveBeenCalled();
  });
});