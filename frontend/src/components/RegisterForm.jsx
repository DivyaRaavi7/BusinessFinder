import { useState } from "react";

const RegisterForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        termsAccepted: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.termsAccepted) {
            alert("Please accept the Terms of Service to proceed.");
            return;
        }
    
        console.log("Before Normalization - Role:", formData.role); // Debugging
    
        // ✅ Normalize role to match backend's enum ["user", "businessOwner"]
        const normalizedRole = formData.role === "businessOwner" ? "businessOwner" : "user";
    
        console.log("After Normalization - Role:", normalizedRole); // Debugging
    
        const normalizedData = { ...formData, role: normalizedRole };
    
        console.log("Submitting form with role:", normalizedData.role); // Debugging log
    
        onSubmit(normalizedData);
    };
    
    

    const formContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f3f3"
    };

    const formBoxStyle = {
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px"
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px"
    };

    const buttonStyle = {
        width: "100%",
        backgroundColor: "#4B57FF",
        color: "#fff",
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold"
    };

    const termsStyle = {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px"
    };

    const linkStyle = {
        color: "#4B57FF",
        textDecoration: "underline",
        cursor: "pointer"
    };

    return (
        <div style={formContainerStyle}>
            <div style={formBoxStyle}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
                    CREATE ACCOUNT
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>
                            Select Role:
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="user">User</option>
                            <option value="businessOwner">Business Owner</option>
                        </select>
                    </div>

                    <div style={termsStyle}>
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            style={{ marginRight: "8px" }}
                            required
                        />
                        <label>
                            I agree to all statements in{" "}
                            <span style={linkStyle}>Terms of Service</span>
                        </label>
                    </div>

                    <button type="submit" style={buttonStyle}>
                        SIGN UP
                    </button>

                    <p style={{ textAlign: "center", marginTop: "15px" }}>
                        Have already an account?{" "}
                        <span style={linkStyle}>Login here</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
