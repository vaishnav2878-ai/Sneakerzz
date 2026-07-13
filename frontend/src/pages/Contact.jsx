import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendMessage } from "../services/contactService";

function Contact() {
    const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await sendMessage(formData);

    toast.success(data.message);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[6px] text-orange-500 mb-4">
            Contact Us
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold">
            We'd Love To Hear From You
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions about your order or need help choosing the perfect
            sneakers? Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>

            <h2 className="text-4xl font-bold mb-10">
              Get In Touch
            </h2>

            <div className="space-y-8">

              <div className="flex items-start gap-5">
                <div className="bg-orange-100 p-4 rounded-xl">
                  <FaMapMarkerAlt className="text-orange-500 text-2xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-xl">
                    Address
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Sneakerzz Headquarters
                    <br />
                    Calicut, Kerala
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-orange-100 p-4 rounded-xl">
                  <FaPhoneAlt className="text-orange-500 text-2xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-xl">
                    Phone
                  </h3>

                  <p className="text-gray-600 mt-2">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-orange-100 p-4 rounded-xl">
                  <FaEnvelope className="text-orange-500 text-2xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-xl">
                    Email
                  </h3>

                  <p className="text-gray-600 mt-2">
                    support@sneakerzz.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-orange-100 p-4 rounded-xl">
                  <FaClock className="text-orange-500 text-2xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-xl">
                    Working Hours
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Monday - Saturday
                    <br />
                    9:00 AM - 7:00 PM
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-3xl p-8 shadow">

            <h2 className="text-3xl font-bold mb-8">
              Send a Message
            </h2>

<form onSubmit={handleSubmit} className="space-y-6">
              <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Your Name"
  className="w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
  required
/>

              <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Your Email"
  className="w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
  required
/>

<input
  type="text"
  name="subject"
  value={formData.subject}
  onChange={handleChange}
  placeholder="Subject"
  className="w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
  required
/>

              <textarea
  rows="6"
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="Your Message"
  className="w-full border rounded-xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
  required
/>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* Google Map Placeholder */}
      

    </div>
  );
}
export default Contact;