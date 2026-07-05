'use client';

import React, { useState, useEffect } from 'react';
import { Download, Search, RefreshCw, Lock, ArrowLeft, Eye, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Lead {
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

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');

  useEffect(() => {
    // Check session storage for existing auth
    const savedAuth = sessionStorage.getItem('skv_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

  useEffect(() => {
    // Filter logic
    let tempLeads = [...leads];

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      tempLeads = tempLeads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(term) ||
          lead.phone.includes(term) ||
          (lead.email && lead.email.toLowerCase().includes(term))
      );
    }

    if (typeFilter !== 'all') {
      tempLeads = tempLeads.filter((lead) => lead.type === typeFilter);
    }

    if (courseFilter !== 'all') {
      tempLeads = tempLeads.filter((lead) => lead.course === courseFilter);
    }

    setFilteredLeads(tempLeads);
  }, [searchTerm, typeFilter, courseFilter, leads]);

  const fetchLeads = async () => {
    setLoading(true);
    setErrorMsg('');
    const key = adminKey || sessionStorage.getItem('skv_admin_key') || '';
    
    try {
      const response = await fetch('/api/leads', {
        method: 'GET',
        headers: {
          'x-admin-key': key,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLeads(data.leads);
        setFilteredLeads(data.leads);
        setIsAuthenticated(true);
        sessionStorage.setItem('skv_admin_auth', 'true');
        sessionStorage.setItem('skv_admin_key', key);
      } else {
        setErrorMsg(data.error || 'Failed to fetch leads. Verify your key.');
        sessionStorage.removeItem('skv_admin_auth');
        sessionStorage.removeItem('skv_admin_key');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    fetchLeads();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('skv_admin_auth');
    sessionStorage.removeItem('skv_admin_key');
    setIsAuthenticated(false);
    setLeads([]);
    setAdminKey('');
  };

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = ['Date', 'Type', 'Name', 'Phone', 'Email', 'Course', 'Timing', 'Qualification', 'Purpose'];
    const rows = filteredLeads.map((lead) => [
      new Date(lead.date).toLocaleDateString('en-IN') + ' ' + new Date(lead.date).toLocaleTimeString('en-IN'),
      lead.type,
      lead.name,
      lead.phone,
      lead.email || '',
      lead.course || '',
      lead.timing || '',
      lead.qualification || '',
      lead.purpose || '',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `skv_student_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats calculators
  const getStats = () => {
    const total = leads.length;
    const demos = leads.filter((l) => l.type.includes('demo') || l.type.includes('popup_demo')).length;
    const guides = leads.filter((l) => l.type.includes('guide')).length;
    const discounts = leads.filter((l) => l.type.includes('discount')).length;
    return { total, demos, guides, discounts };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-800 dark:text-slate-200 transition-colors duration-300 relative flex flex-col justify-between">
      <Navigation />

      <main className="flex-grow pt-24 pb-16 px-4 max-w-7xl mx-auto w-full">
        {!isAuthenticated ? (
          /* Login Dialog */
          <div className="max-w-md mx-auto my-20 p-6 sm:p-8 rounded-3xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-blue-500" />
            
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-light-border dark:border-dark-border text-primary dark:text-blue-400 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h1 className="font-display font-black text-xl text-slate-800 dark:text-white leading-tight">
                Admissions Registry Portal
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                This area is restricted. Enter your SKV administration access key to view student leads.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="admin-key" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                  Access Key
                </label>
                <input
                  type="password"
                  id="admin-key"
                  required
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter access key"
                  className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-250 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-bold flex items-center">
                  <ShieldAlert className="w-4 h-4 mr-1.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white text-sm font-bold uppercase tracking-wider shadow-md shadow-blue-500/10 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
              >
                <span>{loading ? 'Authenticating...' : 'Unlock Registry'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-6">
            
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-light-border dark:border-dark-border pb-6">
              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-800 dark:text-white tracking-tight">
                  Admissions Lead Registry
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Manage trial class bookings and resource brochure download records.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={fetchLeads}
                  disabled={loading}
                  className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 transition-all"
                  title="Refresh Leads Table"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleExportCSV}
                  disabled={filteredLeads.length === 0}
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Leads', val: stats.total, color: 'border-blue-200 dark:border-blue-950 text-primary dark:text-blue-400' },
                { label: 'Demo Bookings', val: stats.demos, color: 'border-emerald-200 dark:border-emerald-950 text-green-700 dark:text-green-400' },
                { label: 'Guide Downloads', val: stats.guides, color: 'border-amber-200 dark:border-amber-950 text-amber-600 dark:text-amber-400' },
                { label: 'Discounts Claimed', val: stats.discounts, color: 'border-purple-200 dark:border-purple-950 text-purple-700 dark:text-purple-450' }
              ].map((stat, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border bg-white dark:bg-dark-card shadow-sm ${stat.color}`}>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    {stat.label}
                  </span>
                  <span className="font-display font-black text-2xl sm:text-3xl block mt-1">
                    {stat.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Filters panel */}
            <div className="p-4 rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-primary text-slate-600 dark:text-slate-350"
                >
                  <option value="all">All Form Types</option>
                  <option value="demo_booking">Free Demo Class Form</option>
                  <option value="guide_download">Career Guide Lead Magnet</option>
                  <option value="exit_intent_discount">Exit Intent Discount</option>
                  <option value="delayed_popup_demo">Delayed Popup Demo</option>
                  <option value="brochure_popup_download">Hero Brochure Modal</option>
                  <option value="contact_page_demo_booking">Contact Page Form</option>
                </select>
              </div>

              <div>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-primary text-slate-600 dark:text-slate-350"
                >
                  <option value="all">All Courses</option>
                  <option>Tally Prime with GST</option>
                  <option>GST</option>
                  <option>SAP</option>
                  <option>Income Tax Returns</option>
                  <option>ESI & PF</option>
                  <option>MS Office</option>
                  <option>TDS & TCS</option>
                  <option>Basic Computer</option>
                  <option>Advanced Excel</option>
                </select>
              </div>
            </div>

            {/* Leads Table Card */}
            <div className="rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-light-border dark:border-dark-border text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      <th className="py-4 px-6">Timestamp</th>
                      <th className="py-4 px-6">Type</th>
                      <th className="py-4 px-6">Name</th>
                      <th className="py-4 px-6">Phone Number</th>
                      <th className="py-4 px-6">Email Address</th>
                      <th className="py-4 px-6">Course Interested</th>
                      <th className="py-4 px-6">Preferred Slot</th>
                      <th className="py-4 px-6">Qualification</th>
                      <th className="py-4 px-6">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-border dark:divide-dark-border text-xs">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-slate-400">
                          {loading ? 'Refreshing leads list...' : 'No student leads found matching your criteria.'}
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr 
                          key={lead.id}
                          className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors"
                        >
                          <td className="py-4 px-6 whitespace-nowrap text-[11px] text-slate-400 dark:text-slate-500">
                            {new Date(lead.date).toLocaleDateString('en-IN')}<br />
                            {new Date(lead.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                              lead.type.includes('demo') 
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400' 
                                : lead.type.includes('guide') 
                                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                                : 'bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400'
                            }`}>
                              {lead.type.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-bold text-slate-800 dark:text-slate-200">
                            {lead.name}
                          </td>
                          <td className="py-4 px-6 font-bold text-slate-650 dark:text-slate-350">
                            <a href={`tel:${lead.phone}`} className="hover:underline hover:text-primary">
                              {lead.phone}
                            </a>
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                            {lead.email ? (
                              <a href={`mailto:${lead.email}`} className="hover:underline">
                                {lead.email}
                              </a>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-700">—</span>
                            )}
                          </td>
                          <td className="py-4 px-6 font-semibold">
                            {lead.course || <span className="text-slate-300 dark:text-slate-700">—</span>}
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                            {lead.timing || <span className="text-slate-300 dark:text-slate-700">—</span>}
                          </td>
                          <td className="py-4 px-6 text-slate-550 dark:text-slate-350 font-medium">
                            {lead.qualification || <span className="text-slate-300 dark:text-slate-700">—</span>}
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                            {lead.purpose || <span className="text-slate-300 dark:text-slate-700">—</span>}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
