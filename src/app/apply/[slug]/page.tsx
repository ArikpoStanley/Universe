'use client';

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { institutionTypeToSkin, skins } from '@/lib/skins';
import { useSkin } from '@/components/SkinProvider';
import { WaveBackdrop } from '@/components/WaveBackdrop';
import { EnergyTrails } from '@/components/EnergyTrails';
import type { PublicInstitutionDetail } from '@/lib/institutions';
import {
  BLOOD_GROUP_OPTIONS,
  GENDER_OPTIONS,
  NATIONALITY_OPTIONS,
  RELATIONSHIP_OPTIONS,
  RELIGION_OPTIONS,
  combinePhone,
  getNationality,
} from '@/lib/form-options';
import { getNigeriaLgas, getNigeriaStateNames } from '@/lib/nigeria-helpers';

type Question = { id: string; prompt: string; options: string[] };
type Step = 'apply' | 'test' | 'done';

const API = '/api/v1';

function SectionCard({
  title,
  description,
  children,
  delay = 0,
}: {
  title: string;
  description: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.fieldset
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-line/80 bg-card/90 shadow-[0_18px_50px_-28px_rgb(var(--accent)/0.55)] backdrop-blur-xl"
    >
      <legend className="sr-only">{title}</legend>
      <div className="border-b border-line/70 bg-accent/10 px-5 py-4 md:px-6">
        <h2 className="text-base font-bold text-foreground md:text-lg">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <div className="space-y-4 p-5 md:p-6">{children}</div>
    </motion.fieldset>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-foreground">
      <span className="mb-1.5 flex items-center gap-2">
        {label}
        {hint ? <span className="text-[11px] font-medium text-muted">({hint})</span> : null}
      </span>
      {children}
    </label>
  );
}

function PhoneInput({
  label,
  required,
  nationalityCode,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  nationalityCode: string;
  value: string;
  onChange: (full: string) => void;
}) {
  const nation = getNationality(nationalityCode);
  const local = value.startsWith(nation.dialCode) ? value.slice(nation.dialCode.length) : value.replace(/^\+\d+/, '');
  return (
    <Field label={label} hint={required ? 'required' : undefined}>
      <div className="flex overflow-hidden rounded-xl border border-line bg-surface">
        <span className="flex items-center gap-1.5 border-r border-line px-3 text-sm text-muted">
          <span aria-hidden>{nation.flag}</span>
          <span>{nation.dialCode}</span>
        </span>
        <input
          className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
          required={required}
          inputMode="tel"
          placeholder="8012345678"
          value={local}
          onChange={(event) => onChange(combinePhone(nation.dialCode, event.target.value))}
        />
      </div>
    </Field>
  );
}

const emptyForm = {
  preferredAdmissionNumber: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  dateOfBirth: '',
  religion: '',
  bloodGroup: '',
  email: '',
  phone: '',
  alternatePhone: '',
  targetClassId: '',
  nin: '',
  country: 'NG',
  state: '',
  lga: '',
  streetAddress: '',
  houseNumber: '',
  nationality: 'NG',
  guardianNationality: 'NG',
  guardianName: '',
  guardianRelationship: '',
  guardianEmail: '',
  guardianOccupation: '',
  guardianPhone: '',
  alternateGuardianPhone: '',
  secondaryGuardianNationality: 'NG',
  secondaryGuardianName: '',
  secondaryGuardianRelationship: '',
  secondaryGuardianEmail: '',
  secondaryGuardianOccupation: '',
  secondaryGuardianPhone: '',
  medicalNotes: '',
  notes: '',
  applicationSource: 'Online',
};

export default function ApplyPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { setSkin, skinConfig } = useSkin();

  const [school, setSchool] = useState<PublicInstitutionDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>('apply');
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    void fetch(`${API}/public/institutions/${encodeURIComponent(slug)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('School not found');
        return response.json() as Promise<PublicInstitutionDetail>;
      })
      .then((data) => {
        setSchool(data);
        setSkin(institutionTypeToSkin(data.institution.type));
        setForm((current) => ({ ...current, targetClassId: data.classes[0]?.id ?? '' }));
      })
      .catch(() => setError('This school’s public admissions page is not available.'));
  }, [setSkin, slug]);

  const nigeriaStates = useMemo(() => getNigeriaStateNames(), []);
  const nigeriaLgas = useMemo(
    () => (form.country === 'NG' && form.state ? getNigeriaLgas(form.state) : []),
    [form.country, form.state],
  );

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function onSelect(key: keyof typeof form) {
    return (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) =>
      setField(key, event.target.value as never);
  }

  async function submitApply(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const studentNation = getNationality(form.nationality);
      const guardianNation = getNationality(form.guardianNationality);
      const secondaryNation = getNationality(form.secondaryGuardianNationality);

      const response = await fetch(`${API}/public/institutions/${encodeURIComponent(slug)}/admissions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          middleName: form.middleName || undefined,
          lastName: form.lastName,
          email: form.email,
          gender: form.gender,
          targetClassId: form.targetClassId || undefined,
          preferredAdmissionNumber: form.preferredAdmissionNumber || undefined,
          nationality: form.nationality,
          nationalityName: studentNation.name,
          phoneCountryCode: studentNation.dialCode,
          dateOfBirth: form.dateOfBirth || undefined,
          religion: form.religion || undefined,
          bloodGroup: form.bloodGroup || undefined,
          phone: form.phone || undefined,
          alternatePhone: form.alternatePhone || undefined,
          nin: form.nin || undefined,
          country: form.country || undefined,
          state: form.state || undefined,
          lga: form.lga || undefined,
          streetAddress: form.streetAddress || undefined,
          houseNumber: form.houseNumber || undefined,
          guardianName: form.guardianName,
          guardianEmail: form.guardianEmail,
          guardianPhone: form.guardianPhone,
          guardianRelationship: form.guardianRelationship,
          guardianNationality: form.guardianNationality,
          guardianNationalityName: guardianNation.name,
          guardianPhoneCountryCode: guardianNation.dialCode,
          guardianOccupation: form.guardianOccupation || undefined,
          alternateGuardianPhone: form.alternateGuardianPhone || undefined,
          secondaryGuardianNationality: form.secondaryGuardianName ? form.secondaryGuardianNationality : undefined,
          secondaryGuardianNationalityName: form.secondaryGuardianName ? secondaryNation.name : undefined,
          secondaryGuardianName: form.secondaryGuardianName || undefined,
          secondaryGuardianRelationship: form.secondaryGuardianRelationship || undefined,
          secondaryGuardianEmail: form.secondaryGuardianEmail || undefined,
          secondaryGuardianOccupation: form.secondaryGuardianOccupation || undefined,
          secondaryGuardianPhone: form.secondaryGuardianPhone || undefined,
          medicalNotes: form.medicalNotes || undefined,
          notes: form.notes || undefined,
          applicationSource: 'Online',
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof body.message === 'string' ? body.message : 'Could not submit application');
      setToken(body.publicToken);
      setAdmissionNumber(body.admissionNumber);
      setStep(school?.entranceTest ? 'test' : 'done');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not submit application');
    } finally {
      setSaving(false);
    }
  }

  async function submitTest(event: FormEvent) {
    event.preventDefault();
    const test = school?.entranceTest as { questions: Question[] } | null | undefined;
    if (!test) return;
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`${API}/public/institutions/${encodeURIComponent(slug)}/entrance-test/attempts`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          publicToken: token,
          answers: test.questions.map((question) => ({
            questionId: question.id,
            selectedIndex: answers[question.id] ?? -1,
          })),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof body.message === 'string' ? body.message : 'Could not submit test');
      setScore(body.score);
      setStep('done');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not submit test');
    } finally {
      setSaving(false);
    }
  }

  if (error && !school) {
    return (
      <main className="mx-auto max-w-xl px-5 py-40">
        <h1 className="font-display text-3xl font-bold">Admissions</h1>
        <p className="mt-2 text-muted">{error}</p>
      </main>
    );
  }

  if (!school) {
    return (
      <main className="mx-auto max-w-xl px-5 py-40">
        <p className="text-muted">Loading admissions…</p>
      </main>
    );
  }

  const test = school.entranceTest as { title: string; description?: string | null; questions: Question[] } | null;
  const applyImage = skins[institutionTypeToSkin(school.institution.type)].applyImage;
  const isEarlyYears = school.institution.type === 'nursery' || school.institution.type === 'primary';

  return (
    <div className="relative min-h-screen">
      {/* Atmosphere banner */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${applyImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/75 to-background" />
        <EnergyTrails intensity="hero" />
        <WaveBackdrop intensity="default" />
        <div className="relative mx-auto max-w-site px-5 pb-10 pt-12 md:px-10 md:pt-16 lg:px-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft"
          >
            {skinConfig.motif} Universe admissions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl"
          >
            {school.institution.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-3 max-w-2xl text-muted md:text-lg"
          >
            {step === 'apply'
              ? isEarlyYears
                ? 'A warm welcome — fill in every detail just like the school’s Add Student form so enrolment is seamless.'
                : 'Complete the full student and guardian application. Nothing is left out — the school receives everything they need.'
              : step === 'test'
                ? test?.title
                : 'Application received. The admissions team will be in touch.'}
          </motion.p>
        </div>
      </div>

      <main className="relative mx-auto max-w-5xl px-5 pb-24 md:px-10 lg:px-14">
        {error ? (
          <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>
        ) : null}

        {step === 'apply' ? (
          <form className="space-y-6" onSubmit={(event) => void submitApply(event)}>
            <SectionCard
              title="Student nationality"
              description="Sets the student's phone country code and default residence country."
              delay={0.05}
            >
              <Field label="Student nationality" hint="required — select first">
                <select
                  className="field"
                  required
                  value={form.nationality}
                  onChange={(event) => {
                    const code = event.target.value;
                    setForm((current) => ({
                      ...current,
                      nationality: code,
                      country: code,
                      state: '',
                      lga: '',
                      streetAddress: '',
                      houseNumber: '',
                    }));
                  }}
                >
                  {NATIONALITY_OPTIONS.map((row) => (
                    <option key={row.code} value={row.code}>
                      {row.flag} {row.name}
                    </option>
                  ))}
                </select>
              </Field>
            </SectionCard>

            <SectionCard
              title="Student biodata"
              description="Identity and personal details used for the student record and portal account."
              delay={0.1}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Admission number">
                  <input
                    className="field"
                    placeholder="Auto-generated if blank"
                    value={form.preferredAdmissionNumber}
                    onChange={onSelect('preferredAdmissionNumber')}
                  />
                </Field>
                <Field label="First name" hint="required">
                  <input className="field" required value={form.firstName} onChange={onSelect('firstName')} />
                </Field>
                <Field label="Middle name">
                  <input className="field" placeholder="Optional" value={form.middleName} onChange={onSelect('middleName')} />
                </Field>
                <Field label="Last name" hint="required">
                  <input className="field" required value={form.lastName} onChange={onSelect('lastName')} />
                </Field>
                <Field label="Gender" hint="required">
                  <select className="field" required value={form.gender} onChange={onSelect('gender')}>
                    <option value="">Select gender</option>
                    {GENDER_OPTIONS.map((row) => (
                      <option key={row.value} value={row.value}>{row.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Date of birth" hint="required">
                  <input className="field" type="date" required value={form.dateOfBirth} onChange={onSelect('dateOfBirth')} />
                </Field>
                <Field label="Religion" hint="required">
                  <select className="field" required value={form.religion} onChange={onSelect('religion')}>
                    <option value="">Select religion</option>
                    {RELIGION_OPTIONS.map((row) => (
                      <option key={row.value} value={row.value}>{row.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Blood group" hint="required">
                  <select className="field" required value={form.bloodGroup} onChange={onSelect('bloodGroup')}>
                    <option value="">Select blood group</option>
                    {BLOOD_GROUP_OPTIONS.map((row) => (
                      <option key={row.value} value={row.value}>{row.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Student email" hint="required">
                  <input className="field" type="email" required value={form.email} onChange={onSelect('email')} />
                </Field>
                <PhoneInput
                  label="Student phone"
                  required
                  nationalityCode={form.nationality}
                  value={form.phone}
                  onChange={(value) => setField('phone', value)}
                />
                <PhoneInput
                  label="Alternate phone"
                  required
                  nationalityCode={form.nationality}
                  value={form.alternatePhone}
                  onChange={(value) => setField('alternatePhone', value)}
                />
                <Field label="Class group" hint="required">
                  <select className="field" required value={form.targetClassId} onChange={onSelect('targetClassId')}>
                    <option value="">Select…</option>
                    {school.classes.map((row) => (
                      <option key={row.id} value={row.id}>{row.name}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-2 grid gap-4 sm:grid-cols-2">
                <Field label="NIN (National ID)" hint="required">
                  <input
                    className="field"
                    required
                    inputMode="numeric"
                    minLength={11}
                    maxLength={11}
                    pattern="[0-9]{11}"
                    placeholder="11-digit NIN"
                    value={form.nin}
                    onChange={onSelect('nin')}
                  />
                </Field>
                <Field label="Country of residence" hint="required">
                  <select
                    className="field"
                    required
                    value={form.country}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        country: event.target.value,
                        state: '',
                        lga: '',
                        streetAddress: '',
                        houseNumber: '',
                      }))
                    }
                  >
                    {NATIONALITY_OPTIONS.map((row) => (
                      <option key={row.code} value={row.code}>{row.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="State / region" hint="required">
                  {form.country === 'NG' ? (
                    <select
                      className="field"
                      required
                      value={form.state}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          state: event.target.value,
                          lga: '',
                          streetAddress: '',
                          houseNumber: '',
                        }))
                      }
                    >
                      <option value="">Select state</option>
                      {nigeriaStates.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  ) : (
                    <input className="field" required placeholder="State or province" value={form.state} onChange={onSelect('state')} />
                  )}
                </Field>
                <Field label="Local government" hint="required">
                  {form.country === 'NG' ? (
                    <select
                      className="field"
                      required
                      disabled={!form.state}
                      value={form.lga}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          lga: event.target.value,
                          streetAddress: '',
                          houseNumber: '',
                        }))
                      }
                    >
                      <option value="">Select LGA</option>
                      {nigeriaLgas.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  ) : (
                    <input className="field" required placeholder="LGA / district" value={form.lga} onChange={onSelect('lga')} />
                  )}
                </Field>
                {form.lga ? (
                  <>
                    <Field label="Street name" hint="required">
                      <input className="field" required placeholder="e.g. Admiralty Way" value={form.streetAddress} onChange={onSelect('streetAddress')} />
                    </Field>
                    <Field label="House / flat number" hint="required">
                      <input className="field" required placeholder="e.g. 12B" value={form.houseNumber} onChange={onSelect('houseNumber')} />
                    </Field>
                  </>
                ) : null}
              </div>
              <p className="text-xs text-muted">
                Phone numbers use {getNationality(form.nationality).flag} {getNationality(form.nationality).dialCode} from the nationality selected above.
              </p>
            </SectionCard>

            <SectionCard
              title="Primary guardian / parent"
              description="Creates a parent portal account and links this student to the guardian."
              delay={0.15}
            >
              <Field label="Guardian nationality" hint="required — select first">
                <select className="field" required value={form.guardianNationality} onChange={onSelect('guardianNationality')}>
                  {NATIONALITY_OPTIONS.map((row) => (
                    <option key={row.code} value={row.code}>
                      {row.flag} {row.name}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" hint="required">
                  <input className="field" required placeholder="Parent or guardian" value={form.guardianName} onChange={onSelect('guardianName')} />
                </Field>
                <Field label="Relationship" hint="required">
                  <select className="field" required value={form.guardianRelationship} onChange={onSelect('guardianRelationship')}>
                    <option value="">Select relationship</option>
                    {RELATIONSHIP_OPTIONS.map((row) => (
                      <option key={row.value} value={row.value}>{row.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Email" hint="required">
                  <input className="field" type="email" required placeholder="parent@email.com" value={form.guardianEmail} onChange={onSelect('guardianEmail')} />
                </Field>
                <Field label="Occupation">
                  <input className="field" placeholder="e.g. Engineer, Trader" value={form.guardianOccupation} onChange={onSelect('guardianOccupation')} />
                </Field>
                <PhoneInput
                  label="Phone"
                  required
                  nationalityCode={form.guardianNationality}
                  value={form.guardianPhone}
                  onChange={(value) => setField('guardianPhone', value)}
                />
                <PhoneInput
                  label="Alternate phone"
                  required
                  nationalityCode={form.guardianNationality}
                  value={form.alternateGuardianPhone}
                  onChange={(value) => setField('alternateGuardianPhone', value)}
                />
              </div>
              <p className="text-xs text-muted">
                A parent dashboard account will be created and login details emailed to this address after enrolment.
              </p>
            </SectionCard>

            <SectionCard
              title="Secondary guardian (optional)"
              description="Add another parent or guardian linked to the same student."
              delay={0.2}
            >
              <Field label="Secondary guardian nationality">
                <select className="field" value={form.secondaryGuardianNationality} onChange={onSelect('secondaryGuardianNationality')}>
                  {NATIONALITY_OPTIONS.map((row) => (
                    <option key={row.code} value={row.code}>
                      {row.flag} {row.name}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <input className="field" placeholder="Optional second contact" value={form.secondaryGuardianName} onChange={onSelect('secondaryGuardianName')} />
                </Field>
                <Field label="Relationship">
                  <select className="field" value={form.secondaryGuardianRelationship} onChange={onSelect('secondaryGuardianRelationship')}>
                    <option value="">Select relationship</option>
                    {RELATIONSHIP_OPTIONS.map((row) => (
                      <option key={row.value} value={row.value}>{row.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Email">
                  <input className="field" type="email" placeholder="second.parent@email.com" value={form.secondaryGuardianEmail} onChange={onSelect('secondaryGuardianEmail')} />
                </Field>
                <Field label="Occupation">
                  <input className="field" value={form.secondaryGuardianOccupation} onChange={onSelect('secondaryGuardianOccupation')} />
                </Field>
                <PhoneInput
                  label="Phone"
                  nationalityCode={form.secondaryGuardianNationality}
                  value={form.secondaryGuardianPhone}
                  onChange={(value) => setField('secondaryGuardianPhone', value)}
                />
              </div>
            </SectionCard>

            <SectionCard title="Medical notes" description="Optional health information the school should know." delay={0.25}>
              <Field label="Allergies / medical conditions">
                <textarea
                  className="field min-h-[88px]"
                  placeholder="Optional health information"
                  value={form.medicalNotes}
                  onChange={onSelect('medicalNotes')}
                />
              </Field>
              <Field label="Additional notes for admissions">
                <textarea className="field min-h-[72px]" value={form.notes} onChange={onSelect('notes')} />
              </Field>
            </SectionCard>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <a href={`/schools/${school.institution.slug}`} className="btn-ghost">
                Cancel
              </a>
              <button type="submit" className="btn-primary min-w-[180px]" disabled={saving}>
                {saving ? 'Submitting…' : 'Create Record'}
              </button>
            </div>
          </form>
        ) : null}

        {step === 'test' && test ? (
          <form className="space-y-4" onSubmit={(event) => void submitTest(event)}>
            {test.description ? <p className="text-muted">{test.description}</p> : null}
            {test.questions.map((question, index) => (
              <fieldset key={question.id} className="glass-card p-5">
                <legend className="px-1 text-sm font-bold">
                  {index + 1}. {question.prompt}
                </legend>
                <div className="mt-3 space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label key={`${question.id}-${optionIndex}`} className="flex items-center gap-2 text-sm text-muted">
                      <input
                        type="radio"
                        name={question.id}
                        checked={answers[question.id] === optionIndex}
                        onChange={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                        className="h-4 w-4 accent-[rgb(var(--accent))]"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <button type="submit" className="btn-primary w-full" disabled={saving}>
              {saving ? 'Submitting…' : 'Submit test'}
            </button>
          </form>
        ) : null}

        {step === 'done' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card overflow-hidden"
          >
            <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${applyImage})` }}
            />
            <div className="p-6">
              <p className="text-2xl">{skinConfig.motif}</p>
              <h2 className="mt-2 font-display text-2xl font-bold">You&apos;re on the list!</h2>
              <p className="mt-2 font-bold">Application number: {admissionNumber}</p>
              {score != null ? <p className="mt-1 text-sm">Entrance score: {score}%</p> : null}
              <p className="mt-3 text-sm text-muted">The school will contact you after review.</p>
            </div>
          </motion.div>
        ) : null}
      </main>
    </div>
  );
}
