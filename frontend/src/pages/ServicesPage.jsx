import React, { useState } from "react";

const ServicesPage = () => {
    const services = [
        { title: "Nutrition", icon: "🥗", description: "Get personalized diet plans, healthy eating tips, and nutritional guidance for a balanced lifestyle." },
        { title: "Yoga", icon: "🧘", description: "Join our yoga sessions for improved flexibility, mental calmness, and overall well-being." },
        { title: "Tutoring", icon: "📚", description: "Expert tutors available for subjects like math, science, and languages to help you excel." },
        { title: "Beauty", icon: "💄", description: "Offering skincare, makeup tutorials, and beauty consultations for a flawless look." },
        { title: "Clothing", icon: "👗", description: "Explore trendy outfits, fashion advice, and seasonal wardrobe collections." },
        { title: "Accessories", icon: "👜", description: "Find stylish accessories including bags, jewelry, and watches to enhance your look." },
        { title: "Home Made Food", icon: "🍲", description: "Delicious and freshly prepared homemade meals delivered to your doorstep." },
        { title: "Zumba", icon: "💃", description: "Join our energetic Zumba classes to burn calories and stay fit while dancing to upbeat music." }
    ];

    const [search, setSearch] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [location, setLocation] = useState('');
    const [businesses, setBusinesses] = useState([]);

    // ✅ Fixed `fetchBusinesses` function
    const fetchBusinesses = async () => {
        if (!selectedService) {
            alert("Please select a service category!");
            return;
        }

        if (!location.trim()) {
            alert("Please enter a location!");
            return;
        }

        console.log("🔹 Fetching businesses for:", selectedService, "in", location);

        try {
            const response = await fetch(`http://localhost:5001/api/business/search?category=${selectedService}&location=${location}`);

            console.log("🔹 Response status:", response.status);

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("✅ Received data:", data);

            // ✅ FIXED: Correct response structure check
            if (!data || !data.businesses || !Array.isArray(data.businesses)) {
                throw new Error("Invalid data structure received");
            }

            if (data.businesses.length === 0) {
                alert("No businesses found for this category and location.");
                setBusinesses([]);  // Clear previous results
                return;
            }

            setBusinesses(data.businesses);  // ✅ Store the businesses array correctly
        } catch (error) {
            console.error("❌ Error fetching businesses:", error.message);
            alert("Failed to fetch business data. Please try again later.");
        }
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
            <h1 style={{ textAlign: "center", color: "#2F4858", fontSize: "28px" }}>Our Services</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "2px solid #A8D5BA",
                    borderRadius: "5px",
                    fontSize: "16px",
                    backgroundColor: "#f9f9f9"
                }}
            />

            {/* Services Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                padding: "20px",
                maxWidth: "1200px",
                margin: "0 auto",
                backgroundColor: "#ffffff"
            }}>
                {services
                    .filter(service => service.title.toLowerCase().includes(search.toLowerCase()))
                    .map((service, index) => (
                        <div key={index} style={{
                            backgroundColor: "#ffffff",
                            border: "2px solid #A8D5BA",
                            borderRadius: "10px",
                            padding: "20px",
                            textAlign: "center",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            cursor: "pointer"
                        }}>
                            <div style={{ fontSize: "40px", color: "#6AB187", marginBottom: "10px" }}>{service.icon}</div>
                            <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "18px", color: "#2F4858" }}>
                                {service.title}
                            </div>
                            <div style={{ color: "#5B7065", fontSize: "13px", marginBottom: "10px" }}>
                                {service.description}
                            </div>

                            <button style={{
                                backgroundColor: "#6AB187",
                                color: "#ffffff",
                                border: "none",
                                padding: "8px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                transition: "background 0.3s ease"
                            }}
                                onClick={() => setSelectedService(service.title)}>
                                See Options
                            </button>
                        </div>
                    ))}

                {services.filter(service => service.title.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                    <p style={{ textAlign: "center", color: "#e74c3c", gridColumn: "span 3" }}>
                        No services found.
                    </p>
                )}
            </div>

            {/* Location Search Bar (Only shows when a service is selected) */}
            {selectedService && (
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <h2 style={{ color: "#2F4858" }}>Find {selectedService} Services Near You</h2>
                    <input
                        type="text"
                        placeholder="Enter your location..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{
                            width: "50%",
                            padding: "10px",
                            margin: "10px 0",
                            border: "2px solid #A8D5BA",
                            borderRadius: "5px",
                            fontSize: "16px",
                            backgroundColor: "#f9f9f9"
                        }}
                    />
                    <button style={{
                        backgroundColor: "#6AB187",
                        color: "#ffffff",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "background 0.3s ease",
                        marginLeft: "10px"
                    }}
                        onClick={fetchBusinesses}>
                        Search
                    </button>
                </div>
            )}

            {/* Display businesses if available */}
            {businesses.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h3 style={{ textAlign: "center", color: "#2F4858" }}>Available Businesses</h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "20px",
                        padding: "20px"
                    }}>
                        {businesses.map((business, index) => (
                            <div key={index} style={{
                                backgroundColor: "#ffffff",
                                border: "2px solid #6AB187",
                                borderRadius: "10px",
                                padding: "20px",
                                textAlign: "center",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)"
                            }}>
                                <h4 style={{ color: "#2F4858" }}>{business.name}</h4>
                                <p style={{ color: "#5B7065" }}>{business.location}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesPage;
