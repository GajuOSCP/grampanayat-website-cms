import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Bell, ChevronRight, Phone, Mail, MapPin, ExternalLink, 
    ArrowRight, Info, Users, Landmark, FileText, Image as ImageIcon,
    Droplets, GraduationCap, Building2, Zap, HeartPulse,
    Music, Palette, Trees, Camera, MessageSquare, AlertCircle,
    HelpCircle, ThumbsUp, ShieldCheck, PhoneCall, Flame, 
    Shield, Hospital, Truck, ScanFace, UserCheck, Search, Globe, Lock, Scale, Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api, { ASSET_BASE_URL } from '../../api/axios';
import { useSettings } from '../../context/SettingsContext';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
    const { settings } = useSettings();
    const [notices, setNotices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [news, setNews] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [staff, setStaff] = useState([]);
    const [touristPlaces, setTouristPlaces] = useState([]);
    const [stats, setStats] = useState({
        population: '५,४००',
        households: '१,२००',
        schools: '३',
        healthCenter: '१'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [noticesRes, projectsRes, newsRes, galleryRes, staffRes, touristRes] = await Promise.all([
                    api.get('/notices'),
                    api.get('/projects'),
                    api.get('/news'),
                    api.get('/gallery'),
                    api.get('/staff'),
                    api.get('/tourist-places')
                ]);
                setNotices(noticesRes.data.filter(n => n.isScrolling));
                setProjects(projectsRes.data.slice(0, 3));
                setNews(newsRes.data.slice(0, 3));
                setGallery(galleryRes.data.slice(0, 8));
                setStaff(staffRes.data);
                setTouristPlaces(touristRes.data.slice(0, 4));
            } catch (err) {
                console.error('Failed to fetch homepage data', err);
            }
        };
        fetchData();
    }, []);

    const importantLinks = [
        { 
            name: 'Maharashtra Government', 
            url: 'https://www.maharashtra.gov.in/', 
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Emblem_of_Maharashtra.svg/200px-Emblem_of_Maharashtra.svg.png' 
        },
        { 
            name: 'DigiLocker', 
            url: 'https://www.digilocker.gov.in/', 
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/DigiLocker_Logo.svg/250px-DigiLocker_Logo.svg.png' 
        },
        { 
            name: 'Right to Information', 
            url: 'https://rtionline.maharashtra.gov.in/', 
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Right_to_Information_Act_logo.svg/200px-Right_to_Information_Act_logo.svg.png' 
        },
        { 
            name: 'MyGov India', 
            url: 'https://www.mygov.in/', 
            logo: 'https://static.mygov.in/rest/s3fs-public/mygov_logo.png' 
        },
        { 
            name: 'Smart City Mission', 
            url: 'https://smartcities.gov.in/', 
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Smart_Cities_Mission_Logo.png/250px-Smart_Cities_Mission_Logo.png' 
        }
    ];

    const handleImageError = (e, name) => {
        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f97316&color=fff&size=128&bold=true`;
        e.target.onerror = null;
    };

    const emergencyServices = [
        { title: 'अग्निशमन दल', phone: '१०१', icon: <Flame size={24} />, color: 'bg-red-500' },
        { title: 'रुग्णवाहिका', phone: '१०८', icon: <Truck size={24} />, color: 'bg-blue-500' },
        { title: 'आपत्कालीन क्रमांक', phone: '११२', icon: <Phone size={24} />, color: 'bg-orange-500' },
        { title: 'पोलीस', phone: '१००', icon: <Shield size={24} />, color: 'bg-indigo-600' },
        { title: 'रुग्णालय', phone: '०२३१-९९९९९९', icon: <Hospital size={24} />, color: 'bg-emerald-500' },
        { title: 'रक्तपेढी', phone: '०२३१-८८८८८८', icon: <HeartPulse size={24} />, color: 'bg-rose-500' }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. Scrolling News Ticker */}
            <div className="bg-red-600 text-white overflow-hidden py-3 flex items-center shadow-lg border-b border-white/10 z-10 sticky top-[74px] md:top-[116px] lg:top-[160px]">
                <div className="px-6 border-r border-white/20 whitespace-nowrap flex items-center gap-2 font-black tracking-tighter italic">
                    <Bell size={20} className="animate-pulse" /> महत्वाच्या सूचना
                </div>
                <div className="flex-1 overflow-hidden relative h-6 text-sm md:text-base font-bold">
                    <div className="animate-marquee whitespace-nowrap absolute flex items-center gap-20">
                        {notices.length > 0 ? notices.map((notice, idx) => (
                            <span key={idx} className="hover:text-amber-200 transition-colors cursor-default">
                                {notice.title} : {notice.description}
                            </span>
                        )) : (
                            <span className="italic opacity-80 font-medium">ग्रामपंचायतीच्या नवीन सूचनांसाठी येथे पहा...</span>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Hero Section */}
            <section className="relative h-[650px] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img 
                        src={settings?.heroImages?.[0] ? `${ASSET_BASE_URL}${settings.heroImages[0]}?v=${new Date().getTime()}` : "https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=2070&auto=format&fit=crop"} 
                        className="w-full h-full object-cover opacity-60 scale-105"
                        alt="Village Landscape"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-4 py-1.5 bg-gov-saffron text-white rounded-full text-sm font-bold tracking-widest uppercase mb-6 shadow-xl shadow-gov-saffron/20 border border-white/20">
                            डिजिटल ग्रामपंचायत पोर्टल
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 drop-shadow-2xl">
                            विकासाच्या वाटेवर <br/>
                            <span className="text-gov-saffron">आमचं {settings?.panchayatName?.replace('ग्रामपंचायत', '') || 'भोन'}, आमचा अभिमान</span>
                        </h2>
                        <p className="text-xl text-slate-200 mb-10 leading-relaxed font-medium">
                            ग्रामपंचायत आपल्या गावाच्या सर्वांगीण विकासासाठी आणि पारदर्शक कारभारासाठी सदैव तत्पर आहे. सरकारी योजनांचा लाभ घ्या आणि गावच्या प्रगतीत सहभागी व्हा.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/services" className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-gov-saffron hover:text-white transition-all shadow-2xl active:scale-95">
                                ग्रामपंचायत सेवा <ArrowRight size={20} />
                            </Link>
                            <Link to="/about" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all shadow-xl">
                                ग्रामपंचायतीबद्दल माहिती
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Village Information Cards - Carousel on Mobile, Grid on Desktop */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    {/* Desktop Grid */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'शहराविषयी', icon: <Building2 className="text-blue-500" />, desc: 'गावाचा इतिहास आणि भूगोल.', link: '/shaharavishayi' },
                            { title: 'नाट्यगृह आणि कला दालन', icon: <Palette className="text-orange-500" />, desc: 'सांस्कृतिक आणि कला केंद्र.', link: '/natyagruh-kala-dalan' },
                            { title: 'उद्यान', icon: <Trees className="text-emerald-500" />, desc: 'विश्रांतीसाठी उत्तम जागा.', link: '/udyane' },
                            { title: 'प्रेक्षणीय ठिकाणे', icon: <Camera className="text-purple-500" />, desc: 'पर्यटनसाठी महत्त्वाची स्थळे.', link: '/preshaniya-thikane' }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link 
                                    to={item.link}
                                    className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:bg-white transition-all group flex flex-col h-full cursor-pointer hover:-translate-y-2"
                                >
                                    <div className="bg-white w-16 h-16 rounded-2xl shadow-inner flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-gov-saffron transition-colors">{item.title}</h4>
                                    <p className="text-slate-500 font-bold text-sm tracking-tight">{item.desc}</p>
                                    <div className="mt-6 flex items-center gap-2 text-gov-saffron font-black text-xs opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                        अधिक वाचा <ArrowRight size={14} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Swiper */}
                    <div className="md:hidden">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={16}
                            slidesPerView={1}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            loop={true}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            className="!pb-12"
                        >
                            {[
                                { title: 'शहराविषयी', icon: <Building2 className="text-blue-500" />, desc: 'गावाचा इतिहास आणि भूगोल.', link: '/shaharavishayi' },
                                { title: 'नाट्यगृह आणि कला दालन', icon: <Palette className="text-orange-500" />, desc: 'सांस्कृतिक आणि कला केंद्र.', link: '/natyagruh-kala-dalan' },
                                { title: 'उद्यान', icon: <Trees className="text-emerald-500" />, desc: 'विश्रांतीसाठी उत्तम जागा.', link: '/udyane' },
                                { title: 'प्रेक्षणीय ठिकाणे', icon: <Camera className="text-purple-500" />, desc: 'पर्यटनसाठी महत्त्वाची स्थळे.', link: '/preshaniya-thikane' }
                            ].map((item, idx) => (
                                <SwiperSlide key={idx}>
                                    <Link 
                                        to={item.link}
                                        className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col h-full cursor-pointer active:scale-95 transition-transform"
                                    >
                                        <div className="bg-white w-16 h-16 rounded-2xl shadow-inner flex items-center justify-center mb-6">
                                            {item.icon}
                                        </div>
                                        <h4 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h4>
                                        <p className="text-slate-500 font-bold text-base leading-relaxed">{item.desc}</p>
                                        <div className="mt-8 flex items-center gap-2 text-gov-saffron font-black text-sm">
                                            अधिक वाचा <ArrowRight size={16} />
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>


            {/* 4. About Section */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-slate-50 relative z-10">
                                <img 
                                    src={settings?.sarpanchPhoto ? `${ASSET_BASE_URL}${settings.sarpanchPhoto}` : "https://images.unsplash.com/photo-1599566630152-783d443c9943?q=80&w=1887&auto=format&fit=crop"} 
                                    className="w-full h-full object-cover" 
                                    alt="Sarpanch" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-12">
                                    <h4 className="text-white text-3xl font-black mb-2">{settings?.sarpanchName || 'श्री. संपतराव गायकवाड'}</h4>
                                    <p className="text-gov-saffron font-bold text-lg">सरपंच</p>
                                </div>
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gov-saffron/20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gov-blue/20 rounded-full blur-3xl animate-pulse"></div>
                        </motion.div>

                        <div>
                            <h3 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-xs mb-4">आमच्याबद्दल</h3>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">आपल्या गावाचा गौरव आणि <br/><span className="text-gov-blue">भविष्यातील वाटचाल</span></h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium italic">
                                "{settings?.aboutText || 'गावाचा सर्वांगीण विकास करणे आणि प्रत्येक नागरिकाला शासनाच्या योजनांचा लाभ मिळवून देणे हेच आमचे मुख्य ध्येय आहे. पारदर्शक कारभार आणि लोकांच्या सहभागातून आम्ही गावाचा कायापालट करत आहोत.'}"
                            </p>
                            <div className="grid grid-cols-2 gap-8 mb-10">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                                    <div className="bg-white p-3 rounded-xl shadow-sm"><Users className="text-gov-saffron" size={24}/></div>
                                    <div><p className="text-3xl font-black text-slate-900">{stats.population}</p><p className="text-xs font-bold text-slate-500 uppercase tracking-widest">गावाची लोकसंख्या</p></div>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                                    <div className="bg-white p-3 rounded-xl shadow-sm"><Droplets className="text-blue-500" size={24}/></div>
                                    <div><p className="text-3xl font-black text-slate-900">{stats.households}</p><p className="text-xs font-bold text-slate-500 uppercase tracking-widest">एकूण कुटुंबे</p></div>
                                </div>
                            </div>
                            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-gov-saffron transition-all shadow-xl active:scale-95">अधिक माहिती वाचा</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Officials Section (Gram Panchayat Team) */}
             <section className="py-24 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-4 md:px-12 space-y-24">
                     {/* Unified Team Section - ग्रामपंचायत पदाधिकारी व कर्मचारी (Carousel Implementation) */}
                     <div>
                         <div className="text-center mb-20">
                             <h3 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-xs mb-4">पंचायत टीम</h3>
                             <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">ग्रामपंचायत पदाधिकारी व कर्मचारी</h2>
                         </div>
                         
                         <div className="relative group max-w-7xl mx-auto">
                             {staff.length > 0 ? (
                                 <Swiper
                                     modules={[Autoplay, Navigation, Pagination]}
                                     spaceBetween={32}
                                     slidesPerView={1}
                                     loop={staff.length > 4}
                                     centeredSlides={false}
                                     speed={1000}
                                     autoplay={{
                                         delay: 4000,
                                         disableOnInteraction: false,
                                         pauseOnMouseEnter: true
                                     }}
                                     navigation={{
                                         nextEl: '.swiper-button-next-custom',
                                         prevEl: '.swiper-button-prev-custom',
                                     }}
                                     pagination={{ clickable: true, dynamicBullets: true }}
                                     breakpoints={{
                                         640: { slidesPerView: 2 },
                                         1024: { slidesPerView: 4 }
                                     }}
                                     className="!py-16"
                                 >
                                     {staff.map((member, idx) => {
                                         const getRoleColor = (des) => {
                                             if (des?.includes('सरपंच') && !des?.includes('उप')) return '#EA580C';
                                             if (des?.includes('उपसरपंच')) return '#2563EB';
                                             if (des?.includes('ग्रामसेवक')) return '#16A34A';
                                             if (des?.includes('सदस्य')) return '#F59E0B';
                                             return '#6B7280';
                                         };
                                         const accentColor = getRoleColor(member.designation);

                                         return (
                                             <SwiperSlide key={member._id || idx} className="flex justify-center">
                                                 <div 
                                                     className="bg-white w-[260px] h-[360px] p-8 rounded-[2rem] shadow-[0px_10px_25px_rgba(0,0,0,0.08)] hover:shadow-2xl border-2 border-transparent transition-all duration-500 text-center group flex flex-col items-center"
                                                     style={{ '--role-color': accentColor }}
                                                     onMouseEnter={(e) => {
                                                         e.currentTarget.style.borderColor = accentColor;
                                                         e.currentTarget.style.transform = 'translateY(-6px)';
                                                     }}
                                                     onMouseLeave={(e) => {
                                                         e.currentTarget.style.borderColor = 'transparent';
                                                         e.currentTarget.style.transform = 'translateY(0)';
                                                     }}
                                                 >
                                                     <div className="w-[160px] h-[160px] rounded-xl overflow-hidden mb-5 border-4 border-slate-50 shadow-md group-hover:shadow-lg transition-all">
                                                         <img 
                                                             src={member.photoUrl ? `${ASSET_BASE_URL}${member.photoUrl}` : `https://ui-avatars.com/api/?name=${member.name}&background=${accentColor.replace('#', '')}&color=fff`} 
                                                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                             alt={member.name} 
                                                         />
                                                     </div>
                                                     <h4 className="text-lg font-black text-slate-900 mb-1 leading-tight line-clamp-1 px-2 group-hover:text-[var(--role-color)] transition-colors">{member.name}</h4>
                                                     <p className="font-black text-[11px] uppercase tracking-widest mb-4 transition-colors group-hover:brightness-75" style={{ color: accentColor }}>{member.designation}</p>
                                                     <div className="mt-auto pt-5 border-t border-slate-50 w-full flex justify-center gap-6 text-slate-400">
                                                         {member.phone && member.phone !== 'उपलब्ध नाही' && (
                                                             <a href={`tel:${member.phone}`} className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = accentColor} onMouseLeave={(e) => e.currentTarget.style.color = ''} title={member.phone}><Phone size={18} /></a>
                                                         )}
                                                         <Mail size={18} className="hover:text-[var(--role-color)] cursor-pointer transition-colors" />
                                                     </div>
                                                 </div>
                                             </SwiperSlide>
                                         );
                                     })}
 
                                     {/* Custom Navigation */}
                                     <button className="swiper-button-prev-custom absolute left-0 top-[40%] -translate-y-1/2 -translate-x-12 z-20 bg-white p-4 rounded-full shadow-2xl border border-slate-100 text-slate-400 hover:text-gov-saffron hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden xl:flex items-center justify-center">
                                         <ChevronRight size={24} className="rotate-180" />
                                     </button>
                                     <button className="swiper-button-next-custom absolute right-0 top-[40%] -translate-y-1/2 translate-x-12 z-20 bg-white p-4 rounded-full shadow-2xl border border-slate-100 text-slate-400 hover:text-gov-saffron hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden xl:flex items-center justify-center">
                                         <ChevronRight size={24} />
                                     </button>
                                 </Swiper>
                             ) : (
                                 <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                                     <ScanFace size={32} className="mx-auto text-slate-100 animate-pulse mb-2" />
                                     <p className="text-slate-400 font-bold">पदाधिकारी व कर्मचाऱ्यांची माहिती उपलब्ध नाही.</p>
                                 </div>
                             )}
                         </div>
                     </div>
                </div>
            </section>

            {/* 6. Tourist Places Section */}
            {touristPlaces.length > 0 && (
                <section className="py-24 bg-slate-50 overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h3 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-xs mb-4">पर्यटन आणि संस्कृती</h3>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">पाहण्यासारखी ठिकाणे</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {touristPlaces.map((place, idx) => (
                                <motion.div 
                                    key={place._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 group flex flex-col"
                                >
                                    <div className="h-64 relative overflow-hidden">
                                        <img 
                                            src={`${ASSET_BASE_URL}${place.mainImage}`} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            alt={place.name} 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3 text-gov-saffron">
                                            <MapPin size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{place.location}</span>
                                        </div>
                                        <h4 className="text-2xl font-black text-slate-900 mb-3 line-clamp-1">{place.name}</h4>
                                        <p className="text-slate-500 font-bold text-sm mb-6 line-clamp-2 leading-relaxed italic">"{place.description}"</p>
                                        <Link 
                                            to={`/tourist-places/${place._id}`}
                                            className="mt-auto bg-slate-50 text-slate-900 hover:bg-gov-saffron hover:text-white w-full py-4 rounded-2xl font-black text-center transition-all flex items-center justify-center gap-2 group/btn"
                                        >
                                            अधिक माहिती <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7. Citizen Interaction Section */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h3 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-sm mb-4">संपर्क आणि सहभाग</h3>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">नागरिक संवाद</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                        {[
                            { title: 'समस्या नोंदवा', desc: 'गावातील समस्यांची तक्रार येथे करा.', icon: <AlertCircle className="text-red-500" /> },
                            { title: 'सूचना व प्रश्न शेअर करा', desc: 'आपल्या सुचना आणि प्रश्न आम्हाला कळवा.', icon: <HelpCircle className="text-blue-500" /> },
                            { title: 'तुमचा अभिप्राय द्या', desc: 'ग्रामपंचायत कारभारावर आपला अभिप्राय द्या.', icon: <ThumbsUp className="text-emerald-500" /> }
                        ].map((card, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3.5rem] flex flex-col items-center text-center group"
                            >
                                <div className="bg-white/10 p-5 rounded-3xl mb-6 group-hover:bg-gov-saffron transition-colors">
                                    {card.icon}
                                </div>
                                <h4 className="text-2xl font-black mb-4">{card.title}</h4>
                                <p className="text-slate-400 font-medium mb-8 leading-relaxed">{card.desc}</p>
                                <button className="mt-auto bg-white text-slate-900 px-8 py-3 rounded-2xl font-black hover:bg-gov-saffron hover:text-white transition-all shadow-xl">सुरू करा</button>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-12">
                        <div className="flex items-center gap-3">
                            <div className="bg-gov-saffron p-2 rounded-xl text-white"><Zap size={20}/></div>
                            <div>
                                <h4 className="text-gov-saffron font-black text-3xl">७/१२</h4>
                                <p className="text-xs uppercase tracking-widest font-bold opacity-60">ऑनलाईन उताऱ्यासाठी</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gov-blue p-2 rounded-xl text-white"><FileText size={20}/></div>
                            <div>
                                <h4 className="text-gov-blue font-black text-3xl">दाखले</h4>
                                <p className="text-xs uppercase tracking-widest font-bold opacity-60">विविध प्रकारचे दाखले</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500 p-2 rounded-xl text-white"><Users size={20}/></div>
                            <div>
                                <h4 className="text-emerald-500 font-black text-3xl">मतदार यादी</h4>
                                <p className="text-xs uppercase tracking-widest font-bold opacity-60">आपले नाव तपासा</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gov-blue/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gov-saffron/10 rounded-full blur-[120px]"></div>
            </section>




            {/* 8. Developmental Projects */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h3 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-xs mb-4">चालू कामे</h3>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">गावाचा विकास प्रकल्प</h2>
                        </div>
                        <Link to="/projects" className="text-gov-blue font-black flex items-center gap-2 hover:gap-3 transition-all">सर्व प्रकल्प पहा <ArrowRight size={20}/></Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.length > 0 ? projects.map((project, idx) => (
                            <motion.div 
                                key={project._id}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 group"
                            >
                                <div className="h-64 relative overflow-hidden">
                                    <img 
                                        src={project.imageUrl ? `${ASSET_BASE_URL}${project.imageUrl}` : "https://images.unsplash.com/photo-1541888941293-1e433f728f32?q=80&w=2070&auto=format&fit=crop"} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        alt={project.title} 
                                    />
                                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg">प्रगतीपथावर</div>
                                </div>
                                <div className="p-10">
                                    <h4 className="text-2xl font-black text-slate-900 mb-4 line-clamp-1">{project.title}</h4>
                                    <p className="text-slate-500 font-medium mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
                                    <div className="w-full bg-slate-100 h-2 rounded-full mb-2 overflow-hidden">
                                        <div className="bg-gov-saffron h-full w-[75%]"></div>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">७५% काम पूर्ण</p>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-200">
                                <Landmark size={48} className="mx-auto text-slate-200 mb-4 animate-pulse" />
                                <p className="text-slate-400 font-bold">प्रकल्पांची माहिती उपलब्ध नाही.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 10. Emergency Contact Section */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-red-500 font-black uppercase tracking-[0.3em] text-xs mb-4">तातडीची मदत</h3>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">आणीबाणीच्या वेळी संपर्क करा</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {emergencyServices.map((service, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-100 text-center flex flex-col items-center group"
                            >
                                <div className={`${service.color} text-white p-5 rounded-3xl mb-4 group-hover:rotate-12 transition-transform shadow-lg`}>
                                    {service.icon}
                                </div>
                                <h4 className="text-sm font-black text-slate-900 mb-2 leading-tight h-10 flex items-center">{service.title}</h4>
                                <a href={`tel:${service.phone}`} className="text-xl font-black text-gov-blue tracking-tighter hover:text-gov-saffron transition-colors">
                                    {service.phone}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-16 bg-red-50 p-10 rounded-[4rem] border border-red-100 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
                        <div className="flex items-center gap-6">
                            <div className="bg-red-500 text-white p-4 rounded-3xl animate-pulse shadow-xl shadow-red-200">
                                <PhoneCall size={32} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-slate-900">आपत्कालीन हेल्पलाईन</h4>
                                <p className="text-red-600 font-bold text-sm tracking-wide">२४/७ मदतीसाठी उपलब्ध</p>
                            </div>
                        </div>
                        <button className="bg-red-500 text-white px-10 py-5 rounded-[2.5rem] font-black shadow-lg shadow-red-200 hover:scale-105 transition-transform">आत्ता कॉल करा</button>
                    </div>
                </div>
            </section>


            {/* 9. Latest News Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h3 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-sm mb-3">बातम्या</h3>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">बातम्या व अद्यावत माहिती</h2>
                        </div>
                        <Link to="/news" className="text-primary-700 font-black flex items-center gap-2 hover:gap-3 transition-all">सर्व बातम्या पहा <ArrowRight size={20} /></Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {news.length > 0 ? news.map((item, idx) => (
                            <motion.div 
                                key={item._id}
                                className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 group flex flex-col"
                            >
                                <div className="h-56 relative overflow-hidden">
                                    <img 
                                        src={item.imageUrl ? `${ASSET_BASE_URL}${item.imageUrl}` : 'https://images.unsplash.com/photo-1504711432869-5d39a33dd39a?q=80&w=2070&auto=format&fit=crop'} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                        alt={item.title} 
                                    />
                                    <div className="absolute top-4 left-4 bg-gov-saffron text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">बातम्या</div>
                                </div>
                                <div className="p-10 flex-1 flex flex-col items-start">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Bell size={14} className="text-gov-saffron" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{new Date(item.createdAt).toLocaleDateString('mr-IN')}</span>
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-gov-saffron transition-colors">{item.title}</h4>
                                    <p className="text-slate-500 font-medium line-clamp-3 mb-8 italic">"{item.description}"</p>
                                    <Link to={`/news/${item._id}`} className="mt-auto text-gov-blue font-black flex items-center gap-2 group-hover:gap-4 transition-all">सविस्तर वाचा <ArrowRight size={20} /></Link>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-200">
                                <MessageSquare size={48} className="mx-auto text-slate-200 mb-4 animate-pulse" />
                                <p className="text-slate-400 font-bold">बातम्या उपलब्ध नाहीत.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 11. Social Media & Services Grid */}
             <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h3 className="text-gov-blue font-black uppercase tracking-[0.3em] text-xs mb-4">जलद दुवे</h3>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">महत्वाच्या सेवा व सोयी</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { title: 'ग्रामसभा', icon: <Users size={28} className="text-blue-500" /> },
                            { title: 'नोंदणी', icon: <FileText size={28} className="text-emerald-500" /> },
                            { title: 'कर भरणा', icon: <Landmark size={28} className="text-gov-saffron" /> },
                            { title: 'शिक्षण', icon: <GraduationCap size={28} className="text-indigo-500" /> },
                            { title: 'आरोग्य', icon: <HeartPulse size={28} className="text-rose-500" /> },
                            { title: 'पाणी पुरवठा', icon: <Droplets size={28} className="text-cyan-500" /> }
                        ].map((service, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center group cursor-pointer"
                            >
                                <div className="mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                                <h4 className="text-sm font-black text-slate-900 leading-tight">{service.title}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            {/* 12. Contact Section */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h3 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-sm mb-6">आमच्याशी संपर्क साधा</h3>
                            <h2 className="text-5xl font-black mb-12 tracking-tight">ग्रामपंचायत आपल्या <br/> सेवेसाठी सज्ज आहे.</h2>
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="bg-white/5 p-5 rounded-3xl group-hover:bg-gov-saffron transition-colors"><MapPin size={32}/></div>
                                    <div>
                                        <p className="text-gov-saffron font-bold text-sm uppercase tracking-widest mb-1">कार्यालय पत्ता</p>
                                        <h4 className="text-xl font-black leading-relaxed italic">{settings?.address || 'ग्रामपंचायत कार्यालय, भोन, ता. फुलंब्री, जि. छत्रपती संभाजीनगर.'}</h4>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="bg-white/5 p-5 rounded-3xl group-hover:bg-gov-saffron transition-colors"><Phone size={32}/></div>
                                    <div>
                                        <p className="text-gov-saffron font-bold text-sm uppercase tracking-widest mb-1">फोन नंबर</p>
                                        <h4 className="text-xl font-black">{settings?.phone || '+९१ १०००००००००'}</h4>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="bg-white/5 p-5 rounded-3xl group-hover:bg-gov-saffron transition-colors"><Mail size={32}/></div>
                                    <div>
                                        <p className="text-gov-saffron font-bold text-sm uppercase tracking-widest mb-1">ईमेल</p>
                                        <h4 className="text-xl font-black text-xs break-all">{settings?.email || 'contact@grampanchayat.in'}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="aspect-square bg-white/5 rounded-[4rem] border border-white/10 p-4 relative group">
                            <div className="w-full h-full rounded-[3.5rem] bg-slate-800 overflow-hidden relative shadow-2xl">
                                {/* Map Placeholder */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-slate-950/20">
                                    <MapPin size={64} className="text-gov-saffron mb-6 animate-bounce" />
                                    <h4 className="text-3xl font-black mb-4">ग्रामपंचायत कार्यालय नकाशा</h4>
                                    <p className="opacity-60 font-medium max-w-xs">येथे गुगल मॅप्सचे स्थान दाखवले जाईल. आम्ही लवकरच नकाशा अपडेट करू.</p>
                                    <button className="mt-8 bg-white text-slate-900 px-10 py-4 rounded-2xl font-black hover:bg-gov-saffron hover:text-white transition-all shadow-2xl active:scale-95">मोठ्या नकाशात उघडा</button>
                                </div>
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gov-saffron/20 rounded-full blur-3xl group-hover:bg-gov-saffron/40 transition-colors"></div>
                        </div>
                    </div>
                </div>
            </section>
            {/* 13. Government Important Links */}
            <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h3 className="text-gov-saffron font-black uppercase tracking-[0.3em] text-xs mb-4">शासकीय महत्वाचे दुवे</h3>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">शासकीय महत्वाचे दुवे</h2>
                        <p className="text-slate-500 font-bold text-sm tracking-wide">महत्वाच्या शासकीय संकेतस्थळांचे दुवे</p>
                    </div>

                    {/* Desktop/Tablet Grid */}
                    <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-8">
                        {importantLinks.map((link, i) => (
                            <motion.a 
                                key={i} 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                whileHover={{ y: -12, scale: 1.02 }}
                                className="bg-slate-50 p-10 rounded-[3rem] flex flex-col items-center justify-center gap-6 border border-slate-100 shadow-lg hover:shadow-2xl hover:bg-white transition-all group"
                            >
                                <div className="h-20 w-full flex items-center justify-center relative">
                                    <img 
                                        src={link.logo} 
                                        alt={link.name} 
                                        onError={(e) => handleImageError(e, link.name)}
                                        className="w-[80px] h-auto object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                                        style={{ width: '80px' }}
                                    />
                                </div>
                                <span className="text-[10px] font-black text-slate-900 text-center uppercase tracking-[0.2em] leading-tight opacity-40 group-hover:opacity-100 transition-opacity border-t border-slate-200 pt-6 w-full">{link.name}</span>
                            </motion.a>
                        ))}
                    </div>

                    {/* Mobile Swiper Slider */}
                    <div className="md:hidden">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1.2}
                            centeredSlides={true}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            loop={true}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            className="!pb-12"
                        >
                            {importantLinks.map((link, i) => (
                                <SwiperSlide key={i}>
                                    <a 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-slate-50 p-12 rounded-[3.5rem] flex flex-col items-center justify-center gap-8 border border-slate-100 shadow-xl h-full active:scale-95 transition-transform"
                                    >
                                        <div className="h-28 w-full flex items-center justify-center">
                                            <img 
                                                src={link.logo} 
                                                alt={link.name} 
                                                onError={(e) => handleImageError(e, link.name)}
                                                className="w-[80px] h-auto object-contain" 
                                                style={{ width: '80px' }}
                                            />
                                        </div>
                                        <span className="text-xs font-black text-slate-900 text-center uppercase tracking-widest leading-relaxed border-t border-slate-200 pt-6 w-full">{link.name}</span>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                
                {/* Decoration */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-gov-saffron/5 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-gov-blue/5 rounded-full blur-[100px]"></div>
            </section>
        </div>
    );
};

export default Home;
