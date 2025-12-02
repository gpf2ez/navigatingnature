import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SiteProvider, useSite } from './services/SiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import CalendarPage from './pages/Calendar';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import MapExplorer from './pages/MapExplorer';
import Community from './pages/Community';

// Layout Component for Public Pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Protected Admin Route
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useSite();
  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/map" element={<PublicLayout><MapExplorer /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/community" element={<PublicLayout><Community /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
      <Route path="/calendar" element={<PublicLayout><CalendarPage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      
      {/* Admin Route */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <SiteProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </SiteProvider>
  );
}

export default App;