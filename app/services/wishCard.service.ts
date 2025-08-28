import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
  type QueryConstraint,
} from "firebase/firestore";
import { fireDB } from "~/lib/firebase";
import type { ICardDoc, ICardFilter, ICreateCard } from "./interface";

/**
 * Service for interacting with the cards collection in Firestore
 */
class WishCardService {
  private readonly collectionName = "cards";

  constructor() {
    // Bind methods to preserve 'this' context
    this.createCard = this.createCard.bind(this);
    this.getAllCards = this.getAllCards.bind(this);
    this.getLastVisibleDoc = this.getLastVisibleDoc.bind(this);
    this.getCard = this.getCard.bind(this);
    this.subscribeToCollection = this.subscribeToCollection.bind(this);
  }

  /**
   * Creates a new card document in Firestore
   * @param payload - The data for the new card
   * @returns The ID of the newly created document
   */
  async createCard(payload: ICreateCard): Promise<string> {
    try {
      const docRef = await addDoc(collection(fireDB, this.collectionName), {
		
        ...payload,
        createdAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding document", error);
      throw error;
    }
  }

  /**
   * Fetches a paginated list of cards from Firestore
   * @param filters - The filters to apply to the query
   * @param page - The page number to fetch
   * @param pageLimit - The number of items per page
   * @returns An array of card documents
   */
  async getAllCards(
    filters: ICardFilter,
    page: number = 1,
    pageLimit: number = 10
  ): Promise<ICardDoc[]> {
    try {
      const constraints: QueryConstraint[] = [];

      if (filters) {
        // Add where clauses for each filter
        Object.entries(filters).forEach(([key, value]) => {
          constraints.push(where(key, "==", value));
        });
      }

      if (page > 1) {
        const lastVisibleDoc = await this.getLastVisibleDoc(
          page - 1,
          pageLimit,
          filters
        );
        if (lastVisibleDoc) {
          constraints.push(startAfter(lastVisibleDoc));
        }
      }

      constraints.push(limit(pageLimit));

      const q = query(collection(fireDB, this.collectionName), ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as ICardDoc
      );
    } catch (error) {
      console.error("Error fetching documents", error);
      throw error;
    }
  }

  /**
   * Fetches the last visible document for pagination
   * @param page - The page number
   * @param pageLimit - The number of items per page
   * @param filters - The filters to apply to the query
   * @returns The last visible document
   */
  async getLastVisibleDoc(
    page: number,
    pageLimit: number,
    filters: ICardFilter
  ) {
    try {
      const constraints: QueryConstraint[] = [];

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          constraints.push(where(key, "==", value));
        });
      }

      constraints.push(limit(page * pageLimit));

      const q = query(collection(fireDB, this.collectionName), ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs[querySnapshot.docs.length - 1];
    } catch (error) {
      console.error("Error fetching last visible document", error);
      throw error;
    }
  }

  /**
   * Fetches a single card document from Firestore
   * @param id - The ID of the document to fetch
   * @returns The card document
   */
  async getCard(id: string): Promise<ICardDoc | undefined> {
    try {
      const docRef = await getDoc(doc(fireDB, this.collectionName, id));
      return docRef.exists()
        ? ({ ...docRef.data(), id: docRef.id } as ICardDoc)
        : undefined;
    } catch (error) {
      console.error("Error fetching document");
      throw error;
    }
  }

  /**
   * Subscribes to real-time updates for the cards collection
   * @param callback - The callback to invoke with the updated data
   * @param onError - The callback to invoke when an error occurs
   * @returns An unsubscribe function
   */
  subscribeToCollection(
    callback: (data: ICardDoc[]) => void,
    onError: (error: Error) => void
  ) {
    const snapQuery = query(
      collection(fireDB, this.collectionName),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(
      snapQuery,
      (querySnapshot) => {
        const items: ICardDoc[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ ...doc.data(), id: doc.id } as ICardDoc);
        });
        callback(items);
      },
      onError
    );
  }
}

export default new WishCardService();
