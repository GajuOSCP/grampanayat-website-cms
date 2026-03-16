import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, Bell, Construction, Newspaper, 
    Image as ImageIcon, Briefcase, Users, Wrench, 
    Settings, LogOut, ChevronLeft, Landmark, MapPin, Info
} from 'lucide-react';

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'डॅशबोर्ड', icon: LayoutDashboard, path: '/admin' },
        { name: 'नोटीस बोर्ड', icon: Bell, path: '/admin/notices' },
        { name: 'विकास कामे', icon: Construction, path: '/admin/projects' },
        { name: 'बातम्या', icon: Newspaper, path: '/admin/news' },
        { name: 'गॅलरी', icon: ImageIcon, path: '/admin/gallery' },
        { name: 'पर्यटन स्थळे', icon: MapPin, path: '/admin/tourist-places' },
        { name: 'ग्राम माहिती', icon: Info, path: '/admin/village-info' },
        { name: 'शासकीय योजना', icon: Briefcase, path: '/admin/schemes' },
        { name: 'पदाधिकारी व कर्मचारी', icon: Users, path: '/admin/staff' },
        { name: 'लोकसेवा (Services)', icon: Wrench, path: '/admin/services' },
        { name: 'सेटिंग्ज', icon: Settings, path: '/admin/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <aside className={`bg-slate-900 text-slate-400 h-screen fixed sticky top-0 left-0 transition-all duration-300 flex flex-col z-[100] ${isCollapsed ? 'w-20' : 'w-72'}`}>
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/5">
                {!isCollapsed && (
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-600 text-white p-2 rounded-xl">
                            <Landmark size={20} />
                        </div>
                        <span className="text-white font-bold tracking-tight text-lg">प्रशासकीय पॅनेल</span>
                    </div>
                )}
                {isCollapsed && (
                    <div className="bg-primary-600 text-white p-2 rounded-xl mx-auto">
                        <Landmark size={20} />
                    </div>
                )}
            </div>

            {/* Menu */}
            <nav className="flex-grow p-4 mt-4 space-y-2 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) => `
                            flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-300
                            ${isActive 
                                ? 'bg-primary-700 text-white shadow-lg shadow-primary-900/40' 
                                : 'hover:bg-white/5 hover:text-white'
                            }
                            ${isCollapsed ? 'justify-center px-0' : ''}
                        `}
                        title={isCollapsed ? item.name : ''}
                    >
                        <item.icon size={22} className={isCollapsed ? '' : 'shrink-0'} />
                        {!isCollapsed && <span>{item.name}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-red-400 hover:bg-red-500/10 transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                    <LogOut size={22} />
                    {!isCollapsed && <span>बाहेर पडा</span>}
                </button>
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="mt-4 w-full flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-slate-500"
                >
                    <ChevronLeft size={20} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
