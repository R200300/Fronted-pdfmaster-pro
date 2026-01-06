
import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, CheckCircle, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Have questions or need support? We’re here to help. Reach out to our dedicated support team below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100">
              <div className="flex items-start mb-8">
                <div className="bg-indigo-100 p-4 rounded-2xl mr-6">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                  <p className="text-slate-500 font-medium">support@pdfmasterpro.com</p>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <div className="bg-emerald-100 p-4 rounded-2xl mr-6">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Our Commitment</h4>
                  <p className="text-slate-500 font-medium">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-4 rounded-2xl mr-6">
                  <MessageSquare className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Support Options</h4>
                  <p className="text-slate-500 font-medium">Direct email or use the support form</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-[40px] text-white">
              <h3 className="text-2xl font-bold mb-4">Enterprise & Sales</h3>
              <p className="text-indigo-100 mb-6">Need bulk licenses or custom infrastructure? Let's talk about how we can support your business.</p>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-all">Schedule a Call</button>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 relative">
            {isSent ? (
              <div className="absolute inset-0 bg-white rounded-[40px] flex flex-col items-center justify-center p-12 text-center z-10 animate-in fade-in zoom-in duration-300">
                <CheckCircle className="h-16 w-16 text-emerald-500 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-8">Thanks for reaching out. We've received your inquiry and will get back to you within 24 hours.</p>
                <button onClick={() => setIsSent(false)} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                    <input required type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                    <input required type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Email Address" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <select value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                    <option>General Inquiry</option>
                    <option>Feature Request</option>
                    <option>Bug Report</option>
                    <option>Billing Question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea required rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" placeholder="How can we help?" />
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center">
                  {isSubmitting ? <><Send className="h-4 w-4 mr-2 animate-bounce" /> Sending...</> : <><Send className="h-4 w-4 mr-2" /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
