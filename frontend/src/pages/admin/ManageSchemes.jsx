import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Plus, Edit, Trash2, Briefcase, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageSchemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingScheme, setEditingScheme] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        benefits: '',
        eligibility: '',
        image: null
    });

    useEffect(() => {
        fetchSchemes();
    }, []);

    const fetchSchemes = async () => {
        try {
            const res = await api.get('/schemes');
            setSchemes(res.data);
        } catch (err) {
            toast.error('योजना लोड करण्यात अडचण आली');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'image') data.append(key, formData[key]);
        });
        if (formData.image) data.append('image', formData.image);

        try {
            if (editingScheme) {
                await api.put(`/schemes/${editingScheme._id}`, data);
                toast.success('योजना अपडेट केली');
            } else {
                await api.post('/schemes', data);
                toast.success('नवीन योजना समाविष्ट केली');
            }
            fetchSchemes();
            closeModal();
        } catch (err) {
            toast.error('क्रिया अयशस्वी झाली');
        }
    };

    const deleteScheme = async (id) => {
        if (!window.confirm('तुम्हाला खात्री आहे?')) return;
        try {
            await api.delete(`/schemes/${id}`);
            toast.success('योजना हटवली');
            fetchSchemes();
        } catch (err) {
            toast.error('योजना हटवण्यात अडचण आली');
        }
    };

    const openModal = (scheme = null) => {
        if (scheme) {
            setEditingScheme(scheme);
            setFormData({
                title: scheme.title,
                description: scheme.description,
                benefits: scheme.benefits || '',
                eligibility: scheme.eligibility || '',
                image: null
            });
        } else {
            setEditingScheme(null);
            setFormData({ title: '', description: '', benefits: '', eligibility: '', image: null });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingScheme(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold">शासकीय योजना व्यवस्थापन</h3>
                <button 
                    onClick={() => openModal()}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition"
                >
                    <Plus size={20} /> नवीन योजना जोडा
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schemes.map((scheme) => (
                    <div key={scheme._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-primary-50 p-3 rounded-xl text-primary-700">
                                <Briefcase size={24} />
                            </div>
                            <div className="flex gap-2 text-slate-400">
                                <button onClick={() => openModal(scheme)} className="hover:text-primary-600 transition"><Edit size={18} title="एडिट" /></button>
                                <button onClick={() => deleteScheme(scheme._id)} className="hover:text-red-600 transition"><Trash2 size={18} title="हटवा" /></button>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-2">{scheme.title}</h4>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{scheme.description}</p>
                        <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">पात्रता (Eligibility)</div>
                            <p className="text-xs font-semibold text-slate-700">{scheme.eligibility}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
                        <div className="p-6 bg-primary-700 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">{editingScheme ? 'योजना एडिट करा' : 'नवीन योजना समाविष्ट करा'}</h3>
                            <button onClick={closeModal}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-4 max-h-[80vh] overflow-y-auto">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">योजनेचे नाव *</label>
                                <input name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">थोडक्यात माहिती *</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-xl" rows="3"></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">प्रमुख फायदे</label>
                                    <textarea name="benefits" value={formData.benefits} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" rows="4" placeholder="उदा: मोफत सिंचन संच, ५०% अनुदान"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">पात्रता निकष</label>
                                    <textarea name="eligibility" value={formData.eligibility} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" rows="4" placeholder="उदा: ५ एकर पेक्षा कमी जमीन असलेले शेतकरी"></textarea>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">बॅनर अपलोड करा (पर्यायी)</label>
                                <input type="file" onChange={handleFileChange} className="w-full text-xs font-bold" />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border rounded-xl font-bold">रद्द करा</button>
                                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-700 text-white rounded-xl font-bold">योजना जतन करा</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageSchemes;
