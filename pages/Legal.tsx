
import React from 'react';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="py-24 bg-white min-h-screen">
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12">{title}</h1>
      <div className="prose prose-slate prose-lg">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyPolicy: React.FC = () => (
  <LegalLayout title="Privacy Policy">
    <p className="text-slate-500 mb-8">Last Updated: October 2024</p>
    
    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Data Storage & Deletion</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">
      <strong>We do NOT store files permanently.</strong> PDFMaster Pro is built with a zero-retention philosophy. All files uploaded to our servers are strictly temporary and are <strong>automatically deleted after exactly 1 hour</strong> from the time of upload.
    </p>

    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Encrypted Processing</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">
      All file processing is conducted over high-security, encrypted connections (SSL/TLS). Your data is protected from the moment it leaves your browser until it is purged from our processing environment.
    </p>

    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. No Third-Party Data Sharing</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">
      We operate a strict no-sharing policy. Your personal data and document contents are never sold, rented, or shared with third-party advertisers or data brokers.
    </p>

    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Compliance</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">
      Our practices are designed to be compliant with major global privacy standards, ensuring that you remain in full control of your digital documents.
    </p>
  </LegalLayout>
);

export const TermsConditions: React.FC = () => (
  <LegalLayout title="Terms & Conditions">
    <p className="text-slate-500 mb-8">Last Updated: October 2024</p>
    
    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Document Ownership</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">
      By using our service, you affirm that <strong>you own or have the necessary rights to all files you upload</strong>. PDFMaster Pro does not claim any ownership over your content.
    </p>

    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Prohibited Content</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">
      <strong>No illegal content is allowed.</strong> Users are strictly prohibited from using our tools to process documents that contain hate speech, illegal material, or infringe upon the intellectual property of others.
    </p>

    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Free & Paid Usage Rules</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">
      Free users are subject to daily limits and watermarked outputs as specified on our Pricing page. Pro users enjoy unlimited access and premium features. Any attempt to circumvent usage limits is a violation of these terms.
    </p>

    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Service Availability Disclaimer</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">
      While we aim for 99.9% uptime, PDFMaster Pro is provided "as is". We reserve the right to perform maintenance or modify the service with or without prior notice.
    </p>
  </LegalLayout>
);
