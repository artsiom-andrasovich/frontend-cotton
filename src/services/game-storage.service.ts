import { Card, Rating, ReviewLog } from "ts-fsrs";

const DB_NAME = "cotton-game-db";
const DB_VERSION = 1;
const STORE_NAME = "gameSessions";

export type GameSessionCard = {
  cardId: string;
  card: Card;
  log: ReviewLog;
  rate: Rating;
};

export type GameSession = {
  deckId: string;
  currentCardIndex: number;
  cards: GameSessionCard[];
  updatedAt: number;
};

class GameStorageService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  /**
   * Initialize IndexedDB database
   */
  private initDB(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new Error("Failed to open IndexedDB"));
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, {
            keyPath: "deckId",
          });
          // Create index for faster queries by deck ID
          objectStore.createIndex("deckId", "deckId", { unique: true });
          objectStore.createIndex("updatedAt", "updatedAt", { unique: false });
        }
      };
    });

    return this.dbPromise;
  }

  /**
   * Get game session by deck ID
   */
  async getSession(deckId: string): Promise<GameSession | null> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(deckId);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve(request.result || null);
        };
        request.onerror = () => {
          reject(new Error(`Failed to get session for deck ${deckId}`));
        };
      });
    } catch (error) {
      console.error("Error getting session:", error);
      return null;
    }
  }

  /**
   * Save or update game session
   */
  async saveSession(
    deckId: string,
    currentCardIndex: number,
    cards: GameSessionCard[]
  ): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const session: GameSession = {
        deckId,
        currentCardIndex,
        cards,
        updatedAt: Date.now(),
      };

      const request = store.put(session);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve();
        };
        request.onerror = () => {
          reject(new Error(`Failed to save session for deck ${deckId}`));
        };
      });
    } catch (error) {
      console.error("Error saving session:", error);
      throw error;
    }
  }

  /**
   * Delete game session by deck ID
   */
  async deleteSession(deckId: string): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(deckId);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve();
        };
        request.onerror = () => {
          reject(new Error(`Failed to delete session for deck ${deckId}`));
        };
      });
    } catch (error) {
      console.error("Error deleting session:", error);
      throw error;
    }
  }

  /**
   * Clear all game sessions (useful for cleanup)
   */
  async clearAllSessions(): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve();
        };
        request.onerror = () => {
          reject(new Error("Failed to clear all sessions"));
        };
      });
    } catch (error) {
      console.error("Error clearing all sessions:", error);
      throw error;
    }
  }

  /**
   * Get all sessions (useful for debugging)
   */
  async getAllSessions(): Promise<GameSession[]> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve(request.result || []);
        };
        request.onerror = () => {
          reject(new Error("Failed to get all sessions"));
        };
      });
    } catch (error) {
      console.error("Error getting all sessions:", error);
      return [];
    }
  }
}

// Export singleton instance
export const gameStorageService = new GameStorageService();
