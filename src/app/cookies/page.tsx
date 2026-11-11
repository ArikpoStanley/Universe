import type { Metadata } from 'next';
import Link from 'next/link';
import { CookieSettingsButton } from '@/components/CookieSettingsButton';
import { LegalDocument } from '@/components/LegalDocument';
import { COOKIE_POLICY_VERSION, LEGAL_CONTACT_EMAIL } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'The cookies and browser storage Universe uses, and how to control them.',
};

const ESSENTIAL = [
  {
    name: 'universe_cookie_consent',
    where: 'Website',
    purpose: 'Remembers whether you accepted or rejected optional cookies.',
    duration: '12 months',
  },
  {
    name: 'universe_refresh',
    where: 'School portal',
    purpose: 'Keeps you signed in securely (HTTP-only, not readable by scripts).',
    duration: 'Up to 30 days, or until you sign out',
  },
  {
    name: 'universe-tenant-slug',
    where: 'School portal',
    purpose: 'Remembers which school’s portal you are using so you land on the right sign-in.',
    duration: 'Session / until changed',
  },
  {
    name: 'universe-loaded (session storage)',
    where: 'Website',
    purpose: 'Stops the intro animation replaying on every page during a visit.',
    duration: 'Until the tab is closed',
  },
];

const PREFERENCES = [
  {
    name: 'theme (local storage)',
    where: 'Website',
    purpose: 'Remembers light or dark mode.',
    duration: 'Until cleared',
  },
  {
    name: 'universe_site_skin (local storage)',
    where: 'Website',
    purpose: 'Remembers the visual style you picked for this website.',
    duration: 'Until cleared',
  },
];

function CookieTable({ rows }: { rows: typeof ESSENTIAL }) {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Where</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                <code>{row.name}</code>
              </td>
              <td>{row.where}</td>
              <td>{row.purpose}</td>
              <td>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      summary="Which cookies and browser storage Universe uses, why, and how you can accept or reject the optional ones."
      effectiveDate={COOKIE_POLICY_VERSION}
      current="/cookies"
    >
      <p>
        This Cookie Policy explains how Universe (“we”, “us”) uses cookies and similar technologies such as local
        and session storage on this website and in the Universe school portal. It should be read with our{' '}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files a website stores in your browser. Local and session storage work in a similar
        way but stay on your device and are not sent with every request. We call all of these “cookies” below.
      </p>

      <h2>2. Strictly necessary cookies</h2>
      <p>
        These are required for the website and portal to work — for example to keep you signed in, protect your
        account, and remember your cookie choice. They cannot be switched off, and they do not track you across
        other websites.
      </p>
      <CookieTable rows={ESSENTIAL} />

      <h2>3. Preference cookies</h2>
      <p>
        These remember settings you choose yourself, such as light or dark mode. They are stored only on your
        device, are never sent to us, and are only set when you change a setting.
      </p>
      <CookieTable rows={PREFERENCES} />

      <h2>4. Optional analytics and marketing cookies</h2>
      <p>
        We do not currently use analytics, advertising, or social-media tracking cookies. If we introduce any, they
        will only load after you choose <strong>Accept all</strong>, and this policy will be updated first. Choosing{' '}
        <strong>Reject optional</strong> means only the cookies listed above are used.
      </p>

      <h2>5. Third-party cookies during payments</h2>
      <p>
        When a school or parent pays through Paystack or Stripe, the payment page is provided by that processor and
        may set its own cookies for security and fraud prevention. Those cookies are governed by the processor’s own
        policies.
      </p>

      <h2>6. Managing your choice</h2>
      <p>
        You can change your choice at any time using the button below or the “Cookie settings” link in the website
        footer. You can also delete or block cookies in your browser settings — blocking strictly necessary cookies
        will stop sign-in from working.
      </p>
      <CookieSettingsButton />

      <h2>7. Changes</h2>
      <p>
        If we change which cookies we use, we will update this policy and its effective date and ask for your choice
        again.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about cookies can be sent to <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
      </p>
    </LegalDocument>
  );
}
