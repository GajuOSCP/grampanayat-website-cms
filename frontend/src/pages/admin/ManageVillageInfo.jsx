import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, Upload, Info, Image as ImageIcon, CheckCircle } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const ManageVillageInfo = () => {
    const [infos, setInfos] = useState([]);
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        images: []
    });
    const [loading, setLoading] = useState(false);

    const sections = [
        { title: 'शहराविषयी', slug: 'shaharavishayi' },
        { title: 'नाट्यगृह आणि कला दालन', slug: 'natyagruh-kala-dalan' },
        { title: 'उद्यान', slug: 'udyane' },
        { title: 'प्रेक्षणीय ठिकाणे', slug: 'preshaniya-thikane' }
    ];

    useEffect(() => {
        fetchInfos();
    }, []);

    const fetchInfos = async () => {
        try {
            const res = await api.get('/village-info');
            setInfos(res.data);
            if (res.data.length > 0) {
                handleSelect(sections[0]); // Select first one by default
            }
        } catch (err) {
            console.error('Failed to fetch infos', err);
        }
    };

    const handleSelect = (section) => {
        const existing = infos.find(i => i.slug === section.slug);
        setSelectedInfo(section);
        if (existing) {
            setFormData({
                title: existing.title,
                description: existing.description,
                content: existing.content,
                images: [] // Reset selected images
            });
        } else {
            setFormData({
                title: section.title,
                description: '',
                content: '',
                images: []
            });
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('slug', selectedInfo.slug);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('content', formData.content);
        
        formData.images.forEach(img => {
            data.append('images', img);
        });

        try {
            await api.put('/village-info', data);
            toast.success('माहिती यशस्वीरित्या जतन केली!');
            fetchInfos();
        } catch (err) {
            toast.error('माहिती जतन करण्यात अडचण आली');
        } finally {
            setLoading(false);
        }
    };

    const currentInfo = infos.find(i => i.slug === selectedInfo?.slug);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                        <div className="bg-gov-saffron p-3 rounded-2xl text-white shadow-lg shadow-gov-saffron/30">
                            <Info size={32} />
                        </div>
                        ग्राम माहिती व्यवस्थापन
                    </h2>
                    <p className="text-slate-500 font-bold mt-2 ml-16 italic">मुख्यपृष्ठावरील माहिती कार्ड व्यवस्थापित करा</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Menu */}
                <div className="lg:col-span-1 space-y-3">
                    {sections.map((section) => (
                        <button
                            key={section.slug}
                            onClick={() => handleSelect(section)}
                            className={`w-full text-left p-6 rounded-[2rem] font-black transition-all border-2 flex items-center justify-between ${
                                selectedInfo?.slug === section.slug
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                                    : 'bg-white text-slate-600 border-slate-100 hover:border-gov-saffron hover:text-gov-saffron shadow-sm'
                            }`}
                        >
                            {section.title}
                            {infos.some(i => i.slug === section.slug) && (
                                <CheckCircle size={18} className={selectedInfo?.slug === section.slug ? 'text-gov-saffron' : 'text-emerald-500'} />
                            )}
                        </button>
                    ))}
                </div>

                {/* Editor Area */}
                <div className="lg:col-span-3">
                    {selectedInfo ? (
                        <motion.div
                            key={selectedInfo.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100"
                        >
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">शीर्षक (Title)</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 font-black text-slate-900 focus:border-gov-saffron focus:bg-white transition-all outline-none"
                                            placeholder="शीर्षक प्रविष्ट करा..."
                                            required
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">थोडक्यात वर्णन (Description)</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows="2"
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 font-bold text-slate-700 focus:border-gov-saffron focus:bg-white transition-all outline-none resize-none"
                                            placeholder="होमपेजवर दिसणारी छोटी माहिती..."
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">सविस्तर माहिती (Detailed Content)</label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            rows="8"
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-8 font-bold text-slate-700 focus:border-gov-saffron focus:bg-white transition-all outline-none leading-relaxed"
                                            placeholder="येथे सविस्तर माहिती लिहा..."
                                        />
                                    </div>

                                    <div className="space-y-6">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1 flex justify-between items-center">
                                            छायाचित्रे (Gallery Images)
                                            <span className="text-[10px] text-gov-saffron">Recommended: 1200x800px</span>
                                        </label>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {currentInfo?.images?.map((img, idx) => (
                                                <div key={idx} className="aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 shadow-inner group relative">
                                                    <img src={`http://localhost:5005${img}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Gallery" />
                                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <ImageIcon className="text-white" size={24} />
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            <label className="aspect-square rounded-2xl border-4 border-dashed border-slate-100 flex flex-col items-center justify-center cursor-pointer hover:border-gov-saffron hover:bg-slate-50 transition-all group">
                                                <Upload className="text-slate-300 group-hover:text-gov-saffron mb-2" size={32} />
                                                <span className="text-xs font-black text-slate-400 group-hover:text-gov-saffron">Upload New</span>
                                                <input type="file" multiple onChange={handleFileChange} className="hidden" />
                                            </label>
                                        </div>
                                        {formData.images.length > 0 && (
                                            <p className="text-gov-saffron font-black text-xs animate-pulse">
                                                {formData.images.length} नवीन छायाचित्रे निवडली आहेत. कृपया सेव्ह दाबा.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gov-saffron transition-all shadow-xl shadow-slate-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Save size={20} /> बदल जतन करा
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <div className="h-[600px] flex flex-col items-center justify-center border-4 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50">
                            <div className="bg-white p-8 rounded-full shadow-inner mb-6">
                                <Info size={48} className="text-slate-200" />
                            </div>
                            <h3 className="text-xl font-black text-slate-400">संपादित करण्यासाठी विभाग निवडा</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageVillageInfo;
