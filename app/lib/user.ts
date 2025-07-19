import { getDb } from './mongodb';

export interface UserDoc {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl?: string;
  highScore: number;
}

const COLLECTION = 'users';

export async function getOrCreateUser(fid: number, username: string, displayName: string, pfpUrl?: string): Promise<UserDoc> {
  const db = await getDb();
  const users = db.collection<UserDoc>(COLLECTION);
  let user = await users.findOne({ fid });
  if (!user) {
    await users.insertOne({ fid, username, displayName, pfpUrl, highScore: 0 });
    user = await users.findOne({ fid });
  }
  return user!;
}

export async function updateHighScore(fid: number, newScore: number): Promise<void> {
  const db = await getDb();
  const users = db.collection<UserDoc>(COLLECTION);
  await users.updateOne(
    { fid },
    { $max: { highScore: newScore } }
  );
} 