import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Save, Upload, MapPin, Phone, Mail, Globe, User, Text, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSettings } from '../../context/SettingsContext';

const GeneralSettings = () => {
    const { settings, fetchSettings } = useSettings();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        panchayatName: '',
        taluka: '',
        district: '',
        state: 'Maharashtra',
        address: '',
        phone: '',
        email: '',
        aboutText: '',
        history: '',
        vision: '',
        area: '',
        wards: '',
        schools: '',
        healthCenters: '',
        waterCapacity: '',
        electrification: '',
        sarpanchName: '',
        googleMapUrl: ''
    });
    const [files, setFiles] = useState({
        logo: null,
        sarpanchPhoto: null,
        heroImages: []
    });
    const [previews, setPreviews] = useState({
        logo: null,
        sarpanchPhoto: null,
        heroImages: []
    });

    useEffect(() => {
        if (settings) {
            setFormData({
                panchayatName: settings.panchayatName || '',
                taluka: settings.taluka || '',
                district: settings.district || '',
                state: settings.state || 'Maharashtra',
                address: settings.address || '',
                phone: settings.phone || '',
                email: settings.email || '',
                aboutText: settings.aboutText || '',
                history: settings.history || '',
                vision: settings.vision || '',
                area: settings.area || '',
                wards: settings.wards || '',
                schools: settings.schools || '',
                healthCenters: settings.healthCenters || '',
                waterCapacity: settings.waterCapacity || '',
                electrification: settings.electrification || '',
                sarpanchName: settings.sarpanchName || '',
                googleMapUrl: settings.googleMapUrl || ''
            });
        }
    }, [settings]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        if (name === 'heroImages') {
            const filesArray = Array.from(selectedFiles);
            setFiles({ ...files, heroImages: filesArray });
            
            // Generate previews
            const previewUrls = filesArray.map(file => URL.createObjectURL(file));
            setPreviews(prev => ({ ...prev, heroImages: previewUrls }));
        } else {
            const file = selectedFiles[0];
            setFiles({ ...files, [name]: file });
            
            // Generate preview
            if (file) {
                setPreviews(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
            }
        }
    };

    // Cleanup previews to avoid memory leaks
    useEffect(() => {
        return () => {
            if (previews.logo) URL.revokeObjectURL(previews.logo);
            if (previews.sarpanchPhoto) URL.revokeObjectURL(previews.sarpanchPhoto);
            previews.heroImages.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previews]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (files.logo) data.append('logo', files.logo);
        if (files.sarpanchPhoto) data.append('sarpanchPhoto', files.sarpanchPhoto);
        files.heroImages.forEach(file => data.append('heroImages', file));

        try {
            await api.put('/settings', data);
            toast.success('सेटिंग्ज यशस्वीरित्या अपडेट केल्या');
            fetchSettings();
            // Reset files and previews after successful save
            setFiles({ logo: null, sarpanchPhoto: null, heroImages: [] });
            setPreviews({ logo: null, sarpanchPhoto: null, heroImages: [] });
        } catch (err) {
            toast.error('सेटिंग्ज अपडेट करण्यात अडचण आली');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div>
                    <h3 className="text-xl font-bold">सामान्य सेटिंग्ज (General Settings)</h3>
                    <p className="text-slate-500 text-sm">तुमच्या ग्रामपंचायत वेबसाइटचे तपशील कॉन्फिगर करा.</p>
                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-primary-700 hover:bg-primary-800 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition disabled:opacity-50"
                >
                    <Save size={20} /> {loading ? 'जतन होत आहे...' : 'बदल जतन करा'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h4 className="font-bold border-b pb-2 flex items-center gap-2 text-primary-700">
                        <Globe size={18} /> मूलभूत माहिती
                    </h4>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">ग्रामपंचायतीचे नाव</label>
                        <input type="text" name="panchayatName" value={formData.panchayatName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">तालुका</label>
                            <input type="text" name="taluka" value={formData.taluka} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">जिल्हा</label>
                            <input type="text" name="district" value={formData.district} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">लोगो (Logo)</label>
                            <input 
                                type="file" 
                                name="logo" 
                                onChange={(e) => {
                                    if (e.target.files[0]?.size > 2 * 1024 * 1024) {
                                        toast.error("लोगो खूप मोठा आहे! कमाल २ MB.");
                                        return;
                                    }
                                    handleFileChange(e);
                                }} 
                                className="w-full text-xs" 
                            />
                            <p className="text-[10px] text-slate-400 mt-1">शिफारस: ४००x४००px | कमाल २ MB</p>
                            <div className="mt-2 flex items-center gap-2">
                                {previews.logo ? (
                                    <div className="relative">
                                        <img src={previews.logo} className="h-12 w-12 object-contain border-2 border-primary-500 p-1 rounded" alt="Logo Preview" />
                                        <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-[8px] px-1 rounded-full font-bold">New</span>
                                    </div>
                                ) : (
                                    settings?.logoUrl && <img src={`http://localhost:5005${settings.logoUrl}`} className="h-12 mt-2 object-contain border p-1 rounded" alt="Logo" />
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">सरपंचांचे नाव</label>
                            <input type="text" name="sarpanchName" value={formData.sarpanchName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h4 className="font-bold border-b pb-2 flex items-center gap-2 text-primary-700">
                        <MapPin size={18} /> संपर्क माहिती
                    </h4>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">कार्यालयाचा पत्ता</label>
                        <textarea name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" rows="2"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">फोन नंबर</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">ईमेल पत्ता</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Google Maps Embed URL</label>
                        <input type="text" name="googleMapUrl" value={formData.googleMapUrl} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" placeholder="https://www.google.com/maps/embed?..." />
                    </div>
                </div>

                {/* About & History Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4 md:col-span-2">
                    <h4 className="font-bold border-b pb-2 flex items-center gap-2 text-primary-700">
                        <Text size={18} /> ग्रामपंचायतीबद्दल माहिती (About & History)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">संक्षिप्त माहिती (मुखपृष्ठ विभाग)</label>
                            <textarea name="aboutText" value={formData.aboutText} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" rows="5" placeholder="गावाबद्दल थोडक्यात माहिती..."></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">गावाचा इतिहास (History)</label>
                            <textarea name="history" value={formData.history} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" rows="5" placeholder="गावाचा इतिहास आणि स्थापना..."></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-1">ध्येय आणि उद्दिष्टे (Vision & Mission)</label>
                            <textarea name="vision" value={formData.vision} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" rows="3" placeholder="ग्रामपंचायतीचे ध्येय..."></textarea>
                        </div>
                    </div>
                </div>

                {/* Village Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4 md:col-span-2">
                    <h4 className="font-bold border-b pb-2 flex items-center gap-2 text-primary-700">
                        <Building2 size={18} /> गावाची सांख्यिकी (Village Statistics)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">एकूण क्षेत्रफळ</label>
                            <input type="text" name="area" value={formData.area} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg text-sm" placeholder="उदा. १२०० हेक्टर" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">एकूण प्रभाग</label>
                            <input type="text" name="wards" value={formData.wards} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg text-sm" placeholder="उदा. ७" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">शाळा व महाविद्यालये</label>
                            <input type="text" name="schools" value={formData.schools} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg text-sm" placeholder="उदा. ४" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">आरोग्य सुविधा</label>
                            <input type="text" name="healthCenters" value={formData.healthCenters} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg text-sm" placeholder="उदा. २" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">पाणीपुरवठा क्षमता</label>
                            <input type="text" name="waterCapacity" value={formData.waterCapacity} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg text-sm" placeholder="उदा. २०,००० लि." />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">विद्युतीकरण (%)</label>
                            <input type="text" name="electrification" value={formData.electrification} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg text-sm" placeholder="उदा. १००%" />
                        </div>
                    </div>
                </div>

                {/* Media Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4 md:col-span-2">
                    <h4 className="font-bold border-b pb-2 flex items-center gap-2 text-primary-700">
                        <Upload size={18} /> मीडिया आणि बॅनर्स
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">सरपंचांचा फोटो</label>
                            <input 
                                type="file" 
                                name="sarpanchPhoto" 
                                onChange={(e) => {
                                    if (e.target.files[0]?.size > 2 * 1024 * 1024) {
                                        toast.error("फोटो खूप मोठा आहे! कमाल २ MB.");
                                        return;
                                    }
                                    handleFileChange(e);
                                }} 
                                className="w-full mb-1" 
                            />
                            <p className="text-[10px] text-slate-400 mb-2">शिफारस: ४००x४००px | कमाल २ MB</p>
                            <div className="mt-2">
                                {previews.sarpanchPhoto ? (
                                    <div className="relative inline-block">
                                        <img src={previews.sarpanchPhoto} className="h-40 w-40 object-cover rounded-xl border-4 border-primary-500 shadow-lg" alt="Sarpanch Preview" />
                                        <span className="absolute -top-3 -right-3 bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">New</span>
                                    </div>
                                ) : (
                                    settings?.sarpanchPhoto && <img src={`http://localhost:5005${settings.sarpanchPhoto}`} className="h-40 w-40 object-cover rounded-xl border-2 border-slate-100" alt="Sarpanch" />
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">मुख्य बॅनर इमेजेस (कमाल ५)</label>
                            <input 
                                type="file" 
                                name="heroImages" 
                                onChange={(e) => {
                                    const oversized = Array.from(e.target.files).some(f => f.size > 5 * 1024 * 1024);
                                    if (oversized) {
                                        toast.error("एक किंवा अधिक बॅनर्स ५ MB पेक्षा मोठे आहेत!");
                                        return;
                                    }
                                    handleFileChange(e);
                                }} 
                                multiple 
                                className="w-full mb-1" 
                            />
                            <p className="text-[10px] text-slate-400 mb-2">शिफारस: १९२०x६००px | कमाल ५ MB प्रत्येकी</p>
                            
                            <div className="space-y-4 mt-4">
                                {previews.heroImages.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold text-primary-700 mb-2 uppercase tracking-tighter">नवीन बॅनर्स (जतन करण्यासाठी):</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {previews.heroImages.map((url, i) => (
                                                <div key={i} className="relative">
                                                    <img src={url} className="h-20 w-32 object-cover rounded border-2 border-primary-500" alt={`New Hero ${i}`} />
                                                    <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-[8px] px-1 rounded-full font-bold">New</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                <div>
                                    <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-tighter">सध्याचे बॅनर्स:</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {settings?.heroImages?.map((url, i) => (
                                            <img key={i} src={`http://localhost:5005${url}`} className="h-20 w-32 object-cover rounded border border-slate-200 opacity-60" alt={`Hero ${i}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default GeneralSettings;
