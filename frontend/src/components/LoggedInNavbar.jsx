import { useNavigate } from "react-router-dom";

const LoggedInNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated"); // Clear session data
        navigate("/login"); // Redirect to login page
    };

    const styles = {
        navbar: {
            backgroundColor: "#121230",
            padding: "15px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fff"
        },
        logo: {
            fontWeight: "bold",
            fontSize: "24px",
            color: "#fff"
        },
        navLinks: {
            display: "flex",
            gap: "20px",
        },
        link: {
            color: "#FFD700",
            textDecoration: "none",
            fontWeight: "bold",
            cursor: "pointer"
        }
    };

    return (
        <div style={styles.navbar}>
            <div style={styles.logo}>BusinessFinder</div>
            <div style={styles.navLinks}>
                <a href="/services" style={styles.link}>Home</a>
                <span style={styles.link} onClick={handleLogout}>
                    Logout
                </span>
            </div>
        </div>
    );
};

export default LoggedInNavbar;
