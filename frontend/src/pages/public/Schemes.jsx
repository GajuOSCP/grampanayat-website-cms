import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Landmark, GraduationCap, Home as HomeIcon, Droplets, Zap, ShieldCheck, ArrowUpRight, Search, FileText } from 'lucide-react';
import api, { ASSET_BASE_URL } from '../../api/axios';

const Schemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const res = await api.get('/schemes');
                setSchemes(res.data);
            } catch (err) {
                console.error('Failed to fetch schemes', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSchemes();
    }, []);

    const categories = [
        { name: 'All', label: 'सर्व योजना' },
        { name: 'Agriculture', label: 'कृषी योजना' },
        { name: 'Education', label: 'शिक्षण' },
        { name: 'Health', label: 'आरोग्य' },
        { name: 'Social', label: 'सामाजिक' }
    ];

    const filteredSchemes = activeTab === 'All' 
        ? schemes 
        : schemes.filter(s => s.category === activeTab);

    return (
        <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="bg-gov-saffron text-white py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">शासकीय योजना</h1>
                        <p className="text-xl text-amber-50 max-w-2xl mx-auto font-medium leading-relaxed">
                            केंद्र आणि राज्य सरकारच्या विविध लोककल्याणकारी योजनांची माहिती आणि लाभ घेण्यासाठी येथे अर्ज करा.
                        </p>
                    </motion.div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12"></div>
                <div className="absolute top-0 left-0 w-1/3 h-full bg-white/5 -skew-x-12"></div>
            </section>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Filter Tabs */}
                <div className="bg-white p-3 rounded-[2.5rem] shadow-xl border border-slate-100 mb-12 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setActiveTab(cat.name)}
                            className={`px-8 py-4 rounded-[1.8rem] text-sm font-black transition-all ${
                                activeTab === cat.name
                                    ? 'bg-slate-900 text-white shadow-lg'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Schemes Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSchemes.length > 0 ? filteredSchemes.map((scheme, idx) => (
                        <motion.div 
                            key={scheme._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col group hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="h-48 relative">
                                <img 
                                    src={scheme.image ? `${ASSET_BASE_URL}${scheme.image}` : 'https://images.unsplash.com/photo-1541888941255-081d746dbdba?q=80&w=2070&auto=format&fit=crop'} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    alt={scheme.title} 
                                />
                                <div className="absolute top-4 left-4 bg-gov-saffron text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                    {scheme.category === 'Agriculture' ? 'कृषी' : scheme.category === 'Education' ? 'शिक्षण' : scheme.category === 'Health' ? 'आरोग्य' : 'सामाजिक'}
                                </div>
                            </div>
                            <div className="p-10 flex-1 flex flex-col">
                                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-gov-saffron transition-colors">{scheme.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1 line-clamp-3">
                                    {scheme.description}
                                </p>
                                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-tighter">
                                        <ShieldCheck size={16} /> पात्र लाभार्थी
                                    </div>
                                    <button className="bg-slate-100 text-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-gov-saffron hover:text-white transition-all shadow-sm">
                                        <ArrowUpRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )) : !loading && (
                        <div className="col-span-full py-32 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
                            <FileText size={64} className="mx-auto text-slate-100 mb-6" />
                            <h3 className="text-3xl font-black text-slate-300">योजनांची माहिती उपलब्ध नाही.</h3>
                        </div>
                    )}
                </div>

                {/* Info Card */}
                <div className="mt-24 bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">योजनेचा लाभ घेण्यासाठी <br/> काय आवश्यक आहे?</h2>
                        <ul className="space-y-6">
                            {[
                                'पात्रतेचे निकष पूर्ण करणे आवश्यक.',
                                'आधार कार्ड आणि रहिवासी दाखला.',
                                'रेशनींग कार्ड आणि उत्पन्नाचा दाखला.',
                                'बँक खाते आणि मोबाईल नंबर लिंक असणे.'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="bg-gov-saffron/10 text-gov-saffron p-2 rounded-xl mt-1"><CheckCircle2 size={18}/></div>
                                    <p className="text-lg font-bold text-slate-600 leading-relaxed">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-slate-900 p-10 md:p-12 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-4">अधिक मदतीसाठी</h3>
                            <p className="text-slate-400 font-medium leading-loose mb-10">आपल्या नजीकच्या 'आपले सरकार सेवा केंद्र' किंवा ग्रामपंचायत कार्यालयाशी संपर्क साधा.</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 group-hover:bg-gov-saffron transition-colors">
                                    <Landmark size={24} className="text-gov-saffron group-hover:text-white" />
                                    <span className="font-black">ग्रामपंचायत कार्यालय</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gov-saffron/20 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckCircle2 = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default Schemes;
