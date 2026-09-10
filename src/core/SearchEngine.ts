import { Model } from './Model';

export interface FilterState {
  searchQuery: string;
  searchField: 'all' | 'name' | 'family';
  selectedPipelineTags: string[];
  selectedFamilyTags: string[];
  selectedArchitectureTags: string[];
  selectedWeightTags: string[];
  safetensorsMin: number;
  safetensorsMax: number;
  sortBy: 'name-asc' | 'name-desc' | 'safetensors-asc' | 'safetensors-desc' | 'downloads-desc';
}

export class SearchEngine {
  private debounceTimer: number | null = null;
  private throttleTimer: number | null = null;
  private lastExecutedTime: number = 0;

  public matchSubstring(text: string, query: string): boolean {
    if (!query || query.trim() === '') return true;
    const cleanText = text.toLowerCase().trim();
    const cleanQuery = query.toLowerCase().trim();
    return cleanText.includes(cleanQuery);
  }

  public process(models: Model[], filterState: FilterState): Model[] {
    let result = models.filter((model) => {
      if (filterState.searchQuery) {
        const query = filterState.searchQuery;
        if (filterState.searchField === 'name') {
          if (!this.matchSubstring(model.name, query) && !this.matchSubstring(model.id, query)) {
            return false;
          }
        } else if (filterState.searchField === 'family') {
          if (!this.matchSubstring(model.family, query)) {
            return false;
          }
        } else {
          const nameMatch = this.matchSubstring(model.name, query) || this.matchSubstring(model.id, query);
          const familyMatch = this.matchSubstring(model.family, query);
          if (!nameMatch && !familyMatch) {
            return false;
          }
        }
      }

      if (filterState.selectedPipelineTags.length > 0) {
        if (!filterState.selectedPipelineTags.includes(model.pipelineTag)) {
          return false;
        }
      }

      if (filterState.selectedFamilyTags.length > 0) {
        if (!filterState.selectedFamilyTags.includes(model.family)) {
          return false;
        }
      }

      if (filterState.selectedArchitectureTags.length > 0) {
        if (!filterState.selectedArchitectureTags.includes(model.architecture)) {
          return false;
        }
      }

      if (filterState.selectedWeightTags.length > 0) {
        const hasWeight = filterState.selectedWeightTags.some(wt => model.weightTags.includes(wt));
        if (!hasWeight) return false;
      }

      if (model.safetensorCount < filterState.safetensorsMin || model.safetensorCount > filterState.safetensorsMax) {
        return false;
      }

      return true;
    });

    return this.sortModels(result, filterState.sortBy);
  }

  private sortModels(models: Model[], sortBy: FilterState['sortBy']): Model[] {
    return [...models].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.id.localeCompare(b.id);
        case 'name-desc':
          return b.id.localeCompare(a.id);
        case 'safetensors-asc':
          return a.safetensorCount - b.safetensorCount;
        case 'safetensors-desc':
          return b.safetensorCount - a.safetensorCount;
        case 'downloads-desc':
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });
  }

  public debounce(func: (...args: any[]) => void, delayMs: number = 300) {
    return (...args: any[]) => {
      if (this.debounceTimer !== null) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = window.setTimeout(() => {
        func(...args);
      }, delayMs);
    };
  }

  public throttle(func: (...args: any[]) => void, limitMs: number = 500) {
    return (...args: any[]) => {
      const now = Date.now();
      if (now - this.lastExecutedTime >= limitMs) {
        func(...args);
        this.lastExecutedTime = now;
      } else {
        if (this.throttleTimer !== null) {
          clearTimeout(this.throttleTimer);
        }
        this.throttleTimer = window.setTimeout(() => {
          func(...args);
          this.lastExecutedTime = Date.now();
        }, limitMs - (now - this.lastExecutedTime));
      }
    };
  }
}
