import React from 'react';
import { Search, User as UserIcon, Wifi, WifiOff, Cpu, LogOut, FileText } from 'lucide-react';
import { User } from 'firebase/auth';
import { ConnectionStatus } from '../core/NetworkManager';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchField: 'all' | 'name' | 'family';
  onSearchFieldChange: (field: 'all' | 'name' | 'family') => void;
  connectionStatus: ConnectionStatus;
  onToggleConnection: () => void;
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenQNA: () => void;
  totalModels: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  searchField,
  onSearchFieldChange,
  connectionStatus,
  onToggleConnection,
  user,
  onOpenAuth,
  onLogout,
  onOpenQNA,
  totalModels,
}) => {
  const isOnline = connectionStatus === 'online';

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                FRZi Model Registry
              </h1>
              <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 font-medium whitespace-nowrap">
                {totalModels} models
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Short-Form Media Desktop Inference Utility
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-1 max-w-lg min-w-[280px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search model name, author or family..."
              className="spectrum-Input w-full pl-10 pr-4 py-2 text-xs font-sans"
            />
          </div>

          <select
            value={searchField}
            onChange={(e) => onSearchFieldChange(e.target.value as any)}
            className="spectrum-Input text-xs py-2 px-3 bg-white text-slate-700 border-slate-200 cursor-pointer shrink-0 font-medium"
          >
            <option value="all">All Fields</option>
            <option value="name">Name Only</option>
            <option value="family">Family Only</option>
          </select>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQNA}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 text-xs font-medium transition-colors border border-slate-200"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Q&A Docs</span>
          </button>

          <button
            onClick={onToggleConnection}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-600" />
                <span>Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-rose-600" />
                <span>Offline</span>
              </>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                <UserIcon className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-xs text-slate-700 font-mono max-w-[120px] truncate font-medium">
                  {user.displayName || user.email || 'Researcher'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="spectrum-Button spectrum-Button--accent text-xs py-2 px-4 shadow-sm"
            >
              <UserIcon className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
