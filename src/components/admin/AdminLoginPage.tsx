import React, { useState } from 'react';
import { loginUser, loginAsPreset, DEMO_USERS } from '../../services/authService';
import type { User } from '../../services/authService';
import { Cpu, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: User) => void;
  onReturnToSite: () => void;
  darkMode: boolean;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onReturnToSite, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = loginUser(email, password);
    if (res.success && res.user) {
      onLoginSuccess(res.user);
    } else {
      setError(res.error || 'Error al iniciar sesión');
    }
  };

  const handlePresetSelect = (userId: string) => {
    const user = loginAsPreset(userId);
    onLoginSuccess(user);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 transition-colors ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-brand p-[1.5px] shadow-xl shadow-orange-500/20 mb-2">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
              <Cpu className="w-7 h-7 text-orange-500" />
            </div>
          </div>

          <h2 className="text-2xl font-black tracking-tight">Plataforma de Gestión iAtomica 2.0</h2>
          <p className="text-xs text-slate-500 font-medium">Acceso seguro para el equipo de trabajo</p>
        </div>

        {/* Main Login Form */}
        <div className={`p-8 rounded-3xl border shadow-2xl ${
          darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
        }`}>
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold block mb-1 text-slate-700 dark:text-slate-300">Correo Electrónico</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@iatomica.com"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900 font-medium'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1 text-slate-700 dark:text-slate-300">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900 font-medium'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all flex items-center justify-center space-x-2"
            >
              <span>Ingresar al Sistema</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Quick Demo Credentials Presets */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3 text-center">
              Ingreso Rápido por Rol (Demostración)
            </span>

            <div className="space-y-2">
              {DEMO_USERS.map(u => (
                <button
                  key={u.id}
                  onClick={() => handlePresetSelect(u.id)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                    darkMode ? 'bg-slate-950 border-slate-800 hover:border-purple-500/40' : 'bg-slate-50 border-slate-200 hover:border-orange-400/50'
                  }`}
                >
                  <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold truncate">{u.name}</h5>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold block">
                      Rol: {u.role}
                    </span>
                  </div>
                  <ArrowRight size={12} className="text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Back to public site */}
        <button
          onClick={onReturnToSite}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center space-x-1.5 mx-auto transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Volver al Sitio Web Público</span>
        </button>

      </div>
    </div>
  );
};
