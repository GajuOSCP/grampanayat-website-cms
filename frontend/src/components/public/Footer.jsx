import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import { Landmark, Phone, Mail, MapPin, Youtube, Facebook, Twitter, ExternalLink, ArrowUp } from 'lucide-react';

const Footer = () => {
    const { settings } = useSettings();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#0f172a] text-white pt-24 pb-12 relative overflow-hidden border-t-8 border-gov-saffron">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand & Mission */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-gov-saffron p-3 rounded-2xl shadow-xl shadow-gov-saffron/20 group hover:rotate-12 transition-transform">
                                <Landmark size={32} />
                            </div>
                            <h2 className="text-2xl font-black tracking-tight leading-none">ग्रामपंचायत <br/> {settings?.panchayatName || 'आपली ग्रामपंचायत'}</h2>
                        </div>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            {settings?.aboutText || 'ग्रामपंचायत आपल्या गावाच्या सर्वांगीण विकासासाठी आणि पारदर्शक कारभारासाठी सदैव तत्पर आहे. सरकारी योजनांचा लाभ घ्या आणि गावच्या प्रगतीत सहभागी व्हा.'}
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Youtube].map((Icon, idx) => (
                                <a key={idx} href="#" className="p-3 bg-white/5 rounded-xl hover:bg-gov-saffron transition-colors group">
                                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h4 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-[10px] mb-8">महत्वाचे दुवे</h4>
                        <ul className="space-y-4 font-bold text-slate-400">
                            {[
                                { name: 'मुखपृष्ठ', path: '/' },
                                { name: 'ग्रामपंचायतीबद्दल', path: '/about' },
                                { name: 'लोकसेवा', path: '/services' },
                                { name: 'शासकीय योजना', path: '/schemes' },
                                { name: 'विकास कामे', path: '/projects' },
                                { name: 'बातम्या', path: '/news' },
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.path} className="hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-gov-saffron transition-colors"></div>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Gov Resources */}
                    <div>
                        <h4 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-[10px] mb-8">शासकीय संसाधने</h4>
                        <ul className="space-y-4 font-bold text-slate-400">
                            {[
                                { name: 'आपले सरकार', url: 'https://aaplesarkar.mahaonline.gov.in/' },
                                { name: 'महाडीबीटी', url: 'https://mahadbt.maharashtra.gov.in/' },
                                { name: 'महाराष्ट्र शासन', url: 'https://www.maharashtra.gov.in/' },
                                { name: 'जिल्हा परिषद', url: '#' },
                                { name: 'पंचायत समिती', url: '#' },
                                { name: 'महासंवाद', url: 'https://mahasamvad.in/' },
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between group">
                                        {link.name} <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help & Support */}
                    <div>
                        <h4 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-[10px] mb-8">मदत आणि संपर्क</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="p-3 bg-white/5 rounded-xl h-fit"><Phone size={20} className="text-gov-saffron" /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">फोन करा</p>
                                    <h5 className="font-black">{settings?.phone || '+९१ १०००००००००'}</h5>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-white/5 rounded-xl h-fit"><Mail size={20} className="text-gov-saffron" /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">ईमेल करा</p>
                                    <h5 className="font-black text-xs break-all">{settings?.email || 'contact@grampanchayat.in'}</h5>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={scrollToTop}
                            className="mt-12 w-full py-4 border-2 border-slate-800 rounded-2xl flex items-center justify-center gap-2 font-black text-sm hover:bg-slate-800 transition-colors"
                        >
                            वर जा <ArrowUp size={20} className="text-gov-saffron" />
                        </button>
                    </div>
                </div>


                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="text-slate-500 text-sm font-bold">
                        <p>© २०२६ ग्रामपंचायत डिजिटल पोर्टल. सर्व हक्क राखीव.</p>
                        <p className="mt-1 opacity-50">डिझाइन आणि विकसित: स्थानिक विकास समिती</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 text-[12px] font-black uppercase tracking-widest text-slate-500">
                        <a href="#" className="hover:text-gov-saffron transition-colors">नियम आणि अटी</a>
                        <a href="#" className="hover:text-gov-saffron transition-colors">गोपनीयता धोरण</a>
                        <a href="#" className="hover:text-gov-saffron transition-colors">सुलभता विधान</a>
                    </div>
                </div>
            </div>

            {/* Background Decorative */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gov-saffron/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gov-green/10 rounded-full blur-[120px] pointer-events-none"></div>
        </footer>
    );
};

export default Footer;
