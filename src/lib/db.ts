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

// In-memory array fallback (important for Vercel/serverless where filesystem is read-only)
const globalRef = global as any;
if (!globalRef.inMemoryLeads) {
  globalRef.inMemoryLeads = [];
}

export async function getLeads(): Promise<Lead[]> {
  let fileLeads: Lead[] = [];
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    if (fileContent.trim()) {
      fileLeads = JSON.parse(fileContent) as Lead[];
    }
  } catch (error: any) {
    // Ignore read errors (ENOENT, etc.)
  }

  const combined = [...fileLeads];
  const inMemory = globalRef.inMemoryLeads as Lead[];
  for (const lead of inMemory) {
    if (!combined.some(l => l.id === lead.id)) {
      combined.push(lead);
    }
  }
  return combined;
}

export async function saveLead(newLead: Omit<Lead, 'id' | 'date'>): Promise<Lead> {
  const lead: Lead = {
    id: Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36),
    ...newLead,
    date: new Date().toISOString()
  };

  const inMemory = globalRef.inMemoryLeads as Lead[];
  inMemory.push(lead);

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
    console.warn('Database filesystem save skipped (expected on Vercel serverless):', error);
  }

  return lead;
}
