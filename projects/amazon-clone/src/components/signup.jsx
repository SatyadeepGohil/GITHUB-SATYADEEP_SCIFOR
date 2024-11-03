import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import Header from "./header";
import NavBar from "./navbar";
import Footer from "./footer";

const Signup = ({ location }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Header />
            <NavBar />
            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <input 
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Signup;