import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Schemes from './pages/public/Schemes';
import NoticeBoard from './pages/public/NoticeBoard';
import Gallery from './pages/public/Gallery';
import DevelopmentProjects from './pages/public/DevelopmentProjects';
import NewsDetails from './pages/public/NewsDetails';
import News from './pages/public/News';
import Contact from './pages/public/Contact';
import Login from './pages/auth/Login';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageNotices from './pages/admin/ManageNotices';
import ManageProjects from './pages/admin/ManageProjects';
import ManageNews from './pages/admin/ManageNews';
import ManageGallery from './pages/admin/ManageGallery';
import ManageSchemes from './pages/admin/ManageSchemes';
import ManageStaff from './pages/admin/ManageStaff';
import ManageServices from './pages/admin/ManageServices';
import GeneralSettings from './pages/admin/GeneralSettings';
import ManageTouristPlaces from './pages/admin/ManageTouristPlaces';
import ManageVillageInfo from './pages/admin/ManageVillageInfo';

// Public Pages Detail
import TouristPlaceDetail from './pages/public/TouristPlaceDetail';
import InfoPage from './pages/public/InfoPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" />;
    return children;
};

function App() {
    return (
        <Router>
            <Toaster position="top-right" />
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/schemes" element={<Schemes />} />
                    <Route path="/notices" element={<NoticeBoard />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/projects" element={<DevelopmentProjects />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:id" element={<NewsDetails />} />
                    <Route path="/tourist-places/:id" element={<TouristPlaceDetail />} />
                    <Route path="/shaharavishayi" element={<InfoPage slugProp="shaharavishayi" />} />
                    <Route path="/natyagruh-kala-dalan" element={<InfoPage slugProp="natyagruh-kala-dalan" />} />
                    <Route path="/udyane" element={<InfoPage slugProp="udyane" />} />
                    <Route path="/preshaniya-thikane" element={<InfoPage slugProp="preshaniya-thikane" />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="notices" element={<ManageNotices />} />
                    <Route path="projects" element={<ManageProjects />} />
                    <Route path="news" element={<ManageNews />} />
                    <Route path="gallery" element={<ManageGallery />} />
                    <Route path="tourist-places" element={<ManageTouristPlaces />} />
                    <Route path="village-info" element={<ManageVillageInfo />} />
                    <Route path="schemes" element={<ManageSchemes />} />
                    <Route path="staff" element={<ManageStaff />} />
                    <Route path="services" element={<ManageServices />} />
                    <Route path="settings" element={<GeneralSettings />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
