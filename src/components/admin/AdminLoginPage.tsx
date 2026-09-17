import React, { useState } from 'react';
import { loginUser, DEMO_USERS } from '../../services/authService';
import type { User } from '../../services/authService';
import { Cpu, Lock, Mail, ArrowRight, ArrowLeft, Users } from 'lucide-react';

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
              className="w-full py-3.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Ingresar al Sistema</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Directory of Authorized Users */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-center space-x-1.5 mb-3 justify-center">
              <Users size={12} className="text-slate-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Acceso Rápido por Perfil (1 Clic)
              </span>
            </div>

            <div className="space-y-2.5">
              {DEMO_USERS.map(u => {
                const isCurrentAdmin = u.role === 'admin';
                const isBariloche = u.projectId === 'bariloche';
                const colorClasses = isCurrentAdmin
                  ? 'bg-orange-500/10 text-orange-600 border-orange-500/30'
                  : isBariloche
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30';

                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      const res = loginUser(u.email, 'pass123');
                      if (res.success && res.user) {
                        onLoginSuccess(res.user);
                      }
                    }}
                    className={`p-3 rounded-2xl border flex items-center space-x-3 transition-all cursor-pointer group ${
                      email === u.email
                        ? 'border-orange-500 bg-orange-500/5 shadow-xs'
                        : darkMode
                        ? 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                        : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Typographic Monogram Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center font-mono font-black text-xs shrink-0 ${colorClasses}`}
                    >
                      {u.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h5 className="text-xs font-bold truncate group-hover:text-orange-500 transition-colors">
                          {u.name}
                        </h5>
                        <span
                          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${colorClasses}`}
                        >
                          {isCurrentAdmin ? 'Super Admin' : u.projectLabel.replace('Proyecto ', '')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                        <span className="truncate">{u.email}</span>
                        <span className="text-[9px] text-slate-400">pass123</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Back to public site */}
        <button
          onClick={onReturnToSite}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center space-x-1.5 mx-auto transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Volver al Sitio Web Público</span>
        </button>

      </div>
    </div>
  );
};
