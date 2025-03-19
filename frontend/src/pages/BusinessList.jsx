import { useEffect, useState } from 'react';
import { getAllBusinesses } from '../services/api';
import BusinessCard from '../components/BusinessCard';

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const data = await getAllBusinesses();
                setBusinesses(data);
            } catch (error) {
                console.error('Error fetching businesses:', error);
            }
        };

        fetchBusinesses();
    }, []);

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.length > 0 ? (
                businesses.map((business) => (
                    <BusinessCard key={business._id} business={business} />
                ))
            ) : (
                <p>No businesses found.</p>
            )}
        </div>
    );
};

export default BusinessList;
