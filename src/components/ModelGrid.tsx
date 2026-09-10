import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, Box } from 'lucide-react';
import { Model } from '../core/Model';
import { FilterState } from '../core/SearchEngine';
import { ModelCard } from './ModelCard';

interface ModelGridProps {
  models: Model[];
  filterState: FilterState;
  onSortChange: (sort: FilterState['sortBy']) => void;
  onSelectModel: (model: Model) => void;
  loading: boolean;
}

export const ModelGrid: React.FC<ModelGridProps> = ({
  models,
  filterState,
  onSortChange,
  onSelectModel,
  loading,
}) => {
  return (
    <section className="flex-1 p-6 overflow-y-auto font-sans flex flex-col gap-5 bg-slate-50/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Models
            <span className="text-xs font-mono text-slate-500 font-normal">
              ({models.length} results)
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Sort:</span>
          <select
            value={filterState.sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="spectrum-Input text-xs font-mono py-1 bg-white text-slate-700 border-slate-200 cursor-pointer"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="safetensors-desc">Safetensors (High to Low)</option>
            <option value="safetensors-asc">Safetensors (Low to High)</option>
            <option value="downloads-desc">Downloads (Most Popular)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
          <div className="w-7 h-7 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono">Loading model catalog...</p>
        </div>
      ) : models.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">No Models Found</h3>
            <p className="text-xs font-mono text-slate-500 mt-1 max-w-xs">
              No models match your current filters.
            </p>
          </div>
        </div>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {models.map((model) => (
              <ModelCard key={model.id} model={model} onSelect={onSelectModel} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};
