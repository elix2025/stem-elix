const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <ul className="space-y-6">
        <li>
          <strong>What age group are Tinkrion courses designed for?</strong>
          <p className="text-gray-600">
            Our STEM programs are designed for students between ages 8–18. Courses are
            divided into levels so younger children can start simple, while older students
            can tackle advanced robotics, coding, and AI projects.
          </p>
        </li>
        <li>
          <strong>How do students receive the STEM kits?</strong>
          <p className="text-gray-600">
            Once enrolled, a STEM kit is shipped to your address. The kit includes all
            components required for hands-on learning — from sensors and motors to coding
            guides — so children can learn by building real projects.
          </p>
        </li>
        <li>
          <strong>Are the courses aligned with school curriculum?</strong>
          <p className="text-gray-600">
            Yes. Our curriculum is aligned with NEP 2020 guidelines and NITI Aayog’s vision
            for future-ready education. While not a replacement for school subjects, our
            courses enhance problem-solving and creativity alongside classroom learning.
          </p>
        </li>
        <li>
          <strong>Do children need prior coding knowledge?</strong>
          <p className="text-gray-600">
            No prior coding knowledge is required. We start from the basics and guide each
            student step by step through interactive projects until they gain confidence.
          </p>
        </li>
        <li>
          <strong>Can parents or teachers track the child’s progress?</strong>
          <p className="text-gray-600">
            Yes. Parents and teachers can access progress dashboards that show completed
            modules, ongoing projects, and areas where the child may need support.
          </p>
        </li>
      </ul>

      {/* Contact Us Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          We’re here to help. Reach out to us and our team will get back to you.
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default FAQ;
