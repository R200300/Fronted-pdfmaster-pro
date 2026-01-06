
import React from 'react';
import { Users, Globe, Award, Heart, Shield, Zap, Layout } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            About PDFMaster Pro
          </h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            PDFMaster Pro is built to simplify document work for everyone. 
            Our mission is to provide fast, secure, and easy-to-use PDF tools that work directly in your browser.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mt-16">
          <div className="text-center p-8 bg-slate-50 rounded-[40px] border border-slate-100">
            <div className="bg-white w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Zap className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Simple</h3>
            <p className="text-slate-500">We strip away the complexity. No installations, no deep menus. Just drag, drop, and done.</p>
          </div>
          <div className="text-center p-8 bg-slate-50 rounded-[40px] border border-slate-100">
            <div className="bg-white w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Shield className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Secure</h3>
            <p className="text-slate-500">Privacy isn't an option; it's the core. Your files are yours, and they leave our servers automatically.</p>
          </div>
          <div className="text-center p-8 bg-slate-50 rounded-[40px] border border-slate-100">
            <div className="bg-white w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Globe className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Accessible</h3>
            <p className="text-slate-500">From any device, from any country. Productivity shouldn't be gated by high-end hardware.</p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="h-12 w-12 text-rose-500 mx-auto mb-8" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 italic">"We believe productivity tools should be simple, secure, and accessible to everyone."</h2>
          <div className="h-1 w-24 bg-indigo-500 mx-auto"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-5xl font-black text-indigo-600 mb-2">1M+</p>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Global Users</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-black text-indigo-600 mb-2">100%</p>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Private & Safe</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-black text-indigo-600 mb-2">20+</p>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Free Tools</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-black text-indigo-600 mb-2">24/7</p>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Cloud Uptime</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
