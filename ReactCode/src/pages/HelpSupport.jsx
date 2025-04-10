import { useState } from "react";
import { Link } from "react-router-dom"; 

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you will receive a confirmation email with tracking details. You can also check the order status in your account.",
  },
  {
    question: "What is the return policy?",
    answer:
      "We accept returns within 14 days of delivery for unused products in original packaging. Shipping costs are non-refundable.",
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers. For enterprise orders, invoicing is available.",
  },
  {
    question: "Do you offer warranty for drones?",
    answer:
      "Yes, all drones come with a 1-year limited warranty covering manufacturing defects. Accidental damage is not covered.",
  },
  {
    question: "Can I modify or cancel my order?",
    answer:
      "If the order hasn’t been shipped yet, yes. Contact us as soon as possible via email or live chat.",
  },
];

const HelpSupport = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Help & Support</h1>
        <p className="text-gray-400">Answers to common questions about your orders, payments and drones.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700 pb-4">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left text-lg font-semibold text-white hover:text-blue-400 transition"
            >
              {faq.question}
              <span className="text-blue-500 text-xl">{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-20 text-sm text-gray-500">
        Still need help? Contact us <Link to="/contacts" className="text-blue-400 underline hover:text-blue-300 transition">here</Link>
      </div>
    </section>
  );
};

export default HelpSupport;
