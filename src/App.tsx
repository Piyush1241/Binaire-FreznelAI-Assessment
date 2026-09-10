import { useEffect, useState, useMemo } from 'react';
import { User } from 'firebase/auth';
import { Model } from './core/Model';
import { NetworkManager, ConnectionStatus } from './core/NetworkManager';
import { ModelRepository } from './core/ModelRepository';
import { SearchEngine, FilterState } from './core/SearchEngine';
import { FirebaseAuthService } from './core/FirebaseAuthService';
import { Navbar } from './components/Navbar';
import { NetworkBanner } from './components/NetworkBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { ModelGrid } from './components/ModelGrid';
import { AuthModal } from './components/AuthModal';
import { AssessmentQNA } from './components/AssessmentQNA';
import { ModelDetailModal } from './components/ModelDetailModal';
import './styles/spectrum.css';

const networkManager = new NetworkManager();
const modelRepo = new ModelRepository(networkManager);
const searchEngine = new SearchEngine();
const authService = new FirebaseAuthService();

const initialFilterState: FilterState = {
  searchQuery: '',
  searchField: 'all',
  selectedPipelineTags: [],
  selectedFamilyTags: [],
  selectedArchitectureTags: [],
  selectedWeightTags: [],
  safetensorsMin: 0,
  safetensorsMax: 10,
  sortBy: 'name-asc',
};

export function App() {
  const [allModels, setAllModels] = useState<Model[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(networkManager.getStatus());
  const [dataSource, setDataSource] = useState<'api' | 'cache' | 'mock'>('api');
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  const [loading, setLoading] = useState(true);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isQNAOpen, setIsQNAOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  useEffect(() => {
    const unsubNet = networkManager.subscribe((status) => {
      setConnectionStatus(status);
    });

    const unsubAuth = authService.subscribe((u) => {
      setUser(u);
    });

    return () => {
      unsubNet();
      unsubAuth();
    };
  }, []);

  const loadModels = async () => {
    setLoading(true);
    try {
      const res = await modelRepo.fetchModels();
      setAllModels(res.models);
      setDataSource(res.source);
    } catch (e) {
      console.error('Failed loading models:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModels();
  }, [connectionStatus]);

  const availablePipelines = useMemo(() => {
    const set = new Set<string>();
    allModels.forEach((m) => m.pipelineTag && set.add(m.pipelineTag));
    return Array.from(set).sort();
  }, [allModels]);

  const availableFamilies = useMemo(() => {
    const set = new Set<string>();
    allModels.forEach((m) => m.family && set.add(m.family));
    return Array.from(set).sort();
  }, [allModels]);

  const availableArchitectures = useMemo(() => {
    const set = new Set<string>();
    allModels.forEach((m) => m.architecture && set.add(m.architecture));
    return Array.from(set).sort();
  }, [allModels]);

  const availableWeights = useMemo(() => {
    const set = new Set<string>();
    allModels.forEach((m) => m.weightTags.forEach((w) => set.add(w)));
    return Array.from(set).sort();
  }, [allModels]);

  const filteredModels = useMemo(() => {
    return searchEngine.process(allModels, filterState);
  }, [allModels, filterState]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilterState(initialFilterState);
  };

  const handleToggleConnection = () => {
    networkManager.toggleForceOffline();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      <Navbar
        searchQuery={filterState.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        searchField={filterState.searchField}
        onSearchFieldChange={(f) => handleFilterChange({ searchField: f })}
        connectionStatus={connectionStatus}
        onToggleConnection={handleToggleConnection}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => authService.logout()}
        onOpenQNA={() => setIsQNAOpen(true)}
        totalModels={allModels.length}
      />

      <NetworkBanner
        status={connectionStatus}
        dataSource={dataSource}
        onToggle={handleToggleConnection}
        onRefresh={loadModels}
      />

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        <FilterSidebar
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          availablePipelines={availablePipelines}
          availableFamilies={availableFamilies}
          availableArchitectures={availableArchitectures}
          availableWeights={availableWeights}
        />

        <ModelGrid
          models={filteredModels}
          filterState={filterState}
          onSortChange={(sort) => handleFilterChange({ sortBy: sort })}
          onSelectModel={(m) => setSelectedModel(m)}
          loading={loading}
        />
      </div>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        authService={authService}
      />

      <AssessmentQNA
        isOpen={isQNAOpen}
        onClose={() => setIsQNAOpen(false)}
      />

      <ModelDetailModal
        model={selectedModel}
        onClose={() => setSelectedModel(null)}
      />
    </div>
  );
}

export default App;
