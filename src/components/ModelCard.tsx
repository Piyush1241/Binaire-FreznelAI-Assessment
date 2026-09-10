import React from 'react';
import { motion } from 'framer-motion';
import { Download, Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Model } from '../core/Model';

interface ModelCardProps {
  model: Model;
  onSelect: (model: Model) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(model)}
      className="spectrum-Card flex flex-col justify-between gap-3 cursor-pointer group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-mono text-slate-500 font-medium truncate">
            {model.author}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            {model.family}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
          {model.displayName || model.name}
        </h3>
        <p className="text-[11px] font-mono text-slate-400 mt-0.5 line-clamp-1">
          {model.id}
        </p>
      </div>

      <div className="flex flex-wrap gap-1 my-0.5">
        <span className="px-2 py-0.5 rounded text-[11px] font-sans bg-sky-50 text-sky-700 border border-sky-100 font-medium">
          {model.pipelineTag}
        </span>

        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-50 text-purple-700 border border-purple-100">
          {model.architecture}
        </span>

        {model.isSafetensors && (
          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Safetensors ({model.safetensorCount})
          </span>
        )}

        {model.weightTags.map((w) => (
          <span key={w} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-500">
            {w}
          </span>
        ))}
      </div>

      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5 text-slate-400" />
            {model.downloads.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            {model.likes.toLocaleString()}
          </span>
        </div>

        <span className="text-sky-600 opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity text-[11px] font-medium">
          Details <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
};
