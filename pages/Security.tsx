
import React from 'react';
import { Shield, Lock, Trash2, EyeOff, Server, CheckCircle } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-6">
            <Shield className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Security & Privacy First</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Your documents are sensitive. We handle them with the highest level of security and transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:shadow-slate-100">
            <Lock className="h-8 w-8 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              All file transfers are secured via SSL (HTTPS) with SHA-256 digital signatures. Your data is encrypted from the moment it leaves your device until it is processed.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:shadow-slate-100">
            <Trash2 className="h-8 w-8 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Automated 1h Deletion</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We value your privacy. Files are stored in volatile temporary storage and are permanently purged from our infrastructure exactly 60 minutes after your last interaction.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:shadow-slate-100">
            <EyeOff className="h-8 w-8 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">No Human Access</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Document processing is 100% automated. No employee or third party has access to view your file content or metadata at any point during the conversion.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:shadow-slate-100">
            <Server className="h-8 w-8 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">RAM-Only Processing</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Where possible, we utilize RAM-disk processing, ensuring that document fragments never touch a physical hard drive, making data recovery after deletion impossible.
            </p>
          </div>
        </div>

        <div className="bg-indigo-900 rounded-[40px] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Shield className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Our Security Commitment</h2>
            <div className="space-y-4">
              {[
                "GDPR Compliant data handling processes",
                "ISO 27001 Certified cloud infrastructure",
                "Regular third-party security audits",
                "Zero data retention beyond the 1-hour processing window",
                "No training of AI models on your private documents"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-indigo-400" />
                  <span className="text-indigo-100 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
