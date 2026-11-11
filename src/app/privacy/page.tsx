import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalDocument } from '@/components/LegalDocument';
import { LEGAL_CONTACT_EMAIL, LEGAL_VERSION } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Universe collects, uses, and protects school and personal data.',
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      summary="What we collect, why, who it is shared with, and the choices you have. Your school’s data stays scoped to your school."
      effectiveDate={LEGAL_VERSION}
      current="/privacy"
    >
      <p>
        This Privacy Policy explains how Universe (“we”, “us”) collects, uses, and shares information when you
        use our education platform, this website, and related services (the “Service”). By creating an account,
        accepting an invitation, or using the Service, you acknowledge this Policy.
      </p>

      <h2>1. Who controls the data</h2>
      <p>
        For school operational data (students, staff, parents, fees, grades, messages, and similar records), your
        institution is typically the data controller. Universe processes that data as a service provider to host
        and operate the software. For platform account and billing records we maintain as product operator,
        Universe may act as an independent controller.
      </p>

      <h2>2. Information we collect</h2>
      <ul>
        <li>
          Account details: name, email, phone (if provided), password hashes, role, institution membership, and
          legal acceptance timestamps.
        </li>
        <li>
          Institution content: data your school enters into Universe, including learner profiles, attendance,
          academics, finance records, messages, and uploaded files.
        </li>
        <li>
          Website enquiries and applications: details you submit through our contact forms, and admission
          applications submitted on a school’s public application page (which are shared with that school).
        </li>
        <li>
          Technical data: IP address, device/browser information, approximate location derived from IP, cookies
          or local storage needed for sessions and preferences, and security/audit logs. See our{' '}
          <Link href="/cookies">Cookie Policy</Link> for details.
        </li>
        <li>Communications: support tickets, invite emails, password-reset and two-factor verification messages.</li>
      </ul>

      <h2>3. How we use information</h2>
      <ul>
        <li>Provide, secure, and improve the Service</li>
        <li>Authenticate users, send OTP / invite / reset emails, and prevent abuse</li>
        <li>Support multi-tenant isolation so each institution only accesses its own data</li>
        <li>Process subscriptions and related billing where applicable</li>
        <li>Respond to enquiries you send us</li>
        <li>Comply with law and enforce our <Link href="/terms">Terms of Service</Link></li>
      </ul>

      <h2>4. Sharing</h2>
      <p>
        We do not sell personal information. We may share information with subprocessors that help run the
        Service (hosting, email delivery, payments), with your institution’s authorized users, or when required by
        law. Payment processors such as Paystack and Stripe handle card and bank details under their own policies
        when you make a payment.
      </p>

      <h2>5. Retention</h2>
      <p>
        We retain account and institution data for as long as the institution uses the Service and as needed for
        security, dispute resolution, and legal obligations. Institutions control day-to-day records they create;
        deletion requests should generally be handled through the institution’s administrators, subject to
        applicable law.
      </p>

      <h2>6. Security</h2>
      <p>
        We use industry-standard measures such as encrypted transport, hashed passwords, tenant scoping, and access
        controls. No method of transmission or storage is fully secure; institutions must also protect credentials
        and device access.
      </p>

      <h2>7. Children’s data</h2>
      <p>
        Universe is used by schools that may process information about minors. Institutions are responsible for
        ensuring they have a lawful basis (including parental or guardian consent where required) before entering
        children’s data. Parents with questions about a child’s school records should contact the school first.
      </p>

      <h2>8. Your choices</h2>
      <p>
        Depending on your role and local law, you may request access, correction, or deletion of personal data via
        your institution or Universe support. You can also stop using the Service, decline invitations, and choose
        whether to allow optional cookies on this website.
      </p>

      <h2>9. International processing</h2>
      <p>
        Data may be processed in countries where we or our subprocessors operate. We take steps designed to protect
        personal data in accordance with this Policy and applicable law.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update this Policy. Material changes will carry a new effective date / legal version. Continued use
        after you accept an updated version means you acknowledge the updated Policy.
      </p>

      <h2>11. Contact</h2>
      <p>
        Privacy questions can be sent through your institution’s support channel in Universe or to{' '}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
      </p>
    </LegalDocument>
  );
}
