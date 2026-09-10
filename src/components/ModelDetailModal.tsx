import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Download, Heart, ShieldCheck, Layers, Cpu, Tag, Code } from 'lucide-react';
import { Model } from '../core/Model';

interface ModelDetailModalProps {
  model: Model | null;
  onClose: () => void;
}

export const ModelDetailModal: React.FC<ModelDetailModalProps> = ({ model, onClose }) => {
  if (!model) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 relative font-sans max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-sm">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 font-semibold uppercase">
              {model.author}
            </span>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {model.displayName || model.name}
            </h2>
            <p className="text-xs font-mono text-slate-500 mt-1">
              ID: {model.id}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
            <span className="text-slate-500 text-[11px]">Downloads</span>
            <span className="text-slate-800 font-bold text-sm mt-0.5 flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-slate-600" />
              {model.downloads.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
            <span className="text-slate-500 text-[11px]">Likes</span>
            <span className="text-slate-800 font-bold text-sm mt-0.5 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              {model.likes.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
            <span className="text-slate-500 text-[11px]">Safetensor Files</span>
            <span className="text-slate-800 font-bold text-sm mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {model.safetensorCount}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs font-sans mb-6">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="text-slate-600 font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              Pipeline Task
            </span>
            <span className="text-sky-700 font-mono font-semibold px-2.5 py-0.5 rounded-md bg-sky-100 border border-sky-200">
              {model.pipelineTag}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="text-slate-600 font-mono flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-600" />
              Architecture Class
            </span>
            <span className="text-purple-700 font-mono font-semibold px-2.5 py-0.5 rounded-md bg-purple-100 border border-purple-200">
              {model.architecture}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="text-slate-600 font-mono flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-600" />
              Model Family
            </span>
            <span className="text-slate-700 font-mono font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">
              {model.family}
            </span>
          </div>

          <div>
            <span className="text-xs font-mono text-slate-500 mb-2 block">
              Associated Metadata Tags:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              {model.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white text-slate-700 border border-slate-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <a
            href={model.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spectrum-Button spectrum-Button--accent text-xs py-2 px-4 flex items-center gap-2"
          >
            <span>Open on HuggingFace Hub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="spectrum-Button spectrum-Button--secondary text-xs py-2 px-4"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
