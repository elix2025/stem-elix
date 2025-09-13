import {useState, useEffect} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {motion} from "framer-motion";


const cards = [{
    title: "Teacher Training Program", desc: "Empower educators with cutting-edge STEM teaching skills through our comprehensive training program.", color: "bg-white"
},
 {  title: "STEM Labs", desc: "Explore our innovative STEM labs designed for hands-on learning and experimentation.", color: "bg-gray-50"},]

export default function LandingSection() {
  const [current, setCurrent] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

//   const prevCard = () => setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
//   const nextCard = () => setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

   return (
    <section className="max-w-7xl mx-auto px-5 py-12 grid md:grid-cols-2 gap-10 items-center">
      {/* Left side image */}
      <div>
        
        <img 
          src={require("../assets/school.png")}
          alt="Learning"
          className=""
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