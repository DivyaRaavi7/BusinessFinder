import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AddBusiness from "./pages/AddBusiness";
import Dashboard from "./pages/DashBoard"; // ✅ Import Dashboard
import BusinessDetails from "./pages/BusinessDetails"; // ✅ Import Business Details Page
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
    const role = localStorage.getItem("role");
    const isLoggedIn = Boolean(role);
    const location = useLocation(); // ✅ Track the current route

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    // ✅ Hide Navbar only on login and register pages
    const hideNavbarRoutes = ["/login", "/register"];
    const hideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

    return (
        <>
            {!hideNavbar && <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ✅ Role-based Protected Routes */}
                <Route
                    path="/services"
                    element={role === "user" ? <ServicesPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/add-business"
                    element={role === "businessOwner" ? <AddBusiness /> : <Navigate to="/login" />}
                />
                <Route
                    path="/dashboard"
                    element={role === "businessOwner" ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/business/:id"
                    element={role === "businessOwner" ? <BusinessDetails /> : <Navigate to="/login" />}
                />
            </Routes>
        </>
    );
}

export default App;
