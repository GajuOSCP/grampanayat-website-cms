import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ZoomIn, Calendar, Landmark, Info } from 'lucide-react';
import api, { ASSET_BASE_URL } from '../../api/axios';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await api.get('/gallery');
                setImages(res.data);
            } catch (err) {
                console.error('Failed to fetch gallery images', err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    return (
        <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img 
                        src="https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=2070&auto=format&fit=crop" 
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <ImageIcon size={64} className="mx-auto text-gov-saffron mb-8" />
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">फोटो गॅलरी</h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            गावातील विकासकामे, सांस्कृतिक कार्यक्रम आणि विविध उपक्रमांचे काही निवडक क्षणचित्रे.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-12 relative z-20">
                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {images.length > 0 ? images.map((image, idx) => (
                        <motion.div 
                            key={image._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => setSelectedImage(image)}
                            className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 group cursor-pointer hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="aspect-square relative overflow-hidden">
                                <img 
                                    src={`${ASSET_BASE_URL}${image.imageUrl}`} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    alt={image.caption} 
                                />
                                <div className="absolute inset-0 bg-gov-saffron/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="bg-white/20 p-4 rounded-full mb-4 shadow-xl">
                                        <ZoomIn size={32} className="text-white" />
                                    </div>
                                    <p className="text-white font-black text-lg mb-2 leading-tight">{image.caption || 'फोटो'}</p>
                                    <span className="text-white/80 font-bold text-xs uppercase tracking-[0.2em]">{image.category || 'इव्हेंट'}</span>
                                </div>
                            </div>
                        </motion.div>
                    )) : !loading && (
                        <div className="col-span-full py-32 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
                            <ImageIcon size={64} className="mx-auto text-slate-100 mb-6" />
                            <h3 className="text-3xl font-black text-slate-300">गॅलरीमध्ये फोटो उपलब्ध नाहीत.</h3>
                        </div>
                    )}
                </div>

                {/* Info Card */}
                <div className="mt-24 p-12 md:p-16 bg-white rounded-[4rem] shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                    <div className="bg-slate-900 p-8 rounded-[3rem] text-white">
                        <Info size={48} className="text-gov-saffron mb-6" />
                        <h4 className="text-2xl font-black mb-4">फोटो अपलोड करा</h4>
                        <p className="opacity-60 font-medium text-sm leading-relaxed">जर आपल्याकडे गावातील काही ऐतिहासिक किंवा उपक्रमांचे फोटो असतील तर आपण ते ग्रामपंचायतीला देऊ शकता.</p>
                    </div>
                    <div className="flex-1 space-y-6">
                        <h3 className="text-3xl font-black text-slate-900 leading-tight">गावच्या इतिहासाचे आणि <br/> प्रगतीचे साक्षीदार बना.</h3>
                        <p className="text-lg text-slate-500 font-medium">गॅलरीमधील फोटो वेळोवेळी अपडेट केले जातात. नवीनतम फोटोंसाठी या पेजला भेट देत रहा.</p>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-10 right-10 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition shadow-2xl"><X size={32}/></button>
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-6xl w-full bg-white rounded-[3.5rem] overflow-hidden shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col lg:flex-row h-full">
                                <div className="w-full lg:w-2/3 aspect-video lg:aspect-auto">
                                    <img 
                                        src={`${ASSET_BASE_URL}${selectedImage.imageUrl}`} 
                                        className="w-full h-full object-cover" 
                                        alt={selectedImage.caption} 
                                    />
                                </div>
                                <div className="p-12 lg:w-1/3 flex flex-col bg-white">
                                    <div className="bg-gov-saffron/10 text-gov-saffron px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-6">
                                        {selectedImage.category || 'इव्हेंट'}
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight">{selectedImage.caption || 'ग्रामपंचायत फोटो'}</h3>
                                    <p className="text-slate-500 font-medium leading-[1.8] mb-12 italic border-l-4 border-slate-100 pl-6">
                                        {selectedImage.caption || 'या फोटोबद्दल अधिक माहिती लवकरच अपडेट केली जाईल.'}
                                    </p>
                                    <div className="mt-auto pt-8 border-t border-slate-50 space-y-4">
                                        <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                                            <Calendar size={18} className="text-gov-saffron" /> प्रकाशित: {new Date(selectedImage.createdAt).toLocaleDateString('mr-IN')}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                                            <Landmark size={18} className="text-gov-saffron" /> ग्रामपंचायत सौजन्य
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
