import { Model, RawModelData } from './Model';
import { NetworkManager } from './NetworkManager';
import { COMPREHENSIVE_MOCK_MODELS } from './MockDataset';

export class ModelRepository {
  private static CACHE_KEY = 'binaire_freznel_models_cache';
  private static HOSTED_API_URL = 'https://binaire.app/hf-models-api.json';
  private static FALLBACK_HF_API_URL = 'https://huggingface.co/api/models?full=true&limit=100';
  private networkManager: NetworkManager;

  constructor(networkManager: NetworkManager) {
    this.networkManager = networkManager;
  }

  public async fetchModels(): Promise<{ models: Model[]; source: 'api' | 'cache' | 'mock' }> {
    const isOnline = this.networkManager.isOnline();

    if (isOnline) {
      try {
        const response = await fetch(ModelRepository.HOSTED_API_URL);
        if (response.ok) {
          const json = await response.json();
          const rawArray: RawModelData[] = Array.isArray(json) ? json : (json.models || []);
          const models = rawArray.map((item) => new Model(item));
          this.saveToStorage(models);
          return { models, source: 'api' };
        }
      } catch (err) {
      }

      try {
        const response = await fetch(ModelRepository.FALLBACK_HF_API_URL);
        if (response.ok) {
          const data: RawModelData[] = await response.json();
          const models = data.map((item) => new Model(item));
          this.saveToStorage(models);
          return { models, source: 'api' };
        }
      } catch (err) {
      }
    }

    const stored = this.readFromStorage();
    if (stored.length > 0) {
      return { models: stored, source: 'cache' };
    }

    const mockModels = COMPREHENSIVE_MOCK_MODELS.map((item) => new Model(item));
    this.saveToStorage(mockModels);
    return { models: mockModels, source: 'mock' };
  }

  private saveToStorage(models: Model[]): void {
    try {
      localStorage.setItem(ModelRepository.CACHE_KEY, JSON.stringify(models));
    } catch (e) {
    }
  }

  private readFromStorage(): Model[] {
    try {
      const json = localStorage.getItem(ModelRepository.CACHE_KEY);
      if (json) {
        const rawArray = JSON.parse(json);
        return rawArray.map((item: any) => new Model(item));
      }
    } catch (e) {
    }
    return [];
  }
}
