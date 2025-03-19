import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPaymentStatus = async (req, res) => {
    try {
      const { paymentId } = req.params;
      
      // Fetch payment status from the database (or payment gateway)
      const payment = await Payment.findById(paymentId);
  
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
  
      res.json({ status: payment.status });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
