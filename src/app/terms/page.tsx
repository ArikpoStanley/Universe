import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalDocument } from '@/components/LegalDocument';
import { LEGAL_CONTACT_EMAIL, LEGAL_VERSION } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for the Universe education platform.',
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      summary="The rules for using Universe — what we provide, what your institution is responsible for, and how liability is handled."
      effectiveDate={LEGAL_VERSION}
      current="/terms"
    >
      <p>
        These Terms of Service (“Terms”) govern access to and use of the Universe platform (“Universe”, “we”,
        “us”), including websites, portals, APIs, and related services (the “Service”). By creating an account,
        accepting an invitation, setting a password, or using the Service, you agree to these Terms on behalf of
        yourself and, if applicable, the institution you represent.
      </p>

      <h2>1. The Service</h2>
      <p>
        Universe provides software tools for schools and related institutions to manage operations such as
        people, academics, communication, finance records, and administration. Universe is a technology provider
        only. We do not operate your school, employ your staff, teach your students, collect school fees on your
        behalf unless you separately enable a payment integration, or make academic, safeguarding, employment,
        or financial decisions for you.
      </p>

      <h2>2. Accounts and invitations</h2>
      <ul>
        <li>You must provide accurate information and keep credentials confidential.</li>
        <li>
          Institution owners and admins are responsible for invitations they send and for access granted to
          staff, parents, and students.
        </li>
        <li>
          Temporary passwords and invite links are for onboarding only. You must set your own password and
          complete any required verification before regular use.
        </li>
      </ul>

      <h2>3. Acceptable use</h2>
      <p>
        You agree not to misuse the Service, including by attempting unauthorized access, distributing malware,
        scraping without permission, harassing others, uploading unlawful content, or using the Service in
        violation of applicable law or your institution’s policies.
      </p>

      <h2>4. Institution data and responsibility</h2>
      <p>
        Your institution remains solely responsible for the accuracy, legality, and retention of data it enters
        into Universe (including student records, fees, attendance, grades, messages, and documents). You are
        responsible for obtaining any consents required under local law for processing personal data of
        students, parents, and staff. See our <Link href="/privacy">Privacy Policy</Link> for how we handle
        that data.
      </p>

      <h2>5. Disclaimer of warranties</h2>
      <p>
        THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE”. TO THE MAXIMUM EXTENT PERMITTED BY LAW, UNIVERSE
        DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
        ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, UNIVERSE AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND SUPPLIERS
        SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES,
        OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR RELATED TO
        YOUR USE OF THE SERVICE — WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER
        LEGAL THEORY — EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p>
        WITHOUT LIMITING THE FOREGOING, UNIVERSE IS NOT LIABLE FOR: school operational decisions; incorrect fee,
        grade, or attendance data entered by users; disputes between institutions, parents, staff, or students;
        payment processor outages or chargebacks; third-party integrations; or unauthorized access resulting from
        compromised credentials under your control.
      </p>
      <p>
        WHERE LIABILITY CANNOT BE EXCLUDED, OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE SHALL
        NOT EXCEED THE FEES PAID BY YOUR INSTITUTION TO UNIVERSE FOR THE SERVICE IN THE THREE (3) MONTHS PRECEDING
        THE CLAIM (OR, IF NONE, ONE HUNDRED US DOLLARS OR LOCAL EQUIVALENT).
      </p>

      <h2>7. Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless Universe from claims, losses, and expenses (including reasonable
        legal fees) arising from your institution’s use of the Service, your content, your breach of these Terms,
        or your violation of law or third-party rights.
      </p>

      <h2>8. Suspension and termination</h2>
      <p>
        We may suspend or terminate access for unpaid invoices, security risk, abuse, or legal requirement. You
        may stop using the Service at any time. Provisions that by nature should survive (including disclaimers,
        limitations, and indemnity) will survive termination.
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update these Terms. Material changes will be reflected by a new effective date / legal version.
        Continued use after acceptance of an updated version constitutes agreement to the updated Terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these Terms can be sent through your institution’s support channel in Universe or to{' '}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
      </p>
    </LegalDocument>
  );
}
