import { NextResponse } from 'next/server';
import { getDb } from '../../lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const users = await db
      .collection('users')
      .find({ highScore: { $gt: 0 } })
      .project({ username: 1, pfpUrl: 1, highScore: 1, _id: 0 })
      .sort({ highScore: -1 })
      .limit(50)
      .toArray();
    return NextResponse.json(users);
  } catch (err) {
    console.error('[DEBUG] Leaderboard fetch error:', err);
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
} 