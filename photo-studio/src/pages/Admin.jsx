import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, LayoutDashboard, Calendar, Settings, Trash2, Mail, Phone, Clock, CheckCircle, LogOut } from 'lucide-react';
import AdminCalendar from '../components/AdminCalendar';

const Admin = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://photo-studio-1nvn.onrender.com/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://photo-studio-1nvn.onrender.com/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to delete booking');
      
      // Update state without refetching
      setBookings(bookings.filter(b => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const confirmBooking = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://photo-studio-1nvn.onrender.com/api/bookings/${id}/confirm`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to confirm booking');
      const data = await response.json();
      // Update status locally without refetching
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'confirmed' } : b));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0908] flex font-sans text-softWhite selection:bg-[#C5A059] selection:text-[#12100E] relative overflow-hidden">
      
      {/* Background Cinematic Glows */}
      <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#C5A059]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Floating Glass Sidebar */}
      <aside className="w-64 backdrop-blur-2xl bg-white/[0.02] border-r border-white/[0.05] hidden md:flex flex-col flex-shrink-0 relative z-10 m-4 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-8 flex items-center gap-4 border-b border-white/[0.05]">
          <div className="w-10 h-10 rounded-full bg-[#12100E] border border-white/[0.05] shadow-[0_0_15px_rgba(197,160,89,0.15)] flex items-center justify-center">
            <Camera className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div>
            <h1 className="font-serif font-bold tracking-[0.2em] text-sm uppercase text-[#FFFDF8]">Lumina Studio</h1>
            <span className="block text-[8px] tracking-[0.3em] font-sans font-normal text-[#C5A059]">ADMIN</span>
          </div>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-3">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-[#C5A059]/20 to-transparent text-[#C5A059] border-l-2 border-[#C5A059] shadow-[inset_20px_0_40px_-20px_rgba(197,160,89,0.2)]' 
                : 'text-[#FFFDF8]/50 hover:text-[#FFFDF8] hover:bg-white/5 border-l-2 border-transparent'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'calendar' 
                ? 'bg-gradient-to-r from-[#C5A059]/20 to-transparent text-[#C5A059] border-l-2 border-[#C5A059] shadow-[inset_20px_0_40px_-20px_rgba(197,160,89,0.2)]' 
                : 'text-[#FFFDF8]/50 hover:text-[#FFFDF8] hover:bg-white/5 border-l-2 border-transparent'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Calendar
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'settings' 
                ? 'bg-gradient-to-r from-[#C5A059]/20 to-transparent text-[#C5A059] border-l-2 border-[#C5A059] shadow-[inset_20px_0_40px_-20px_rgba(197,160,89,0.2)]' 
                : 'text-[#FFFDF8]/50 hover:text-[#FFFDF8] hover:bg-white/5 border-l-2 border-transparent'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </nav>
        
        {/* Logout Button */}
        <div className="p-6 border-t border-white/[0.05]">
          <button 
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/');
            }}
            className="flex items-center gap-3 px-5 py-3.5 w-full rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-400/10 font-medium text-xs tracking-wider uppercase transition-all duration-300 group"
          >
            <LogOut className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 p-4 pl-0">
        <div className="flex-1 flex flex-col bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Header */}
          <header className="h-24 border-b border-white/[0.05] bg-white/[0.01] flex items-center justify-between px-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#FFFDF8] flex items-center gap-3 capitalize">
                {activeTab}
                <div className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.8)] animate-pulse"></div>
              </h2>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-[#FFFDF8]">Admin User</p>
                <p className="text-[9px] text-[#C5A059] uppercase tracking-[0.2em] font-bold">Superadmin</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8C6D34] p-[2px] shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                <div className="w-full h-full rounded-full bg-[#12100E] flex items-center justify-center text-[#FFFDF8] font-serif text-lg font-bold">
                  A
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
            
            {activeTab === 'dashboard' && (
              <>
            
            {/* Elegant Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl">
              <div className="relative group bg-white/[0.02] backdrop-blur-md p-8 rounded-2xl border border-white/[0.05] transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mb-6 text-[#C5A059] group-hover:scale-110 transition-transform duration-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-[10px] text-[#FFFDF8]/50 font-bold uppercase tracking-[0.2em] mb-2">Total Inquiries</h3>
                <p className="font-serif text-5xl font-bold text-[#FFFDF8]">{bookings.length}</p>
              </div>

              <div className="relative group bg-white/[0.02] backdrop-blur-md p-8 rounded-2xl border border-white/[0.05] transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mb-6 text-[#C5A059] group-hover:scale-110 transition-transform duration-500">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <h3 className="text-[10px] text-[#FFFDF8]/50 font-bold uppercase tracking-[0.2em] mb-2">New Requests (7 Days)</h3>
                <p className="font-serif text-5xl font-bold text-[#FFFDF8]">
                  {bookings.filter(b => new Date(b.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </p>
              </div>
            </div>

            {/* Premium Table Area */}
            <div className="bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/[0.05] overflow-hidden shadow-2xl relative">
              <div className="p-8 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
                <h3 className="font-serif text-2xl font-bold text-[#FFFDF8]">Booking Inquiries</h3>
                <button 
                  onClick={fetchBookings}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059] hover:text-[#FFFDF8] transition-colors bg-white/[0.05] hover:bg-white/[0.1] px-4 py-2 rounded-full"
                >
                  <span className="text-sm">↻</span> Refresh
                </button>
              </div>
              
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-20 text-center text-[#FFFDF8]/40 animate-pulse font-medium tracking-widest uppercase text-xs">Loading data...</div>
                ) : error ? (
                  <div className="p-20 text-center text-red-400/80 bg-red-400/5 font-medium tracking-widest uppercase text-xs">Error: {error}</div>
                ) : bookings.length === 0 ? (
                  <div className="p-20 text-center text-[#FFFDF8]/40 font-medium tracking-widest uppercase text-xs">No pending requests.</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/[0.02] text-[9px] uppercase tracking-[0.2em] font-bold text-[#FFFDF8]/40 border-b border-white/[0.05]">
                        <th className="px-8 py-5">Client Profile</th>
                        <th className="px-8 py-5">Contact Info</th>
                        <th className="px-8 py-5">Session</th>
                        <th className="px-8 py-5">Date</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                      {bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] font-serif font-bold text-lg shadow-[0_0_10px_rgba(197,160,89,0.1)] group-hover:scale-110 transition-transform duration-300">
                                {booking.firstName[0]}
                              </div>
                              <div>
                                <p className="font-medium text-[13px] text-[#FFFDF8]">{booking.firstName} {booking.lastName}</p>
                                <p className="text-[10px] text-[#FFFDF8]/40 flex items-center gap-1.5 mt-1 tracking-wider">
                                  <Clock className="w-3 h-3 text-[#C5A059]/50" /> {new Date(booking.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 space-y-2">
                            <p className="text-[11px] text-[#FFFDF8]/60 flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-[#C5A059]" /> {booking.email}
                            </p>
                            <p className="text-[11px] text-[#FFFDF8]/60 flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-[#C5A059]" /> {booking.phone}
                            </p>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3.5 py-1.5 bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] text-[9px] uppercase tracking-[0.2em] rounded-full font-bold shadow-sm">
                              {booking.sessionType}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-[13px] font-medium text-[#FFFDF8]/80">{new Date(booking.date).toLocaleDateString()}</p>
                          </td>
                          <td className="px-8 py-6">
                            {booking.status === 'confirmed' ? (
                              <span className="px-3.5 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] uppercase tracking-[0.2em] rounded-full font-bold flex items-center gap-2 w-fit">
                                <CheckCircle className="w-3 h-3" /> Confirmed
                              </span>
                            ) : (
                              <span className="px-3.5 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[9px] uppercase tracking-[0.2em] rounded-full font-bold w-fit block relative">
                                <span className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-yellow-400 animate-ping opacity-75"></span>
                                <span className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-yellow-400"></span>
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                              {booking.status !== 'confirmed' && (
                                <button
                                  onClick={() => confirmBooking(booking._id)}
                                  className="w-8 h-8 rounded-full flex items-center justify-center bg-green-400/10 text-green-400 hover:bg-green-400 hover:text-[#12100E] hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] transition-all duration-300"
                                  title="Confirm Booking"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                              <button 
                                onClick={() => deleteBooking(booking._id)}
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-red-400/10 text-red-400 hover:bg-red-400 hover:text-[#12100E] hover:shadow-[0_0_15px_rgba(248,113,113,0.4)] transition-all duration-300"
                                title="Delete Booking"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            
            </>
            )}

            {activeTab === 'calendar' && (
              <div className="h-full">
                <AdminCalendar bookings={bookings} />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="h-full flex flex-col items-center justify-center text-[#FFFDF8]/40">
                <Settings className="w-16 h-16 mb-4 opacity-50" />
                <h3 className="font-serif text-2xl font-bold text-[#FFFDF8]/60 mb-2">Settings Module</h3>
                <p className="text-sm">This section is currently under development.</p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
