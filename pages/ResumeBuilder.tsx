
import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Settings, 
  Download, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  Sparkles,
  Zap,
  Globe,
  Link as LinkIcon,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Eye,
  FileText,
  Loader2,
  Lock,
  Palette,
  ChevronLeft,
  // Fix: Added missing Star icon import
  Star
} from 'lucide-react';
import { ResumeData, ResumeExperience, ResumeEducation, ResumeSkill } from '../types';
import { useSubscription } from '../context/SubscriptionContext';
import { generateResumeSummary, improveBulletPoint } from '../services/geminiService';
import { Link } from 'react-router-dom';

const ResumeBuilder: React.FC = () => {
  const { subscription, incrementUsage } = useSubscription();
  const isPro = subscription.plan === 'pro';
  
  const [data, setData] = useState<ResumeData>({
    personal: {
      fullName: 'Alex Johnson',
      email: 'alex.j@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'alexj.dev',
      linkedin: 'linkedin.com/in/alexj',
      title: 'Senior Software Engineer',
      summary: 'Passionate software developer with 8+ years of experience building scalable web applications and leading cross-functional teams.'
    },
    experience: [
      {
        id: '1',
        company: 'TechFlow Systems',
        position: 'Senior Developer',
        location: 'Remote',
        startDate: 'Jan 2020',
        endDate: 'Present',
        current: true,
        description: 'Led a team of 5 to rebuild the core API, resulting in a 40% performance improvement. Mentored junior developers and implemented CI/CD pipelines.'
      }
    ],
    education: [
      {
        id: '1',
        school: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Berkeley, CA',
        startDate: '2012',
        endDate: '2016',
        description: 'Focused on distributed systems and database management.'
      }
    ],
    skills: [
      { id: '1', name: 'React & Next.js', level: 5 },
      { id: '2', name: 'Node.js', level: 4 },
      { id: '3', name: 'TypeScript', level: 5 },
      { id: '4', name: 'System Design', level: 4 }
    ],
    sections: [],
    config: {
      template: 'modern',
      primaryColor: '#4f46e5',
      fontSize: 11,
      fontFamily: 'Inter',
      lineSpacing: 1.5
    }
  });

  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'ai'>('content');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // AI Helpers
  const handleAiSummary = async () => {
    if (!isPro) { setShowUpgradeModal(true); return; }
    setIsAiLoading(true);
    const exp = data.experience.map(e => e.position).join(', ');
    const summary = await generateResumeSummary(data.personal.title, exp);
    setData(prev => ({ ...prev, personal: { ...prev.personal, summary } }));
    setIsAiLoading(false);
  };

  const handleImproveBullet = async (expId: string) => {
    if (!isPro) { setShowUpgradeModal(true); return; }
    setIsAiLoading(true);
    const exp = data.experience.find(e => e.id === expId);
    if (exp) {
      const improved = await improveBulletPoint(exp.description);
      setData(prev => ({
        ...prev,
        experience: prev.experience.map(e => e.id === expId ? { ...e, description: improved } : e)
      }));
    }
    setIsAiLoading(false);
  };

  const addExperience = () => {
    const newExp: ResumeExperience = {
      id: Math.random().toString(36).substr(2, 9),
      company: 'New Company',
      position: 'Role Name',
      location: 'City, State',
      startDate: 'Month Year',
      endDate: 'Present',
      current: false,
      description: 'Responsibilities and achievements...'
    };
    setData({ ...data, experience: [newExp, ...data.experience] });
  };

  const removeExperience = (id: string) => {
    setData({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const handlePersonalChange = (field: string, value: string) => {
    setData({ ...data, personal: { ...data.personal, [field]: value } });
  };

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print(); // Simple print-to-pdf for high fidelity
      incrementUsage();
      setIsExporting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-30 shadow-sm">
        <div className="flex items-center space-x-4">
          <Link to="/tools" className="p-2 hover:bg-slate-50 rounded-lg text-slate-500">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="h-6 w-px bg-slate-200"></div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center">
            <User className="h-4 w-4 mr-2 text-indigo-600" /> Professional Resume Builder
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          {!isPro && (
            <div className="hidden md:flex items-center px-3 py-1 bg-amber-50 border border-amber-100 rounded-full">
              <Star className="h-3 w-3 text-amber-500 mr-2 fill-amber-500" />
              <span className="text-[10px] font-bold text-amber-700 uppercase">Free Plan: Watermark Applied</span>
            </div>
          )}
          <button 
            onClick={handleDownload}
            disabled={isExporting}
            className="bg-indigo-600 text-white px-5 py-2 rounded-full text-xs font-bold flex items-center shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" /> : <Download className="h-3.5 w-3.5 mr-2" />}
            Download PDF
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Editor Sidebar */}
        <div className="w-full md:w-[450px] bg-white border-r border-slate-200 flex flex-col z-20 shadow-xl">
          <div className="flex border-b border-slate-100">
            <button onClick={() => setActiveTab('content')} className={`flex-1 py-4 text-xs font-bold flex flex-col items-center gap-1 transition-all ${activeTab === 'content' ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <FileText className="h-4 w-4" /> Content
            </button>
            <button onClick={() => setActiveTab('design')} className={`flex-1 py-4 text-xs font-bold flex flex-col items-center gap-1 transition-all ${activeTab === 'design' ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <Palette className="h-4 w-4" /> Design
            </button>
            <button onClick={() => setActiveTab('ai')} className={`flex-1 py-4 text-xs font-bold flex flex-col items-center gap-1 transition-all ${activeTab === 'ai' ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <Sparkles className="h-4 w-4" /> AI Assistant
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-8 no-scrollbar scroll-smooth">
            {activeTab === 'content' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                {/* Personal Info */}
                <section>
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center">
                    <User className="h-4 w-4 mr-2 text-indigo-500" /> Personal Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                      <input value={data.personal.fullName} onChange={e => handlePersonalChange('fullName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Professional Title</label>
                      <input value={data.personal.title} onChange={e => handlePersonalChange('title', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Email</label>
                      <input value={data.personal.email} onChange={e => handlePersonalChange('email', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Phone</label>
                      <input value={data.personal.phone} onChange={e => handlePersonalChange('phone', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Summary</label>
                    <textarea value={data.personal.summary} onChange={e => handlePersonalChange('summary', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm h-24 resize-none" />
                  </div>
                </section>

                {/* Experience */}
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-indigo-500" /> Work Experience
                    </h3>
                    <button onClick={addExperience} className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="space-y-4">
                    {data.experience.map(exp => (
                      <div key={exp.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl relative group">
                        <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 p-1.5 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-3 w-3" /></button>
                        <input value={exp.company} placeholder="Company" className="bg-transparent font-bold text-sm w-full focus:outline-none mb-1" onChange={e => {
                          setData({ ...data, experience: data.experience.map(x => x.id === exp.id ? { ...x, company: e.target.value } : x) });
                        }} />
                        <input value={exp.position} placeholder="Position" className="bg-transparent text-xs w-full focus:outline-none mb-2 text-indigo-600" onChange={e => {
                          setData({ ...data, experience: data.experience.map(x => x.id === exp.id ? { ...x, position: e.target.value } : x) });
                        }} />
                        <textarea value={exp.description} className="bg-transparent text-xs w-full h-16 resize-none focus:outline-none text-slate-500" onChange={e => {
                          setData({ ...data, experience: data.experience.map(x => x.id === exp.id ? { ...x, description: e.target.value } : x) });
                        }} />
                        {isPro && (
                          <button onClick={() => handleImproveBullet(exp.id)} className="mt-2 text-[10px] font-bold text-indigo-600 flex items-center hover:underline">
                            <Sparkles className="h-2.5 w-2.5 mr-1" /> Enhance with AI
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-indigo-500" /> Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map(skill => (
                      <div key={skill.id} className="bg-white px-3 py-1.5 border border-slate-200 rounded-full text-xs font-medium flex items-center gap-2">
                        {skill.name}
                        <button onClick={() => setData({ ...data, skills: data.skills.filter(s => s.id !== skill.id) })} className="text-slate-300 hover:text-rose-500"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    ))}
                    <button onClick={() => {
                      const name = prompt("Enter skill name:");
                      if(name) setData({...data, skills: [...data.skills, { id: Math.random().toString(), name, level: 5 }]});
                    }} className="px-3 py-1.5 border-2 border-dashed border-slate-200 rounded-full text-xs font-bold text-slate-400 hover:border-indigo-400 hover:text-indigo-600 flex items-center gap-1">
                      <Plus className="h-3 w-3" /> Add Skill
                    </button>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                <section>
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Select Template</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['modern', 'minimal', 'ats'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setData({ ...data, config: { ...data.config, template: t as any } })}
                        className={`p-4 rounded-2xl border-2 transition-all text-left ${data.config.template === t ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        <div className="bg-white aspect-[3/4] mb-3 rounded-lg shadow-sm border border-slate-100 flex items-center justify-center p-2">
                           <div className="w-full h-full border-2 border-slate-50 rounded flex flex-col gap-1 p-1">
                              <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                              <div className="h-1 w-full bg-slate-100 rounded"></div>
                              <div className="h-1 w-3/4 bg-slate-100 rounded"></div>
                           </div>
                        </div>
                        <span className="text-xs font-bold capitalize">{t} Style</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Brand Color</h3>
                  <div className="flex gap-3">
                    {['#4f46e5', '#0891b2', '#059669', '#dc2626', '#1e293b'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setData({ ...data, config: { ...data.config, primaryColor: c } })}
                        className={`w-8 h-8 rounded-full border-2 ${data.config.primaryColor === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
                {!isPro && (
                   <div className="bg-indigo-600 p-6 rounded-[2rem] text-white">
                      <Zap className="h-8 w-8 mb-4 fill-amber-400 text-amber-400" />
                      <h3 className="text-lg font-bold mb-2">Pro AI Features</h3>
                      <p className="text-indigo-100 text-xs leading-relaxed mb-6">Unlock powerful AI assistants to write summaries, optimize bullets, and match job descriptions.</p>
                      <Link to="/pricing" className="block w-full text-center bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all">Upgrade Now</Link>
                   </div>
                )}
                
                <button 
                  disabled={!isPro || isAiLoading}
                  onClick={handleAiSummary}
                  className="w-full bg-white border border-slate-200 p-6 rounded-3xl text-left hover:border-indigo-400 transition-all group disabled:opacity-50"
                >
                  <div className="bg-indigo-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">AI Professional Summary</h4>
                  <p className="text-xs text-slate-500 mb-4">Generate a high-impact summary based on your experience and skills.</p>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Generate with AI →</span>
                </button>

                <button 
                  disabled={!isPro || isAiLoading}
                  className="w-full bg-white border border-slate-200 p-6 rounded-3xl text-left hover:border-emerald-400 transition-all group disabled:opacity-50"
                >
                  <div className="bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">ATS Content Scan</h4>
                  <p className="text-xs text-slate-500 mb-4">Analyze your resume for missing keywords and formatting issues that block ATS scanners.</p>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Run Optimizer →</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="flex-grow bg-slate-100 overflow-y-auto p-12 flex justify-center no-scrollbar print:p-0 print:bg-white">
          <div 
            id="resume-preview"
            className={`bg-white shadow-2xl origin-top transition-all duration-500 print:shadow-none ${data.config.template === 'ats' ? 'max-w-[800px]' : 'max-w-[700px]'} w-full min-h-[1050px] p-12 relative print:max-w-none print:p-0 print:min-h-0`}
            style={{ 
              fontFamily: data.config.fontFamily,
              color: '#334155'
            }}
          >
            {/* Template: Modern (Two Column) */}
            {data.config.template === 'modern' && (
              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-4">
                  <div className="mb-10">
                    <h1 className="text-2xl font-black mb-1 leading-tight text-slate-900">{data.personal.fullName}</h1>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: data.config.primaryColor }}>{data.personal.title}</p>
                  </div>
                  
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 pb-1 border-b" style={{ borderColor: `${data.config.primaryColor}30` }}>Contact</h3>
                      <div className="space-y-2 text-[10px]">
                        <div className="flex items-center gap-2"><Phone className="h-3 w-3 opacity-40" /> {data.personal.phone}</div>
                        <div className="flex items-center gap-2"><Mail className="h-3 w-3 opacity-40" /> {data.personal.email}</div>
                        <div className="flex items-center gap-2"><MapPin className="h-3 w-3 opacity-40" /> {data.personal.location}</div>
                        <div className="flex items-center gap-2"><Globe className="h-3 w-3 opacity-40" /> {data.personal.website}</div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 pb-1 border-b" style={{ borderColor: `${data.config.primaryColor}30` }}>Skills</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {data.skills.map(s => (
                          <span key={s.id} className="bg-slate-50 px-2 py-1 rounded text-[9px] font-bold border border-slate-100">{s.name}</span>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>

                <div className="col-span-8">
                  <section className="mb-10">
                    <p className="text-xs leading-relaxed italic">{data.personal.summary}</p>
                  </section>

                  <section className="mb-10">
                    <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                       <div className="w-4 h-px" style={{ backgroundColor: data.config.primaryColor }}></div>
                       Experience
                    </h3>
                    <div className="space-y-8">
                      {data.experience.map(exp => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-black text-sm text-slate-900">{exp.company}</h4>
                            <span className="text-[9px] font-bold text-slate-400">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          <p className="text-[10px] font-bold mb-2" style={{ color: data.config.primaryColor }}>{exp.position}</p>
                          <p className="text-[10px] leading-relaxed text-slate-500">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                       <div className="w-4 h-px" style={{ backgroundColor: data.config.primaryColor }}></div>
                       Education
                    </h3>
                    {data.education.map(edu => (
                      <div key={edu.id}>
                         <h4 className="font-black text-xs text-slate-900">{edu.school}</h4>
                         <p className="text-[10px]">{edu.degree} in {edu.field}</p>
                         <p className="text-[9px] text-slate-400">{edu.startDate} - {edu.endDate}</p>
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            )}

            {/* Template: ATS (Single Column, High Readability) */}
            {data.config.template === 'ats' && (
              <div className="text-center">
                 <h1 className="text-3xl font-black mb-2 text-slate-900 uppercase tracking-tighter">{data.personal.fullName}</h1>
                 <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-500 mb-8 pb-4 border-b border-slate-200">
                    <span>{data.personal.location}</span>
                    <span>•</span>
                    <span>{data.personal.phone}</span>
                    <span>•</span>
                    <span>{data.personal.email}</span>
                 </div>

                 <div className="text-left space-y-10">
                    <section>
                       <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-slate-900 mb-4 pb-1">Professional Summary</h2>
                       <p className="text-xs leading-relaxed">{data.personal.summary}</p>
                    </section>

                    <section>
                       <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-slate-900 mb-4 pb-1">Core Competencies</h2>
                       <p className="text-xs font-bold text-slate-700">{data.skills.map(s => s.name).join(' • ')}</p>
                    </section>

                    <section>
                       <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-slate-900 mb-4 pb-1">Professional Experience</h2>
                       <div className="space-y-6">
                         {data.experience.map(exp => (
                           <div key={exp.id}>
                             <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-sm font-black">{exp.company}</h3>
                                <span className="text-[10px] font-bold">{exp.startDate} – {exp.endDate}</span>
                             </div>
                             <p className="text-xs font-bold mb-3 italic">{exp.position}</p>
                             <p className="text-xs leading-relaxed text-slate-600">{exp.description}</p>
                           </div>
                         ))}
                       </div>
                    </section>
                 </div>
              </div>
            )}

            {/* Template: Minimal (Simple Center) */}
            {data.config.template === 'minimal' && (
              <div className="space-y-12">
                 <div>
                    <h1 className="text-4xl font-light text-slate-900 mb-2">{data.personal.fullName}</h1>
                    <p className="text-sm font-medium opacity-50">{data.personal.title}</p>
                 </div>
                 
                 <div className="grid grid-cols-4 gap-12">
                    <div className="col-span-1 border-r pr-8">
                       <div className="space-y-8">
                          <section>
                            <h5 className="text-[9px] font-bold uppercase mb-3 opacity-30">Contact</h5>
                            <p className="text-[10px] leading-relaxed break-words">{data.personal.email}<br/>{data.personal.phone}</p>
                          </section>
                          <section>
                            <h5 className="text-[9px] font-bold uppercase mb-3 opacity-30">Expertise</h5>
                            <ul className="text-[10px] space-y-1 font-medium">
                              {data.skills.map(s => <li key={s.id}>{s.name}</li>)}
                            </ul>
                          </section>
                       </div>
                    </div>
                    <div className="col-span-3">
                       <section className="mb-12">
                          <p className="text-sm leading-relaxed text-slate-600 font-serif italic">{data.personal.summary}</p>
                       </section>
                       <section>
                          <h5 className="text-[9px] font-bold uppercase mb-6 opacity-30">History</h5>
                          <div className="space-y-10">
                            {data.experience.map(exp => (
                               <div key={exp.id}>
                                  <div className="flex justify-between items-baseline">
                                     <h4 className="text-sm font-bold text-slate-900">{exp.position}</h4>
                                     <span className="text-[10px] opacity-40">{exp.startDate} - {exp.endDate}</span>
                                  </div>
                                  <p className="text-xs font-medium mb-3 opacity-60">{exp.company}</p>
                                  <p className="text-xs leading-relaxed text-slate-500">{exp.description}</p>
                               </div>
                            ))}
                          </div>
                       </section>
                    </div>
                 </div>
              </div>
            )}

            {/* Watermark for free plan */}
            {!isPro && (
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none rotate-[-45deg] whitespace-nowrap overflow-hidden print:hidden">
                  <span className="text-8xl font-black text-slate-900 uppercase tracking-widest">MASTERED WITH PDFMASTER</span>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
           <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowUpgradeModal(false)}></div>
           <div className="relative bg-white max-w-lg w-full rounded-[40px] overflow-hidden shadow-2xl">
              <div className="bg-indigo-600 p-8 text-white text-center">
                 <Sparkles className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                 <h2 className="text-3xl font-extrabold mb-2">Upgrade to Pro</h2>
                 <p className="text-indigo-100">Unlock AI-powered resume writing and premium templates.</p>
              </div>
              <div className="p-8 space-y-4">
                 {[
                   "AI Summary & Bullet Point Generator",
                   "ATS Optimization & Keywords",
                   "Unlimited High-Quality PDF Exports",
                   "Remove 'Mastered with PDFMaster' Watermark"
                 ].map((text, i) => (
                   <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <CheckCircle className="h-5 w-5 text-emerald-500" /> {text}
                   </div>
                 ))}
                 <div className="pt-6 flex gap-4">
                    <Link to="/pricing" className="flex-1 bg-indigo-600 text-white text-center py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                       Upgrade for $12
                    </Link>
                    <button onClick={() => setShowUpgradeModal(false)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                       Later
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Global CSS for printing the preview precisely */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 40px !important;
            box-shadow: none !important;
          }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
