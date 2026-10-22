'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { institutionTypeLabels, institutionTypeToSkin, skins } from '@/lib/skins';
import { useSkin } from '@/components/SkinProvider';
import { WaveBackdrop, WaveDivider } from '@/components/WaveBackdrop';
import { EnergyTrails } from '@/components/EnergyTrails';
import type { PublicInstitutionDetail } from '@/lib/institutions';

export function SchoolProfile({ data }: { data: PublicInstitutionDetail }) {
  const { setSkin } = useSkin();
  const { institution, classes } = data;

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
    { label: 'Email', value: institution.contactEmail },
    { label: 'Phone', value: institution.contactPhone },
    { label: 'Location', value: location },
  ].filter((row) => row.value) as { label: string; value: string }[];

  const skin = skins[institutionTypeToSkin(institution.type)];

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
        </div>
      </section>
      <WaveDivider />

      <section className="relative mx-auto max-w-site px-5 py-12 md:px-10 lg:px-14">
        <WaveBackdrop intensity="subtle" />
        <div className="relative grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold">About this institution</h2>
            <div className="mt-4 space-y-3">
              {contactRows.map((row) => (
                <div key={row.label} className="flex items-start gap-3 rounded-xl border border-line bg-card/90 p-4 backdrop-blur-sm">
                  <span className="shrink-0 text-sm font-bold text-muted">{row.label}</span>
                  <span className="text-sm text-foreground">{row.value}</span>
                </div>
              ))}
              {contactRows.length === 0 ? (
                <p className="rounded-xl border border-line bg-card/90 p-4 text-sm text-muted">
                  Contact details are available from the school directly.
                </p>
              ) : null}
            </div>

            <h2 className="mt-10 text-xl font-bold">Available classes</h2>
            {classes.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {classes.map((cls) => (
                  <span key={cls.id} className="rounded-full border border-line bg-card/80 px-4 py-1.5 text-sm font-semibold text-foreground">
                    {cls.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted">
                Class groups are not published yet — the school will confirm placement after you apply.
              </p>
            )}
          </div>

          <aside>
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-line bg-card/95 shadow-[0_20px_50px_-28px_rgb(var(--accent)/0.55)] backdrop-blur-xl">
              <div
                className="h-28 bg-cover bg-center"
                style={{ backgroundImage: `url(${skin.heroImage})` }}
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
