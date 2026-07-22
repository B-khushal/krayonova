import { 
  createDocServer, 
  createDocWithIdServer, 
  updateDocServer, 
  deleteDocServer 
} from "./actions";

function notifyClientUpdate(collectionName: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cms:updated", { detail: { collectionName } }));
  }
}

export const cms = {
  create: async (collectionName: string, data: any) => {
    const res = await createDocServer(collectionName, data);
    notifyClientUpdate(collectionName);
    return res;
  },
  
  createWithId: async (collectionName: string, id: string, data: any) => {
    const res = await createDocWithIdServer(collectionName, id, data);
    notifyClientUpdate(collectionName);
    return res;
  },

  update: async (collectionName: string, id: string, data: any) => {
    await updateDocServer(collectionName, id, data);
    notifyClientUpdate(collectionName);
  },

  delete: async (collectionName: string, id: string) => {
    await deleteDocServer(collectionName, id);
    notifyClientUpdate(collectionName);
  }
};
