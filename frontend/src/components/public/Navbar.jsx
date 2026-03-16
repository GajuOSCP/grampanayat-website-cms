import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import { Menu, X, Landmark, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PublicNavbar = () => {
    const { settings } = useSettings();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'मुखपृष्ठ', path: '/' },
        { name: 'ग्रामपंचायतीबद्दल', path: '/about' },
        { name: 'लोकसेवा', path: '/services' },
        { name: 'विकास कामे', path: '/projects' },
        { name: 'शासकीय योजना', path: '/schemes' },
        { name: 'नोटीस बोर्ड', path: '/notices' },
        { name: 'बातम्या', path: '/news' },
        { name: 'फोटो गॅलरी', path: '/gallery' },
        { name: 'संपर्क', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="w-full z-[100] relative">
            {/* Top Bar - Gov Info */}
            <div className="bg-slate-900 text-white py-2 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center text-[13px] font-medium">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <Landmark size={14} className="text-gov-saffron" /> महाराष्ट्र शासन
                        </span>
                        <span className="text-slate-400">|</span>
                        <span>डिजिटल ग्रामपंचायत पोर्टल</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href={`tel:${settings?.phone}`} className="hover:text-gov-saffron transition flex items-center gap-1.5 line-clamp-1">
                            <Phone size={14} /> {settings?.phone || '+९१ १०००००००००'}
                        </a>
                        <a href={`mailto:${settings?.email}`} className="hover:text-gov-saffron transition flex items-center gap-1.5">
                            <Mail size={14} /> {settings?.email || 'contact@grampanchayat.in'}
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Gov Header */}
            <div className={`w-full transition-all duration-300 ${scrolled ? 'fixed top-0 bg-white shadow-xl py-2 slide-in-from-top-1' : 'bg-white py-4 border-b border-slate-100'}`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Maharashtra Emblem & GP Info */}
                    <div className="flex items-center gap-4">
                        <img 
                            src={settings?.logoUrl ? `http://localhost:5005${settings.logoUrl}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Emblem_of_Maharashtra.svg/1200px-Emblem_of_Maharashtra.svg.png"} 
                            alt="Logo" 
                            className="h-14 md:h-20 object-contain drop-shadow-sm"
                        />
                        <div className="border-l-2 border-slate-100 pl-4 py-1">
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                                ग्रामपंचायत {settings?.panchayatName || 'आपली ग्रामपंचायत'}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm md:text-base font-bold text-slate-500 mt-1">
                                <span className="flex items-center gap-1"><MapPin size={14} className="text-gov-saffron" /> तालुका: {settings?.taluka || '------'}</span>
                                <span className="hidden md:block text-slate-200">|</span>
                                <span>जिल्हा: {settings?.district || '------'}</span>
                                <span className="hidden lg:block text-slate-200">|</span>
                                <span className="hidden lg:block">महाराष्ट्र राज्य</span>
                            </div>
                        </div>
                    </div>

                    {/* Admin/Right Actions */}
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/login" 
                            className="hidden md:flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gov-saffron hover:text-white transition-all shadow-sm"
                        >
                            <Landmark size={18} /> कर्मचारी लॉगिन
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-3 rounded-xl bg-slate-50 text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block container mx-auto px-4 mt-2">
                    <div className="flex items-center gap-1 border-t border-slate-50 py-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${
                                    isActive(link.path)
                                        ? 'bg-gov-saffron text-white shadow-lg shadow-gov-saffron/20'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[110] lg:hidden bg-slate-900/95 backdrop-blur-md p-6"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <span className="text-white font-black text-xl italic uppercase tracking-widest">मेनू</span>
                            <button onClick={() => setIsOpen(false)} className="text-white bg-white/10 p-2 rounded-full"><X size={32} /></button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`px-6 py-4 rounded-2xl text-xl font-bold transition-all ${
                                        isActive(link.path)
                                            ? 'bg-gov-saffron text-white'
                                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link 
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="mt-6 bg-white text-slate-900 py-5 rounded-3xl font-black text-center text-lg shadow-xl"
                            >
                                कर्मचारी डॅशबोर्ड
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default PublicNavbar;
