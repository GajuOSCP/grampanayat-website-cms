import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, FileText, Download, Search, AlertCircle, Info, Landmark } from 'lucide-react';
import api, { ASSET_BASE_URL } from '../../api/axios';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await api.get('/notices');
                setNotices(res.data);
            } catch (err) {
                console.error('Failed to fetch notices', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    const filteredNotices = notices.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="bg-red-600 text-white py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Bell size={64} className="mx-auto text-white/50 mb-8 animate-bounce delay-1000" />
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">सूचना फलक</h1>
                        <p className="text-xl text-red-100 max-w-2xl mx-auto font-medium leading-relaxed">
                            ग्रामपंचायतीच्या अधिकृत घोषणा, निविदा, आणि महत्वाच्या सूचनांची माहिती येथे मिळेल.
                        </p>
                    </motion.div>
                </div>
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            </section>

            <div className="container mx-auto px-4 -mt-12 relative z-20">
                {/* Search & Filter */}
                <div className="bg-white p-6 md:p-8 rounded-[3rem] shadow-xl border border-slate-100 mb-12 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                        <input 
                            type="text" 
                            placeholder="विषयानुसार सूचना शोधा..." 
                            className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-red-500 transition-all outline-none font-bold text-slate-800"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Notices List */}
                <div className="space-y-6 max-w-6xl mx-auto">
                    {filteredNotices.length > 0 ? filteredNotices.map((notice, idx) => (
                        <motion.div 
                            key={notice._id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
                                <div className="bg-slate-50 p-6 rounded-[2rem] flex flex-col items-center justify-center min-w-[120px] group-hover:bg-red-50 transition-colors">
                                    <span className="text-red-500 font-black text-3xl mb-1">{new Date(notice.date || notice.createdAt).getDate()}</span>
                                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                                        {new Date(notice.date || notice.createdAt).toLocaleString('default', { month: 'short' })}
                                    </span>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors">{notice.title}</h3>
                                        {notice.isScrolling && (
                                            <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">अति महत्वाचे</span>
                                        )}
                                    </div>
                                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                        {notice.description}
                                    </p>
                                    <div className="pt-6 border-t border-slate-50 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-red-500" /> प्रकाशित: {new Date(notice.date || notice.createdAt).toLocaleDateString('mr-IN')}</span>
                                            <span className="text-slate-200">|</span>
                                            <span className="flex items-center gap-1.5 text-nowrap"><Landmark size={14} className="text-red-500" /> ग्रामपंचायत विभाग</span>
                                        </div>
                                        {notice.pdfUrl && (
                                            <a 
                                                href={`${ASSET_BASE_URL}${notice.pdfUrl}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-red-600 transition-all shadow-xl active:scale-95"
                                            >
                                                <Download size={18} /> फाईल डाउनलोड करा
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )) : !loading && (
                        <div className="p-32 text-center bg-white rounded-[4rem] shadow-xl border-4 border-dashed border-slate-50">
                            <Info size={80} className="mx-auto text-slate-100 mb-8" />
                            <h3 className="text-3xl font-black text-slate-300">सध्या कोणतीही सूचना उपलब्ध नाही.</h3>
                        </div>
                    )}
                </div>

                {/* Footer Note */}
                <div className="mt-24 bg-slate-100 p-12 rounded-[3.5rem] border border-slate-200 flex items-start gap-8 max-w-4xl mx-auto">
                    <div className="bg-white p-4 rounded-3xl text-red-600 shadow-md">
                        <AlertCircle size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">सूचना:</h4>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">ही माहिती ग्रामपंचायतीच्या अधिकृत रेकॉर्डनुसार आहे. मुळ कागदपत्रांसाठी किंवा अधिक माहितीसाठी कृपया ग्रामपंचायत कार्यालयात प्रत्यक्ष संपर्क साधावा.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeBoard;
