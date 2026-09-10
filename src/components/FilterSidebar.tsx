import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { FilterState } from '../core/SearchEngine';

interface FilterSidebarProps {
  filterState: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  availablePipelines: string[];
  availableFamilies: string[];
  availableArchitectures: string[];
  availableWeights: string[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filterState,
  onFilterChange,
  onReset,
  availablePipelines,
  availableFamilies,
  availableArchitectures,
  availableWeights,
}) => {
  const toggleArrayItem = (arr: string[], item: string): string[] => {
    return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
  };

  return (
    <aside className="w-full lg:w-72 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-5 flex flex-col gap-6 shrink-0 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors font-medium"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-700 font-semibold">Safetensor Files</span>
          <span className="text-slate-900 font-mono text-xs font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {filterState.safetensorsMin} - {filterState.safetensorsMax}
          </span>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs text-slate-400 font-mono">Min</span>
          <input
            type="range"
            min={0}
            max={10}
            value={filterState.safetensorsMin}
            onChange={(e) => onFilterChange({ safetensorsMin: Number(e.target.value) })}
            className="spectrum-Slider"
          />
          <span className="text-xs text-slate-400 font-mono">Max</span>
          <input
            type="range"
            min={0}
            max={10}
            value={filterState.safetensorsMax}
            onChange={(e) => onFilterChange({ safetensorsMax: Number(e.target.value) })}
            className="spectrum-Slider"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-slate-800">Pipeline Task</label>
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
          {availablePipelines.map((pipe) => {
            const isSelected = filterState.selectedPipelineTags.includes(pipe);
            return (
              <button
                key={pipe}
                onClick={() =>
                  onFilterChange({
                    selectedPipelineTags: toggleArrayItem(filterState.selectedPipelineTags, pipe),
                  })
                }
                className={`spectrum-Tag ${isSelected ? 'is-selected' : ''}`}
              >
                {pipe}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-slate-800">Model Family</label>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
          {availableFamilies.map((fam) => {
            const isSelected = filterState.selectedFamilyTags.includes(fam);
            return (
              <button
                key={fam}
                onClick={() =>
                  onFilterChange({
                    selectedFamilyTags: toggleArrayItem(filterState.selectedFamilyTags, fam),
                  })
                }
                className={`spectrum-Tag ${isSelected ? 'is-selected' : ''}`}
              >
                {fam}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-slate-800">Architecture</label>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
          {availableArchitectures.map((arch) => {
            const isSelected = filterState.selectedArchitectureTags.includes(arch);
            return (
              <button
                key={arch}
                onClick={() =>
                  onFilterChange({
                    selectedArchitectureTags: toggleArrayItem(filterState.selectedArchitectureTags, arch),
                  })
                }
                className={`spectrum-Tag ${isSelected ? 'is-selected' : ''}`}
              >
                {arch}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-slate-800">Weight Format</label>
        <div className="flex flex-wrap gap-1.5">
          {availableWeights.map((wt) => {
            const isSelected = filterState.selectedWeightTags.includes(wt);
            return (
              <button
                key={wt}
                onClick={() =>
                  onFilterChange({
                    selectedWeightTags: toggleArrayItem(filterState.selectedWeightTags, wt),
                  })
                }
                className={`spectrum-Tag ${isSelected ? 'is-selected' : ''}`}
              >
                {wt}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
