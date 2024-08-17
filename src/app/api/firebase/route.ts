import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const q = query(collection(db, "message"), orderBy("createdAt"));
  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return new NextResponse(JSON.stringify(data), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  addDoc(collection(db, "message"), data);
  return new NextResponse(JSON.stringify({}), {
    status: 200,
  });
}
