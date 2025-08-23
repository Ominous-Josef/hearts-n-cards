import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  type DocumentData,
} from "firebase/firestore";
import { fireDB } from "~/lib/firebase";

interface ICardDoc {
  id: string;
  title: string;
  content: string;
  description: string;
  recipient: string;
  recipientEmail: string;
  createdAt: Date;
}

export const CardService = {
  async createCard(payload: ICardDoc) {
    try {
      const docRef = await addDoc(
        collection(fireDB, "cards"),
        Object.assign({}, { ...payload, createdAt: new Date() })
      );
    } catch (error) {
      console.error("Error adding document", error);
      throw error;
    }
  },

  async getAllCards(filter: any, page: number = 1, limit: number = 10) {
    try {
      const querySnapshot = await getDocs(collection(fireDB, "cards"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      return data;
    } catch (error) {
      console.error("Error fetching documents", error);
      throw error;
    }
  },

  async getCard(id: string) {
    try {
      const docRef = await getDoc(doc(fireDB, "cards", id));
      return docRef.data();
    } catch (error) {
      console.error("Error fetching document");
      throw error;
    }
  },

  async subscribeToCollection(callback: (data: DocumentData[]) => void) {
    const q = query(collection(fireDB, "cards"), orderBy("createdAt", "desc"));

    return onSnapshot(q, (querySnapshot) => {
      const items: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(items);
    });
  },
};
