import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Plus, Edit, Trash2, X, Wrench, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import * as LucideIcons from 'lucide-react';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'Wrench',
        externalLink: ''
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await api.get('/services');
            setServices(res.data);
        } catch (err) {
            toast.error('सेवा लोड करण्यात अडचण आली');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingService) {
                await api.put(`/services/${editingService._id}`, formData);
                toast.success('सेवा अपडेट केली');
            } else {
                await api.post('/services', formData);
                toast.success('नवीन सेवा समाविष्ट केली');
            }
            fetchServices();
            closeModal();
        } catch (err) {
            toast.error('क्रिया अयशस्वी झाली');
        }
    };

    const deleteService = async (id) => {
        if (!window.confirm('तुम्हाला खात्री आहे?')) return;
        try {
            await api.delete(`/services/${id}`);
            toast.success('सेवा हटवली');
            fetchServices();
        } catch (err) {
            toast.error('सेवा हटवण्यात अडचण आली');
        }
    };

    const openModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                title: service.title,
                description: service.description,
                icon: service.icon || 'Wrench',
                externalLink: service.externalLink || ''
            });
        } else {
            setEditingService(null);
            setFormData({ title: '', description: '', icon: 'Wrench', externalLink: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold">लोकसेवा (Public Services) व्यवस्थापन</h3>
                <button 
                    onClick={() => openModal()}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition"
                >
                    <Plus size={20} /> नवीन सेवा जोडा
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b">
                            <th className="px-6 py-4 font-bold text-slate-700">सेवेचे नाव</th>
                            <th className="px-6 py-4 font-bold text-slate-700">लिंक / मार्ग</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-right">कृती</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service._id} className="border-b hover:bg-slate-50 transition">
                                <td className="px-6 py-4 font-bold text-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                                            {React.createElement(LucideIcons[service.icon] || Wrench, { size: 18 })}
                                        </div>
                                        {service.title}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {service.externalLink ? (
                                        <div className="flex items-center gap-1 text-primary-600">
                                            <ExternalLink size={14} /> {service.externalLink.substring(0, 30)}...
                                        </div>
                                    ) : 'अंतर्गत प्रक्रिया (Internal)'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-3 text-slate-400">
                                        <button onClick={() => openModal(service)} className="hover:text-primary-600 transition"><Edit size={18} title="एडिट" /></button>
                                        <button onClick={() => deleteService(service._id)} className="hover:text-red-600 transition"><Trash2 size={18} title="हटवा" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
                        <div className="p-6 bg-primary-700 text-white rounded-t-3xl flex justify-between items-center">
                            <h3 className="text-xl font-bold">{editingService ? 'सेवा एडिट करा' : 'नवीन सेवा जोडा'}</h3>
                            <button onClick={closeModal}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">सेवेचे नाव *</label>
                                <input name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">तपशील *</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-xl" rows="3"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Lucide आयकॉनचे नाव</label>
                                <input name="icon" value={formData.icon} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="उदा: FileText, Home, Heart" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">अर्ज करण्याची लिंक (पर्यायी)</label>
                                <input name="externalLink" value={formData.externalLink} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="https://aaplesarkar.mahaonline.gov.in/..." />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border rounded-xl font-bold">रद्द करा</button>
                                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-700 text-white rounded-xl font-bold">सेवा जतन करा</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;
