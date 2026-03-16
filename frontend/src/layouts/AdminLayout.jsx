import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import { Bell, Search, User } from 'lucide-react';

const AdminLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            
            <div className="flex-grow flex flex-col">
                {/* Admin Header */}
                <header className="bg-white border-b border-slate-200 h-20 sticky top-0 z-[50] flex items-center justify-between px-8">
                    <div className="relative w-96 hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search records, notices..." 
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-primary-500 transition outline-none text-sm"
                        />
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 leading-none">{user.username || 'Admin'}</p>
                                <p className="text-[10px] uppercase font-bold text-primary-600 mt-1 tracking-widest">GP Administrator</p>
                            </div>
                            <div className="h-10 w-10 bg-primary-700 text-white rounded-xl flex items-center justify-center font-bold">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
