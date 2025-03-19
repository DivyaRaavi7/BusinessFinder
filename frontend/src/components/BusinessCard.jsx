import { Link } from 'react-router-dom';

const BusinessCard = ({ business }) => {
    return (
        <div className="business-card border rounded-lg shadow-md p-4">
            <img
                src={business.image}
                alt={business.name}
                className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-bold mt-2">{business.name}</h3>
            <p className="text-gray-600">{business.category}</p>
            <p className="text-sm text-gray-500">{business.location}</p>
            <Link
                to={`/business/${business._id}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
            >
                View Details
            </Link>
        </div>
    );
};

export default BusinessCard;
