import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();

    // Fetch ALL complaints
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const { data } = await API.get('/complaints/all');
                setComplaints(data);
            } catch (err) {
                navigate('/');
            }
        };
        fetchAll();
    }, [navigate]);

    // Handle Status Change (Pending -> Resolved)
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await API.put(`/complaints/${id}`, { status: newStatus });
            // Refresh the list locally to show the change immediately
            setComplaints(complaints.map(c => 
                c._id === id ? { ...c, status: newStatus } : c
            ));
        } catch (err) {
            alert('Update Failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8 text-white"> {/* Dark Mode for Leaders */}
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Club Leader Dashboard</h1>
                    <button onClick={() => { localStorage.clear(); navigate('/'); }} className="bg-red-600 px-4 py-2 rounded">Logout</button>
                </div>

                <div className="grid gap-4">
                    {complaints.map((c) => (
                        <div key={c._id} className="bg-gray-800 p-6 rounded-lg flex justify-between items-center">
                            <div className="flex gap-4">
                                {c.imageUrl && <img src={c.imageUrl} className="w-24 h-24 object-cover rounded" />}
                                <div>
                                    <h3 className="text-xl font-bold text-blue-400">{c.title}</h3>
                                    <p className="text-gray-300">{c.description}</p>
                                    <p className="text-sm text-gray-500 mt-2">Submitted by: {c.user?.name || 'Unknown'}</p>
                                </div>
                            </div>

                            {/* Status Controller */}
                            <div className="flex flex-col items-end gap-2">
                                <span className={`px-3 py-1 rounded text-sm font-bold ${
                                    c.status === 'Resolved' ? 'bg-green-600' : 'bg-yellow-600'
                                }`}>
                                    {c.status}
                                </span>
                                
                                {c.status !== 'Resolved' && (
                                    <button 
                                        onClick={() => handleStatusUpdate(c._id, 'Resolved')}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Mark Resolved
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;