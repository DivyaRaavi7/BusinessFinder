import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const { data } = await axios.post("http://localhost:5001/api/auth/login", {
                email,
                password,
            });
    
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("userName", data.name); // ✅ Store user's name
    
            if (data.role === "businessOwner") {
                navigate("/");
            } else if (data.role === "user") {
                navigate("/services");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data?.message || error.message);
            alert("Login failed. Please check your credentials.");
        }
    };
    
    

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5'
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                width: '350px',
                textAlign: 'center'
            }}>
                <h1 style={{ marginBottom: '20px' }}>LOGIN</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            outline: 'none'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '20px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            outline: 'none'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            width: '100%',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Login
                    </button>
                </form>
                <p style={{ marginTop: '15px' }}>
                    Don't have an account? <a href="/register" style={{ color: '#4CAF50' }}>Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
