'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  Save,
  Tags,
  Trash2,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';

/* ================= API helper ================= */

function useApi(token: string | null, onUnauthorized: () => void) {
  return useCallback(
    async (path: string, options: RequestInit = {}) => {
      const res = await fetch(`/api/admin${path}`, {
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

/* ================= Login ================= */

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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      sessionStorage.setItem('spring-admin-token', data.token);
      onLogin(data.token);
    } catch (err: any) {
      setError(err.message);
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
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Content Management System
          </p>
          <p className="mt-2 text-sm text-muted">Sign in to manage the Spring website.</p>
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
              placeholder="admin@spring.ng"
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
          <button type="submit" disabled={busy} className="btn-gold w-full">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

/* ================= Shared bits ================= */

function Status({ msg }: { msg: { kind: 'ok' | 'err'; text: string } | null }) {
  if (!msg) return null;
  return (
    <p
      className={`rounded-lg px-4 py-3 text-sm ${
        msg.kind === 'ok'
          ? 'border border-gold/40 bg-gold/10 text-gold'
          : 'border border-red-500/40 bg-red-500/10 text-red-400'
      }`}
    >
      {msg.text}
    </p>
  );
}

const inputCls = 'field text-sm';
const labelCls = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted';

/* ================= Pages tab ================= */

const SECTION_TEMPLATES: Record<string, object> = {
  hero: { type: 'hero', kicker: 'Kicker', heading: 'Heading', subheading: 'Subheading', cta: { label: 'Call to action', href: '/contact' } },
  stats: { type: 'stats', items: [{ value: '20M+', label: 'Stat label' }] },
  features: { type: 'features', kicker: 'Kicker', heading: 'Heading', items: [{ icon: 'Home', title: 'Feature', text: 'Description' }] },
  cards: { type: 'cards', kicker: 'Kicker', heading: 'Heading', items: [{ icon: 'ShieldCheck', title: 'Card', text: 'Description' }] },
  steps: { type: 'steps', kicker: 'Kicker', heading: 'Heading', items: [{ title: 'Step one', text: 'Description' }] },
  split: { type: 'split', kicker: 'Kicker', heading: 'Heading', body: 'Body text', items: [{ title: 'Point', text: 'Detail' }] },
  quote: { type: 'quote', kicker: 'Kicker', heading: 'Statement', body: 'Supporting text' },
  rich: { type: 'rich', heading: 'Heading', body: 'Paragraph text' },
  cta: { type: 'cta', heading: 'Heading', body: 'Body', cta: { label: 'Contact Us', href: '/contact' } },
  pricing: { type: 'pricing' },
  faq: { type: 'faq' },
  contact: { type: 'contact' },
};

function PagesTab({ api }: { api: ReturnType<typeof useApi> }) {
  const [pages, setPages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(true);
  const [content, setContent] = useState('');
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api('/pages').then(setPages).catch(() => {});
  }, [api]);

  function pick(page: any) {
    setSelected(page);
    setTitle(page.title);
    setDescription(page.description || '');
    setPublished(page.published);
    try {
      setContent(JSON.stringify(JSON.parse(page.content), null, 2));
    } catch {
      setContent(page.content);
    }
    setMsg(null);
  }

  function validate(): boolean {
    try {
      const parsed = JSON.parse(content);
      if (!Array.isArray(parsed)) throw new Error('Content must be a JSON array of sections.');
      return true;
    } catch (err: any) {
      setMsg({ kind: 'err', text: `Invalid JSON: ${err.message}` });
      return false;
    }
  }

  async function save() {
    if (!validate() || !selected) return;
    setBusy(true);
    setMsg(null);
    try {
      await api(`/pages/${selected.slug}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, content: JSON.stringify(JSON.parse(content)), published }),
      });
      setMsg({ kind: 'ok', text: 'Page saved. Changes are live on the site.' });
      setPages(await api('/pages'));
    } catch (err: any) {
      setMsg({ kind: 'err', text: err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <div className="space-y-2">
        {pages.map((p) => (
          <button
            key={p.slug}
            onClick={() => pick(p)}
            className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
              selected?.slug === p.slug
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-line bg-card hover:border-gold/40'
            }`}
          >
            <span className="block font-medium">{p.title}</span>
            <span className="text-xs text-muted">/{p.slug === 'home' ? '' : p.slug}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {!selected ? (
          <div className="glass-card flex min-h-[16rem] items-center justify-center p-8 text-sm text-muted">
            Select a page to edit its content.
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Meta description</label>
                <input
                  className={inputCls}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 accent-[#d4af37]"
              />
              Published (visible on the site)
            </label>
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <label className={labelCls + ' !mb-0'}>Sections (JSON)</label>
                <div className="flex items-center gap-2">
                  <select
                    className="field !w-auto !px-3 !py-1.5 text-xs"
                    value=""
                    onChange={(e) => {
                      if (!e.target.value) return;
                      try {
                        const arr = JSON.parse(content || '[]');
                        arr.push(SECTION_TEMPLATES[e.target.value]);
                        setContent(JSON.stringify(arr, null, 2));
                      } catch {
                        setMsg({ kind: 'err', text: 'Fix the JSON before inserting a section.' });
                      }
                    }}
                  >
                    <option value="">+ Insert section…</option>
                    {Object.keys(SECTION_TEMPLATES).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => validate() && setContent(JSON.stringify(JSON.parse(content), null, 2))}
                    className="btn-ghost !px-3 !py-1.5 text-xs"
                  >
                    Prettify
                  </button>
                </div>
              </div>
              <textarea
                className="field min-h-[22rem] font-mono text-xs leading-relaxed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                spellCheck={false}
              />
            </div>
            <Status msg={msg} />
            <button onClick={save} disabled={busy} className="btn-gold">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Page
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= Generic collection editor ================= */

interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'checkbox' | 'number';
  hint?: string;
}

function CollectionTab({
  api,
  endpoint,
  fields,
  itemLabel,
  renderRow,
  blank,
}: {
  api: ReturnType<typeof useApi>;
  endpoint: string;
  fields: FieldDef[];
  itemLabel: (item: any) => string;
  renderRow?: (item: any) => string;
  blank: any;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => api(endpoint).then(setItems).catch(() => {}), [api, endpoint]);
  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      if (editing.id) {
        await api(`${endpoint}/${editing.id}`, { method: 'PUT', body: JSON.stringify(editing) });
      } else {
        await api(endpoint, { method: 'POST', body: JSON.stringify(editing) });
      }
      setMsg({ kind: 'ok', text: 'Saved.' });
      setEditing(null);
      await load();
    } catch (err: any) {
      setMsg({ kind: 'err', text: err.message });
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    try {
      await api(`${endpoint}/${id}`, { method: 'DELETE' });
      await load();
    } catch (err: any) {
      setMsg({ kind: 'err', text: err.message });
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <button onClick={() => setEditing({ ...blank })} className="btn-ghost w-full !py-3 text-sm">
          <Plus className="h-4 w-4" /> New item
        </button>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{itemLabel(item)}</p>
              {renderRow && <p className="truncate text-xs text-muted">{renderRow(item)}</p>}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => setEditing({ ...item })}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-gold transition-colors hover:border-gold"
                aria-label="Edit"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => remove(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-red-400 transition-colors hover:border-red-400"
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <AnimatePresence mode="wait">
          {editing && (
            <motion.div
              key={editing.id || 'new'}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass-card space-y-4 p-6"
            >
              {fields.map((f) => (
                <div key={f.key}>
                  {f.type === 'checkbox' ? (
                    <label className="flex items-center gap-2 text-sm text-muted">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-[#d4af37]"
                        checked={!!editing[f.key]}
                        onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
                      />
                      {f.label}
                    </label>
                  ) : (
                    <>
                      <label className={labelCls}>{f.label}</label>
                      {f.type === 'textarea' ? (
                        <textarea
                          rows={f.key === 'content' ? 10 : 4}
                          className={inputCls}
                          value={editing[f.key] ?? ''}
                          onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                          placeholder={f.hint}
                        />
                      ) : (
                        <input
                          type={f.type === 'number' ? 'number' : 'text'}
                          className={inputCls}
                          value={editing[f.key] ?? ''}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value,
                            })
                          }
                          placeholder={f.hint}
                        />
                      )}
                      {f.hint && f.type === 'textarea' && (
                        <p className="mt-1 text-[11px] text-muted/70">{f.hint}</p>
                      )}
                    </>
                  )}
                </div>
              ))}
              <Status msg={msg} />
              <div className="flex gap-3">
                <button onClick={save} disabled={busy} className="btn-gold !px-5 !py-2.5 text-sm">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </button>
                <button onClick={() => setEditing(null)} className="btn-ghost !px-5 !py-2.5 text-sm">
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================= Messages tab ================= */

function MessagesTab({ api }: { api: ReturnType<typeof useApi> }) {
  const [messages, setMessages] = useState<any[]>([]);

  const load = useCallback(() => api('/messages').then(setMessages).catch(() => {}), [api]);
  useEffect(() => {
    load();
  }, [load]);

  async function remove(id: number) {
    await api(`/messages/${id}`, { method: 'DELETE' }).catch(() => {});
    load();
  }

  if (messages.length === 0)
    return (
      <div className="glass-card flex min-h-[12rem] items-center justify-center p-8 text-sm text-muted">
        No contact messages yet. Submissions from the Contact page appear here.
      </div>
    );

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div key={m.id} className="rounded-xl border border-line bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">
                {m.name} <span className="font-normal text-muted">· {m.email}</span>
              </p>
              <p className="mt-0.5 text-xs uppercase tracking-widest text-gold">
                {m.topic} {m.company ? `· ${m.company}` : ''}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{m.message}</p>
              <p className="mt-3 text-[11px] text-muted/60">
                {new Date(m.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => remove(m.id)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-red-400 hover:border-red-400"
              aria-label="Delete message"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================= Shell ================= */

const TABS = [
  { id: 'pages', label: 'Pages', icon: FileText },
  { id: 'posts', label: 'Blog Posts', icon: LayoutDashboard },
  { id: 'pricing', label: 'Pricing', icon: Tags },
  { id: 'faqs', label: 'FAQs', icon: MessageSquare },
  { id: 'messages', label: 'Messages', icon: Mail },
];

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState('pages');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem('spring-admin-token'));
    setReady(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('spring-admin-token');
    setToken(null);
  }, []);

  const api = useApi(token, logout);

  if (!ready) return null;
  if (!token) return <LoginCard onLogin={setToken} />;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Spring CMS
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold">Content Manager</h1>
        </div>
        <button onClick={logout} className="btn-ghost !px-4 !py-2 text-sm">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
              tab === t.id
                ? 'border-gold bg-gold text-black'
                : 'border-line bg-card text-muted hover:border-gold/50 hover:text-foreground'
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {tab === 'pages' && <PagesTab api={api} />}
          {tab === 'posts' && (
            <CollectionTab
              api={api}
              endpoint="/posts"
              blank={{ title: '', slug: '', tag: 'Insight', excerpt: '', content: '', published: true }}
              itemLabel={(p) => p.title}
              renderRow={(p) => `/blog/${p.slug} · ${p.tag}${p.published ? '' : ' · draft'}`}
              fields={[
                { key: 'title', label: 'Title' },
                { key: 'slug', label: 'Slug', hint: 'url-friendly-name' },
                { key: 'tag', label: 'Tag' },
                { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
                { key: 'content', label: 'Content', type: 'textarea', hint: 'Separate paragraphs with a blank line.' },
                { key: 'published', label: 'Published', type: 'checkbox' },
              ]}
            />
          )}
          {tab === 'pricing' && (
            <CollectionTab
              api={api}
              endpoint="/pricing"
              blank={{ name: '', audience: '', price: '', unit: '', features: '', highlighted: false, sortOrder: 0 }}
              itemLabel={(p) => p.name}
              renderRow={(p) => `${p.price} — ${p.unit}`}
              fields={[
                { key: 'name', label: 'Plan name' },
                { key: 'audience', label: 'Audience' },
                { key: 'price', label: 'Price', hint: '$5,000 – $10,000' },
                { key: 'unit', label: 'Unit', hint: 'one-time setup' },
                { key: 'features', label: 'Features', type: 'textarea', hint: 'One feature per line.' },
                { key: 'highlighted', label: 'Highlight as most popular', type: 'checkbox' },
                { key: 'sortOrder', label: 'Sort order', type: 'number' },
              ]}
            />
          )}
          {tab === 'faqs' && (
            <CollectionTab
              api={api}
              endpoint="/faqs"
              blank={{ question: '', answer: '', sortOrder: 0 }}
              itemLabel={(f) => f.question}
              fields={[
                { key: 'question', label: 'Question' },
                { key: 'answer', label: 'Answer', type: 'textarea' },
                { key: 'sortOrder', label: 'Sort order', type: 'number' },
              ]}
            />
          )}
          {tab === 'messages' && <MessagesTab api={api} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
