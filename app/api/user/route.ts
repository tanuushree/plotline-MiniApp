import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUser, updateHighScore } from '../../lib/user';

export async function POST(req: NextRequest) {
  try {
    const { fid, username, displayName, pfpUrl, score } = await req.json();
    if (!fid || !username || !displayName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const user = await getOrCreateUser(fid, username, displayName, pfpUrl);
    if (typeof score === 'number') {
      await updateHighScore(fid, score);
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
} 