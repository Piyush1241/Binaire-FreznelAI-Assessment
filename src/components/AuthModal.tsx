import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, Mail, Shield, Sparkles } from 'lucide-react';
import { FirebaseAuthService } from '../core/FirebaseAuthService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  authService: FirebaseAuthService;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, authService }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await authService.signUp(email, password);
      } else {
        await authService.signIn(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setLoading(true);
    try {
      await authService.signInGuest();
      onClose();
    } catch (err: any) {
      setError('Guest authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 relative font-sans"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center">
            <Shield className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isSignUp ? 'Create Firebase Account' : 'Firebase Sign-In'}
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Desktop Media Engine Authentication
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-700 font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@binaire.ai"
                className="spectrum-Input w-full pl-9"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="spectrum-Input w-full pl-9"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="spectrum-Button spectrum-Button--accent w-full py-2.5 mt-2 font-mono text-sm font-semibold"
          >
            {loading ? 'Authenticating...' : isSignUp ? 'Sign Up with Firebase' : 'Sign In'}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-[11px] font-mono text-slate-400">OR</span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        <button
          onClick={handleGuestSignIn}
          disabled={loading}
          className="spectrum-Button spectrum-Button--secondary w-full py-2 font-mono text-xs text-slate-700 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Continue as Guest Researcher</span>
        </button>

        <div className="mt-5 text-center text-xs font-mono text-slate-500">
          {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sky-600 hover:underline font-semibold"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
