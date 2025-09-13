import { motion } from "framer-motion";

const AnimatedSection = () => {
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Unlock your Potential
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Be the Part of our Family
        </p>
        <button className="bg-[#ac6cf4] hover:bg-[#9157d8] text-white px-4 sm:px-6 py-2 rounded-lg shadow-md transition">
          Register
        </button>
      </motion.div>
    </section>
  );
};

export default AnimatedSection;
