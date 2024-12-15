import { NextResponse } from 'next/server';

// In-memory storage for tools (replace with database in production)
let tools: any[] = [];

export async function POST(req: Request) {
  try {
    const tool = await req.json();
    tools.push(tool);
    return NextResponse.json({ success: true, tool });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save tool' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ tools });
} 