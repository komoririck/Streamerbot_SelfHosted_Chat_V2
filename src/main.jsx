import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';
import './styleAnimations.css';
import Chatbox from './Chatbox.jsx';
import AdminPanel from './AdminPanel.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Chatbox />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </Router>
    </StrictMode>
);
