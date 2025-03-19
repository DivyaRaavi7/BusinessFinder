import Review from "../models/Review.js";
import Business from "../models/Business.js";

// Add a review
export const addReview = async (req, res) => {
  try {
    const { businessId, rating, comment } = req.body;

    const business = await Business.findById(businessId);
    if (!business) return res.status(404).json({ message: "Business not found" });

    const review = new Review({
      user: req.user._id,
      business: businessId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a business
export const getBusinessReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ business: req.params.businessId }).populate("user", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createReview = async (req, res) => {
    try {
      const { rating, comment, businessId } = req.body;
  
      // Ensure business exists
      const business = await Business.findById(businessId);
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }
  
      // Create the review
      const review = { user: req.user._id, rating, comment };
      business.reviews.push(review);
  
      await business.save();
  
      res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  export const getReviewsByBusiness = async (req, res) => {
    try {
      const { businessId } = req.params;
      const reviews = await Review.find({ business: businessId }).populate("user", "name");
  
      if (!reviews.length) {
        return res.status(404).json({ message: "No reviews found for this business" });
      }
  
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
