import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./authContext";
import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";

const Signup = ({ location }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Basic validation
        if (!formData.email || !formData.password || !formData.name) {
            setError('All fields are required');
            return;
        }

        // Password validation
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            await signup(formData.email, formData.password, formData.name);
            navigate('/');
        } catch (error) {
            setError(error.message || 'Failed to create account');
        }
    };

    return (
        <>
            <Header location={location}/>
            <NavBar />
            <div className="auth-container">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Sign Up</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <input 
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <div id="login-signup-container">
                        <button type="submit">Sign Up</button>
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Signup;