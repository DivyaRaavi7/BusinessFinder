import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    // Correctly define the handleRegister function for frontend
    const handleRegister = async (formData) => {
        try {
            const response = await axios.post(
                "http://localhost:5001/api/auth/register",
                formData
            );

            if (response.status === 201) {
                console.log("User successfully created:", response.data);
                alert("User registered successfully!");
                navigate("/login"); // Redirect after successful registration
            }
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response.data.message);
                alert(error.response.data.message || "Registration failed.");
            } else if (error.request) {
                console.error("No response from server:", error.request);
                alert("No response from server. Please try again later.");
            } else {
                console.error("Error:", error.message);
                alert("An error occurred. Please try again.");
            }
        }
    };

    return <RegisterForm onSubmit={handleRegister} />;
};

export default Register;
