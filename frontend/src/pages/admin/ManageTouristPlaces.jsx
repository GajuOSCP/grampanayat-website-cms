import React, { useState, useEffect } from 'react';
import api, { ASSET_BASE_URL } from '../../api/axios';
import { Plus, Trash2, MapPin, Image as ImageIcon, X, Upload, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageTouristPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        history: '',
        location: '',
        images: []
    });

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const res = await api.get('/tourist-places');
            setPlaces(res.data);
        } catch (err) {
            toast.error('माहिती लोड करण्यात अडचण आली');
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('history', formData.history);
        data.append('location', formData.location);
        formData.images.forEach(file => data.append('images', file));

        try {
            if (isEditing) {
                await api.put(`/tourist-places/${currentId}`, data);
                toast.success('माहिती अद्ययावत केली');
            } else {
                await api.post('/tourist-places', data);
                toast.success('नवीन ठिकाण जोडले');
            }
            fetchPlaces();
            closeModal();
        } catch (err) {
            toast.error('प्रक्रिया अयशस्वी');
        } finally {
            setLoading(false);
        }
    };

    const deletePlace = async (id) => {
        if (!window.confirm('तुम्हाला हे ठिकाण हटवायचा आहे का?')) return;
        try {
            await api.delete(`/tourist-places/${id}`);
            toast.success('ठिकाण हटवले');
            fetchPlaces();
        } catch (err) {
            toast.error('हटवण्यात अडचण आली');
        }
    };

    const openEditModal = (place) => {
        setFormData({
            name: place.name,
            description: place.description,
            history: place.history,
            location: place.location,
            images: []
        });
        setCurrentId(place._id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentId(null);
        setFormData({ name: '', description: '', history: '', location: '', images: [] });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h3 className="text-xl font-bold">पर्यटन आणि प्रेक्षणीय स्थळे</h3>
                    <p className="text-sm text-slate-500">गावातील पर्यटन स्थळांची माहिती येथे व्यवस्थापित करा</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition"
                >
                    <Plus size={20} /> नवीन ठिकाण जोडा
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.map((place) => (
                    <div key={place._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group">
                        <div className="aspect-video relative overflow-hidden">
                            <img 
                                src={`${ASSET_BASE_URL}${place.mainImage || '/placeholder.jpg'}`} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                alt={place.name} 
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                                <button onClick={() => openEditModal(place)} className="p-3 bg-white text-primary-600 rounded-xl hover:bg-primary-50">
                                    <Edit2 size={20} />
                                </button>
                                <button onClick={() => deletePlace(place._id)} className="p-3 bg-white text-red-600 rounded-xl hover:bg-red-50">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="text-lg font-bold mb-2">{place.name}</h4>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-4">{place.description}</p>
                            <div className="flex items-center gap-2 text-primary-600 text-xs font-bold">
                                <MapPin size={14} /> {place.location}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="p-6 bg-primary-700 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">{isEditing ? 'माहिती बदला' : 'नवीन ठिकाण जोडा'}</h3>
                            <button onClick={closeModal}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">ठिकाणाचे नाव *</label>
                                    <input 
                                        type="text" required
                                        value={formData.name} 
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="उदा: हनुमान मंदिर"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">लोकेशन / पत्ता *</label>
                                    <input 
                                        type="text" required
                                        value={formData.location} 
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="उदा: मुख्य चौक, उत्तरेकडे"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">थोडक्यात माहिती (Description) *</label>
                                <input 
                                    type="text" required
                                    value={formData.description} 
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                    placeholder="२ ओळीत माहिती"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">इतिहास / सविस्तर माहिती (History)</label>
                                <textarea 
                                    value={formData.history} 
                                    onChange={(e) => setFormData({...formData, history: e.target.value})}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none min-h-[150px]"
                                    placeholder="ठिकाणाचा इतिहास किंवा अधिक माहिती..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">फोटो (एकापेक्षा जास्त निवडू शकता) *</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition">
                                     <input 
                                         type="file" multiple accept="image/*" 
                                         onChange={handleFileChange}
                                         className="hidden" id="tourist-upload"
                                     />
                                     <label htmlFor="tourist-upload" className="cursor-pointer">
                                         <ImageIcon className="mx-auto text-slate-400 mb-2" size={40} />
                                         <p className="text-sm text-slate-600 font-bold">निवडण्यासाठी येथे क्लिक करा</p>
                                         <p className="text-xs text-slate-400 mt-1">शफारस: ८००x६००px</p>
                                     </label>
                                    {formData.images.length > 0 && (
                                        <div className="mt-4 text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full inline-block">
                                            {formData.images.length} फोटो निवडले
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button type="button" onClick={closeModal} className="flex-1 px-6 py-3 border-2 border-slate-100 rounded-xl font-bold text-slate-500">रद्द करा</button>
                                <button type="submit" disabled={loading} className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold disabled:opacity-50">
                                    {loading ? 'प्रक्रिया सुरू आहे...' : (isEditing ? 'बदल जतन करा' : 'ठिकाण जोडा')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTouristPlaces;
