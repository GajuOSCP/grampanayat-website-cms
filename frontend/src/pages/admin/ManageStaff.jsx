import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Plus, Edit, Trash2, Users, X, Upload, Phone, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageStaff = () => {
    const [staffList, setStaffList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        phone: '',
        type: 'member',
        photo: null
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const res = await api.get('/staff');
            setStaffList(res.data);
        } catch (err) {
            toast.error('पदाधिकारी यादी लोड करण्यात अडचण आली');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('designation', formData.designation);
        data.append('phone', formData.phone);
        data.append('type', formData.type);
        if (formData.photo) data.append('photo', formData.photo);

        try {
            if (editingStaff) {
                await api.put(`/staff/${editingStaff._id}`, data);
                toast.success('माहिती अपडेट केली');
            } else {
                await api.post('/staff', data);
                toast.success('नवीन सदस्य समाविष्ट केला');
            }
            fetchStaff();
            closeModal();
        } catch (err) {
            toast.error(err.response?.data?.message || 'क्रिया अयशस्वी झाली');
        }
    };

    const deleteStaff = async (id) => {
        if (!window.confirm('तुम्हाला खात्री आहे की तुम्ही हा सदस्य हटवू इच्छिता?')) return;
        try {
            await api.delete(`/staff/${id}`);
            toast.success('सदस्य हटवला');
            fetchStaff();
        } catch (err) {
            toast.error('सदस्य हटवण्यात अडचण आली');
        }
    };

    const openModal = (staff = null) => {
        if (staff) {
            setEditingStaff(staff);
            setFormData({
                name: staff.name,
                designation: staff.designation,
                phone: staff.phone || '',
                type: staff.type || 'member',
                photo: null
            });
        } else {
            setEditingStaff(null);
            setFormData({ name: '', designation: '', phone: '', type: 'member', photo: null });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingStaff(null);
    };

    const members = staffList.filter(s => (s.type || 'member') === 'member');
    const administration = staffList.filter(s => s.type === 'staff');

    const StaffTable = ({ title, list, icon: Icon }) => (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                <Icon size={20} className="text-primary-700" />
                <h4 className="font-bold text-slate-800">{title} ({list.length})</h4>
            </div>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="px-6 py-3 font-bold text-xs uppercase tracking-wider text-slate-500">नाव आणि फोटो</th>
                        <th className="px-6 py-3 font-bold text-xs uppercase tracking-wider text-slate-500">पद</th>
                        <th className="px-6 py-3 font-bold text-xs uppercase tracking-wider text-slate-500">संपर्क</th>
                        <th className="px-6 py-3 font-bold text-xs uppercase tracking-wider text-slate-500 text-right">कृती</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((staff) => (
                        <tr key={staff._id} className="border-b border-slate-50 hover:bg-slate-50/80 transition">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={staff.photoUrl ? `http://localhost:5005${staff.photoUrl}` : '/placeholder-profile.png'} 
                                        className="h-10 w-10 rounded-full object-cover border border-slate-200" 
                                        alt={staff.name} 
                                    />
                                    <span className="font-bold text-slate-800">{staff.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{staff.designation}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{staff.phone}</td>
                            <td className="px-6 py-4">
                                <div className="flex justify-end gap-3 text-slate-400">
                                    <button onClick={() => openModal(staff)} className="hover:text-primary-600 transition"><Edit size={18} title="एडिट" /></button>
                                    <button onClick={() => deleteStaff(staff._id)} className="hover:text-red-600 transition"><Trash2 size={18} title="हटवा" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h3 className="text-lg font-bold">पदाधिकारी व कर्मचारी व्यवस्थापन</h3>
                    <p className="text-sm text-slate-500">निवडून आलेले लोकप्रतिनिधी आणि प्रशासकीय कर्मचारी व्यवस्थापित करा.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition"
                >
                    <Plus size={20} /> नवीन सदस्य जोडा
                </button>
            </div>

            <StaffTable title="लोकप्रतिनिधी / सदस्य" list={members} icon={Users} />
            <StaffTable title="प्रशासकीय कर्मचारी" list={administration} icon={UserCheck} />

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-6 bg-primary-700 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">{editingStaff ? 'माहिती एडिट करा' : 'नवीन सदस्य जोडा'}</h3>
                            <button onClick={closeModal}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">संपूर्ण नाव *</label>
                                <input name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">पद (Designation) *</label>
                                <input name="designation" value={formData.designation} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-xl" placeholder="उदा: सरपंच, ग्रामसेवक, सदस्य" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">वर्गवारी (Type)</label>
                                    <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl font-medium">
                                        <option value="member">लोकप्रतिनिधी (Elected Member)</option>
                                        <option value="staff">प्रशासकीय कर्मचारी (Admin Staff)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">संपर्क क्रमांक</label>
                                    <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">प्रोफाइल फोटो</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 relative group">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file && file.size > 2 * 1024 * 1024) {
                                                toast.error("इमेज खूप मोठी आहे! कमाल २ MB.");
                                                return;
                                            }
                                            handleFileChange(e);
                                        }} 
                                        id="photo-upload" 
                                        className="hidden" 
                                    />
                                    <label htmlFor="photo-upload" className="cursor-pointer block">
                                        <Upload className="mx-auto text-slate-400 mb-1 group-hover:text-primary-600 transition-colors" size={24} />
                                        <p className="text-xs text-slate-500 font-bold">इमेज निवडा</p>
                                        <div className="mt-2 space-y-0.5">
                                            <p className="text-[10px] text-slate-400">शिफारस: ४००x४००px</p>
                                            <p className="text-[10px] text-slate-400">JPG, PNG | कमाल २ MB</p>
                                        </div>
                                    </label>
                                    {formData.photo && <p className="text-[10px] text-primary-600 mt-2 font-bold italic truncate px-2">{formData.photo.name}</p>}
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border rounded-xl font-bold">रद्द करा</button>
                                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-700 text-white rounded-xl font-bold hover:shadow-lg transition">जतन करा</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStaff;
