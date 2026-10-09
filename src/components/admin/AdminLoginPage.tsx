import React, { useState } from 'react';
import { loginUser, DEMO_USERS } from '../../services/authService';
import type { User } from '../../services/authService';
import '../../styles/admin-editorial.css';
import { Lock, Mail, ArrowRight, ArrowLeft, Shield } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: User) => void;
  onReturnToSite: () => void;
  darkMode?: boolean;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onReturnToSite }) => {
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
      setError(res.error || 'Credenciales inválidas');
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    const res = loginUser(demoEmail, 'demo123');
    if (res.success && res.user) {
      onLoginSuccess(res.user);
    }
  };

  return (
    <div className="admin-editorial min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      
      {/* Return to Site Header */}
      <div className="w-full max-w-md flex justify-start mb-4">
        <button
          onClick={onReturnToSite}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold transition-all cursor-pointer"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #171715',
            boxShadow: '3px 3px 0 #171715',
            color: '#171715'
          }}
        >
          <ArrowLeft size={14} />
          <span>Volver al Sitio Principal</span>
        </button>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <img
              src="/landing-assets/iatomica-logo-original.png"
              alt="iAtomica Logo"
              width={48}
              height={42}
              style={{ mixBlendMode: 'multiply' }}
            />
            <span
              style={{
                fontFamily: "Impact, 'Arial Narrow', sans-serif",
                fontSize: '28px',
                letterSpacing: '-1px',
                textTransform: 'uppercase'
              }}
            >
              iAtomica
            </span>
          </div>

          <h1
            style={{
              fontFamily: "Impact, 'Arial Narrow', sans-serif",
              fontSize: '32px',
              textTransform: 'uppercase',
              lineHeight: 1.05,
              margin: '8px 0 4px'
            }}
          >
            Plataforma de <span style={{ backgroundColor: '#ffe526', padding: '0 6px' }}>Gestión &amp; CRM</span>
          </h1>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#555'
            }}
          >
            Acceso seguro para el equipo de trabajo · SQLite Live Sync
          </p>
        </div>

        {/* Main Login Form Box */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '3px solid #171715',
            boxShadow: '8px 8px 0px #171715',
            padding: '30px 26px',
            borderRadius: '2px'
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: '#ffe8e8',
                border: '2px solid #ff4b83',
                color: '#171715',
                padding: '10px 12px',
                fontSize: '12px',
                fontWeight: 800,
                marginBottom: '16px',
                borderRadius: '2px'
              }}
            >
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3 text-[#171715]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@iatomica.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-3 text-[#171715]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 flex items-center justify-center gap-2 cursor-pointer transition-all"
              style={{
                backgroundColor: '#ffe526',
                color: '#171715',
                border: '2px solid #171715',
                boxShadow: '4px 4px 0px #171715',
                fontWeight: 900,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              <span>Ingresar al Sistema</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Quick Demo Team Access */}
        <div
          style={{
            backgroundColor: '#fff',
            border: '2px solid #171715',
            boxShadow: '4px 4px 0 #171715',
            padding: '16px',
            borderRadius: '2px'
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 900,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#171715',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Shield size={13} />
            <span>Acceso Rápido por Perfil</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {DEMO_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleQuickLogin(user.email)}
                className="w-full text-left px-3 py-2 flex items-center justify-between text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: '#f2efe5',
                  border: '1.5px solid #171715',
                  boxShadow: '2px 2px 0 #171715'
                }}
              >
                <div>
                  <span className="block font-black">{user.name}</span>
                  <span className="text-[10px] text-neutral-600 block">
                    {user.email} · {user.role === 'admin' ? 'Global Admin' : user.projectId}
                  </span>
                </div>
                <span
                  style={{
                    backgroundColor: '#171715',
                    color: '#ffe526',
                    padding: '2px 6px',
                    fontSize: '9px',
                    fontWeight: 900
                  }}
                >
                  Entrar ➔
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
