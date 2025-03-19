import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            const token = localStorage.getItem("authToken"); 
            if (!token) {
                console.error("❌ No auth token found.");
                return;
            }

            console.log("✅ Auth Token Found:", token);

            try {
                const response = await axios.get("https://businessfinder-m6cy.onrender.com/api/business/mybusiness", {
                    headers: { Authorization: `Bearer ${token}` }, 
                });

                console.log("✅ Business Data:", response.data);
                setBusinesses(response.data.businesses);
            } catch (error) {
                console.error("❌ Error fetching business details:", error.response ? error.response.data : error);
            }
        };

        fetchBusinesses();
    }, []);

    // ✅ Handle Business Deletion (without reloading the page)
    const handleDelete = async (businessId) => {
        if (window.confirm("Are you sure you want to delete this business?")) {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("❌ No auth token found.");
                return;
            }

            try {
                await axios.delete(`https://businessfinder-m6cy.onrender.com/api/business/${businessId}`, {
                    headers: { Authorization: `Bearer ${token}` }, 
                });

                console.log("✅ Business deleted successfully.");
                setBusinesses(businesses.filter((business) => business._id !== businessId)); // ✅ Update state instead of reloading
            } catch (error) {
                console.error("❌ Error deleting business:", error.response ? error.response.data : error);
            }
        }
    };

    return (
        <div style={styles.dashboardContainer}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Dashboard</h2>
                <ul style={styles.sidebarList}>
                    <li><Link to="/add-business" style={styles.sidebarLink}>Orders</Link></li>
                    <li><Link to="/settings" style={styles.sidebarLink}>Reviews</Link></li>
                </ul>
            </aside>

            {/* Main Content */}
            <main style={styles.mainContent}>
                <h2 style={styles.heading}>My Business Details</h2>

                {businesses.length === 0 ? (
                    <p>No businesses found. <Link to="/add-business">Add one</Link></p>
                ) : (
                    <table style={styles.businessTable}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Business Name</th>
                                <th style={styles.tableHeader}>Category</th>
                                <th style={styles.tableHeader}>Location</th>
                                <th style={styles.tableHeader}>Services</th>
                                <th style={styles.tableHeader}>Pricing</th>
                                <th style={styles.tableHeader}>Description</th>
                                <th style={styles.tableHeader}>Image</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {businesses.map((business) => (
                                <tr key={business._id}>
                                    <td style={styles.tableCell}>{business.name}</td>
                                    <td style={styles.tableCell}>{business.category}</td>
                                    <td style={styles.tableCell}>{business.location}</td>
                                    <td style={styles.tableCell}>{business.services}</td>
                                    <td style={styles.tableCell}>{business.pricing}</td>
                                    <td style={styles.tableCell}>{business.description}</td>
                                    <td style={styles.tableCell}>
                                        {business.image && <img src={business.image} alt="Business" width="50" />}
                                    </td>
                                    <td style={{ ...styles.tableCell, textAlign: "center" }}>
                                        <Link to={`/edit-business/${business._id}`} 
                                              style={{ ...styles.actionBtn, background: "#10b981", marginRight: "10px" }}>
                                            Edit
                                        </Link>
                                        <button style={{ ...styles.actionBtn, background: "#ef4444" }} 
                                                onClick={() => handleDelete(business._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
};

// ✅ Styles Object (Only Updated Button Styles)
const styles = {
    dashboardContainer: {
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
    },
    sidebar: {
        width: "250px",
        background: "#3B82F6",
        color: "white",
        padding: "20px",
    },
    sidebarTitle: {
        textAlign: "center",
    },
    sidebarList: {
        listStyle: "none",
        padding: "0",
    },
    sidebarLink: {
        display: "block",
        padding: "10px",
        margin: "10px 0",
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
    },
    mainContent: {
        flexGrow: 1,
        padding: "20px",
        background: "#f4f6f9",
    },
    heading: {
        marginBottom: "20px",
    },
    businessTable: {
        width: "100%",
        borderCollapse: "collapse",
        background: "white",
        borderRadius: "8px",
        overflow: "hidden",
    },
    tableHeader: {
        background: "#3B82F6",
        color: "white",
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "left",
    },
    tableCell: {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "left",
    },
    actionBtn: {
        display: "inline-block",
        width: "100px", // ✅ Increased width for better alignment
        height: "40px", // ✅ Slightly taller for uniformity
        lineHeight: "40px",
        textAlign: "center",
        borderRadius: "5px",
        margin: "5px",
        fontSize: "14px",
        fontWeight: "bold",
        color: "white",
        border: "none",
        cursor: "pointer",
        textDecoration: "none",
    },
};

export default Dashboard;
