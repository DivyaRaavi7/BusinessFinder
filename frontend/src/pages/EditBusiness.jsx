import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BusinessForm from '../components/BusinessForm';
import { getBusinessById, updateBusiness } from '../services/api';

const EditBusiness = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [businessData, setBusinessData] = useState(null);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const data = await getBusinessById(id);
                setBusinessData(data);
            } catch (error) {
                console.error('Error fetching business details:', error);
            }
        };

        fetchBusiness();
    }, [id]);

    const handleSubmit = async (data) => {
        try {
            await updateBusiness(id, data);
            alert('Business updated successfully!');
            navigate('/businesses');
        } catch (error) {
            console.error('Error updating business:', error);
            alert('Failed to update business.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Business</h1>
            {businessData && <BusinessForm initialData={businessData} onSubmit={handleSubmit} />}
        </div>
    );
};

export default EditBusiness;
