import { db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { Article } from "@/lib/types";

const sanitizeUri = (uri: string) => uri.replace(/[:/]/g, "-");

export const saveFavoriteToFirestore = async (userId: string, article: Article) => {
  const safeId = sanitizeUri(article.uri);
  const docRef = doc(db, "users", userId, "favorites", safeId);
  await setDoc(docRef, article);
};

export const removeFavoriteFromFirestore = async (userId: string, articleUri: string) => {
  const safeId = sanitizeUri(articleUri);
  const docRef = doc(db, "users", userId, "favorites", safeId);
  await deleteDoc(docRef);
};

export const loadFavoritesFromFirestore = async (userId: string): Promise<Article[]> => {
  const colRef = collection(db, "users", userId, "favorites");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => doc.data() as Article);
};
