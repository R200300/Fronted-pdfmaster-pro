
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
import { 
  FileText, 
  Trash2, 
  Download, 
  Loader2, 
  Type, 
  Image as ImageIcon, 
  PenTool, 
  MousePointer2,
  AlertTriangle,
  Star,
  ChevronLeft,
  Minus,
  Plus,
  Maximize,
  Minimize,
  Palette,
  Square,
  Circle,
  ArrowRight,
  Eraser,
  Layers,
  Undo,
  Lock,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Annotation, ActiveTool, DrawingPoint, ShapeType } from '../types';
import { useSubscription } from '../context/SubscriptionContext';
import { processPDFEdits } from '../services/pdfService';
import Dropzone from '../components/Dropzone';

// Set up PDF.js worker using unpkg for more reliable access to build artifacts
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const Editor: React.FC = () => {
  const { subscription, usage, canProcessFile, incrementUsage } = useSubscription();
  const [file, setFile] = useState<File | null>(null);
  const [pdfBuffer, setPdfBuffer] = useState<ArrayBuffer | null>(null);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [color, setColor] = useState('#4f46e5');
  const [fontSize, setFontSize] = useState(16);
  const [limitError, setLimitError] = useState<string | null>(null);
  
  // UI States
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [drawingPoints, setDrawingPoints] = useState<DrawingPoint[]>([]);
  const isMouseDown = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isPro = subscription.plan === 'pro';

  // Load and Render PDF
  const loadPDF = async (file: File) => {
    setIsProcessing(true);
    setProgress(5);
    const buffer = await file.arrayBuffer();
    setPdfBuffer(buffer);

    try {
      const loadingTask = pdfjsLib.getDocument({ data: buffer });
      const pdf = await loadingTask.promise;
      const images: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context!, viewport }).promise;
        images.push(canvas.toDataURL('image/jpeg', 0.8));
        setProgress(Math.floor((i / pdf.numPages) * 90) + 5);
      }
      setPageImages(images);
      setFile(file);
    } catch (err) {
      console.error(err);
      alert("Error parsing PDF. Is it password protected?");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleFileSelect = (file: File) => {
    const check = canProcessFile(file.size);
    if (!check.allowed) {
      setLimitError(check.reason || 'File restricted.');
      return;
    }
    setLimitError(null);
    loadPDF(file);
  };

  const handleToolSelect = (tool: ActiveTool) => {
    if (!isPro && ['text', 'draw', 'shape', 'image', 'signature'].includes(tool)) {
      setShowUpgradeModal(true);
      return;
    }
    setActiveTool(tool);
    setSelectedId(null);
  };

  const onCanvasInteractionStart = (pageIndex: number, e: React.MouseEvent) => {
    isMouseDown.current = true;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (activeTool === 'text') {
      const id = Math.random().toString(36).substr(2, 9);
      const newText: Annotation = {
        id, type: 'text', pageIndex, x, y, content: 'Type here...',
        fontSize, color, fontFamily: 'Helvetica'
      };
      setAnnotations([...annotations, newText]);
      setSelectedId(id);
      setActiveTool('select');
    } else if (activeTool === 'draw') {
      setDrawingPoints([{ x, y }]);
    } else if (activeTool === 'shape') {
      // Logic for starting a drag-to-size shape would go here
    }
  };

  const onCanvasInteractionMove = (pageIndex: number, e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (activeTool === 'draw') {
      setDrawingPoints(prev => [...prev, { x, y }]);
    }
  };

  const onCanvasInteractionEnd = (pageIndex: number) => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;

    if (activeTool === 'draw' && drawingPoints.length > 1) {
      const newDrawing: Annotation = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'drawing',
        pageIndex,
        x: drawingPoints[0].x,
        y: drawingPoints[0].y,
        points: drawingPoints,
        color,
        thickness: 2
      };
      setAnnotations([...annotations, newDrawing]);
      setDrawingPoints([]);
    }
  };

  const handleDownload = async () => {
    if (!pdfBuffer) return;
    setIsProcessing(true);
    try {
      const finalBytes = await processPDFEdits(pdfBuffer, annotations, isPro);
      const blob = new Blob([finalBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file?.name.split('.')[0]}_mastered.pdf`;
      link.click();
      incrementUsage();
    } catch (err) {
      console.error(err);
      alert("Error compiling PDF edits.");
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedAnnotation = useMemo(() => annotations.find(a => a.id === selectedId), [annotations, selectedId]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-100 overflow-hidden relative">
      {!file ? (
        <div className="flex-grow flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">Advanced PDF Editor</h1>
            {limitError && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-sm flex items-center animate-in shake">
                <AlertTriangle className="h-4 w-4 mr-2" /> {limitError}
              </div>
            )}
            <Dropzone onFileSelect={handleFileSelect} acceptedTypes=".pdf" label="PDF Files" />
          </div>
        </div>
      ) : (
        <>
          {/* Editor Header / Top Toolbar */}
          <div className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-40">
            <div className="flex items-center space-x-4">
              <button onClick={() => setFile(null)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="h-6 w-px bg-slate-200"></div>
              
              {/* Contextual Tools */}
              {selectedAnnotation?.type === 'text' && (
                <div className="flex items-center space-x-3 bg-indigo-50/50 px-3 py-1 rounded-full border border-indigo-100 animate-in fade-in slide-in-from-left-2">
                  <div className="flex items-center space-x-1">
                    <button onClick={() => setFontSize(Math.max(8, fontSize-2))} className="p-1 hover:bg-white rounded"><Minus className="h-3.5 w-3.5 text-indigo-600" /></button>
                    <span className="text-xs font-bold text-indigo-900 w-8 text-center">{fontSize}</span>
                    <button onClick={() => setFontSize(fontSize+2)} className="p-1 hover:bg-white rounded"><Plus className="h-3.5 w-3.5 text-indigo-600" /></button>
                  </div>
                  <div className="w-px h-4 bg-indigo-200"></div>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-6 h-6 rounded-full cursor-pointer border-0 p-0" />
                  <button onClick={() => setAnnotations(annotations.filter(a => a.id !== selectedId))} className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}

              {activeTool === 'draw' && (
                <div className="flex items-center space-x-3 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 animate-in fade-in">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pen Color</span>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-6 h-6 rounded-full cursor-pointer border-0 p-0" />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <button onClick={() => setZoom(z => Math.max(0.5, z-0.1))} className="p-2 text-slate-400 hover:text-slate-600"><Minimize className="h-4 w-4" /></button>
                <span className="text-xs font-bold text-slate-500 w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(2.5, z+0.1))} className="p-2 text-slate-400 hover:text-slate-600"><Maximize className="h-4 w-4" /></button>
              </div>
              <button 
                onClick={handleDownload}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center space-x-2"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                <span>Save & Export</span>
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden relative">
            {/* Left Tools Panel */}
            <div className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-8 space-y-6 z-30 shadow-sm">
              <ToolButton 
                active={activeTool === 'select'} 
                onClick={() => handleToolSelect('select')}
                icon={<MousePointer2 className="h-5 w-5" />}
                label="Select"
              />
              <div className="w-8 h-px bg-slate-100"></div>
              <ToolButton 
                active={activeTool === 'text'} 
                onClick={() => handleToolSelect('text')}
                icon={<Type className="h-5 w-5" />}
                label="Add Text"
                isPro={!isPro}
              />
              <ToolButton 
                active={activeTool === 'draw'} 
                onClick={() => handleToolSelect('draw')}
                icon={<PenTool className="h-5 w-5" />}
                label="Draw"
                isPro={!isPro}
              />
              <ToolButton 
                active={activeTool === 'shape'} 
                onClick={() => handleToolSelect('shape')}
                icon={<Square className="h-5 w-5" />}
                label="Shapes"
                isPro={!isPro}
              />
              <ToolButton 
                active={activeTool === 'image'} 
                onClick={() => handleToolSelect('image')}
                icon={<ImageIcon className="h-5 w-5" />}
                label="Image"
                isPro={!isPro}
              />
              <div className="flex-grow"></div>
              <button onClick={() => window.location.reload()} className="p-3 text-slate-400 hover:text-rose-500 transition-colors" title="Reset Session">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            {/* Editing Canvas */}
            <div 
              ref={containerRef}
              className="flex-1 overflow-auto p-12 bg-slate-200/50 flex flex-col items-center space-y-16 no-scrollbar scroll-smooth pattern-dots"
            >
              {isProcessing && (
                <div className="fixed inset-0 z-[60] bg-white/60 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-500">
                  <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mb-4 shadow-inner">
                    <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-sm font-black text-indigo-600 animate-pulse tracking-widest uppercase">Document Master in Progress...</p>
                </div>
              )}

              {pageImages.map((src, idx) => (
                <div 
                  key={idx} 
                  className="relative bg-white shadow-2xl origin-top transition-transform duration-200"
                  style={{ transform: `scale(${zoom})`, minWidth: '400px' }}
                  onMouseDown={(e) => onCanvasInteractionStart(idx, e)}
                  onMouseMove={(e) => onCanvasInteractionMove(idx, e)}
                  onMouseUp={() => onCanvasInteractionEnd(idx)}
                  onMouseLeave={() => onCanvasInteractionEnd(idx)}
                >
                  <img src={src} className="max-w-none pointer-events-none select-none" alt={`Page ${idx + 1}`} />
                  
                  {/* Annotation Layer */}
                  <div className="absolute inset-0 z-10">
                    <svg className="w-full h-full pointer-events-none">
                      {annotations.filter(a => a.pageIndex === idx && a.type === 'drawing').map(a => {
                        const drawAnn = a as any;
                        const d = drawAnn.points.map((p: any, i: number) => `${i === 0 ? 'M' : 'L'} ${p.x}% ${p.y}%`).join(' ');
                        return (
                          <path key={a.id} d={d} stroke={drawAnn.color} strokeWidth={drawAnn.thickness} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        );
                      })}
                      {drawingPoints.length > 1 && (
                        <path d={drawingPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x}% ${p.y}%`).join(' ')} stroke={color} strokeWidth={2} fill="none" />
                      )}
                    </svg>

                    {/* Interactive Elements */}
                    {annotations.filter(a => a.pageIndex === idx && a.type === 'text').map(a => {
                      const textAnn = a as any;
                      const isSelected = selectedId === a.id;
                      return (
                        <div 
                          key={a.id}
                          className={`absolute p-1 rounded transition-all group cursor-text ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 bg-white' : 'hover:bg-indigo-50/50'}`}
                          style={{ top: `${a.y}%`, left: `${a.x}%`, color: textAnn.color, fontSize: `${textAnn.fontSize}px` }}
                          onClick={(e) => { e.stopPropagation(); setSelectedId(a.id); }}
                        >
                          <input 
                            value={textAnn.content}
                            autoFocus={isSelected}
                            onChange={(e) => setAnnotations(annotations.map(ann => ann.id === a.id ? { ...ann, content: e.target.value } : ann))}
                            className="bg-transparent border-none focus:outline-none focus:ring-0 min-w-[30px] font-medium"
                            style={{ fontSize: 'inherit', color: 'inherit' }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Free Plan Watermark Preview */}
                  {!isPro && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none rotate-[-45deg] whitespace-nowrap overflow-hidden">
                       <span className="text-6xl font-black text-slate-900 uppercase">MASTERED WITH PDFMASTER FREE</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
           <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowUpgradeModal(false)}></div>
           <div className="relative bg-white max-w-lg w-full rounded-[40px] overflow-hidden shadow-2xl border border-slate-200">
              <div className="bg-indigo-600 p-8 text-white text-center">
                 <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Lock className="h-8 w-8 text-white" />
                 </div>
                 <h2 className="text-3xl font-extrabold mb-2">Pro Tool Locked</h2>
                 <p className="text-indigo-100">Advanced editing tools are exclusive to Pro subscribers.</p>
              </div>
              <div className="p-8 space-y-6">
                 <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm font-medium text-slate-700">
                       <CheckCircle className="h-5 w-5 text-emerald-500" />
                       <span>Unlimited PDF edits and exports</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm font-medium text-slate-700">
                       <CheckCircle className="h-5 w-5 text-emerald-500" />
                       <span>Text, shapes, images, and signatures</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm font-medium text-slate-700">
                       <CheckCircle className="h-5 w-5 text-emerald-500" />
                       <span>No watermarks on exported files</span>
                    </div>
                 </div>
                 <div className="pt-4 flex gap-3">
                    <Link 
                       to="/pricing" 
                       className="flex-1 bg-indigo-600 text-white text-center py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center"
                    >
                       Upgrade for $12 <Zap className="h-4 w-4 ml-2 fill-white" />
                    </Link>
                    <button onClick={() => setShowUpgradeModal(false)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                       Later
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const ToolButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; isPro?: boolean }> = ({ active, onClick, icon, label, isPro }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-xl transition-all group relative ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
  >
    {icon}
    {isPro && (
      <div className="absolute -top-1 -right-1 bg-amber-400 text-white p-0.5 rounded-full border-2 border-white shadow-sm">
        <Lock className="h-2 w-2" />
      </div>
    )}
    <span className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl border border-slate-700">
      {label} {isPro && '(Pro)'}
    </span>
  </button>
);

export default Editor;
