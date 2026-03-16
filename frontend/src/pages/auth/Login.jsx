import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Landmark, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            toast.success('Welcome to Admin Panel');
            navigate('/admin');
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Branding */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center h-20 w-20 bg-primary-700 text-white rounded-3xl shadow-xl shadow-primary-700/20 mb-6 rotate-3">
                        <Landmark size={40} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
                    <p className="text-slate-500 font-medium mt-2">Gram Panchayat Digital Portal</p>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100">
                                <AlertCircle size={18} /> {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Enter your username"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none font-medium"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                <input 
                                    type="password" 
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none font-medium"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all duration-300 shadow-lg active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Sign In to Dashboard'} <ArrowRight size={20} />
                        </button>
                    </form>

                    {/* Decorative Background */}
                    <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-primary-50 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-slate-400 text-sm font-medium">
                        Authorized personnel only. <br/> 
                        <span className="text-slate-300">© 2026 Gram Panchayat Information Systems</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
