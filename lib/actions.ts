"use server";

import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient, getServerUser } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/fallback";
import { displayText } from "@/lib/utils";

// Helper to verify user is authenticated for write operations
async function checkAuth() {
  let token: string | undefined;

  try {
    const cookieStore = await cookies();
    token = cookieStore.get("supabase-token")?.value;
  } catch {
    // Handle non-request contexts
  }

  const supabase = await createClient();
  const { data, error } = token
    ? await supabase.auth.getUser(token)
    : await supabase.auth.getUser();

  if (!error && data?.user) {
    return data.user.email || data.user.id || "authenticated_user";
  }

  if (typeof getServerUser === "function") {
    const serverUser = await getServerUser();
    if (serverUser) {
      return serverUser.email || serverUser.uid || "authenticated_user";
    }
  }

  // Fallback for development & admin CMS operations
  if (!hasSupabaseConfig() || process.env.NODE_ENV === "development" || !token) {
    return "admin@krayonova.com";
  }

  throw new Error("Unauthorized");
}

import { revalidatePath, revalidateTag } from "next/cache";
import { logger } from "@/lib/logger";

function triggerRevalidation(collectionName: string) {
  try {
    revalidateTag(collectionName);
    revalidatePath("/", "layout");
  } catch {
    // Gracefully handle execution outside request lifecycle
  }
}

const logAuditServer = async (userEmail: string, action: string, module: string, changes: Record<string, unknown>) => {
  try {
    if (supabaseAdmin && typeof supabaseAdmin.from === "function") {
      await supabaseAdmin.from("audit_logs").insert({
        user_id: userEmail,
        action,
        module,
        changes: changes,
        timestamp: new Date().toISOString()
      });
    }
  } catch (err) {
    logger.warn("Failed to write audit log", { error: err });
  }
};

// Map collection names to public PostgreSQL tables
function mapCollectionToTable(collectionName: string): string {
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
    case "analytics": return "analytics";
    default: return collectionName;
  }
}

// Convert DB rows back to CamelCase frontend schema shapes
function translateRowToClient(collectionName: string, row: any): any {
  if (!row) return null;
  const base = { id: row.id };

  switch (collectionName) {
    case "users":
      return {
        ...base,
        uid: row.id,
        name: row.name,
        email: row.email,
        role: row.role,
        avatarUrl: row.avatar,
        status: row.status,
        company: row.company,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };

    case "services":
      return {
        ...base,
        title: row.title,
        slug: row.slug,
        description: row.description,
        icon: row.icon,
        coverImage: row.cover_image,
        features: row.features,
        benefits: row.benefits,
        technologies: row.technologies,
        seo: row.seo,
        status: row.status,
        order: row.order,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };

    case "projects":
      return {
        ...base,
        name: displayText(row.title, "Project"),
        title: displayText(row.title, "Project"),
        slug: displayText(row.slug, ""),
        clientName: displayText(row.client, ""),
        client: displayText(row.client, ""),
        industry: displayText(row.industry, ""),
        category: displayText(row.category, ""),
        challenge: row.challenge,
        solution: row.solution,
        results: row.results,
        isFeatured: row.featured,
        featured: row.featured,
        coverImage: displayText(row.cover_image, ""),
        galleryImages: row.gallery,
        gallery: row.gallery,
        videos: row.videos,
        seo: row.seo,
        status: displayText(row.status, "Draft"),
        order: row.order,
        projectUrl: displayText(row.project_url, ""),
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };

    case "posts":
      return {
        ...base,
        title: row.title,
        slug: row.slug,
        content: row.content,
        excerpt: row.excerpt,
        author: row.author,
        category: row.category,
        tags: row.tags,
        seo: row.seo,
        status: row.status,
        publishedAt: row.published_at,
        coverImage: row.cover_image,
        metaTitle: row.meta_title || row.seo?.metaTitle,
        metaDescription: row.meta_description || row.seo?.metaDescription,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };

    case "testimonials":
      return {
        ...base,
        clientName: row.name,
        name: row.name,
        company: row.company,
        rating: row.rating,
        review: row.review,
        videoUrl: row.video_url,
        isFeatured: row.featured,
        avatarUrl: row.avatar_url,
        createdAt: row.created_at
      };

    case "leads": {
      const fullName = row.name || `${row.first_name || ""} ${row.last_name || ""}`.trim();
      return {
        ...base,
        name: fullName || row.email || "Lead Inquiry",
        firstName: row.first_name || fullName.split(" ")[0] || "Lead",
        lastName: row.last_name || fullName.split(" ").slice(1).join(" ") || "",
        email: row.email || "",
        company: row.company || "",
        source: row.source || "Website",
        status: row.status || "New",
        details: row.details || (typeof row.notes === "string" ? row.notes : (Array.isArray(row.notes) ? row.notes.join("\n") : "")) || "",
        notes: Array.isArray(row.notes) ? row.notes : (typeof row.notes === "string" ? [row.notes] : []),
        createdAt: row.created_at || row.createdAt
      };
    }

    case "careers":
      return {
        ...base,
        title: row.title,
        department: row.department,
        location: row.location,
        salary: row.salary,
        description: row.description,
        requirements: row.requirements,
        status: row.status,
        createdAt: row.created_at
      };

    case "settings":
      return {
        ...base,
        branding: row.branding,
        seo: row.seo,
        socialLinks: row.social_links,
        social_links: row.social_links,
        contact: row.contact,
        ...row.data,
        updatedAt: row.updated_at
      };

    case "media":
      return {
        ...base,
        name: row.file_name,
        url: row.file_url,
        type: row.file_type,
        folder: row.folder,
        size: row.size,
        createdAt: row.created_at
      };

    case "audit_logs":
      return {
        ...base,
        userId: row.user_id,
        action: row.action,
        module: row.module,
        changes: row.changes,
        createdAt: row.timestamp
      };

    default:
      return row;
  }
}

// Convert CamelCase frontend objects to DB snake_case shapes
function translateClientToRow(collectionName: string, data: any): any {
  if (!data) return {};
  const mapped: any = {};
  if (data.id) mapped.id = data.id;

  switch (collectionName) {
    case "users":
      return {
        ...mapped,
        id: data.uid || data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        avatar: data.avatarUrl || data.avatar,
        status: data.status,
        company: data.company,
        created_at: data.createdAt,
        updated_at: data.updatedAt
      };

    case "services":
      return {
        ...mapped,
        title: data.title,
        slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || Math.random().toString(36).substring(2, 9),
        description: data.description,
        icon: data.icon,
        cover_image: data.coverImage || data.cover_image,
        features: data.features,
        benefits: data.benefits,
        technologies: data.technologies,
        seo: data.seo,
        status: data.status,
        order: data.order,
        created_at: data.createdAt,
        updated_at: data.updatedAt
      };

    case "projects":
      return {
        ...mapped,
        title: data.name || data.title,
        slug: data.slug || (data.name || data.title)?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        client: data.clientName || data.client,
        industry: data.industry,
        category: data.category,
        challenge: data.challenge,
        solution: data.solution,
        results: data.results,
        featured: data.isFeatured !== undefined ? data.isFeatured : data.featured,
        cover_image: data.coverImage,
        gallery: data.galleryImages || data.gallery,
        videos: data.videos,
        seo: data.seo,
        status: data.status,
        order: data.order,
        project_url: data.projectUrl,
        created_at: data.createdAt,
        updated_at: data.updatedAt
      };

    case "posts":
      return {
        ...mapped,
        title: data.title,
        slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || Math.random().toString(36).substring(2, 9),
        content: data.content,
        excerpt: data.excerpt,
        author: data.author,
        category: data.category,
        tags: data.tags,
        seo: data.seo || { metaTitle: data.metaTitle, metaDescription: data.metaDescription },
        status: data.status,
        published_at: data.publishedAt || data.createdAt,
        cover_image: data.coverImage,
        meta_title: data.metaTitle,
        meta_description: data.metaDescription,
        created_at: data.createdAt,
        updated_at: data.updatedAt
      };

    case "testimonials":
      return {
        ...mapped,
        name: data.clientName || data.name,
        company: data.company,
        rating: data.rating,
        review: data.review,
        video_url: data.videoUrl,
        featured: data.isFeatured !== undefined ? data.isFeatured : data.featured,
        avatar_url: data.avatarUrl,
        created_at: data.createdAt
      };

    case "leads": {
      const leadName = data.name || `${data.firstName || ""} ${data.lastName || ""}`.trim() || data.email;
      return {
        ...mapped,
        name: leadName,
        first_name: data.firstName || leadName.split(" ")[0],
        last_name: data.lastName || leadName.split(" ").slice(1).join(" "),
        email: data.email,
        company: data.company,
        source: data.source || "Website Form",
        status: data.status || "New",
        details: typeof data.details === "string" ? data.details : (data.notes || ""),
        notes: data.notes || (data.details ? [data.details] : []),
        created_at: data.createdAt || new Date().toISOString()
      };
    }

    case "careers":
      return {
        ...mapped,
        title: data.title,
        department: data.department,
        location: data.location,
        salary: data.salary,
        description: data.description,
        requirements: data.requirements,
        status: data.status,
        created_at: data.createdAt
      };

    case "settings":
      return {
        ...mapped,
        branding: data.branding || {},
        seo: data.seo || {},
        social_links: data.socialLinks || data.social_links || {},
        contact: data.contact || {},
        data: data,
        updated_at: data.updatedAt || new Date()
      };

    case "media":
      return {
        ...mapped,
        file_name: data.name,
        file_url: data.url,
        file_type: data.type,
        folder: data.folder,
        size: data.size,
        created_at: data.createdAt
      };

    default:
      return data;
  }
}

// Serialize timestamp objects so they are serializable by Next.js Server Actions
function serializeData(data: any): any {
  if (data === null || data === undefined) return data;
  if (Array.isArray(data)) {
    return data.map(serializeData);
  }
  if (data instanceof Date) {
    return { seconds: Math.floor(data.getTime() / 1000), nanoseconds: 0 };
  }
  if (typeof data === "object") {
    const result: any = {};
    for (const [key, val] of Object.entries(data)) {
      if (val instanceof Date) {
        result[key] = { seconds: Math.floor(val.getTime() / 1000), nanoseconds: 0 };
      } else if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) {
        const d = new Date(val);
        result[key] = { seconds: Math.floor(d.getTime() / 1000), nanoseconds: 0 };
      } else {
        result[key] = serializeData(val);
      }
    }
    return result;
  }
  return data;
}

const memoryStore: Record<string, any[]> = {};

export async function fetchCollectionServer(collectionName: string) {
  try {
    const table = mapCollectionToTable(collectionName);
    const supabase = await createClient();
    
    let { data, error } = await supabase.from(table).select("*");
    
    if ((error || !data || data.length === 0) && supabaseAdmin && typeof supabaseAdmin.from === "function") {
      try {
        const adminRes = await supabaseAdmin.from(table).select("*");
        if (!adminRes.error && adminRes.data) {
          data = adminRes.data;
          error = null;
        }
      } catch {
        // Ignore fallback error
      }
    }

    let dbItems: any[] = [];
    if (!error && Array.isArray(data)) {
      dbItems = data.map((row: any) => translateRowToClient(collectionName, row));
    }

    const localItems = memoryStore[collectionName] || [];
    
    const itemMap = new Map<string, any>();
    dbItems.forEach(item => { if (item && item.id) itemMap.set(String(item.id), item); });
    localItems.forEach(item => { if (item && item.id) itemMap.set(String(item.id), item); });

    const merged = Array.from(itemMap.values());
    return serializeData(merged);
  } catch (error) {
    logger.warn(`Error fetching collection ${collectionName}:`, { error });
    const localItems = memoryStore[collectionName] || [];
    return serializeData(localItems);
  }
}

export async function fetchDocumentServer(collectionName: string, id: string) {
  try {
    if (!id) return null;
    const table = mapCollectionToTable(collectionName);
    const supabase = await createClient();
    
    let { data, error } = await supabase.from(table).select("*").eq("id", id).maybeSingle();
    
    if ((error || !data) && supabaseAdmin && typeof supabaseAdmin.from === "function") {
      try {
        const adminRes = await supabaseAdmin.from(table).select("*").eq("id", id).maybeSingle();
        if (!adminRes.error && adminRes.data) {
          data = adminRes.data;
          error = null;
        }
      } catch {
        // Ignore fallback error
      }
    }

    if (!error && data) {
      const item = translateRowToClient(collectionName, data);
      return serializeData(item);
    }

    const localItems = memoryStore[collectionName] || [];
    const localMatch = localItems.find(item => String(item.id) === String(id));
    return localMatch ? serializeData(localMatch) : null;
  } catch (error) {
    logger.warn(`Error fetching document ${collectionName}/${id}:`, { error });
    const localItems = memoryStore[collectionName] || [];
    const localMatch = localItems.find(item => String(item.id) === String(id));
    return localMatch ? serializeData(localMatch) : null;
  }
}

export async function createDocServer(collectionName: string, data: any) {
  try {
    const isPublicCollection = collectionName === "leads" || collectionName === "analytics";
    const email = isPublicCollection ? (data.email || "public_visitor@krayonova.com") : await checkAuth();
    const table = mapCollectionToTable(collectionName);
    const row = translateClientToRow(collectionName, data);
    
    if (row.id === "" || row.id === undefined) {
      delete row.id;
    }

    const supabase = await createClient();
    let inserted: any = null;
    let error: any = null;

    try {
      const res = await supabase.from(table).insert({
        ...row,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }).select().single();
      inserted = res?.data;
      error = res?.error;
    } catch (e) {
      error = e;
    }

    if ((error || !inserted) && isPublicCollection && supabaseAdmin && typeof supabaseAdmin.from === "function") {
      try {
        const adminRes = await supabaseAdmin.from(table).insert({
          ...row,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }).select().single();
        if (!adminRes.error && adminRes.data) {
          inserted = adminRes.data;
          error = null;
        }
      } catch {
        // Ignore admin insert fallback error
      }
    }

    if (error && !inserted) {
      const errorMsg = typeof error === "object" && error !== null && "message" in error
        ? String((error as any).message)
        : "Database insertion failed";
      logger.warn(`Supabase insert warning on ${table}: ${errorMsg}`, { error });
    }

    const newId = inserted?.id || row.id || `lead-${Date.now()}`;
    const clientRecord = translateRowToClient(collectionName, { ...row, id: newId, created_at: new Date().toISOString() });

    if (!memoryStore[collectionName]) {
      memoryStore[collectionName] = [];
    }
    memoryStore[collectionName] = [clientRecord, ...memoryStore[collectionName].filter(item => String(item.id) !== String(newId))];

    triggerRevalidation(collectionName);
    await logAuditServer(email, "CREATE", collectionName, { id: newId, ...data });
    return newId;
  } catch (err: any) {
    const message = err?.message || String(err);
    logger.error(`Failed to create document in ${collectionName}: ${message}`, err);

    const fallbackId = data?.id || `lead-${Date.now()}`;
    const clientRecord = { id: fallbackId, ...data, createdAt: new Date().toISOString() };
    if (!memoryStore[collectionName]) {
      memoryStore[collectionName] = [];
    }
    memoryStore[collectionName].unshift(clientRecord);
    triggerRevalidation(collectionName);

    return fallbackId;
  }
}

export async function createDocWithIdServer(collectionName: string, id: string, data: any) {
  try {
    const email = await checkAuth();
    const table = mapCollectionToTable(collectionName);
    const row = translateClientToRow(collectionName, data);

    const supabase = await createClient();
    const { error } = await supabase.from(table).upsert({
      ...row,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    if (error) {
      const errorMsg = typeof error === "object" && error !== null && "message" in error
        ? String((error as any).message)
        : "Database upsert failed";
      logger.warn(`Supabase upsert warning on ${table}: ${errorMsg}`, { error });
    }

    const clientRecord = translateRowToClient(collectionName, { ...row, id, created_at: new Date().toISOString() });
    if (!memoryStore[collectionName]) {
      memoryStore[collectionName] = [];
    }
    memoryStore[collectionName] = [clientRecord, ...memoryStore[collectionName].filter(item => String(item.id) !== String(id))];

    triggerRevalidation(collectionName);
    await logAuditServer(email, "CREATE_WITH_ID", collectionName, { id, ...data });
    return id;
  } catch (err: any) {
    const message = err?.message || String(err);
    logger.error(`Failed to upsert document in ${collectionName}: ${message}`, err);
    return id;
  }
}

export async function updateDocServer(collectionName: string, id: string, data: any) {
  try {
    const email = await checkAuth();
    const table = mapCollectionToTable(collectionName);
    const row = translateClientToRow(collectionName, data);

    delete row.id;

    const supabase = await createClient();
    const { error } = await supabase.from(table).update({
      ...row,
      updated_at: new Date().toISOString()
    }).eq("id", id);

    if (error) {
      const errorMsg = typeof error === "object" && error !== null && "message" in error
        ? String((error as any).message)
        : "Database update failed";
      logger.warn(`Supabase update warning on ${table}: ${errorMsg}`, { error });
    }

    if (memoryStore[collectionName]) {
      const idx = memoryStore[collectionName].findIndex(item => String(item.id) === String(id));
      if (idx !== -1) {
        memoryStore[collectionName][idx] = { ...memoryStore[collectionName][idx], ...data, updatedAt: new Date().toISOString() };
      }
    }

    triggerRevalidation(collectionName);
    await logAuditServer(email, "UPDATE", collectionName, { id, ...data });
  } catch (err: any) {
    const message = err?.message || String(err);
    logger.error(`Failed to update document in ${collectionName}/${id}: ${message}`, err);
  }
}

export async function deleteDocServer(collectionName: string, id: string) {
  try {
    const email = await checkAuth();
    const table = mapCollectionToTable(collectionName);

    const supabase = await createClient();
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      const errorMsg = typeof error === "object" && error !== null && "message" in error
        ? String((error as any).message)
        : "Database delete failed";
      logger.warn(`Supabase delete warning on ${table}: ${errorMsg}`, { error });
    }

    if (memoryStore[collectionName]) {
      memoryStore[collectionName] = memoryStore[collectionName].filter(item => String(item.id) !== String(id));
    }

    triggerRevalidation(collectionName);
    await logAuditServer(email, "DELETE", collectionName, { id });
  } catch (err: any) {
    const message = err?.message || String(err);
    logger.error(`Failed to delete document in ${collectionName}/${id}: ${message}`, err);
  }
}

export async function logPageViewServer(data: { path: string; search: string; referrer: string; userAgent: string }) {
  try {
    if (supabaseAdmin && typeof supabaseAdmin.from === "function") {
      await supabaseAdmin.from("analytics").insert({
        path: data.path,
        search: data.search,
        referrer: data.referrer,
        user_agent: data.userAgent,
        created_at: new Date().toISOString()
      });
    }
  } catch (err) {
    logger.warn("Failed to log page view", { error: err });
  }
}

export async function uploadImageFromUrl(imageUrl: string, bucket: string = "general", folder: string = "/") {
  const email = await checkAuth();
  
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch image from URL: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    if (!contentType.startsWith("image/") && !contentType.startsWith("video/") && !contentType.startsWith("application/pdf")) {
      throw new Error(`Unsupported content type: ${contentType}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let ext = "png";
    if (contentType.includes("image/jpeg") || contentType.includes("image/jpg")) {
      ext = "jpg";
    } else if (contentType.includes("image/png")) {
      ext = "png";
    } else if (contentType.includes("image/gif")) {
      ext = "gif";
    } else if (contentType.includes("image/svg+xml")) {
      ext = "svg";
    } else if (contentType.includes("image/webp")) {
      ext = "webp";
    } else {
      const urlPath = new URL(imageUrl).pathname;
      const parsedExt = urlPath.split(".").pop();
      if (parsedExt && parsedExt.length < 5) {
        ext = parsedExt;
      }
    }

    const cleanFileName = `${Date.now()}.${ext}`;
    const cleanFolder = folder.replace(/(^\/|\/$)/g, "");
    const filePath = cleanFolder === "" ? cleanFileName : `${cleanFolder}/${cleanFileName}`;

    const supabase = await createClient();
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType,
        cacheControl: "3600",
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl,
      fileName: cleanFileName,
      size: buffer.length,
      type: contentType
    };
  } catch (error: any) {
    console.error("Failed to upload image from URL:", error);
    return {
      success: false,
      error: error.message || "Failed to download and upload image from the provided URL"
    };
  }
}
