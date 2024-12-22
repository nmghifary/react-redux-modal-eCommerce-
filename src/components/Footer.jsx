const Footer = () => {
  return (
    <footer className="bg-blue-800 text-gray-100 py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Section 1: About Us */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-sm">
              We are a modern e-commerce platform providing the best products
              for your daily needs. Your satisfaction is our priority.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-blue-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-blue-300">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-300">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact Us */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2 text-sm">
              <li>📍 123 Main Street, City, Country</li>
              <li>📧 support@example.com</li>
              <li>📞 +123 456 789</li>
            </ul>
          </div>
        </div>

        <div className="mt-2 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Redux E-Commerce. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
