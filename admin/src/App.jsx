import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/ADD/Add';
import List from './pages/LIST/List';
import Order from './pages/ORDERS/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // ✅ DEPLOY-SAFE BACKEND URL
  const url = import.meta.env.VITE_BACKEND_URL;

  return (
    <div>
      <ToastContainer />

      <Navbar />
      <hr />

      <div className="app-content" style={{ display: 'flex' }}>
        <Sidebar />

        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Order url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;