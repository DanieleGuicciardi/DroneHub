const HelpSupport = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Help & Support</h1>
        <p className="text-gray-400">Need assistance? We're here to help you fly smoothly.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <ul className="space-y-4 text-gray-300 text-sm">
            <li>
              <strong>How do I track my order?</strong><br />
              You’ll receive a confirmation email with tracking details once your order ships.
            </li>
            <li>
              <strong>Can I return a product?</strong><br />
              Yes! You can return items within 14 days of delivery if unused and in original condition.
            </li>
            <li>
              <strong>Do you offer technical support?</strong><br />
              Absolutely! Contact our tech team via the form below or through live chat.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-gray-800 px-4 py-2 rounded-md text-white placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-gray-800 px-4 py-2 rounded-md text-white placeholder-gray-400"
            />
            <textarea
              rows="4"
              placeholder="How can we help you?"
              className="w-full bg-gray-800 px-4 py-2 rounded-md text-white placeholder-gray-400"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-20 text-sm text-gray-500">
        Still need help? Email us at <span className="text-blue-400">support@dronehub.com</span>
      </div>
    </section>
  );
};

export default HelpSupport;
