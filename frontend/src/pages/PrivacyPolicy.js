// src/pages/PrivacyPolicy.js

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto my-16 p-8 leading-relaxed text-base bg-gray-50 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
        {/* <p><strong>Effective Date:</strong> [DD/MM/YYYY]</p> */}

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3">
            1. Information We Collect
          </h2>
          <p className="mt-2">
            <strong>a. Personal Information:</strong> We may collect your name,
            email, phone, DOB, and payment details when you register or enroll.
          </p>
          <p className="mt-2">
            <strong>b. Technical Data:</strong> Includes IP address, browser
            type, device info, and session activity.
          </p>
          <p className="mt-2">
            <strong>c. Learning Activity:</strong> We track course progress,
            quiz attempts, and content interactions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3">
            2. How We Use Your Data
          </h2>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Create and manage accounts</li>
            <li>Enhance learning experience</li>
            <li>Send updates and marketing (opt-in only)</li>
            <li>Meet legal obligations</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3">
            3. Sharing Your Information
          </h2>
          <p className="mt-2">
            We do <strong>not</strong> sell your data. We may share it with:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Trusted service providers (like hosting, payments)</li>
            <li>Teachers/mentors for education purposes</li>
            <li>Authorities if legally required</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3">
            4. Cookies and Tracking
          </h2>
          <p className="mt-2">
            We use cookies for login sessions, site analytics, and user
            experience improvements. You may disable cookies via your browser
            settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3">5. Data Security</h2>
          <p className="mt-2">
            Your data is protected using encryption, firewalls, and secure
            access controls. However, no method is 100% secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3">
            6. Children's Privacy
          </h2>
          <p className="mt-2">
            Our platform is built for students aged 6-18. For children under 13,
            parental consent is required.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3">7. Your Rights</h2>
          <p className="mt-2">You may request to:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Access, correct, or delete your data</li>
            <li>Withdraw consent</li>
            <li>Opt out of marketing</li>
          </ul>
          <p className="mt-2">
            Contact us at <strong>info.stemelix@gmail.com</strong>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3">
            8. Third-Party Links
          </h2>
          <p className="mt-2">
            We are not responsible for privacy practices of third-party websites
            linked on our platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mt-8 text-xl font-semibold mb-3">
            9. Updates to Policy
          </h2>
          <p className="mt-2">
            We may update this policy. The latest version will be posted here
            with the effective date.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
