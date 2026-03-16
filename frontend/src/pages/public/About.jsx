import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import { Landmark, Users, History, Target, Award, MapPin, Building2, Droplets, Zap, HeartPulse, Phone } from 'lucide-react';

const About = () => {
    const { settings } = useSettings();
    const sections = [
        {
            title: 'आमचा इतिहास',
            icon: <History size={24} />,
            content: settings?.history || 'आमच्या ग्रामपंचायतीची स्थापना ... मध्ये झाली. तेव्हापासून आजपर्यंत गावाने मोठी प्रगती केली आहे. शेतीपासून ते डिजिटल साक्षरतेपर्यंत आम्ही अनेक टप्पे यशस्वीरित्या पार केले आहेत.'
        },
        {
            title: 'ध्येय आणि उद्दिष्टे',
            icon: <Target size={24} />,
            content: settings?.vision || 'आमचे मुख्य ध्येय गावाला स्वयंपूर्ण आणि आधुनिक बनवणे आहे. प्रत्येक नागरिकाला मूलभूत सुविधा पुरवणे आणि गावच्या समृद्धीसाठी काम करणे ही आमची प्राथमिकता आहे.'
        }
    ];

    const villageStats = [
        { label: 'एकूण क्षेत्रफळ', value: settings?.area || '१२०० हेक्टर', icon: <MapPin size={20}/> },
        { label: 'एकूण प्रभाग', value: settings?.wards || '७', icon: <Landmark size={20}/> },
        { label: 'शाळा व महाविद्यालये', value: settings?.schools || '४', icon: <Building2 size={20}/> },
        { label: 'आरोग्य सुविधा', value: settings?.healthCenters || '२', icon: <HeartPulse size={20}/> },
        { label: 'पाणीपुरवठा क्षमता', value: settings?.waterCapacity || '२०,००० लि.', icon: <Droplets size={20}/> },
        { label: 'विद्युतीकरण', value: settings?.electrification || '१००%', icon: <Zap size={20}/> }
    ];

    return (
        <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
            {/* Header Section */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img 
                        src={settings?.heroImages?.[0] ? `http://localhost:5005${settings.heroImages[0]}` : "https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=2070&auto=format&fit=crop"} 
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Landmark size={64} className="mx-auto text-gov-saffron mb-8 drop-shadow-lg" />
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                            ग्रामपंचायत {settings?.panchayatName || 'आपली ग्रामपंचायत'}
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                            {settings?.aboutText || 'आपल्या गावचा ऐतिहासिक वारसा आणि भविष्यातील विकासाचा संकल्प.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {sections.map((section, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="bg-gov-saffron/10 text-gov-saffron p-4 rounded-2xl">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900">{section.title}</h2>
                                </div>
                                <p className="text-lg text-slate-500 leading-loose font-medium">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}

                        {/* Village Stats Detailed */}
                        <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
                             <div className="flex items-center gap-4 mb-8">
                                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl">
                                    <Building2 size={24} />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900">गावाची सांख्यिकी</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                                {villageStats.map((stat, i) => (
                                    <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
                                        <div className="bg-white p-3 rounded-xl shadow-sm text-slate-400 group-hover:text-gov-saffron transition-colors">{stat.icon}</div>
                                        <div>
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                                            <h5 className="text-lg font-black text-slate-900">{stat.value}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        {/* Panchayat Members Intro */}
                        <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <Users size={48} className="text-gov-saffron mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-black mb-4">आमचे सदस्य</h3>
                                <p className="text-slate-400 font-medium mb-8">गावाच्या विकासासाठी कटिबद्ध असणारे आमचे लोकप्रतिनिधी.</p>
                                <div className="space-y-4">
                                    {[
                                        { name: 'श्री. अ-ब-क', role: 'सरपंच' },
                                        { name: 'श्री. क्ष-य-ज्ञ', role: 'उपसरपंच' },
                                        { name: 'सौ. य-र-ल', role: 'ग्रामसेविका' }
                                    ].map((m, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <div className="w-10 h-10 rounded-full bg-gov-saffron/20 border border-gov-saffron/40 overflow-hidden shadow-lg">
                                                <img src={`https://ui-avatars.com/api/?name=${m.name}&background=ff9933&color=fff`} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h5 className="font-black text-sm">{m.name}</h5>
                                                <p className="text-[10px] text-gov-saffron uppercase font-bold tracking-widest">{m.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gov-saffron/20 rounded-full blur-3xl"></div>
                        </div>

                        {/* Contact Widget */}
                        <div className="bg-gov-saffron p-1 text-white rounded-[3rem] shadow-xl">
                            <div className="bg-[#fb8c00] p-8 md:p-10 rounded-[2.8rem] space-y-6">
                                <h3 className="text-2xl font-black">मदत हवी आहे?</h3>
                                <p className="font-bold text-sm opacity-90">काही प्रश्न असल्यास किंवा माहिती हवी असल्यास आम्हाला संपर्क करा.</p>
                                <a href={`tel:${settings?.phone}`} className="flex items-center gap-4 bg-white/20 p-4 rounded-2xl hover:bg-white/30 transition shadow-lg backdrop-blur-md border border-white/20">
                                    <Phone size={24} />
                                    <span className="font-black text-lg">{settings?.phone || '+९१ १०००००००००'}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
