export type ConnectionStatus = 'online' | 'offline';

export class NetworkManager {
  private status: ConnectionStatus;
  private listeners: Set<(status: ConnectionStatus) => void> = new Set();
  private forceOffline: boolean = false;

  constructor() {
    this.status = navigator.onLine ? 'online' : 'offline';
    this.initEventListeners();
  }

  private initEventListeners() {
    window.addEventListener('online', () => {
      if (!this.forceOffline) {
        this.status = 'online';
        this.notify();
      }
    });

    window.addEventListener('offline', () => {
      this.status = 'offline';
      this.notify();
    });
  }

  public getStatus(): ConnectionStatus {
    return this.forceOffline ? 'offline' : this.status;
  }

  public isOnline(): boolean {
    return this.getStatus() === 'online';
  }

  public setForceOffline(force: boolean): ConnectionStatus {
    this.forceOffline = force;
    this.notify();
    return this.getStatus();
  }

  public toggleForceOffline(): ConnectionStatus {
    this.forceOffline = !this.forceOffline;
    this.notify();
    return this.getStatus();
  }

  public subscribe(callback: (status: ConnectionStatus) => void): () => void {
    this.listeners.add(callback);
    callback(this.getStatus());
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    const current = this.getStatus();
    this.listeners.forEach((cb) => cb(current));
  }
}
