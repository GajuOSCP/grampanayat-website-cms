import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, ArrowRight, CheckCircle2, Landmark, AlertCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const { settings } = useSettings();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('तुमचा संदेश यशस्वीरित्या पाठवला आहे!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    return (
        <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">संपर्क साधा</h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            काही प्रश्न, सूचना किंवा तक्रार असल्यास खालील माध्यमांतून आमच्याशी संपर्क साधा.
                        </p>
                    </motion.div>
                </div>
                {/* Decorative background circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gov-saffron/10 rounded-full blur-[100px]"></div>
            </section>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 group hover:bg-gov-saffron transition-all duration-500">
                            <div className="bg-gov-saffron/10 text-gov-saffron p-4 rounded-2xl w-fit mb-8 group-hover:bg-white/20 group-hover:text-white transition-colors">
                                <MapPin size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-white">कार्यालय पत्ता</h3>
                            <p className="text-slate-500 font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                                ग्रामपंचायत कार्यालय, मु.पो. {settings?.panchayatName || '------'}, <br/>
                                ता. {settings?.taluka || '------'}, जि. {settings?.district || '------'}.
                            </p>
                        </div>

                        <div className="bg-slate-900 p-10 rounded-[3rem] shadow-xl text-white group hover:bg-gov-blue transition-all duration-500">
                            <div className="bg-white/10 text-white p-4 rounded-2xl w-fit mb-8 group-hover:bg-white/20 transition-colors">
                                <Phone size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">फोन आणि ईमेल</h3>
                            <div className="space-y-4 font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                                <a href={`tel:${settings?.phone}`} className="flex items-center gap-3 hover:text-gov-saffron transition-colors">
                                    <Phone size={18} /> {settings?.phone || '+९१ १०००००००००'}
                                </a>
                                <a href={`mailto:${settings?.email}`} className="flex items-center gap-3 hover:text-gov-saffron transition-colors">
                                    <Mail size={18} /> {settings?.email || 'contact@grampanchayat.in'}
                                </a>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                            <div className="bg-slate-100 text-slate-400 p-4 rounded-2xl w-fit mb-8">
                                <Clock size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4">कार्यालयीन वेळ</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center font-bold text-sm">
                                    <span className="text-slate-400">सोम - शुक्र</span>
                                    <span className="text-slate-900">१०:०० AM - ६:०० PM</span>
                                </div>
                                <div className="flex justify-between items-center font-bold text-sm">
                                    <span className="text-slate-400">शनिवार</span>
                                    <span className="text-slate-900">१०:०० AM - २:०० PM</span>
                                </div>
                                <div className="flex justify-between items-center font-bold text-sm">
                                    <span className="text-red-500">रविवार</span>
                                    <span className="text-red-500">सुट्टी</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100">
                            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">आम्हाला संदेश पाठवा</h2>
                            <p className="text-slate-500 font-medium mb-12">खालील फॉर्म भरून आपण आपल्या प्रतिक्रिया किंवा शंका आम्हाला कळवू शकता. आम्ही शक्य तितक्या लवकर उत्तर देऊ.</p>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">पूर्ण नाव</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-gov-saffron transition-all outline-none font-bold text-slate-800"
                                            placeholder="तुमचे नाव येथे लिहा..."
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">मोबाईल नंबर</label>
                                        <input 
                                            type="tel" 
                                            required
                                            className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-gov-saffron transition-all outline-none font-bold text-slate-800"
                                            placeholder="+९१ -"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">ईमेल पत्ता</label>
                                    <input 
                                        type="email" 
                                        required
                                        className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-gov-saffron transition-all outline-none font-bold text-slate-800"
                                        placeholder="example@mail.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">संदेश किंवा प्रश्न</label>
                                    <textarea 
                                        rows="5"
                                        required
                                        className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[3rem] focus:bg-white focus:border-gov-saffron transition-all outline-none font-bold text-slate-800 resize-none"
                                        placeholder="तुमचा संदेश येथे सविस्तर लिहा..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-slate-900 text-white py-6 rounded-[2.5rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-gov-saffron transition-all shadow-xl shadow-slate-200 active:scale-95 group"
                                >
                                    संदेश पाठवा <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-24 bg-white p-4 rounded-[4.5rem] shadow-2xl border border-slate-100 relative overflow-hidden group">
                    <div className="w-full h-[500px] bg-slate-100 rounded-[4rem] relative flex items-center justify-center overflow-hidden">
                        {/* Map Placeholder */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-slate-50">
                            <div className="bg-white p-6 rounded-full shadow-2xl mb-8 group-hover:scale-110 transition-transform">
                                <MapPin size={64} className="text-gov-saffron" />
                            </div>
                            <h4 className="text-3xl font-black text-slate-900 mb-4">ग्रामपंचायत कार्यालय नकाशा</h4>
                            <p className="text-slate-500 font-medium max-w-sm">मु.पो. {settings?.panchayatName || '------'}, ता. {settings?.taluka || '------'}, जिल्ला {settings?.district || '------'}.</p>
                            <button className="mt-10 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-gov-saffron transition-all shadow-xl">गुगल मॅप्सवर उघडा <ArrowRight size={20} className="inline ml-2"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
