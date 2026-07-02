import { 
  createDocServer, 
  createDocWithIdServer, 
  updateDocServer, 
  deleteDocServer 
} from "./actions";

export const cms = {
  create: async (collectionName: string, data: any) => {
    return await createDocServer(collectionName, data);
  },
  
  createWithId: async (collectionName: string, id: string, data: any) => {
    return await createDocWithIdServer(collectionName, id, data);
  },

  update: async (collectionName: string, id: string, data: any) => {
    await updateDocServer(collectionName, id, data);
  },

  delete: async (collectionName: string, id: string) => {
    await deleteDocServer(collectionName, id);
  }
};
