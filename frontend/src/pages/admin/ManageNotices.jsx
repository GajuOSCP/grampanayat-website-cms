import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
    Bell, Plus, Search, Trash2, Edit, FileText, 
    Calendar, CheckCircle2, XCircle, AlertCircle 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ManageNotices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNotice, setCurrentNotice] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        isScrolling: false,
        pdf: null
    });

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await api.get('/notices');
            setNotices(res.data);
        } catch (err) {
            toast.error('नोटीस लोड करण्यात अडचण आली');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('isScrolling', formData.isScrolling);
        if (formData.pdf) data.append('pdf', formData.pdf);

        try {
            if (currentNotice) {
                await api.put(`/notices/${currentNotice._id}`, data);
                toast.success('नोटीस अपडेट केली');
            } else {
                await api.post('/notices', data);
                toast.success('नोटीस प्रसिद्ध केली');
            }
            setIsModalOpen(false);
            resetForm();
            fetchNotices();
        } catch (err) {
            toast.error(err.response?.data?.message || 'क्रिया अयशस्वी झाली');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('तुम्हाला खात्री आहे की तुम्ही ही नोटीस हटवू इच्छिता?')) return;
        try {
            await api.delete(`/notices/${id}`);
            toast.success('नोटीस हटवली');
            fetchNotices();
        } catch (err) {
            toast.error('नोटीस हटवण्यात अडचण आली');
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', isScrolling: false, pdf: null });
        setCurrentNotice(null);
    };

    const filteredNotices = notices.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">अधिकृत नोटीस बोर्ड</h2>
                    <p className="text-slate-500 text-sm">सार्वजनिक घोषणा आणि स्क्रोलिंग अलर्ट व्यवस्थापित करा.</p>
                </div>
                <button 
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="bg-primary-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-800 transition shadow-lg shadow-primary-900/20"
                >
                    <Plus size={20} /> नवीन नोटीस
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center px-6">
                <Search size={20} className="text-slate-400 mr-4" />
                <input 
                    type="text" 
                    placeholder="शीर्षकाप्रमाणे शोधा..." 
                    className="flex-grow outline-none text-slate-600 font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">नोटीस माहिती</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">प्रकार</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">तारीख</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">फाईल्स</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">कृती</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredNotices.map((notice) => (
                            <tr key={notice._id} className="hover:bg-slate-50/50 transition truncate">
                                <td className="px-6 py-5">
                                    <div className="font-bold text-slate-800">{notice.title}</div>
                                    <div className="text-xs text-slate-500 line-clamp-1 max-w-[300px]">{notice.description}</div>
                                </td>
                                <td className="px-6 py-5">
                                    {notice.isScrolling ? (
                                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit">
                                            <Bell size={12} /> स्क्रोलिंग (Scrolling)
                                        </span>
                                    ) : (
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit">
                                            <FileText size={12} /> मानक (Standard)
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                        <Calendar size={14} />
                                        {new Date(notice.date).toLocaleDateString('mr-IN')}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    {notice.pdfUrl ? (
                                        <a href={`http://localhost:5005${notice.pdfUrl}`} target="_blank" className="text-primary-700 hover:underline text-sm font-bold flex items-center gap-1">
                                            <FileText size={16} /> PDF पहा
                                        </a>
                                    ) : <span className="text-slate-300 text-xs">फाईल नाही</span>}
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => { setCurrentNotice(notice); setFormData({...notice, pdf: null}); setIsModalOpen(true); }}
                                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                                        >
                                            <Edit size={18} title="एडिट" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(notice._id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 size={18} title="हटवा" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredNotices.length === 0 && !loading && (
                    <div className="p-20 text-center">
                        <AlertCircle size={48} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-slate-400 font-medium">कोणतीही नोटीस सापडली नाही.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl relative overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-2xl font-bold text-slate-900">{currentNotice ? 'नोटीस एडिट करा' : 'नवीन नोटीस प्रसिद्ध करा'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><Plus size={24} className="rotate-45" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">नोटीसचे शीर्षक *</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none font-medium text-slate-800"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">नोटीसचा तपशील</label>
                                <textarea 
                                    rows="4"
                                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none font-medium text-slate-800"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-6 items-center">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 text-nowrap">डॉक्युमेंट अपलोड करा (PDF)</label>
                                    <input 
                                        type="file" 
                                        accept=".pdf"
                                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                        onChange={(e) => setFormData({...formData, pdf: e.target.files[0]})}
                                    />
                                </div>
                                <label className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                                    <input 
                                        type="checkbox" 
                                        className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                                        checked={formData.isScrolling}
                                        onChange={(e) => setFormData({...formData, isScrolling: e.target.checked})}
                                    />
                                    <span className="text-sm font-bold text-slate-700">स्क्रोलिंग बारमध्ये दाखवा</span>
                                </label>
                            </div>
                            <div className="pt-6 flex gap-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-4 rounded-2xl border-2 border-slate-100 text-slate-600 font-bold hover:bg-slate-50 transition">रद्द करा</button>
                                <button type="submit" className="flex-grow py-4 rounded-2xl bg-primary-700 text-white font-bold hover:bg-primary-800 transition shadow-lg shadow-primary-900/20">
                                    {currentNotice ? 'अपडेट करा' : 'प्रसिद्ध करा'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageNotices;
