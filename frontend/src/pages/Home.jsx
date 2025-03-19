import React, { useState } from 'react';
import Footer from '../components/Footer'; // Import Footer Component

const HomePage = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSearchClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const styles = {
        container: {
            backgroundColor: "#e6e6fa",
            padding: "40px 20px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        content: {
            backgroundColor: "#fff",
            borderRadius: "25px",
            padding: "80px 100px",
            marginTop: "-30px",
            display: "flex",
            alignItems: "center",
            gap: "70px",
            maxWidth: "1300px",
            width: "100%",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        },
        textSection: { flex: 1 },
        imageSection: { flex: 1 },
        heading: {
            fontSize: "3.5rem",
            fontWeight: "700",
            color: "#1a1a2e",
            marginBottom: "20px",
        },
        subHeading: {
            fontSize: "1.8rem",
            fontWeight: "600",
            color: "#4a4a6a",
            marginBottom: "25px",
        },
        paragraph: {
            fontSize: "1.1rem",
            color: "#6a6a8e",
            marginBottom: "40px",
        },
        searchBox: {
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f1f1f1",
            borderRadius: "30px",
            padding: "12px 20px",
            width: "100%",
            boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
        },
        searchInput: {
            border: "none",
            background: "transparent",
            outline: "none",
            flex: 1,
            fontSize: "1rem",
        },
        searchButton: {
            backgroundColor: "#5a3fe1",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            padding: "12px 35px",
            cursor: "pointer",
            fontWeight: "600",
        },
        image: {
            width: "80%",
            borderRadius: "20px",
        },

        // Popup styles
        popupOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
        },
        popupContent: {
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            width: "400px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        },
        popupButton: {
            backgroundColor: "#5a3fe1",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "10px 30px",
            marginTop: "15px",
            cursor: "pointer",
        },
        popupClose: {
            backgroundColor: "#ff4757",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "8px 20px",
            marginTop: "10px",
            cursor: "pointer",
        }
    };

    return (
        <>
            <div style={styles.container}>
                <div style={styles.content}>
                    <div style={styles.textSection}>
                        <h1 style={styles.heading}>Empowering Local Businesses</h1>
                        <h2 style={styles.subHeading}>
                            Helping you connect with the best services in your area
                        </h2>
                        <p style={styles.paragraph}>
                            Discover trusted businesses in your area that can help you with your needs. 
                            From local stores to professional services — we've got you covered.
                        </p>

                        <div style={styles.searchBox}>
                            <input
                                type="text"
                                placeholder="What service are you looking for?"
                                style={styles.searchInput}
                            />
                            <button style={styles.searchButton} onClick={handleSearchClick}>
                                Search Now
                            </button>
                        </div>
                    </div>

                    <div style={styles.imageSection}>
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/000/694/773/non_2x/woman-searching-web-for-information-vector.jpg" 
                            alt="Search illustration"
                            style={styles.image}
                        />
                    </div>
                </div>

                {/* Popup Component */}
                {showPopup && (
                    <div style={styles.popupOverlay}>
                        <div style={styles.popupContent}>
                            <h2>Login Required</h2>
                            <p>Please log in or register to proceed with your search.</p>
                            <button
                                style={styles.popupButton}
                                onClick={() => (window.location.href = '/login')}
                            >
                                Login
                            </button>
                            <button
                                style={styles.popupButton}
                                onClick={() => (window.location.href = '/register')}
                            >
                                Register
                            </button>
                            <button style={styles.popupClose} onClick={closePopup}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Added Here */}
            <Footer />
        </>
    );
};

export default HomePage;
