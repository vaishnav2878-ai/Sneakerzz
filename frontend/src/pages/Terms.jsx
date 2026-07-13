function Terms() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-black text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[6px] text-orange-500 mb-4">
            Terms & Conditions
          </p>

          <h1 className="text-5xl font-extrabold">
            Terms of Use
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Please read these terms carefully before using Sneakerzz.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-10">

        <div>
          <h2 className="text-2xl font-bold mb-3">
            1. Acceptance of Terms
          </h2>

          <p className="text-gray-600 leading-8">
            By accessing and using Sneakerzz, you agree to comply with
            these Terms & Conditions. If you do not agree, please do not
            use our website.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            2. Products & Pricing
          </h2>

          <p className="text-gray-600 leading-8">
            We strive to provide accurate product descriptions and pricing.
            However, we reserve the right to correct errors, update prices,
            or discontinue products without prior notice.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            3. Orders & Payments
          </h2>

          <p className="text-gray-600 leading-8">
            Orders are confirmed only after successful payment and
            availability of stock. We reserve the right to cancel any
            order due to pricing errors or inventory issues.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            4. Shipping & Delivery
          </h2>

          <p className="text-gray-600 leading-8">
            Delivery times are estimates and may vary depending on your
            location. Sneakerzz is not responsible for delays caused by
            courier services or unforeseen circumstances.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            5. Returns & Refunds
          </h2>

          <p className="text-gray-600 leading-8">
            Products may be returned according to our return policy.
            Returned items must be unused, in their original packaging,
            and meet the eligibility requirements for a refund or exchange.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            6. User Responsibilities
          </h2>

          <p className="text-gray-600 leading-8">
            Users are responsible for providing accurate account
            information and maintaining the confidentiality of their
            login credentials.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            7. Intellectual Property
          </h2>

          <p className="text-gray-600 leading-8">
            All content on Sneakerzz, including logos, images, graphics,
            text, and design, is the property of Sneakerzz and may not
            be copied or reproduced without permission.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            8. Limitation of Liability
          </h2>

          <p className="text-gray-600 leading-8">
            Sneakerzz shall not be liable for indirect, incidental,
            or consequential damages arising from the use of our website
            or products.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            9. Changes to These Terms
          </h2>

          <p className="text-gray-600 leading-8">
            We reserve the right to modify these Terms & Conditions at
            any time. Updated versions will be published on this page.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            10. Contact
          </h2>

          <p className="text-gray-600 leading-8">
            If you have any questions regarding these Terms &
            Conditions, please contact us at
            <span className="font-semibold text-black">
              {" "}support@sneakerzz.com
            </span>.
          </p>
        </div>

      </section>
    </div>
  );
}

export default Terms;