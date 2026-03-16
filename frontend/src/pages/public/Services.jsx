import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, PlusCircle, CheckCircle2, AlertCircle, Landmark, ArrowRight, UserCheck, Droplets, Zap, ShieldCheck, GraduationCap } from 'lucide-react';
import api from '../../api/axios';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                setServices(res.data);
            } catch (err) {
                console.error('Failed to fetch services', err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const defaultServices = [
        { title: 'जन्म दाखला', description: 'नवीन जन्म नोंदणी आणि दाखला मिळवण्यासाठी अर्ज करा.', icon: <UserCheck size={32}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'मृत्यू दाखला', description: 'मृत्यू नोंदणी आणि अधिकृत दाखला मिळवण्यासाठी प्रक्रिया.', icon: <FileText size={32}/>, color: 'text-slate-600', bg: 'bg-slate-50' },
        { title: 'मिळकत उतारा (नमुना ८)', description: 'मालमत्ता कर आणि मालकी हक्काचा अधिकृत उतारा.', icon: <Landmark size={32}/>, color: 'text-gov-saffron', bg: 'bg-gov-saffron/5' },
        { title: 'नळ जोडणी', description: 'पिण्याच्या पाण्यासाठी नवीन नळ जोडणीसाठी अर्ज करा.', icon: <Droplets size={32}/>, color: 'text-cyan-600', bg: 'bg-cyan-50' },
        { title: 'विद्युत सुविधा', description: 'रस्त्यावरील दिवे आणि सार्वजनिक विद्युत तक्रारींसाठी.', icon: <Zap size={32}/>, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'आरोग्य सुविधा', description: 'गावच्या आरोग्य केंद्रातील सुविधा आणि लसीकरण माहिती.', icon: <ShieldCheck size={32}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' }
    ];

    const displayServices = services.length > 0 ? services : defaultServices;
    const filteredServices = displayServices.filter(s => 
        (s.title || s.name).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="bg-slate-900 text-white py-24">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">लोकसेवा केंद्र</h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            ग्रामपंचायतीच्या विविध सेवांसाठी ऑनलाईन अर्ज करा आणि माहिती मिळवा.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-12 relative z-20">
                {/* Search Bar */}
                <div className="bg-white p-4 md:p-6 rounded-[2.5rem] shadow-xl border border-slate-100 mb-12 flex items-center gap-4 max-w-4xl mx-auto">
                    <div className="bg-slate-50 p-3 rounded-2xl text-slate-400">
                        <Search size={24} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="सेवेचे नाव शोधा (उदा. दाखला, पाणी)..." 
                        className="flex-1 bg-transparent border-none outline-none text-lg font-bold text-slate-800 placeholder:text-slate-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 group hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className={`${service.bg || 'bg-slate-50'} ${service.color || 'text-slate-900'} w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:rotate-6 transition-transform`}>
                                {service.icon || <FileText size={32} />}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-gov-saffron transition-colors">
                                {service.title || service.name}
                            </h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                {service.description}
                            </p>
                            <button className="flex items-center gap-2 text-primary-700 font-black uppercase tracking-widest text-xs group/btn">
                                अधिक माहिती पहा <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <div className="text-center py-24">
                        <AlertCircle size={64} className="mx-auto text-slate-200 mb-6" />
                        <h3 className="text-2xl font-black text-slate-400">या नावाच्या सेवा उपलब्ध नाहीत.</h3>
                        <p className="text-slate-300 font-bold mt-2">कृपया दुसरा शब्द वापरून शोधा.</p>
                    </div>
                )}

                {/* Help Section */}
                <div className="mt-24 bg-gov-blue text-white p-12 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="relative z-10 max-w-xl text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-black mb-6">कामाला उशीर होत आहे किंवा तक्रार आहे?</h2>
                        <p className="text-blue-100 font-medium text-lg leading-relaxed">आमच्या लोक तक्रार निवारण केंद्रात आपली तक्रार नोंदवा. आम्ही २४ तासांच्या आत प्रतिसाद देऊ.</p>
                    </div>
                    <div className="relative z-10 flex flex-wrap justify-center gap-4">
                        <button className="bg-white text-gov-blue px-10 py-5 rounded-[2rem] font-black shadow-xl hover:scale-105 transition-transform active:scale-95">तक्रार नोंदवा</button>
                        <button className="bg-gov-saffron text-white px-10 py-5 rounded-[2rem] font-black shadow-xl hover:scale-105 transition-transform active:scale-95">मदतीसाठी फोन करा</button>
                    </div>
                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gov-saffron/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                </div>
            </div>
        </div>
    );
};

export default Services;
