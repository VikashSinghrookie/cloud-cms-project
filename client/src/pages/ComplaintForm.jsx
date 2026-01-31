import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const ComplaintForm = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Use FormData for file uploads
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', desc);
        if (file) formData.append('image', file);

        try {
            await API.post('/complaints', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Complaint Submitted Successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Upload Failed. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">File a Complaint</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Title</label>
                        <input 
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="e.g. WiFi Broken" 
                            onChange={(e) => setTitle(e.target.value)} 
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea 
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Describe the issue..." 
                            rows="4"
                            onChange={(e) => setDesc(e.target.value)} 
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Evidence (Image)</label>
                        <input 
                            type="file" 
                            className="w-full text-sm text-gray-500 border p-1 rounded" 
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                        {loading ? 'Uploading to Cloud...' : 'Submit Complaint'}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="w-full text-gray-500 text-sm mt-2 hover:underline"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ComplaintForm;