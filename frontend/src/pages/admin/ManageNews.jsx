import React, { useState, useEffect } from 'react';
import api, { ASSET_BASE_URL } from '../../api/axios';
import { Plus, Edit, Trash2, Newspaper, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageNews = () => {
    const [news, setNews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        image: null
    });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await api.get('/news');
            setNews(res.data);
        } catch (err) {
            toast.error('बातम्या लोड करण्यात अडचण आली');
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
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('date', formData.date);
        if (formData.image) data.append('image', formData.image);

        try {
            if (editingNews) {
                await api.put(`/news/${editingNews._id}`, data);
                toast.success('बातमी अपडेट केली');
            } else {
                await api.post('/news', data);
                toast.success('बातमी प्रसिद्ध केली');
            }
            fetchNews();
            closeModal();
        } catch (err) {
            toast.error(err.response?.data?.message || 'क्रिया अयशस्वी झाली');
        }
    };

    const deleteNews = async (id) => {
        if (!window.confirm('तुम्हाला खात्री आहे की तुम्ही ही बातमी हटवू इच्छिता?')) return;
        try {
            await api.delete(`/news/${id}`);
            toast.success('बातमी हटवली');
            fetchNews();
        } catch (err) {
            toast.error('बातमी हटवण्यात अडचण आली');
        }
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingNews(item);
            setFormData({
                title: item.title,
                content: item.content,
                date: new Date(item.date).toISOString().split('T')[0],
                image: null
            });
        } else {
            setEditingNews(null);
            setFormData({
                title: '',
                content: '',
                date: new Date().toISOString().split('T')[0],
                image: null
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingNews(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">गावातील बातम्या आणि घडामोडी</h3>
                <button 
                    onClick={() => openModal()}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus size={20} /> बातमी प्रसिद्ध करा
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 font-bold text-slate-700">बातमीचे शीर्षक</th>
                            <th className="px-6 py-4 font-bold text-slate-700">तारीख</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-right">कृती</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((item) => (
                            <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {item.imageUrl && (
                                            <img src={`${ASSET_BASE_URL}${item.imageUrl}`} className="h-10 w-10 rounded object-cover shadow-sm" alt="News" />
                                        )}
                                        <div>
                                            <p className="font-bold text-slate-800">{item.title}</p>
                                            <p className="text-xs text-slate-500 line-clamp-1">{item.content}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {new Date(item.date).toLocaleDateString('mr-IN')}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-3 text-slate-500">
                                        <button onClick={() => openModal(item)} className="hover:text-primary-600"><Edit size={18} title="एडिट" /></button>
                                        <button onClick={() => deleteNews(item._id)} className="hover:text-red-600"><Trash2 size={18} title="हटवा" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
                        <div className="p-6 bg-primary-700 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">{editingNews ? 'बातमी एडिट करा' : 'नवीन बातमी प्रसिद्ध करा'}</h3>
                            <button onClick={closeModal}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-1">बातमीचे शीर्षक *</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">प्रसिद्ध करण्याची तारीख *</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg" required />
                                </div>
                                 <div>
                                     <label className="block text-sm font-bold text-slate-700 mb-1">कव्हर इमेज</label>
                                     <input 
                                         type="file" 
                                         accept="image/*" 
                                         onChange={(e) => {
                                             if (e.target.files[0]?.size > 5 * 1024 * 1024) {
                                                 toast.error("इमेज खूप मोठी आहे! कमाल ५ MB.");
                                                 return;
                                             }
                                             handleFileChange(e);
                                         }} 
                                         className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm" 
                                     />
                                     <p className="text-[10px] text-slate-400 mt-1">शिफारस: ८००x६००px | कमाल ५ MB</p>
                                 </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-1">संपूर्ण मजकूर *</label>
                                    <textarea name="content" value={formData.content} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg" rows="8" required></textarea>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-bold">रद्द करा</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-primary-700 text-white rounded-lg font-bold">बातमी जतन करा</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageNews;
