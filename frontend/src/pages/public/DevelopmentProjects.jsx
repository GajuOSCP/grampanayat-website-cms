import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Landmark, Calendar, Building2, CheckCircle2, Clock, ArrowRight, Zap, Droplets, Layout } from 'lucide-react';
import api, { ASSET_BASE_URL } from '../../api/axios';

const DevelopmentProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data);
            } catch (err) {
                console.error('Failed to fetch projects', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filterTabs = [
        { id: 'All', label: 'सर्व प्रकल्प', icon: <Layout size={18}/> },
        { id: 'Ongoing', label: 'प्रगतीपथावर', icon: <Clock size={18}/> },
        { id: 'Completed', label: 'पूर्ण झालेले', icon: <CheckCircle2 size={18}/> },
        { id: 'Upcoming', label: 'प्रस्तावित', icon: <Calendar size={18}/> }
    ];

    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(p => p.status === filter);

    return (
        <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="bg-emerald-600 text-white py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Building2 size={64} className="mx-auto text-emerald-300 mb-8" />
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">विकास कामे</h1>
                        <p className="text-xl text-emerald-50 max-w-2xl mx-auto font-medium leading-relaxed">
                            आपल्या गावाला सुजलाम सुफलाम करण्यासाठी सुरू असलेले विविध विकास प्रकल्प.
                        </p>
                    </motion.div>
                </div>
                {/* Decorative background circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.05] rounded-full blur-[100px]"></div>
            </section>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Status Tabs */}
                <div className="bg-white p-3 rounded-[3rem] shadow-xl border border-slate-100 mb-16 flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={`px-8 py-5 rounded-[2rem] text-sm font-black flex items-center gap-2 transition-all ${
                                filter === tab.id
                                    ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Projects List with Side Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-10">
                        {filteredProjects.length > 0 ? filteredProjects.map((project, idx) => (
                            <motion.div 
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[3.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row group"
                            >
                                <div className="w-full md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden">
                                    <img 
                                        src={project.image ? `${ASSET_BASE_URL}${project.image}` : 'https://images.unsplash.com/photo-1541888941255-081d746dbdba?q=80&w=2070&auto=format&fit=crop'} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                        alt={project.title} 
                                    />
                                    <div className={`absolute top-6 left-6 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl backdrop-blur-md ${
                                        project.status === 'Completed' ? 'bg-emerald-500/90 text-white' : 
                                        project.status === 'Ongoing' ? 'bg-amber-500/90 text-white' : 'bg-blue-500/90 text-white'
                                    }`}>
                                        {project.status === 'Completed' ? 'पूर्ण' : project.status === 'Ongoing' ? 'सुरू आहे' : 'प्रस्तावित'}
                                    </div>
                                </div>
                                <div className="p-10 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{project.title}</h3>
                                    <p className="text-slate-500 font-medium leading-[1.8] mb-8 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="mt-auto grid grid-cols-2 gap-4 pt-8 border-t border-slate-50">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">बजेट</p>
                                            <h5 className="text-lg font-black text-slate-900">₹{project.budget || '---'}</h5>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">पूर्तता वर्ष</p>
                                            <h5 className="text-lg font-black text-slate-900">{project.completionYear || '२०२४'}</h5>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )) : !loading && (
                            <div className="p-32 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-100 text-slate-200">
                                <Building2 size={80} className="mx-auto mb-6" />
                                <h3 className="text-3xl font-black tracking-tight">या श्रेणीत माहिती उपलब्ध नाही.</h3>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                            <h4 className="text-xl font-black mb-8 relative z-10 tracking-tight">प्रकल्पांचा गोषवारा</h4>
                            <div className="space-y-6 relative z-10">
                                {[
                                    { label: 'एकूण विकास प्रकल्प', count: projects.length, color: 'text-blue-400', icon: <Layout size={20}/> },
                                    { label: 'पूर्ण झालेली कामे', count: projects.filter(p => p.status === 'Completed').length, color: 'text-emerald-400', icon: <CheckCircle2 size={20}/> },
                                    { label: 'सुरू असलेली कामे', count: projects.filter(p => p.status === 'Ongoing').length, color: 'text-amber-400', icon: <Clock size={20}/> }
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3 font-bold text-sm">
                                            <div className={`${stat.color}`}>{stat.icon}</div>
                                            {stat.label}
                                        </div>
                                        <div className="text-2xl font-black">{stat.count}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        </div>

                        {/* Village Needs */}
                        <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100">
                            <h4 className="text-xl font-black text-slate-900 mb-8 tracking-tight">प्राधान्य क्षेत्रे</h4>
                            <div className="space-y-6">
                                {[
                                    { name: 'जलसंधारण', percent: 85, icon: <Droplets size={20} className="text-cyan-500" /> },
                                    { name: 'विद्युतीकरण', percent: 100, icon: <Zap size={20} className="text-amber-500" /> },
                                    { name: 'रस्ते बांधणी', percent: 70, icon: <Building2 size={20} className="text-slate-500" /> }
                                ].map((need, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-center font-black text-xs uppercase tracking-widest text-slate-400">
                                            <span className="flex items-center gap-2">{need.icon} {need.name}</span>
                                            <span className="text-slate-900">{need.percent}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${need.percent}%` }}
                                                viewport={{ once: true }}
                                                className="h-full bg-emerald-500 rounded-full"
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevelopmentProjects;
