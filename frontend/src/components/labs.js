import {useState, useEffect} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {motion} from "framer-motion";

const cards = [{
    title: "Teacher Training Program", desc: "Empower educators with cutting-edge STEM teaching skills through our comprehensive training program.", color: "bg-white"
},
 {  title: "STEM Labs", desc: "Explore our innovative STEM labs designed for hands-on learning and experimentation.", color: "bg-gray-100"},]

export default function LandingSection() {
  const [current, setCurrent] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }, 7000); // 7 seconds
    return () => clearInterval(interval);
  }, []);

//   const prevCard = () => setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
//   const nextCard = () => setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

   return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
      {/* Left side image */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1600880292089-90e24c9a20ba?auto=format&fit=crop&w=800&q=80"
          alt="Learning"
          className="rounded-2xl shadow-lg"
        />
      </div>

      {/* Right side animated cards */}
      <div className="relative flex items-center justify-center">
        <motion.div
          key={current}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.7 }}
          className={`w-full h-56 flex flex-col justify-center items-center rounded-2xl shadow-lg ${cards[current].color}`}
        >
          <h3 className="text-xl font-semibold">{cards[current].title}</h3>
          <p className="text-gray-600 mt-2">{cards[current].desc}</p>
        </motion.div>
      </div>
    </section>
  );
}