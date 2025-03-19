import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [userName, setUserName] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const storedRole = localStorage.getItem("role");
        const storedName = localStorage.getItem("userName");

        if (token && storedRole) {
            setIsLoggedIn(true);
            setRole(storedRole);
            setUserName(storedName || "User");
        } else {
            setIsLoggedIn(false);
            setRole(null);
        }
    }, []);

    const handleUserLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setRole(null);
        navigate("/");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const closeDropdown = (event) => {
            if (!event.target.closest(".dropdown-container")) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
    }, []);

    const handleNavigation = (path) => {
        console.log(`Current Path: ${window.location.pathname}`); // Debugging
        console.log(`Navigating to: ${path}`); // Debugging
        
        setDropdownOpen(false); // ✅ Close dropdown first
        setTimeout(() => {
            navigate(path); // ✅ Navigate after dropdown closes
        }, 100); // Small delay to ensure proper navigation
    };
    

    const navbarStyle = {
        backgroundColor: '#1a1a2e',
        color: '#fff',
        padding: '30px 35px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px'
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        color: '#f1c40f',
        border: '2px solid #f1c40f',
        padding: '8px 20px',
        marginLeft: '15px',
        fontSize: '18px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontWeight: '550'
    };

    const dropdownStyle = {
        display: dropdownOpen ? "block" : "none",
        position: 'absolute',
        right: 0,
        backgroundColor: '#1a1a2e',
        color: '#fff',
        minWidth: '200px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        padding: '12px 16px',
        zIndex: 1,
        borderRadius: "5px",
    };

    return (
        <nav style={navbarStyle}>
            <div style={{ fontWeight: 'bold' }}>BusinessFinder</div>
            <div>
                {isLoggedIn ? (
                    role === "businessOwner" ? (
                        <div className="dropdown-container" style={{ position: 'relative', display: 'inline-block' }}>
                            <button onClick={toggleDropdown} style={buttonStyle}>
                                {userName} ▼
                            </button>
                            <div style={dropdownStyle} className="dropdown-content">
                                <p 
                                    style={{ cursor: 'pointer', padding: "10px" }} 
                                    onClick={() => handleNavigation('/add-business')}
                                >
                                    Add Business Details
                                </p>
                                <p 
                                    style={{ cursor: 'pointer', padding: "10px" }} 
                                    onClick={() => {
                                        console.log("Dashboard clicked! Navigating to /dashboard");
                                        handleNavigation('/dashboard');
                                    }}
                                >
                                    Dashboard
                                </p>
                                <p 
                                    style={{ cursor: 'pointer', padding: "10px", color: "red" }} 
                                    onClick={handleUserLogout}
                                >
                                    Logout
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => navigate('/')} style={buttonStyle}>Home</button>
                            <button onClick={handleUserLogout} style={buttonStyle}>Logout</button>
                        </>
                    )
                ) : (
                    <>
                        <button onClick={() => navigate('/login')} style={buttonStyle}>Login</button>
                        <button onClick={() => navigate('/register')} style={buttonStyle}>Register</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
