import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const AnimatedSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] my-20 bg-[#f9f8f5] rounded-xl flex items-center justify-center overflow-hidden px-4">
      {/* Background floating boxes */}
      <div className="absolute top-5 left-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-xl opacity-70"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#ecd0ec] rounded-xl opacity-70"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#ecd0ec] rounded-xl opacity-70"></div>
      <div className="absolute top-5 right-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#fc8eac] rounded-xl opacity-70"></div>
      <div className="absolute top-[120px] sm:top-[160px] left-10 w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-[100px] bg-[#fc8eac] rounded-xl opacity-70"></div>
      <div className="absolute top-32 right-5 w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24 bg-gray-300 rounded-xl opacity-70"></div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-20 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 bg-[#c6c2b6] rounded-xl opacity-70"></div>

      {/* Animated Content */}
      <motion.div
        className="relative z-10 text-center max-w-md sm:max-w-lg"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <section></section>
        <section className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">About Us</h3>
          <h2>What Tinkrion is!</h2>
          <p className="text-gray-600">
            At Stem-Elix, we believe every child is a natural inventor. 
            Our hands-on STEM programs in coding, robotics and IoT help students aged 8-18 build real projects while developing critical thinking skills. 
            Aligned with NEP 2020 and NITI Aayog's vision, we're preparing India's next generation of innovators.
          </p>

          <button
            onClick={() => navigate("/about")}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Learn More
          </button>
        </section>
      </motion.div>
    </section>
  );
};

export default AnimatedSection;
