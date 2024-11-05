import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./authContext";
import Header from './header';
import NavBar from './navbar';
import Footer from './footer';

const Login = ({ location }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Header location={location}/>
            <NavBar />
            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <div className="error-message">{error}</div>}
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
                    <div id="login-signup-container">
                        <button type="submit">Login</button>
                        <p>
                            <Link to={'/signup'}>Create a new Account</Link>
                        </p>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Login;