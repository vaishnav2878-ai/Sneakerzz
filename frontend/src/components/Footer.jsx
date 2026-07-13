import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Logo */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold text-orange-500">
              Sneakerzz
            </h2>

            <p className="text-gray-400 mt-5 leading-7">
              Discover premium sneakers from the world's
              top brands. Designed for comfort, performance,
              and everyday style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Shop
            </h3>

            <div className="space-y-3 text-gray-400">
              <Link to="/shop?gender=Men" className="block hover:text-orange-500">
                Men
              </Link>

              <Link to="/shop?gender=Women" className="block hover:text-orange-500">
                Women
              </Link>

              <Link to="/shop?newArrival=true" className="block hover:text-orange-500">
                New Arrivals
              </Link>

              <Link to="/shop?bestSeller=true" className="block hover:text-orange-500">
                Best Sellers
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <div className="space-y-3 text-gray-400">
              <Link to="/about" className="block hover:text-orange-500">
                About
              </Link>

              <Link to="/contact" className="block hover:text-orange-500">
                Contact
              </Link>

              <Link to="/privacy" className="block hover:text-orange-500">
                Privacy Policy
              </Link>

              <Link to="/terms" className="block hover:text-orange-500">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex gap-3 items-center">
  <FaEnvelope className="text-orange-500" />

  <a
    href="mailto:support@sneakerzz.com"
    className="hover:text-orange-500 transition"
  >
    support@sneakerzz.com
  </a>
</div>

             <div className="flex gap-3 items-center">
  <FaPhone className="text-orange-500" />

  <a
    href="tel:+919876543210"
    className="hover:text-orange-500 transition"
  >
    +91 98765 43210
  </a>
</div> 

              <div className="flex gap-3 items-center">
                <FaLocationDot className="text-orange-500" />
      <a
  href="https://maps.google.com/?q=Kerala,India"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-orange-500 transition"
>
  Kerala, India
</a>        </div>

              <div className="flex gap-5 pt-4 text-xl">

  <a
    href="https://www.instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-orange-500 transition duration-300"
  >
    <FaInstagram />
  </a>

  <a
    href="https://www.facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-orange-500 transition duration-300"
  >
    <FaFacebookF />
  </a>

  <a
    href="https://x.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-orange-500 transition duration-300"
  >
    <FaXTwitter />
  </a>

</div>

            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-14 pt-6 text-center text-gray-500">
          © 2026 Sneakerzz. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;