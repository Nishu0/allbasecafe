import { NextResponse } from 'next/server';
import dataJson from '../../../data/data.json';

export async function GET() {
  try {
    return NextResponse.json(dataJson);
  } catch (error) {
    console.error('Error loading data:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
} 