import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from "../../firebase"
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const docRef = await addDoc(collection(db, 'surveys'), req.body);
      res.status(200).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Error adding document: ' + (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}