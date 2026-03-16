import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Share2 } from 'lucide-react';
import api from '../../api/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const InfoPage = ({ slugProp }) => {
    const { slug: urlSlug } = useParams();
    const slug = slugProp || urlSlug;
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await api.get(`/village-info/${slug}`);
                setInfo(res.data);
            } catch (err) {
                console.error('Failed to fetch info', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-16 h-16 border-4 border-gov-saffron border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!info) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-4">माहिती उपलब्ध नाही</h2>
            <Link to="/" className="text-gov-saffron font-bold flex items-center gap-2">
                <ArrowLeft size={20} /> मुख्यपृष्ठावर जा
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] flex items-end">
                <div className="absolute inset-0">
                    <img 
                        src={info.mainImage ? `http://localhost:5005${info.mainImage}` : "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"} 
                        className="w-full h-full object-cover shadow-2xl" 
                        alt={info.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 pb-20">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-gov-saffron font-black text-sm uppercase tracking-widest mb-8 transition-colors group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> मागे जा
                    </Link>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="bg-gov-saffron text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg shadow-gov-saffron/20">गावाची माहिती</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-8 drop-shadow-2xl">{info.title}</h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 -mt-32 relative z-20"
                            >
                                <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-100">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-gov-saffron">
                                        <Calendar size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">अद्ययावत तारीख</p>
                                        <p className="text-slate-900 font-black">{new Date(info.updatedAt).toLocaleDateString('mr-IN')}</p>
                                    </div>
                                </div>

                                <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                                    <span className="w-12 h-1.5 bg-gov-saffron rounded-full"></span>
                                    माहिती आणि वैशिष्ट्ये
                                </h3>
                                
                                <div className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-p:font-bold prose-p:text-slate-600 prose-p:leading-relaxed">
                                    <p className="text-2xl text-slate-900 italic mb-10 border-l-8 border-gov-saffron pl-8 py-4 bg-slate-50 rounded-r-3xl">
                                        "{info.description}"
                                    </p>
                                    <div className="whitespace-pre-line text-lg leading-loose">
                                        {info.content}
                                    </div>
                                </div>

                                {/* Gallery */}
                                {info.images && info.images.length > 0 && (
                                    <div className="mt-20">
                                        <h3 className="text-3xl font-black text-slate-900 mb-10">छायाचित्रे</h3>
                                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                                            <Swiper
                                                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                                                effect="fade"
                                                navigation
                                                pagination={{ clickable: true }}
                                                autoplay={{ delay: 5000 }}
                                                className="aspect-video"
                                            >
                                                {info.images.map((img, idx) => (
                                                    <SwiperSlide key={idx}>
                                                        <img 
                                                            src={`http://localhost:5005${img}`} 
                                                            className="w-full h-full object-cover" 
                                                            alt={`${info.title} ${idx + 1}`} 
                                                        />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl"
                            >
                                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                                    <Share2 size={32} className="text-gov-saffron" />
                                </div>
                                <h4 className="text-2xl font-black mb-6">माहिती शेअर करा</h4>
                                <p className="text-slate-400 font-bold mb-10 leading-relaxed text-sm">ही माहिती आपल्या मित्र-मैत्रिणींना आणि नातेवाईकांना शेअर करा.</p>
                                <button className="w-full bg-gov-saffron hover:bg-white hover:text-slate-900 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-gov-saffron/20 active:scale-95">
                                    लिंक कॉपी करा
                                </button>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl"
                            >
                                <h4 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-6">इतर महत्त्वाच्या दुवे</h4>
                                <div className="space-y-4">
                                    {[
                                        { name: 'शहराविषयी', slug: 'shaharavishayi' },
                                        { name: 'नाट्यगृह आणि कला दालन', slug: 'natyagruh-kala-dalan' },
                                        { name: 'उद्यान', slug: 'udyane' },
                                        { name: 'प्रेक्षणीय ठिकाणे', slug: 'preshaniya-thikane' }
                                    ].filter(item => item.slug !== slug).map((item, idx) => (
                                        <Link 
                                            key={idx}
                                            to={`/${item.slug}`}
                                            className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-gov-saffron hover:text-white transition-all group"
                                        >
                                            <span className="font-black">{item.name}</span>
                                            <ArrowLeft size={18} className="rotate-180 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InfoPage;
