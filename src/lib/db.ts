// Upstash Redis Database Client for SKV Education leads persistence
import { promises as fs } from 'fs';
import path from 'path';

export interface Lead {
  id: string;
  type: string;
  name: string;
  phone: string;
  email?: string;
  course?: string;
  timing?: string;
  qualification?: string;
  purpose?: string;
  date: string;
}

const dbPath = path.join(process.cwd(), 'data', 'leads.json');

// Vercel KV credentials (injected automatically when Vercel KV is connected in dashboard)
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

// In-memory array fallback
const globalRef = global as any;
if (!globalRef.inMemoryLeads) {
  globalRef.inMemoryLeads = [];
}

async function fetchVercelKV(): Promise<Lead[]> {
  if (!KV_URL || !KV_TOKEN) return [];
  try {
    const res = await fetch(`${KV_URL}/get/leads`, {
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        return JSON.parse(data.result) as Lead[];
      }
    }
  } catch (err) {
    console.error('Vercel KV read failed:', err);
  }
  return [];
}

async function saveVercelKV(leads: Lead[]): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    const res = await fetch(KV_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', 'leads', JSON.stringify(leads)]),
    });
    return res.ok;
  } catch (err) {
    console.error('Vercel KV write failed:', err);
    return false;
  }
}

export async function getLeads(): Promise<Lead[]> {
  let leads: Lead[] = [];

  // 1. Try Vercel KV first
  if (KV_URL && KV_TOKEN) {
    leads = await fetchVercelKV();
  } else {
    // 2. Fall back to local file system
    try {
      const fileContent = await fs.readFile(dbPath, 'utf-8');
      if (fileContent.trim()) {
        leads = JSON.parse(fileContent) as Lead[];
      }
    } catch (error) {
      // Ignore
    }
  }

  // 3. Merge in-memory leads (backup)
  const inMemory = globalRef.inMemoryLeads as Lead[];
  for (const lead of inMemory) {
    if (!leads.some(l => l.id === lead.id)) {
      leads.push(lead);
    }
  }

  return leads.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function saveLead(newLead: Omit<Lead, 'id' | 'date'>): Promise<Lead> {
  const lead: Lead = {
    id: Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36),
    ...newLead,
    date: new Date().toISOString()
  };

  const inMemory = globalRef.inMemoryLeads as Lead[];
  inMemory.push(lead);

  // 1. Save to local file system
  try {
    const dirPath = path.dirname(dbPath);
    await fs.mkdir(dirPath, { recursive: true });

    let currentFileLeads: Lead[] = [];
    try {
      const fileContent = await fs.readFile(dbPath, 'utf-8');
      if (fileContent.trim()) {
        currentFileLeads = JSON.parse(fileContent);
      }
    } catch (e) {
      // Ignore
    }

    currentFileLeads.push(lead);
    await fs.writeFile(dbPath, JSON.stringify(currentFileLeads, null, 2), 'utf-8');
  } catch (error) {
    // Ignore write errors (expected on Vercel serverless)
  }

  // 2. Save to Vercel KV if connected
  if (KV_URL && KV_TOKEN) {
    try {
      const currentLeads = await fetchVercelKV();
      currentLeads.push(lead);
      await saveVercelKV(currentLeads);
    } catch (error) {
      console.error('Failed to sync to Vercel KV:', error);
    }
  }

  return lead;
}
