import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for redirection

const AddBusiness = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        location: "",
        services: "",
        pricing: "",
        description: "",
        image: null
    });

    const [error, setError] = useState(null); // To handle error messages
    const [successMessage, setSuccessMessage] = useState(""); // For success message
    const navigate = useNavigate(); // Hook for routing

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  // Clear previous errors
        setSuccessMessage(""); // Clear previous success message

        try {
            const token = localStorage.getItem("authToken");

            if (!token) {
                setError("User not authenticated. Please log in.");
                return;
            }

            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("location", formData.location);
            formDataToSend.append("services", formData.services);
            formDataToSend.append("pricing", formData.pricing);
            formDataToSend.append("description", formData.description);

            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            const response = await axios.post("https://businessfinder-m6cy.onrender.com/api/business", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            });

            if (response.data.success) {
                console.log("Business added successfully:", response.data.business);
                setSuccessMessage("Business added successfully!");

                // Redirect to the business details page using the business ID
                navigate("/dashboard"); 
            } else {
                setError("Failed to submit business details. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting business data:", err);
            setError("Failed to submit business details. Please try again.");
        }
    };

    return (
        <div style={formContainerStyle}>
            <div style={formCardStyle}>
                <h1>Add Your Business</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div style={inputGroupStyle}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Business Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <textarea
                            name="services"
                            placeholder="Services"
                            value={formData.services}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <textarea
                            name="pricing"
                            placeholder="Pricing"
                            value={formData.pricing}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                        <textarea
                            name="description"
                            placeholder="Business Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={fileInputWrapperStyle}>
                        <label htmlFor="image" style={labelStyle}>Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={fileInputStyle}
                        />
                    </div>

                    <button type="submit" style={submitButtonStyle}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

// Styles for the form and dashboard view
const formContainerStyle = {
    background: "#EAE6FB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "20px"
};

const formCardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
};

const inputStyle = {
    width: "95%",
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #dcdcdc",
    backgroundColor: "#f9f9f9",
    outline: "none"
};

const inputGroupStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "15px",
    marginBottom: "15px"
};

const submitButtonStyle = {
    backgroundColor: "#5B51FB",
    color: "#fff",
    border: "none",
    width: "100%",
    padding: "12px 0",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
};

const fileInputWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "15px"
};

const labelStyle = {
    fontSize: "14px",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#333"
};

const fileInputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #dcdcdc",
    backgroundColor: "#f9f9f9",
    outline: "none"
};

export default AddBusiness;
