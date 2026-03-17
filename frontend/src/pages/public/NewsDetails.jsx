import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { ASSET_BASE_URL } from '../../api/axios';
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, MessageSquare, Landmark, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const NewsDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [latestNews, setLatestNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [newsRes, allRes] = await Promise.all([
                    api.get(`/news/${id}`),
                    api.get('/news')
                ]);
                setItem(newsRes.data);
                setLatestNews(allRes.data.filter(n => n._id !== id).slice(0, 3));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
            <div className="w-12 h-12 border-4 border-gov-saffron border-t-transparent rounded-full animate-spin"></div>
            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">माहिती लोड होत आहे...</p>
        </div>
    );

    if (!item) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl text-center">
                <Landmark size={64} className="mx-auto text-slate-200 mb-6" />
                <h2 className="text-3xl font-black text-slate-900 mb-4">बातमी सापडली नाही</h2>
                <Link to="/news" className="bg-gov-saffron text-white px-8 py-3 rounded-2xl font-black shadow-lg inline-block">मागे फिरा</Link>
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Header / Banner */}
            <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <img 
                    src={item.imageUrl ? `${ASSET_BASE_URL}${item.imageUrl}` : 'https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=2070&auto=format&fit=crop'} 
                    className="w-full h-full object-cover" 
                    alt={item.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end pb-16">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Link to="/news" className="inline-flex items-center gap-2 text-gov-saffron font-black mb-8 hover:text-white transition group bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-xl">
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" /> मागील बातम्या
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-black text-white max-w-5xl leading-[1.2] drop-shadow-2xl">
                                {item.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-8 mt-10">
                                <div className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                    <Calendar size={18} className="text-gov-saffron" />
                                    {new Date(item.date).toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                    <Clock size={18} className="text-gov-saffron" />
                                    अधिकृत बातमी
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Content */}
                    <div className="lg:col-span-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 relative"
                        >
                            {/* Decorative element */}
                            <div className="absolute top-12 -left-4 w-2 h-20 bg-gov-saffron rounded-full"></div>
                            
                            <div className="text-lg md:text-xl text-slate-700 leading-[2] font-medium whitespace-pre-line text-justify">
                                {item.content}
                            </div>
                            
                            {/* Actions / Share */}
                            <div className="mt-20 pt-10 border-t border-slate-50 flex flex-col md:flex-row gap-8 items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">शेअर करा:</span>
                                    <div className="flex gap-3">
                                        {[Facebook, Twitter, MessageSquare].map((Icon, i) => (
                                            <button key={i} className="h-12 w-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-gov-saffron hover:text-white transition-all shadow-sm">
                                                <Icon size={20} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button className="flex items-center gap-3 text-gov-saffron font-black uppercase tracking-widest text-xs">
                                    <Share2 size={18} /> फाईल डाउनलोड करा
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Latest News Widget */}
                        <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100">
                            <h3 className="text-2xl font-black text-slate-900 mb-10 border-b border-slate-50 pb-6 flex items-center gap-3">
                                <div className="bg-gov-saffron/10 text-gov-saffron p-2 rounded-xl"><Share2 size={24} /></div>
                                ताज्या घडामोडी
                            </h3>
                            <div className="space-y-10">
                                {latestNews.map(news => (
                                    <Link key={news._id} to={`/news/${news._id}`} className="group block">
                                        <div className="flex gap-6 items-center">
                                            <div className="h-24 w-24 shrink-0 rounded-[2rem] overflow-hidden shadow-lg border-4 border-slate-50">
                                                <img 
                                                    src={news.imageUrl ? `${ASSET_BASE_URL}${news.imageUrl}` : 'https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=2070&auto=format&fit=crop'} 
                                                    className="h-full w-full object-cover group-hover:scale-110 transition duration-700" 
                                                    alt="News" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-black text-slate-800 line-clamp-2 leading-snug group-hover:text-gov-saffron transition-colors">
                                                    {news.title}
                                                </h4>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                                                    <Calendar size={12} className="text-gov-saffron" />
                                                    {new Date(news.date).toLocaleDateString('mr-IN')}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <Link to="/notices" className="block w-full text-center mt-12 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-gov-saffron transition-all shadow-xl shadow-slate-100">
                                सर्व सूचना पहा
                            </Link>
                        </div>

                        {/* Government Services Banner */}
                        <div className="bg-gov-saffron p-1 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="bg-[#fb8c00] p-10 rounded-[3.2rem] space-y-8 relative z-10">
                                <h4 className="text-3xl font-black leading-tight">डिजिटल <br/> दाखले मिळवा</h4>
                                <p className="font-bold text-sm opacity-90 leading-relaxed">आता जन्म, मृत्यू, आणि रहिवासी दाखल्यांसाठी ऑनलाईन अर्ज करा आणि रांगा टाळा.</p>
                                <Link to="/services" className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-xl active:scale-95">
                                    अर्ज करा <ArrowLeft size={20} className="rotate-180" />
                                </Link>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute top-[-10%] right-[-10%] opacity-10 group-hover:scale-110 transition duration-700">
                                <Landmark size={200} strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetails;
