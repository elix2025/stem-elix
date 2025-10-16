import React from "react";

const ShowcaseSection = ({ onShowFormClick }) => {
  return (
    <section className="relative w-full section-padding overflow-hidden">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gray-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-gray-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gray-100/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Simple Tag */}
          <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-sm">
            <div className="w-2 h-2 bg-[var(--color-button)] rounded-full"></div>
            <span className="text-[var(--color-text-primary)]">Student Innovations</span>
          </div>

          {/* Main Heading */}
          <h2 className="headline-1 mb-8">
            What Have You{" "}
            <span className="text-[var(--color-button)]">Created?</span>
          </h2>

          {/* Description */}
          <p className="body-text text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We'd love to see the amazing things you've built! Share your
            projects, inventions, art, experiments, or anything cool you've made
            while learning with us.
          </p>
        </div>

        {/* Cards Grid - Two columns only */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Benefits Card */}
          <div className="card group p-8 hover-lift overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-gray-100 rounded-full"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--color-button)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="headline-2 text-xl mb-3">Get Recognized</h3>
                  <p className="body-text leading-relaxed">
                    Showcase your creativity and innovation. Get featured, receive feedback, and inspire fellow learners with your amazing creations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main CTA Card */}
          <div className="card group bg-[var(--color-button)] text-white p-8 hover-lift overflow-hidden">
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Share Your Creation</h3>
                <p className="text-white/90 text-base leading-relaxed">
                  Ready to inspire others? Upload your project and join our community of young innovators.
                </p>
              </div>

              <button
                onClick={onShowFormClick}
                className="btn-secondary bg-white text-[var(--color-button)] border-white hover:bg-gray-50"
              >
                <span>Upload Project</span>
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8l-8-8-8 8"
                  />
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Additional CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
            <h3 className="headline-2 text-2xl mb-4">Ready to Showcase Your Innovation?</h3>
            <p className="body-text text-lg mb-6 max-w-2xl mx-auto">
              Whether it's a robot, app, artwork, or scientific experiment - we want to see it! 
              Your creativity deserves to be celebrated.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-[var(--color-button)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Quick Upload</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--color-button)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Get Featured</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--color-button)]">
               
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;