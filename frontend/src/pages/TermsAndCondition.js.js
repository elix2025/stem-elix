// src/pages/TermsAndConditions.js

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto my-16 p-8 bg-gray-50 rounded-lg leading-loose text-base shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Terms and Conditions
        </h1>
        {/* <p><strong>Effective Date:</strong> [DD/MM/YYYY]</p> */}

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3 text-gray-700">
            1. Introduction
          </h2>
          <p>
            Welcome to <strong>Stem Elix</strong>. By accessing or
            using our platform, services, and content, you agree to comply with
            these Terms and Conditions. If you disagree with any part, please
            refrain from using our platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3 text-gray-700">
            2. User Accounts
          </h2>
          <p>
            You must provide accurate, complete registration information and
            keep your account secure. You are responsible for any activity that
            occurs under your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3 text-gray-700">
            3. Intellectual Property
          </h2>
          <p>
            All content, including text, graphics, videos, and code, is the
            property of Edvenger and is protected by copyright laws. You may not
            reproduce, distribute, or modify any content without permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3 text-gray-700">
            4. Acceptable Use
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>No unauthorized access, hacking, or scraping</li>
            <li>No posting harmful, offensive, or unlawful content</li>
            <li>No disrupting the learning experience of others</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3 text-gray-700">
            5. Payments and Subscriptions
          </h2>
          <p>
            Some content may require payment or subscription. All fees are
            non-refundable unless otherwise specified. By purchasing, you agree
            to our pricing and refund policy.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3 text-gray-700">
            6. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your account if you
            violate these terms or engage in misuse of the platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3 text-gray-700">
            7. Limitation of Liability
          </h2>
          <p>
            We are not liable for any indirect, incidental, or consequential
            damages resulting from your use of the platform. While we strive for
            accuracy, we cannot guarantee all content will always be error-free.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3 text-gray-700">
            8. Third-Party Links
          </h2>
          <p>
            Our platform may contain links to external websites. We are not
            responsible for the content or practices of these third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3 text-gray-700">
            9. Modifications
          </h2>
          <p>
            We may update these Terms and Conditions at any time. Continued use
            after changes indicates your acceptance.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3 text-gray-700">
            10. Contact Information
          </h2>
          <p>
            For questions or concerns, contact us at{" "}
            <strong>edvenger@email.com</strong>.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
