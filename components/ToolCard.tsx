
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PDFTool } from '../types';

interface ToolCardProps {
  tool: PDFTool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link 
      to={`/editor/${tool.id}`}
      className="group relative bg-white p-6 rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 flex flex-col h-full"
    >
      <div className={`${tool.color} p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 duration-300`}>
        {tool.icon}
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
        {tool.title}
      </h3>
      
      <p className="text-slate-500 text-sm flex-grow mb-6 leading-relaxed">
        {tool.description}
      </p>

      <div className="flex items-center text-sm font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
        Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
      </div>
    </Link>
  );
};

export default ToolCard;
