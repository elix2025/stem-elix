const ChooseUs = () => {
    return (
        <div className="section-padding bg-[var(--color-background)]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-[var(--color-button)] font-medium mb-2">Why Choose Us</h4>
                    <h2 className="headline-1">Experience Excellence in STEM Education</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col pl-6 group hover:transform hover:scale-105 transition-all duration-300">
                        <div className="w-12 h-12 mb-6 rounded-full bg-[var(--color-button)]/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[var(--color-button)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-headlines text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
                            Aligned With National Policies
                        </h3>
                        <p className="body-text">
                            Our curriculum is designed to foster creativity and critical thinking in young minds according to NEP 2020 guidelines and NITI Aayog's vision.
                        </p>
                    </div>

                    <div className="flex flex-col pl-6 group hover:transform hover:scale-105 transition-all duration-300">
                        <div className="w-12 h-12 mb-6 rounded-full bg-[var(--color-button)]/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[var(--color-button)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="font-headlines text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
                            Expert Mentors
                        </h3>
                        <p className="body-text">
                            Our team of experienced educators are dedicated to guide students through their learning journey, ensuring they gain practical skills and knowledge.
                        </p>
                    </div>

                    {/* <div className="flex flex-col pl-6 group hover:transform hover:scale-105 transition-all duration-300">
                        <div className="w-12 h-12 mb-6 rounded-full bg-[var(--color-button)]/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[var(--color-button)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                        </div>
                        <h3 className="font-headlines text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
                            24/7 Support
                        </h3>
                        <p className="body-text">
                            Our dedicated support team is available around the clock to assist students with any queries.
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default ChooseUs;