import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "#/firebaseConfig";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const q = query(collection(db, "message"), orderBy("createdAt"));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await addDoc(collection(db, "message"), data);
      res.status(200).json({ message: "Document added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add document" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
