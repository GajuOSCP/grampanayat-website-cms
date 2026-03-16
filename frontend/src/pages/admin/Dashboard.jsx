import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
    Users, Bell, Construction, Newspaper, 
    ArrowUpRight, TrendingUp, Clock, AlertCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        notices: 0,
        projects: 0,
        news: 0,
        staff: 0
    });
    const [recentNotices, setRecentNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [notices, projects, news, staff] = await Promise.all([
                    api.get('/notices'),
                    api.get('/projects'),
                    api.get('/news'),
                    api.get('/staff')
                ]);

                setStats({
                    notices: notices.data.length,
                    projects: projects.data.length,
                    news: news.data.length,
                    staff: staff.data.length
                });

                setRecentNotices(notices.data.slice(0, 5));
            } catch (err) {
                console.error('Error fetching dashboard stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const cards = [
        { title: 'एकुण नोटीस', value: stats.notices, icon: Bell, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'विकास कामे', value: stats.projects, icon: Construction, color: 'text-orange-600', bg: 'bg-orange-50' },
        { title: 'प्रसिद्ध बातम्या', value: stats.news, icon: Newspaper, color: 'text-primary-600', bg: 'bg-primary-50' },
        { title: 'पंचायत टीम', value: stats.staff, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">डॅशबोर्ड विहंगावलोकन (Overview)</h2>
                <p className="text-slate-500">ग्रामपंचायत प्रशासकीय पॅनेलमध्ये आपले स्वागत आहे.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition group"
                    >
                        <div className="flex justify-between items-start">
                            <div className={`${card.bg} ${card.color} p-3 rounded-xl group-hover:scale-110 transition duration-300`}>
                                <card.icon size={24} />
                            </div>
                            <div className="flex items-center gap-1 text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded">
                                <TrendingUp size={12} /> +12%
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-black text-slate-900">{card.value}</h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{card.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activities */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Clock size={18} className="text-primary-600" /> अलीकडील अधिकृत नोटीस
                        </h3>
                        <button className="text-primary-700 text-xs font-bold hover:underline">सर्व पहा</button>
                    </div>
                    <div className="p-6 space-y-6">
                        {recentNotices.map((notice, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-slate-50 flex items-center justify-center rounded-xl text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition">
                                        <Bell size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-primary-700 transition line-clamp-1">{notice.title}</h4>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{new Date(notice.date).toLocaleDateString('mr-IN')}</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-primary-700 transition" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Alerts */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-2">
                        <AlertCircle size={18} className="text-orange-500" /> क्रियाकलाप मॉनिटर
                    </div>
                    <div className="p-6 text-center">
                        <div className="h-40 w-40 mx-auto rounded-full border-8 border-primary-50 border-t-primary-600 flex flex-col items-center justify-center mb-6">
                            <span className="text-3xl font-black text-slate-900">८४%</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">कार्यक्षमता</span>
                        </div>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">प्रणाली उत्तमरीत्या चालू आहे. सर्व सेवा कार्यरत आहेत.</p>
                        <div className="mt-8 pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">अपटाइम</p>
                                <p className="text-sm font-bold text-slate-800">९९.९%</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">सक्रिय ॲडमिन</p>
                                <p className="text-sm font-bold text-slate-800">०१</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
