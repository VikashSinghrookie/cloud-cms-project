import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All'); // For filtering UI

    // Fetch complaints
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const { data } = await API.get('/complaints');
                setComplaints(data);
            } catch (err) {
                navigate('/');
            }
        };
        fetchComplaints();
    }, [navigate]);

    return (
        <div className="flex h-screen bg-gray-50">
            
            {/* 1. LEFT SIDEBAR */}
            <div className="w-64 bg-indigo-900 text-white flex flex-col hidden md:flex">
                <div className="p-6 text-2xl font-bold tracking-wider">
                    CLUB<span className="text-indigo-400">CMS</span>
                </div>
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <button className="w-full text-left px-4 py-3 bg-indigo-800 rounded-lg font-medium shadow-sm">
                        📊 Dashboard
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-indigo-800 rounded-lg text-indigo-200 transition">
                        👤 My Profile
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-indigo-800 rounded-lg text-indigo-200 transition">
                        ⚙️ Settings
                    </button>
                </nav>
                <div className="p-4 border-t border-indigo-800">
                    <button 
                        onClick={() => { localStorage.clear(); navigate('/'); }}
                        className="w-full bg-red-500 hover:bg-red-600 py-2 rounded text-sm font-bold transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* 2. MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Top Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
                    <h2 className="text-xl font-semibold text-gray-700">Member Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Welcome back, User</span>
                        <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                            U
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    
                    {/* Action Bar */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
                            <p className="text-gray-500">Track and manage your club issues</p>
                        </div>
                        <button 
                            onClick={() => navigate('/new-complaint')}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1 font-semibold flex items-center gap-2"
                        >
                            <span>+</span> File New Complaint
                        </button>
                    </div>

                    {/* Stats Cards (Decorative) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
                            <p className="text-gray-500 text-sm">Total Complaints</p>
                            <p className="text-2xl font-bold">{complaints.length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                            <p className="text-gray-500 text-sm">Pending</p>
                            <p className="text-2xl font-bold">{complaints.filter(c => c.status !== 'Resolved').length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                            <p className="text-gray-500 text-sm">Resolved</p>
                            <p className="text-2xl font-bold">{complaints.filter(c => c.status === 'Resolved').length}</p>
                        </div>
                    </div>

                    {/* Complaints Grid */}
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Recent Activity</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {complaints.map((c) => (
                            <div key={c._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col md:flex-row">
                                {/* Image Section */}
                                {c.imageUrl ? (
                                    <div className="w-full md:w-1/3 h-48 md:h-auto bg-gray-200">
                                        <img src={c.imageUrl} alt="Evidence" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-full md:w-1/3 h-48 md:h-auto bg-indigo-50 flex items-center justify-center text-indigo-200">
                                        <span>No Image</span>
                                    </div>
                                )}
                                
                                {/* Content Section */}
                                <div className="p-6 flex flex-col justify-between w-full">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-bold text-gray-800">{c.title}</h4>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                c.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {c.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{c.description}</p>
                                    </div>
                                    <div className="text-xs text-gray-400 border-t pt-4 mt-auto">
                                        ID: {c._id.substring(c._id.length - 8)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {complaints.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-400 text-lg">No complaints found. Enjoy your day!</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;