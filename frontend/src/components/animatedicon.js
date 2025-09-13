import { motion } from "framer-motion";

const AnimatedSection = () => {
  return (
    <section className="relative w-full h-[600px] my-20 bg-[#f9f8f5] rounded-xl flex items-center justify-center overflow-hidden">
      {/* Background floating boxes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gray-200 rounded-xl opacity-70"></div>
      <div className="absolute bottom-20 left-40 w-24 h-24 bg-[#ecd0ec] rounded-xl opacity-70"></div>
      <div className="absolute bottom-20 right-40 w-24 h-24 bg-[#ecd0ec] rounded-xl opacity-70"></div>
      <div className="absolute top-20 right-40 w-24 h-24 bg-[#fc8eac] rounded-xl opacity-70"></div>
      <div className="absolute top-[200px] left-20 w-24 h-[100px] bg-[#fc8eac] rounded-xl opacity-70"></div>
      <div className="absolute top-40 right-20 w-28 h-24 bg-gray-300 rounded-xl opacity-70"></div>
    <div className="absolute bottom-10 left-30 w-32 h-24 bg-[#c6c2b6] rounded-xl opacity-70"></div>

      {/* Animated Content */}
      <motion.div
        className="relative z-10 text-center max-w-xl"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Unlock your Potential</h1>
        <p className="text-lg text-gray-600 mb-6">
          Be the Part of our Family
        </p>
        <button className="bg-[#ac6cf4] hover:bg-[#9157d8] text-white px-6 py-2 rounded-lg shadow-md transition">
          Register
        </button>
      </motion.div>
    </section>
  );
};

export default AnimatedSection;
