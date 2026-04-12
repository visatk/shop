import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Marketplace from '@/pages/Marketplace';
import Settings from '@/pages/Settings';
import OrderHistory from '@/pages/OrderHistory';
import AddFunds from '@/pages/AddFunds';
import Rules from '@/pages/Rules';
import Tickets from '@/pages/Tickets';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

export default function App() {
  return (
    <Router>
      <Toaster theme="dark" position="top-right" toastOptions={{ className: 'bg-[#151822] border-[#1F2433] text-slate-200' }} />
      <Routes>
        {/* Public Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes wrapped in the Sidebar Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
