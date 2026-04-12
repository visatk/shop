import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Marketplace from '@/pages/Marketplace';
import Settings from '@/pages/Settings';

export default function App() {
  return (
    <Router>
      <Toaster theme="dark" position="top-right" />
      <Routes>
        {/* Main Layout Wrapper */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
