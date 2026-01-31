import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', { email, password });

            // 1. Save Token
            localStorage.setItem('token', data.token);
            
            // 2. Alert Success
            alert('Login Successful!');

            // 3. Redirect based on Role (Club Logic)
            if (data.role === 'admin') {
                navigate('/admin'); // Club Leaders go here
            } else {
                navigate('/dashboard'); // Club Members go here
            }

        } catch (err) {
            console.error(err);
            alert('Invalid Credentials');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Club Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold transition">
                        Login
                    </button>
                    
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Not a member yet?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                            Join the Club
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;