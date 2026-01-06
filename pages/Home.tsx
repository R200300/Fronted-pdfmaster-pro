
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Layers, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Monitor,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-52">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-2">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">New: AI Summarizer tool added</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            All-in-One <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">PDF Editor</span> <br className="hidden md:block" /> & Converter
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700">
            Edit, convert, and customize your PDF files instantly — fast, secure, and easy. No installation required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Link 
              to="/editor" 
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center"
            >
              Upload File
              <FileText className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/tools" 
              className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              Try Free Tools
              <Zap className="ml-2 h-5 w-5 text-amber-500" />
            </Link>
          </div>

          {/* Social Proof / Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">1M+</span>
              <span className="text-xs font-medium uppercase tracking-widest">Files Processed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">4.9/5</span>
              <span className="text-xs font-medium uppercase tracking-widest">User Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">100%</span>
              <span className="text-xs font-medium uppercase tracking-widest">Safe & Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">0.5s</span>
              <span className="text-xs font-medium uppercase tracking-widest">Processing Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Preview Section */}
      <section className="bg-slate-900 py-32 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight">
                Powerful tools for your <br /> everyday document workflow.
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-500/20 p-3 rounded-xl mr-4">
                    <CheckCircle2 className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Background Management</h4>
                    <p className="text-slate-400 text-sm">Remove distracting backgrounds or add professional colors to your docs with one click.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-emerald-500/20 p-3 rounded-xl mr-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Seamless Conversions</h4>
                    <p className="text-slate-400 text-sm">Convert between PPT, JPG, Word and PDF without losing formatting or quality.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-500/20 p-3 rounded-xl mr-4">
                    <CheckCircle2 className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Batch Processing</h4>
                    <p className="text-slate-400 text-sm">Handle multiple documents simultaneously. Save hours of manual repetitive work.</p>
                  </div>
                </div>
              </div>
              <Link to="/tools" className="inline-flex items-center mt-12 text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                Explore all 20+ tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-slate-800 rounded-3xl p-4 shadow-2xl border border-slate-700">
                <img 
                  src="https://picsum.photos/seed/pdf-editor/800/600" 
                  alt="Editor Interface" 
                  className="rounded-2xl opacity-80"
                />
                <div className="absolute -bottom-8 -left-8 bg-white text-slate-900 p-6 rounded-2xl shadow-2xl hidden md:block border border-slate-100">
                  <div className="flex items-center mb-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-500 mr-2" />
                    <span className="font-bold text-sm">Privacy Guaranteed</span>
                  </div>
                  <p className="text-xs text-slate-500 max-w-[150px]">Files are deleted automatically 60 minutes after processing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-16">Work from anywhere, on any device.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <Monitor className="h-10 w-10 text-indigo-600 mb-6 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Desktop Optimized</h3>
              <p className="text-slate-500 text-sm">Full featured editing experience for Mac, Windows, and Linux.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <Smartphone className="h-10 w-10 text-indigo-600 mb-6 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Mobile Friendly</h3>
              <p className="text-slate-500 text-sm">Edit docs on the go. No app store downloads required.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <Zap className="h-10 w-10 text-indigo-600 mb-6 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Instant Sync</h3>
              <p className="text-slate-500 text-sm">Processing happens in the cloud. Faster speeds, zero battery drain.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
