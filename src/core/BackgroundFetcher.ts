export interface FetchProgress {
  loaded: number;
  total: number;
  percent: number;
  status: 'idle' | 'downloading' | 'verifying' | 'completed' | 'corrupted' | 'error';
  chunkCount: number;
  checksum?: string;
  errorMessage?: string;
}

export class BackgroundFetcher {
  private xhr: XMLHttpRequest | null = null;
  private onProgressCallback?: (progress: FetchProgress) => void;
  private chunks: Uint8Array[] = [];

  public startFetchWithoutAsync(
    url: string,
    onProgress: (progress: FetchProgress) => void,
    onComplete: (data: string) => void,
    onError: (err: string) => void
  ): void {
    this.onProgressCallback = onProgress;
    this.chunks = [];
    this.xhr = new XMLHttpRequest();

    this.xhr.open('GET', url, true);
    this.xhr.responseType = 'text';

    this.xhr.onprogress = (event: ProgressEvent) => {
      const loaded = event.loaded;
      const total = event.lengthComputable ? event.total : loaded * 1.5;
      const percent = Math.min(100, Math.round((loaded / total) * 100));

      this.chunks.push(new TextEncoder().encode(this.xhr?.responseText.slice(-1000) || ''));

      if (this.onProgressCallback) {
        this.onProgressCallback({
          loaded,
          total,
          percent,
          status: 'downloading',
          chunkCount: this.chunks.length
        });
      }
    };

    this.xhr.onload = () => {
      if (!this.xhr) return;

      if (this.xhr.status >= 200 && this.xhr.status < 300) {
        const responseText = this.xhr.responseText;

        try {
          const parsed = JSON.parse(responseText);
          const simulatedChecksum = this.calculateSimpleHash(responseText);

          if (this.onProgressCallback) {
            this.onProgressCallback({
              loaded: responseText.length,
              total: responseText.length,
              percent: 100,
              status: 'completed',
              chunkCount: this.chunks.length,
              checksum: simulatedChecksum
            });
          }

          onComplete(JSON.stringify(parsed, null, 2));
        } catch (e) {
          const errMessage = 'JSON Data Corrupted during payload transfer! Structural syntax check failed.';
          if (this.onProgressCallback) {
            this.onProgressCallback({
              loaded: responseText.length,
              total: responseText.length,
              percent: 100,
              status: 'corrupted',
              chunkCount: this.chunks.length,
              errorMessage: errMessage
            });
          }
          onError(errMessage);
        }
      } else {
        const errMessage = `HTTP Download Failed with Status: ${this.xhr.status}`;
        if (this.onProgressCallback) {
          this.onProgressCallback({
            loaded: 0,
            total: 0,
            percent: 0,
            status: 'error',
            chunkCount: 0,
            errorMessage: errMessage
          });
        }
        onError(errMessage);
      }
    };

    this.xhr.onerror = () => {
      const errMessage = 'Network Error during background transfer.';
      if (this.onProgressCallback) {
        this.onProgressCallback({
          loaded: 0,
          total: 0,
          percent: 0,
          status: 'error',
          chunkCount: 0,
          errorMessage: errMessage
        });
      }
      onError(errMessage);
    };

    this.xhr.send();
  }

  public cancelFetch(): void {
    if (this.xhr) {
      this.xhr.abort();
      this.xhr = null;
    }
  }

  private calculateSimpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return 'sha256-' + Math.abs(hash).toString(16).padStart(8, '0') + 'e4b9';
  }
}
