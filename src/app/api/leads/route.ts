import { NextResponse } from 'next/server';
import { getLeads, saveLead } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, phone, email, course, timing, qualification, purpose } = body;

    if (!name || !phone || !type) {
      return NextResponse.json(
        { error: 'Name, phone, and submission type are required.' },
        { status: 400 }
      );
    }

    const lead = await saveLead({
      type,
      name,
      phone,
      email: email || '',
      course: course || '',
      timing: timing || '',
      qualification: qualification || '',
      purpose: purpose || ''
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('API lead POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-key');
    if (authHeader !== 'skvadmin2026') {
      return NextResponse.json(
        { error: 'Unauthorized access key' },
        { status: 401 }
      );
    }

    const leads = await getLeads();
    const sortedLeads = leads.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ success: true, leads: sortedLeads });
  } catch (error) {
    console.error('API lead GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
