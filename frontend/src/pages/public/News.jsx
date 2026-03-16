import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Calendar, ArrowRight, Newspaper, Landmark, Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await api.get('/news');
                setNews(res.data);
            } catch (err) {
                console.error('Failed to fetch news', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const filteredNews = news.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img 
                        src="https://images.unsplash.com/photo-1504711432869-5d39a33dd39a?q=80&w=2070&auto=format&fit=crop" 
                        className="w-full h-full object-cover"
                        alt="News Background"
                    />
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Newspaper size={64} className="mx-auto text-gov-saffron mb-8" />
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">बातम्या आणि घडामोडी</h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            गावातील ताज्या बातम्या, कार्यक्रम आणि महत्त्वाच्या घडामोडींची अधिकृत माहिती.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Search Bar */}
                <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-slate-100 mb-16 flex items-center gap-4 max-w-4xl mx-auto">
                    <div className="bg-slate-50 p-3 rounded-2xl text-slate-400">
                        <Search size={24} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="बातमी शोधा..." 
                        className="flex-1 bg-transparent border-none outline-none text-lg font-bold text-slate-800 placeholder:text-slate-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredNews.length > 0 ? filteredNews.map((item, idx) => (
                        <motion.div 
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 group flex flex-col"
                        >
                            <div className="h-64 relative overflow-hidden">
                                <img 
                                    src={item.imageUrl ? `http://localhost:5005${item.imageUrl}` : 'https://images.unsplash.com/photo-1504711432869-5d39a33dd39a?q=80&w=2070&auto=format&fit=crop'} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                    alt={item.title} 
                                />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                    <Clock size={12} className="inline mr-1 text-gov-saffron" /> {new Date(item.date).toLocaleDateString('mr-IN')}
                                </div>
                            </div>
                            <div className="p-10 flex-1 flex flex-col">
                                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-gov-saffron transition-colors leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 font-medium leading-relaxed mb-10 line-clamp-3">
                                    {item.content}
                                </p>
                                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                                        <Landmark size={14} className="text-gov-saffron" /> अधिकृत बातमी
                                    </div>
                                    <Link 
                                        to={`/news/${item._id}`} 
                                        className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black shadow-xl hover:bg-gov-saffron transition-all active:scale-95"
                                    >
                                        वाचा <ArrowRight size={18} className="inline ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )) : !loading && (
                        <div className="col-span-full py-40 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-100 text-slate-200">
                            <Newspaper size={80} className="mx-auto mb-6" />
                            <h3 className="text-3xl font-black tracking-tight">कोणतीही बातमी उपलब्ध नाही.</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default News;
