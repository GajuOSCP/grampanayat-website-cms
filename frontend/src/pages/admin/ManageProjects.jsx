import React, { useState, useEffect } from 'react';
import api, { ASSET_BASE_URL } from '../../api/axios';
import { Plus, Edit, Trash2, Construction, X, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        status: 'upcoming',
        image: null
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            toast.error('प्रकल्प माहिती लोड करण्यात अडचण आली');
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
        data.append('description', formData.description);
        data.append('location', formData.location);
        data.append('status', formData.status);
        if (formData.image) data.append('image', formData.image);

        try {
            if (editingProject) {
                await api.put(`/projects/${editingProject._id}`, data);
                toast.success('प्रकल्प माहिती अपडेट केली');
            } else {
                await api.post('/projects', data);
                toast.success('नवीन प्रकल्प समाविष्ट केला');
            }
            fetchProjects();
            closeModal();
        } catch (err) {
            toast.error(err.response?.data?.message || 'क्रिया अयशस्वी झाली');
        }
    };

    const deleteProject = async (id) => {
        if (!window.confirm('तुम्हाला खात्री आहे की तुम्ही हा प्रकल्प हटवू इच्छिता?')) return;
        try {
            await api.delete(`/projects/${id}`);
            toast.success('प्रकल्प हटवला');
            fetchProjects();
        } catch (err) {
            toast.error('प्रकल्प हटवण्यात अडचण आली');
        }
    };

    const openModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                description: project.description,
                location: project.location || '',
                status: project.status,
                image: null
            });
        } else {
            setEditingProject(null);
            setFormData({ title: '', description: '', location: '', status: 'upcoming', image: null });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    const getStatusLabel = (status) => {
        switch(status) {
            case 'completed': return 'पूर्ण झाले';
            case 'ongoing': return 'प्रगतीपथावर';
            case 'upcoming': return 'नियोजित';
            default: return status;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">गावची विकास कामे (Projects)</h3>
                <button 
                    onClick={() => openModal()}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus size={20} /> नवीन प्रकल्प
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                        <div className="relative h-48 bg-slate-100">
                            {project.imageUrl ? (
                                <img src={`${ASSET_BASE_URL}${project.imageUrl}`} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400"><ImageIcon size={48} /></div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button onClick={() => openModal(project)} className="p-2 bg-white/90 hover:bg-white rounded-full text-primary-600 shadow-sm"><Edit size={16} title="एडिट" /></button>
                                <button onClick={() => deleteProject(project._id)} className="p-2 bg-white/90 hover:bg-white rounded-full text-red-600 shadow-sm"><Trash2 size={16} title="हटवा" /></button>
                            </div>
                            <span className={`absolute bottom-2 left-2 px-2 py-1 rounded text-[10px] font-bold uppercase shadow-sm ${
                                project.status === 'completed' ? 'bg-green-600 text-white' : 
                                project.status === 'ongoing' ? 'bg-blue-600 text-white' : 'bg-orange-500 text-white'
                            }`}>
                                {getStatusLabel(project.status)}
                            </span>
                        </div>
                        <div className="p-5">
                            <h4 className="font-bold text-lg mb-1 line-clamp-1">{project.title}</h4>
                            <p className="text-sm text-slate-500 mb-3 flex items-center gap-1">📍 {project.location || 'नमूद नाही'}</p>
                            <p className="text-slate-600 text-sm line-clamp-2">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="p-6 bg-primary-700 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">{editingProject ? 'प्रकल्प एडिट करा' : 'नवीन प्रकल्प जोडा'}</h3>
                            <button onClick={closeModal}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">प्रकल्पाचे नाव *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">प्रकल्पाचा तपशील *</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg" rows="3" required></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">ठिकाण</label>
                                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">स्थिती (Status)</label>
                                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                                    <option value="upcoming">नियोजित (Upcoming)</option>
                                    <option value="ongoing">प्रगतीपथावर (Ongoing)</option>
                                    <option value="completed">पूर्ण झाले (Completed)</option>
                                </select>
                            </div>
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-1">प्रकल्पाची इमेज</label>
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
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-bold">रद्द करा</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-primary-700 text-white rounded-lg font-bold">जतन करा</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProjects;
