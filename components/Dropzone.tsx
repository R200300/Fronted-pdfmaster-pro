
import React, { useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string;
  label?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ 
  onFileSelect, 
  acceptedTypes = ".pdf,.docx,.pptx,.jpg,.jpeg,.png",
  label = "PDF, DOCX, PPTX, or Images"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-12 transition-all flex flex-col items-center justify-center bg-white ${
        isDragging 
          ? 'border-indigo-600 bg-indigo-50/50' 
          : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'
      }`}
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept={acceptedTypes}
        className="hidden"
      />
      
      <div className={`p-5 rounded-2xl mb-6 transition-transform duration-300 ${
        isDragging ? 'scale-110 bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'
      }`}>
        <Upload className="h-10 w-10" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        {isDragging ? 'Drop it here!' : 'Choose files or drag & drop'}
      </h3>
      <p className="text-slate-500 text-sm mb-8">
        Max file size: 50MB. Support for {label}
      </p>

      <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
        Select Files
      </button>
    </div>
  );
};

export default Dropzone;
