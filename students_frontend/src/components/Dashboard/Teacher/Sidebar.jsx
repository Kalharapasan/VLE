// src/components/Dashboard/Sidebar.jsx
import React from 'react';
import './Sidebar.css'; // Optional styling

const Sidebar = ({ view, setView, darkMode }) => {
    return (
        <div className={`sidebar bg-${darkMode ? 'dark' : 'primary'} text-white`}>
            <h4 className="p-3">TEACHER</h4>
            <button
                className={`btn w-100 mb-2 ${view === 'profile' ? 'btn-light text-dark' : 'btn-outline-light'}`}
                onClick={() => setView('profile')}
            >
                My Profile
            </button>
        </div>
    );
};

export default Sidebar;
