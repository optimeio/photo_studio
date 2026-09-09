import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://photo-studio-1nvn.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0908] flex flex-col items-center justify-center font-sans p-6 text-softWhite selection:bg-[#C5A059] selection:text-[#12100E] relative overflow-hidden">
      
      {/* Cinematic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Branding */}
        <div className="flex flex-col items-center mb-10 group cursor-default">
          <div className="w-16 h-16 rounded-full bg-[#12100E] border border-white/[0.05] shadow-[0_0_30px_rgba(197,160,89,0.1)] flex items-center justify-center mb-6 transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(197,160,89,0.2)] group-hover:border-[#C5A059]/30">
            <Camera className="w-6 h-6 text-[#C5A059] transition-transform duration-700 group-hover:scale-110" />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-[0.2em] uppercase text-[#FFFDF8] mb-2 drop-shadow-md">Lumina Studio</h1>
          <div className="flex items-center gap-4 w-full justify-center opacity-70">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#C5A059]"></div>
            <span className="text-[9px] tracking-[0.4em] font-sans font-bold text-[#C5A059]">SECURE PORTAL</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#C5A059]"></div>
          </div>
        </div>

        {/* Glassmorphic Login Box */}
        <div className="w-full backdrop-blur-xl bg-[#12100E]/40 p-10 rounded-2xl border border-white/[0.05] shadow-2xl relative overflow-hidden group">
          {/* Subtle top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent"></div>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059] flex items-center gap-2">
                <User className="w-3.5 h-3.5" /> Admin Username
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  className="w-full bg-transparent border-b border-white/[0.1] py-3 text-[#FFFDF8] text-lg focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#FFFDF8]/20 tracking-widest peer"
                  placeholder="admin"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C5A059] transition-all duration-500 peer-focus:w-full"></div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059] flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> Authentication Key
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/[0.1] py-3 text-[#FFFDF8] text-lg focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#FFFDF8]/20 tracking-widest peer"
                  placeholder="••••••••"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C5A059] transition-all duration-500 peer-focus:w-full"></div>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs text-center p-3 bg-red-400/10 rounded-md border border-red-400/20 backdrop-blur-sm animate-pulse">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`relative w-full overflow-hidden group/btn bg-[#FFFDF8] text-[#12100E] font-bold uppercase tracking-[0.2em] py-4 rounded-md transition-all duration-300 mt-4 text-[11px] shadow-[0_4px_20px_rgba(197,160,89,0.15)] hover:shadow-[0_4px_25px_rgba(197,160,89,0.3)] hover:-translate-y-0.5 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? 'Authenticating...' : 'Enter Dashboard'}
              </span>
              <div className="absolute inset-0 bg-[#C5A059] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover/btn:scale-x-100"></div>
            </button>
          </form>
        </div>

        {/* Admin Credentials Hint */}
        <div className="mt-6 flex justify-center">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg px-6 py-3 backdrop-blur-sm shadow-lg text-center">
            <p className="text-[10px] text-[#C5A059] uppercase tracking-[0.2em] font-bold mb-1">Demo Credentials</p>
            <p className="text-xs text-[#FFFDF8]/70">Username: <span className="text-[#FFFDF8] font-bold tracking-wider">admin</span></p>
            <p className="text-xs text-[#FFFDF8]/70">Password: <span className="text-[#FFFDF8] font-bold tracking-wider">demo2026</span></p>
          </div>
        </div>

        {/* Back to Site */}
        <div className="flex justify-center mt-10">
          <button 
            onClick={() => navigate('/')}
            className="text-[10px] uppercase tracking-[0.2em] text-[#FFFDF8]/40 hover:text-[#C5A059] transition-colors flex items-center gap-2 group"
          >
            <span className="transform transition-transform duration-300 group-hover:-translate-x-1">&larr;</span> Return to Public Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
