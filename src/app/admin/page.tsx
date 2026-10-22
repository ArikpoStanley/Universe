'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, LogOut, Mail, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';

const TOKEN_KEY = 'universe-web-admin-token';

type Lead = {
  id: string;
  name: string;
  email: string;
  organisation?: string | null;
  topic?: string | null;
  message: string;
  createdAt: string;
};

function useApi(token: string | null, onUnauthorized: () => void) {
  return useCallback(
    async (path: string, options: RequestInit = {}) => {
      const res = await fetch(`/api/v1${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      });
      if (res.status === 401) {
        onUnauthorized();
        throw new Error('Session expired');
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Request failed (${res.status})`);
      }
      return res.json();
    },
    [token, onUnauthorized],
  );
}

function LoginCard({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      if (data.status === 'select_institution') {
        throw new Error('Pick a single institution membership for CMS access, or use the platform Super Admin account.');
      }
      if (data.status === 'two_factor' || data.challengeId) {
        throw new Error('Complete 2FA in the Universe portal first, then return here.');
      }

      const token = data.tokens?.accessToken || data.accessToken;
      if (!token) throw new Error('No access token returned. Use a platform Super Admin account.');

      sessionStorage.setItem(TOKEN_KEY, token);
      onLogin(token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5 pt-20">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card w-full max-w-md p-9"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-soft">
            Marketing inbox
          </p>
          <p className="mt-2 text-sm text-muted">
            Sign in with a Universe platform Super Admin account to review contact leads.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Email
            </label>
            <input
              className="field"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@universe.school"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Password
            </label>
            <input
              className="field"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
            />
          </div>
          {error && (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}
          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

function LeadsPanel({ api }: { api: (path: string) => Promise<Lead[]> }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const rows = await api('/platform/marketing/leads');
      setLeads(Array.isArray(rows) ? rows : []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not load leads');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Contact leads</h2>
          <p className="mt-1 text-sm text-muted">
            Submissions from the Universe marketing site contact form.
          </p>
        </div>
        <button type="button" onClick={() => void refresh()} className="btn-ghost !px-4 !py-2 text-sm">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : error ? (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      ) : leads.length === 0 ? (
        <p className="text-sm text-muted">No contact leads yet.</p>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <article key={lead.id} className="glass-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{lead.name}</p>
                  <p className="text-sm text-accent-soft">{lead.email}</p>
                </div>
                <p className="text-[11px] text-muted">
                  {new Date(lead.createdAt).toLocaleString()}
                </p>
              </div>
              {(lead.organisation || lead.topic) && (
                <p className="mt-2 text-xs text-muted">
                  {[lead.organisation, lead.topic].filter(Boolean).join(' · ')}
                </p>
              )}
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {lead.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY));
    setReady(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  const api = useApi(token, logout);

  if (!ready) return null;
  if (!token) return <LoginCard onLogin={setToken} />;

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-28 md:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-soft">
            Universe marketing
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold">Admin</h1>
        </div>
        <button onClick={logout} className="btn-ghost !px-4 !py-2 text-sm">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="leads"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-soft">
            <Mail className="h-3.5 w-3.5" /> Inbox
          </div>
          <LeadsPanel api={api} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
