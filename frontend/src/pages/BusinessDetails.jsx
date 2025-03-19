import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBusinessById } from '../services/api';

const BusinessDetails = () => {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const data = await getBusinessById(id);
                setBusiness(data);
            } catch (error) {
                console.error('Error fetching business:', error);
            }
        };

        fetchBusiness();
    }, [id]);

    if (!business) {
        return <p>Loading business details...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <img src={business.image} alt={business.name} className="w-full h-64 object-cover mt-4 rounded-lg" />
            <p className="mt-4">{business.description}</p>
            <p className="text-gray-500">{business.location}</p>
            <p className="text-green-600">{business.services}</p>
            <p className="text-blue-500">{business.pricing}</p>
        </div>
    );
};

export default BusinessDetails;
