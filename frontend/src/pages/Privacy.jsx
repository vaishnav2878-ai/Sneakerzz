function Privacy() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-black text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[6px] text-orange-500 mb-4">
            Privacy Policy
          </p>

          <h1 className="text-5xl font-extrabold">
            Your Privacy Matters
          </h1>

          <p className="mt-6 text-gray-300 text-lg">
            We value your trust and are committed to protecting your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-10">

        <div>
          <h2 className="text-2xl font-bold mb-3">
            1. Information We Collect
          </h2>

          <p className="text-gray-600 leading-8">
            We collect information such as your name, email address,
            phone number, shipping address, and payment details when
            you place an order or contact us.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            2. How We Use Your Information
          </h2>

          <p className="text-gray-600 leading-8">
            Your information is used to process orders, provide customer
            support, improve our services, and communicate updates about
            your purchases.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            3. Data Security
          </h2>

          <p className="text-gray-600 leading-8">
            We implement industry-standard security measures to protect
            your personal information against unauthorized access,
            disclosure, or misuse.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            4. Cookies
          </h2>

          <p className="text-gray-600 leading-8">
            Our website uses cookies to improve your browsing experience,
            remember your preferences, and analyze website traffic.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            5. Third-Party Services
          </h2>

          <p className="text-gray-600 leading-8">
            We may use trusted third-party services for payment
            processing, analytics, and shipping. These providers only
            receive the information necessary to perform their services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            6. Contact Us
          </h2>

          <p className="text-gray-600 leading-8">
            If you have any questions regarding this Privacy Policy,
            please contact us at
            <span className="font-semibold text-black">
              {" "}support@sneakerzz.com
            </span>.
          </p>
        </div>

      </section>
    </div>
  );
}

export default Privacy;