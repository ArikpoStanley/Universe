'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { institutionTypeLabels, institutionTypeToSkin, skins } from '@/lib/skins';
import { useSkin } from '@/components/SkinProvider';
import { WaveBackdrop } from '@/components/WaveBackdrop';
import { EnergyTrails } from '@/components/EnergyTrails';
import type { PublicInstitutionDetail } from '@/lib/institutions';

export function SchoolProfile({ data }: { data: PublicInstitutionDetail }) {
  const { setSkin } = useSkin();
  const { institution, classes, stats, entranceTest } = data;

  useEffect(() => {
    setSkin(institutionTypeToSkin(institution.type));
  }, [institution.type, setSkin]);

  const location = [
    institution.physicalAddress,
    institution.city,
    institution.state,
    institution.country,
  ].filter(Boolean).join(', ');

  const contactRows = [
    { label: 'Email', value: institution.contactEmail, href: institution.contactEmail ? `mailto:${institution.contactEmail}` : undefined },
    { label: 'Phone', value: institution.contactPhone, href: institution.contactPhone ? `tel:${institution.contactPhone}` : undefined },
    { label: 'Location', value: location },
  ].filter((row) => row.value) as { label: string; value: string; href?: string }[];

  const skin = skins[institutionTypeToSkin(institution.type)];
  const establishedYear = institution.createdAt
    ? new Date(institution.createdAt).getFullYear()
    : null;

  const statItems = [
    { label: 'Classes', value: stats?.classes ?? classes.length },
    { label: 'Learners', value: stats?.learners ?? null },
    { label: 'Staff', value: stats?.staff ?? null },
    ...(establishedYear ? [{ label: 'On Universe since', value: establishedYear }] : []),
  ].filter((item) => item.value !== null) as { label: string; value: string | number }[];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${skin.heroImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/70 to-background" />
        <EnergyTrails intensity="hero" />
        <WaveBackdrop intensity="default" />
        <div className="relative mx-auto max-w-site px-5 py-14 pt-12 md:px-10 md:pt-16 lg:px-14">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-accent-soft">
            Campus life · powered by Universe
          </p>
          <Link href="/schools" className="text-sm font-semibold text-accent-soft hover:underline">
            ← All institutions
          </Link>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-5xl shadow-lg"
              style={{
                background: institution.primaryColor
                  ? `linear-gradient(135deg, ${institution.primaryColor} 0%, ${institution.secondaryColor ?? institution.primaryColor} 100%)`
                  : 'rgb(var(--accent))',
              }}
            >
              {institution.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={institution.logoUrl} alt={`${institution.name} logo`} className="h-16 w-16 rounded-xl object-contain" />
              ) : (
                skin.motif
              )}
            </div>
            <div>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                {institutionTypeLabels[institution.type] ?? institution.type}
              </span>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{institution.name}</h1>
              {location ? <p className="mt-2 text-sm text-muted">📍 {location}</p> : null}
            </div>
          </div>

          {statItems.length ? (
            <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {statItems.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-line bg-card/80 p-4 text-center backdrop-blur-sm">
                  <p className="font-display text-2xl font-black text-accent-soft">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="relative mx-auto max-w-site px-5 py-12 md:px-10 lg:px-14">
        <WaveBackdrop intensity="subtle" />
        <div className="relative grid gap-8 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="text-xl font-bold">About this institution</h2>
              <div className="mt-4 space-y-3">
                {contactRows.map((row) => (
                  <div key={row.label} className="flex items-start gap-3 rounded-xl border border-line bg-card/90 p-4 backdrop-blur-sm">
                    <span className="w-24 shrink-0 text-sm font-bold text-muted">{row.label}</span>
                    {row.href ? (
                      <a href={row.href} className="text-sm text-foreground hover:text-accent-soft hover:underline">
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-sm text-foreground">{row.value}</span>
                    )}
                  </div>
                ))}
                {contactRows.length === 0 ? (
                  <p className="rounded-xl border border-line bg-card/90 p-4 text-sm text-muted">
                    Contact details are available from the school directly.
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold">Available classes</h2>
              {classes.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {classes.map((cls) => (
                    <span key={cls.id} className="rounded-full border border-line bg-card/80 px-4 py-1.5 text-sm font-semibold text-foreground">
                      {cls.name}
                      {cls.level ? <span className="ml-2 text-xs font-normal text-muted">{cls.level}</span> : null}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted">
                  Class groups are not published yet — the school will confirm placement after you apply.
                </p>
              )}
            </div>

            {entranceTest ? (
              <div className="overflow-hidden rounded-2xl border border-line bg-card/90 backdrop-blur-sm">
                <div className="h-1.5 bg-gradient-to-r from-accent via-accent-soft to-ok" aria-hidden />
                <div className="p-6">
                  <h2 className="text-xl font-bold">Entrance assessment</h2>
                  <p className="mt-1 text-sm font-semibold text-accent-soft">{entranceTest.title}</p>
                  {entranceTest.description ? (
                    <p className="mt-2 text-sm text-muted">{entranceTest.description}</p>
                  ) : null}
                  {entranceTest.passMark != null ? (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-bold text-muted">
                      Pass mark: {entranceTest.passMark}%
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <aside>
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-line bg-card/95 shadow-[0_20px_50px_-28px_rgb(var(--accent)/0.55)] backdrop-blur-xl">
              <div
                className="h-28 bg-gradient-to-br from-accent/40 via-accent-soft/20 to-ok/15"
                aria-hidden
              />
              <div className="p-6">
                <h3 className="text-lg font-bold">Apply for admission</h3>
                <p className="mt-2 text-sm text-muted">
                  Complete the full student + guardian application for {institution.name}.
                </p>
                <Link href={`/apply/${institution.slug}`} className="btn-primary mt-5 w-full">
                  Apply now →
                </Link>
                <p className="mt-4 text-center text-xs text-muted">Free · no account needed to apply</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
