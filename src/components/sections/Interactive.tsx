'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Check, Mail, MapPin, Plus, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Reveal, Stagger, StaggerItem } from '../Reveal';
import type { FaqData, PricingPlanData } from '@/lib/types';

/* ---------------- Pricing ---------------- */

export function PricingCards({ plans }: { plans: PricingPlanData[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <StaggerItem key={plan.id}>
            <div
              className={`relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-2 ${
                plan.highlighted
                  ? 'border-gold bg-gradient-to-b from-gold/15 to-card shadow-[0_24px_70px_-24px_rgb(var(--gold)/0.5)]'
                  : 'border-line bg-card hover:border-gold/50'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  Most Popular
                </span>
              )}
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                {plan.audience}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold">{plan.name}</h3>
              <div className="mt-5">
                <span className="text-gold-gradient font-display text-3xl font-bold">
                  {plan.price}
                </span>
                <p className="mt-1 text-xs text-muted">{plan.unit}</p>
              </div>
              <ul className="mt-6 flex-1 space-y-3 border-t border-line/60 pt-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

export function FaqAccordion({ faqs }: { faqs: FaqData[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <Stagger className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <StaggerItem key={faq.id}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${
                  isOpen ? 'border-gold/60 bg-card' : 'border-line bg-card/50'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold md:text-lg">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                      isOpen ? 'border-gold bg-gold text-black' : 'border-line text-gold'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted md:text-[15px]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

/* ---------------- Contact ---------------- */

const INFO = [
  { icon: Mail, label: 'Email', value: 'partnerships@spring.ng' },
  { icon: Building2, label: 'Careers', value: 'hr@spring.ng' },
  { icon: MapPin, label: 'Headquarters', value: 'Lagos, Nigeria' },
];

export function ContactBlock() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/public/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          company: form.get('company'),
          topic: form.get('topic'),
          message: form.get('message'),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send');
      setServerMsg(data.message || 'Thank you — we will be in touch shortly.');
      setStatus('sent');
    } catch (err: any) {
      setServerMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Stagger className="space-y-5">
            {INFO.map((info, i) => (
              <StaggerItem key={i}>
                <div className="glass-card flex items-center gap-5 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">
                      {info.label}
                    </p>
                    <p className="mt-1 font-medium">{info.value}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.3} className="mt-8">
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-6">
              <p className="font-display text-lg font-semibold">Partner with us.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Real estate firms, banks, fintechs, cooperatives, churches, and NGOs — Spring takes
                care of the infrastructure. You focus on serving your customers.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form
            onSubmit={onSubmit}
            className="glass-card relative overflow-hidden p-7 md:p-9"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[24rem] flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-black"
                >
                  <Check className="h-8 w-8" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold">Message received.</h3>
                <p className="mt-3 max-w-sm text-sm text-muted">{serverMsg}</p>
              </motion.div>
            ) : (
              <div className="relative grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      Name *
                    </label>
                    <input name="name" required className="field" placeholder="Adaeze Okafor" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="field"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      Company
                    </label>
                    <input name="company" className="field" placeholder="Company Ltd." />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      I am a…
                    </label>
                    <select name="topic" className="field">
                      <option value="bank">Bank / Fintech</option>
                      <option value="real-estate">Real Estate Firm</option>
                      <option value="community">Church / Cooperative / NGO</option>
                      <option value="employer">Employer</option>
                      <option value="general">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="field resize-none"
                    placeholder="Tell us about your organisation and what you'd like to build…"
                  />
                </div>
                {status === 'error' && (
                  <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {serverMsg}
                  </p>
                )}
                <button type="submit" disabled={status === 'sending'} className="btn-gold group w-full sm:w-auto">
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
