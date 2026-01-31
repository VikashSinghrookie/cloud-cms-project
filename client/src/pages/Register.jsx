import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default is Member (user)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // We send the 'role' to the backend now
            await API.post('/auth/register', { name, email, password, role });
            alert('Registration Successful! Please Login.');
            navigate('/');
        } catch (err) {
            alert('Registration Failed. Email might be taken.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Join the Club</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" className="w-full p-2 mb-4 border rounded" onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" onChange={(e) => setPassword(e.target.value)} required />
                    
                    {/* NEW: Role Selection Dropdown */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">I am a:</label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border rounded bg-white"
                        >
                            <option value="user">Club Member</option>
                            <option value="admin">Club Leader</option>
                        </select>
                    </div>

                    <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold">Register</button>
                    <p className="mt-4 text-center text-sm">
                        Already a member? <Link to="/" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;