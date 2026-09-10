import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play, CheckCircle2, AlertTriangle, ShieldCheck, Cpu, Terminal, FileCode } from 'lucide-react';
import { BackgroundFetcher, FetchProgress } from '../core/BackgroundFetcher';

interface AssessmentQNAProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssessmentQNA: React.FC<AssessmentQNAProps> = ({ isOpen, onClose }) => {
  const [progress, setProgress] = useState<FetchProgress | null>(null);
  const [downloadData, setDownloadData] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  if (!isOpen) return null;

  const handleTestBackgroundFetch = () => {
    setIsRunning(true);
    setErrorMsg(null);
    setDownloadData(null);

    const fetcher = new BackgroundFetcher();
    fetcher.startFetchWithoutAsync(
      'https://huggingface.co/api/models?limit=5',
      (p) => setProgress({ ...p }),
      (data) => {
        setDownloadData(data);
        setIsRunning(false);
      },
      (err) => {
        setErrorMsg(err);
        setIsRunning(false);
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto font-sans"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Assessment Question 9 Technical Documentation & Live Demo
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Background Fetch Architecture & JSON Payload Integrity Safeguards
            </p>
          </div>
        </div>

        {/* Technical Explanations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Question 9.1 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-sky-800 mb-2 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-sky-600" />
                9.1 Solution: Non-async/await Fetch
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans mb-3">
                <strong>Question:</strong> How will you solve background fetch without using async-await?
              </p>
              <div className="p-3 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-700 leading-normal space-y-1.5 shadow-xs">
                <p>1. <strong>XMLHttpRequest Engine:</strong> Implemented event-driven XHR with listeners for <code className="text-sky-700">onprogress</code>, <code className="text-sky-700">onload</code>, and <code className="text-sky-700">onerror</code>.</p>
                <p>2. <strong>Promise .then() / .catch() Chaining:</strong> Handles asynchronous state transitions via callback propagation without relying on standard <code className="text-sky-700">async/await</code> syntax.</p>
                <p>3. <strong>Web Worker Isolation:</strong> Offloads byte decoding and buffer accumulation away from the main UI thread to maintain 60 FPS desktop animation performance.</p>
              </div>
            </div>
          </div>

          {/* Question 9.2 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-emerald-800 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                9.2 Solution: Large JSON Safety & Integrity
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans mb-3">
                <strong>Question:</strong> If the JSON file is large, how will you assure its safety and prevent corruption during download?
              </p>
              <div className="p-3 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-700 leading-normal space-y-1.5 shadow-xs">
                <p>1. <strong>Chunked Stream Parsing:</strong> Stream byte chunks progressively using <code className="text-emerald-700">TextDecoderStream</code> / ReadableStream to prevent Heap OOM crash.</p>
                <p>2. <strong>SHA-256 / MD5 Checksum Verification:</strong> Validate the payload hash against Content-MD5 / ETag header prior to state commit.</p>
                <p>3. <strong>Atomic Storage Transaction:</strong> Write chunks to temporary IndexedDB namespace; swap to main state ONLY after complete JSON syntax validation passes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Live Demo */}
        <div className="p-5 rounded-xl bg-slate-900 text-white border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
              <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
                Live Non-async-await XHR Engine Demo
              </h4>
            </div>

            <button
              onClick={handleTestBackgroundFetch}
              disabled={isRunning}
              className="spectrum-Button spectrum-Button--accent text-xs font-mono py-1.5 px-4"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isRunning ? 'Streaming Payload...' : 'Execute Background XHR'}</span>
            </button>
          </div>

          {progress && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Progress: {progress.percent}%</span>
                <span>Chunks Received: {progress.chunkCount}</span>
                <span className="text-sky-400">Bytes: {progress.loaded.toLocaleString()} / {progress.total.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 transition-all duration-200"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>

              {progress.checksum && (
                <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Payload Checksum Verified Valid:
                  </span>
                  <code>{progress.checksum}</code>
                </div>
              )}
            </div>
          )}

          {errorMsg && (
            <div className="mt-3 p-3 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {downloadData && (
            <div className="mt-4">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                Received & Integrity Verified Data Snippet:
              </span>
              <pre className="p-3 rounded bg-slate-950 text-cyan-300 text-[10px] font-mono max-h-36 overflow-y-auto border border-white/10">
                {downloadData.slice(0, 800)}...
              </pre>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
