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
    question: "Do you offer warranty for drones?",
    answer:
      "Yes, all drones come with a 1-year limited warranty covering manufacturing defects. Accidental damage is not covered.",
  },
  {
    question: "What is Care Refresh and how does it work?",
    answer: (
      <>
        <p className="mb-3">
          Care Refresh is an optional protection plan available at checkout. It provides extended coverage in case your drone gets damaged, broken, or even lost.
        </p>
        <p className="mb-3">
          The coverage lasts <strong>2 months</strong> from the activation date of the drone. In case of incidents, we offers fast replacement or repair — depending on the type of damage — and in some cases, the service may be <strong>free</strong>.
        </p>
        <p className="mb-3">
          The plan costs <strong>€38 per item</strong>. However, if your order includes more than <strong>3 items</strong> or exceeds a value of <strong>€2000</strong>, you automatically unlock a <strong>20% discount</strong> on the total Care Refresh cost.
        </p>
        <p className="text-xs text-gray-400 italic">
          Care Refresh must be selected during checkout to be valid.
        </p>
      </>
    ),
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers. For enterprise orders, invoicing is available.",
  },
  {
    question: "Can I modify or cancel my order?",
    answer:
      "If the order hasn’t been shipped yet, yes. Contact us as soon as possible via email.",
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
