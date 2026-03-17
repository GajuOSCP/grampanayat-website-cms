import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowLeft, Landmark, History, Info, Navigation } from 'lucide-react';
import api, { ASSET_BASE_URL } from '../../api/axios';

const TouristPlaceDetail = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const res = await api.get(`/tourist-places/${id}`);
                setPlace(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlace();
    }, [id]);

    if (loading) return <div className="pt-32 text-center">लोड होत आहे...</div>;
    if (!place) return <div className="pt-32 text-center text-red-500 font-bold">माहिती सापडली नाही.</div>;

    return (
        <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <img 
                    src={`${ASSET_BASE_URL}${place.images[activeImage]}`} 
                    className="w-full h-full object-cover" 
                    alt={place.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-12 lg:p-24">
                    <div className="container mx-auto">
                        <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 font-bold transition">
                            <ArrowLeft size={20} /> मागे जा
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="bg-gov-saffron/20 text-gov-saffron px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest w-fit mb-6 backdrop-blur-md border border-gov-saffron/30">
                                पर्यटन स्थळ
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">{place.name}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/80 font-bold">
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} className="text-gov-saffron" /> {place.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={20} className="text-gov-saffron" /> प्रकाशित: {new Date(place.createdAt).toLocaleDateString('mr-IN')}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-24 -mt-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-100"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-primary-50 p-3 rounded-2xl">
                                    <History size={32} className="text-primary-600" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">इतिहास आणि माहिती</h2>
                            </div>
                            <div className="prose prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-6">
                                {place.history ? place.history.split('\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                )) : <p>{place.description}</p>}
                            </div>
                        </motion.div>

                        {/* Image Gallery */}
                        {place.images.length > 1 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-slate-900 ml-6">फोटो गॅलरी</h3>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {place.images.map((img, idx) => (
                                        <motion.div 
                                            key={idx}
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => setActiveImage(idx)}
                                            className={`aspect-square rounded-3xl overflow-hidden cursor-pointer border-4 transition-all duration-300 ${activeImage === idx ? 'border-gov-saffron shadow-lg' : 'border-white overflow-hidden shadow-sm'}`}
                                        >
                                            <img src={`${ASSET_BASE_URL}${img}`} className="w-full h-full object-cover" alt={`${place.name} ${idx + 1}`} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Landmark size={120} />
                            </div>
                            <div className="relative z-10">
                                <Navigation size={40} className="text-gov-saffron mb-6" />
                                <h3 className="text-2xl font-black mb-4">कसे पोहोचायचे?</h3>
                                <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                                    हे ठिकाण {place.location} येथे आहे. गावाच्या मुख्य चौकापासून येथे जाण्यासाठी वाहने उपलब्ध आहेत.
                                </p>
                                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gov-saffron hover:text-white transition group">
                                    <MapPin size={20} className="group-hover:animate-bounce" /> लोकेशन पहा
                                </button>
                            </div>
                        </div>

                        <div className="bg-gov-saffron p-10 rounded-[3rem] shadow-2xl shadow-gov-saffron/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-20">
                                <Info size={120} className="text-black" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black text-white mb-4">महत्वाची सूचना</h3>
                                <p className="text-white/90 font-bold leading-relaxed">
                                    कृपया परिसरात स्वच्छता राखा आणि ऐतिहासिक वास्तूंचे जतन करण्यास मदत करा.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TouristPlaceDetail;
