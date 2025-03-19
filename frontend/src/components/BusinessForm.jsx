import { useState } from 'react';

const BusinessForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        category: initialData.category || '',
        location: initialData.location || '',
        services: initialData.services || '',
        pricing: initialData.pricing || '',
        description: initialData.description || '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="business-form space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Business Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="services"
                placeholder="Services (e.g. Dine-in, Delivery)"
                value={formData.services}
                onChange={handleChange}
            />
            <input
                type="text"
                name="pricing"
                placeholder="Pricing (e.g. $10 - $50)"
                value={formData.pricing}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Submit
            </button>
        </form>
    );
};

export default BusinessForm;
