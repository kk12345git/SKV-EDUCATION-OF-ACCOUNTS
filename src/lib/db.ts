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

export async function getLeads(): Promise<Lead[]> {
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    if (!fileContent.trim()) {
      return [];
    }
    return JSON.parse(fileContent) as Lead[];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading database file:', error);
    return [];
  }
}

export async function saveLead(newLead: Omit<Lead, 'id' | 'date'>): Promise<Lead> {
  const dirPath = path.dirname(dbPath);
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    // Ignore
  }

  const leads = await getLeads();

  const lead: Lead = {
    id: Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36),
    ...newLead,
    date: new Date().toISOString()
  };

  leads.push(lead);

  await fs.writeFile(dbPath, JSON.stringify(leads, null, 2), 'utf-8');
  return lead;
}
