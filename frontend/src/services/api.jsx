import axios from 'axios';

const API_URL = 'https://businessfinder-m6cy.onrender.com/api'; // Adjust this if your backend runs on a different port

// Add Business
export const addBusiness = async (businessData, token) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.post(`${API_URL}/businesses`, businessData, config);
        return response.data;
    } catch (error) {
        console.error("Error adding business:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Failed to add business");
    }
};

// Get All Businesses
export const getAllBusinesses = async () => {
    try {
        const response = await axios.get(`${API_URL}/businesses`);
        return response.data;
    } catch (error) {
        console.error("Error fetching businesses:", error.response?.data?.message || error.message);
        throw new Error("Failed to fetch businesses");
    }
};

// Get Business By ID
export const getBusinessById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/businesses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching business details:", error.response?.data?.message || error.message);
        throw new Error("Failed to fetch business details");
    }
};

// Update Business
export const updateBusiness = async (id, businessData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.put(`${API_URL}/businesses/${id}`, businessData, config);
        return response.data;
    } catch (error) {
        console.error("Error updating business:", error.response?.data?.message || error.message);
        throw new Error("Failed to update business");
    }
};

// Delete Business
export const deleteBusiness = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.delete(`${API_URL}/businesses/${id}`, config);
        return response.data;
    } catch (error) {
        console.error("Error deleting business:", error.response?.data?.message || error.message);
        throw new Error("Failed to delete business");
    }
};
