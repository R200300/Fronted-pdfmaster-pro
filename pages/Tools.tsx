
import React, { useState } from 'react';
import ToolCard from '../components/ToolCard';
import { 
  FileEdit, 
  Presentation, 
  FileImage, 
  ImageIcon, 
  UploadCloud, 
  Eraser, 
  Palette, 
  Layout,
  Search,
  UserCircle
} from 'lucide-react';
import { PDFTool } from '../types';

const TOOLS_DATA: PDFTool[] = [
  {
    id: 'resume-builder',
    title: 'Resume Builder',
    description: 'Create professional, ATS-friendly resumes with AI-assisted summaries and modern templates.',
    icon: <UserCircle className="h-8 w-8 text-indigo-600" />,
    category: 'build',
    color: 'bg-indigo-100'
  },
  {
    id: 'pdf-editor',
    title: 'PDF Editor',
    description: 'The ultimate tool to edit text, images, and shapes directly in your PDF.',
    icon: <FileEdit className="h-8 w-8 text-indigo-600" />,
    category: 'edit',
    color: 'bg-indigo-100'
  },
  {
    id: 'ppt-to-pdf',
    title: 'PPT to PDF',
    description: 'Convert PowerPoint presentations to high-quality PDF documents.',
    icon: <Presentation className="h-8 w-8 text-orange-600" />,
    category: 'convert',
    color: 'bg-orange-100'
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Extract every page of your PDF into high-quality JPEG images.',
    icon: <FileImage className="h-8 w-8 text-emerald-600" />,
    category: 'convert',
    color: 'bg-emerald-100'
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Transform your photos and images into a single professional PDF.',
    icon: <ImageIcon className="h-8 w-8 text-sky-600" />,
    category: 'convert',
    color: 'bg-sky-100'
  },
  {
    id: 'upgrade-to-pdf',
    title: 'Upgrade to PDF',
    description: 'Enhance any simple document into a standard protected PDF.',
    icon: <UploadCloud className="h-8 w-8 text-violet-600" />,
    category: 'optimize',
    color: 'bg-violet-100'
  },
  {
    id: 'bg-remover',
    title: 'Background Remover',
    description: 'AI-powered background removal for your document images.',
    icon: <Eraser className="h-8 w-8 text-pink-600" />,
    category: 'edit',
    color: 'bg-pink-100'
  },
  {
    id: 'add-bg-color',
    title: 'Add Background Color',
    description: 'Add a solid color or gradient background to transparent PDFs.',
    icon: <Palette className="h-8 w-8 text-amber-600" />,
    category: 'edit',
    color: 'bg-amber-100'
  },
  {
    id: 'apply-theme',
    title: 'Apply Theme',
    description: 'Instantly apply visual presets and templates to your documents.',
    icon: <Layout className="h-8 w-8 text-teal-600" />,
    category: 'optimize',
    color: 'bg-teal-100'
  }
];

const Tools: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'edit' | 'convert' | 'optimize' | 'build'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = TOOLS_DATA.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Complete PDF Toolkit</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Everything you need to work with PDFs in one place. Fast, online, and easy to use.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-4 md:space-y-0">
        <div className="flex p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
          {(['all', 'edit', 'convert', 'optimize', 'build'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all capitalize whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search for a tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredTools.length > 0 ? (
          filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="bg-slate-50 inline-block p-6 rounded-3xl mb-4">
              <Search className="h-12 w-12 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No tools found</h3>
            <p className="text-slate-500">Try searching for something else like "resume" or "convert".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;
