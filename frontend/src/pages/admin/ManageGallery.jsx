import React, { useState, useEffect } from 'react';
import api, { ASSET_BASE_URL } from '../../api/axios';
import { Plus, Trash2, Image as ImageIcon, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageGallery = () => {
    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentImageId, setCurrentImageId] = useState(null);
    const [formData, setFormData] = useState({
        category: 'General',
        caption: '',
        images: []
    });

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const res = await api.get('/gallery');
            setImages(res.data);
        } catch (err) {
            toast.error('गॅलरी लोड करण्यात अडचण आली');
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        try {
            if (isEditing) {
                await api.put(`/gallery/${currentImageId}`, {
                    category: formData.category,
                    caption: formData.caption
                });
                toast.success('माहिती अद्ययावत केली');
            } else {
                if (formData.images.length === 0) {
                    toast.error('कृपया फोटो निवडा');
                    setLoading(false);
                    return;
                }
                const data = new FormData();
                data.append('category', formData.category);
                data.append('caption', formData.caption);
                formData.images.forEach(file => data.append('images', file));
                await api.post('/gallery', data);
                toast.success('फोटो यशस्वीरित्या अपलोड झाले');
            }
            fetchGallery();
            closeModal();
        } catch (err) {
            toast.error(isEditing ? 'अपडेट अयशस्वी झाले' : 'अपलोड अयशस्वी झाले');
        } finally {
            setLoading(false);
        }
    };

    const deleteImage = async (id) => {
        if (!window.confirm('तुम्हाला हा फोटो हटवायचा आहे का?')) return;
        try {
            await api.delete(`/gallery/${id}`);
            toast.success('फोटो हटवला');
            fetchGallery();
        } catch (err) {
            toast.error('फोटो हटवण्यात अडचण आली');
        }
    };

    const openEditModal = (img) => {
        setFormData({
            category: img.category || 'General',
            caption: img.caption || '',
            images: []
        });
        setCurrentImageId(img._id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentImageId(null);
        setFormData({ category: 'General', caption: '', images: [] });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h3 className="text-xl font-bold">फोटो गॅलरी व्यवस्थापन</h3>
                    <p className="text-sm text-slate-500">गावातील महत्त्वाचे क्षण आणि विकासकामे येथे व्यवस्थापित करा</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-lg shadow-primary-100"
                >
                    <Plus size={20} /> फोटो अपलोड करा
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {images.map((img) => (
                    <div key={img._id} className="relative group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden aspect-square">
                        <img src={`${ASSET_BASE_URL}${img.imageUrl}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Gallery" />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                            <button 
                                onClick={() => openEditModal(img)}
                                className="p-2.5 bg-white text-primary-600 rounded-xl hover:bg-primary-50 transition"
                                title="माहिती बदला"
                            >
                                <Plus size={20} className="rotate-45" />
                            </button>
                            <button 
                                onClick={() => deleteImage(img._id)}
                                className="p-2.5 bg-white text-red-600 rounded-xl hover:bg-red-50 transition"
                                title="हटवा"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1">
                            <div className="px-2 py-0.5 bg-white/90 backdrop-blur rounded text-[10px] font-black text-primary-700 w-fit uppercase tracking-wider">
                                {img.category}
                            </div>
                            {img.caption && (
                                <div className="px-2 py-1 bg-slate-900/80 backdrop-blur rounded text-[10px] font-bold text-white line-clamp-1">
                                    {img.caption}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                
                {images.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                        <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500 font-bold">अद्याप कोणतेही फोटो अपलोड केलेले नाहीत</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
                    <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold font-sans">
                                {isEditing ? 'माहिती बदला' : 'फोटो अपलोड करा'}
                            </h3>
                            <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-full transition"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">वर्गवारी (Category)</label>
                                <input 
                                    type="text" 
                                    value={formData.category} 
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl focus:border-primary-500 focus:outline-none transition font-medium"
                                    placeholder="उदा: कार्यक्रम, सण, विकास कामे"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">फोटोबद्दल माहिती (Caption)</label>
                                <textarea 
                                    value={formData.caption} 
                                    onChange={(e) => setFormData({...formData, caption: e.target.value})}
                                    className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl focus:border-primary-500 focus:outline-none transition font-medium min-h-[100px]"
                                    placeholder="फोटोबद्दल थोडक्यात माहिती लिहा..."
                                />
                            </div>

                            {!isEditing && (
                                <div>
                                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">फोटो निवडा *</label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-[1.5rem] p-10 text-center bg-slate-50 hover:bg-slate-100 hover:border-primary-300 transition group">
                                         <input 
                                             type="file" 
                                             multiple 
                                             accept="image/*" 
                                             onChange={(e) => {
                                                 const oversized = Array.from(e.target.files).some(f => f.size > 5 * 1024 * 1024);
                                                 if (oversized) {
                                                     toast.error("एक किंवा अधिक फोटो ५ MB पेक्षा मोठे आहेत!");
                                                     return;
                                                 }
                                                 handleFileChange(e);
                                             }}
                                             className="hidden" 
                                             id="file-upload"
                                         />
                                         <label htmlFor="file-upload" className="cursor-pointer">
                                             <div className="bg-white p-4 rounded-2xl shadow-sm w-fit mx-auto mb-4 group-hover:scale-110 transition duration-300">
                                                <Upload className="text-primary-600" size={32} />
                                             </div>
                                             <p className="text-sm text-slate-700 font-bold">निवडण्यासाठी येथे क्लिक करा</p>
                                             <p className="text-xs text-slate-400 mt-2">कमाल ५ MB | एकावेळी १० फोटो</p>
                                         </label>
                                        {formData.images.length > 0 && (
                                            <div className="mt-4 px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-xs font-black inline-block">
                                                {formData.images.length} फोटो निवडले आहेत
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 flex gap-4">
                                <button type="button" onClick={closeModal} className="flex-1 px-6 py-3 border-2 border-slate-100 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition">रद्द करा</button>
                                <button type="submit" disabled={loading} className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-2xl font-black disabled:opacity-50 hover:bg-primary-700 transition shadow-lg shadow-primary-100">
                                    {loading ? 'प्रक्रिया सुरू आहे...' : (isEditing ? 'बदल जतन करा' : 'अपलोड करा')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageGallery;
