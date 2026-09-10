import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { ConnectionStatus } from '../core/NetworkManager';

interface NetworkBannerProps {
  status: ConnectionStatus;
  dataSource: 'api' | 'cache' | 'mock';
  onToggle: () => void;
  onRefresh: () => void;
}

export const NetworkBanner: React.FC<NetworkBannerProps> = ({
  status,
  dataSource,
  onToggle,
  onRefresh
}) => {
  const isOnline = status === 'online';

  return (
    <div
      className={`w-full px-6 py-2 border-b text-xs flex flex-wrap items-center justify-between gap-3 transition-colors ${
        isOnline
          ? 'bg-sky-50/70 border-sky-100 text-sky-900'
          : 'bg-rose-50/70 border-rose-100 text-rose-900'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {isOnline ? (
          <Wifi className="w-4 h-4 text-sky-600 shrink-0" />
        ) : (
          <WifiOff className="w-4 h-4 text-rose-600 shrink-0" />
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold">
            Status: {isOnline ? 'Online (HF API)' : 'Offline (Local Cache)'}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600">
            Source: <strong className="uppercase font-mono text-[11px] text-slate-800">{dataSource}</strong>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium px-2.5 py-1 rounded bg-white/80 hover:bg-white border border-slate-200 shadow-2xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Re-Sync API</span>
        </button>
        <button
          onClick={onToggle}
          className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2.5 py-1 rounded bg-white/80 hover:bg-white border border-slate-200 shadow-2xs transition-colors"
        >
          {isOnline ? 'Simulate Offline' : 'Switch Online'}
        </button>
      </div>
    </div>
  );
};
