
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold text-slate-900">PDFMaster Pro</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering productivity with professional-grade PDF tools. Fast, secure, and always free for basics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/tools" className="text-slate-500 hover:text-indigo-600 text-sm">All Tools</Link></li>
              <li><Link to="/pricing" className="text-slate-500 hover:text-indigo-600 text-sm">Pricing</Link></li>
              <li><Link to="/editor" className="text-slate-500 hover:text-indigo-600 text-sm">Online Editor</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-500 hover:text-indigo-600 text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-indigo-600 text-sm">Contact</Link></li>
              <li><Link to="/privacy" className="text-slate-500 hover:text-indigo-600 text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-500 hover:text-indigo-600 text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Security</h3>
            <Link to="/security" className="block group">
              <div className="bg-slate-50 p-4 rounded-lg group-hover:bg-indigo-50/50 transition-colors border border-transparent group-hover:border-indigo-100">
                <p className="text-xs text-slate-500 mb-2">Your files are 100% secure. We use bank-grade encryption and auto-delete data after 1 hour.</p>
                <div className="flex items-center text-[10px] font-bold text-indigo-600 uppercase">
                  <ShieldCheck className="w-3 h-3 mr-2" />
                  View Security Docs
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} PDFMaster Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
