import React from 'react';

const ShowcaseSection = ({ onShowFormClick }) => {
  return (
    <section className="w-full bg-[#f9f8f5] py-12 flex justify-center">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-6">
        {/* Left card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <div className="relative">
            {/* Coins */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/2906/2906495.png"
              alt="coin"
              className="absolute -left-10 top-6 w-10 h-10"
            />
            
          </div>
          <p className="mt-6 text-xl font-medium text-gray-900">
            Rewards for everything <br /> school related
          </p>
        </div>

        {/* Right card */}
        <div className="flex flex-col gap-4">
          {/* Top dark box */}
          <div className="bg-[#2c2c2c] text-white rounded-2xl p-6 flex items-center gap-3">
            <span className="text-3xl">✨</span>
            <p className="text-2xl font-semibold">Show's us your innovations</p>
          </div>

          {/* Bottom white box with tags */}
          <div className="bg-white rounded-2xl p-6 flex flex-wrap gap-3">
            {[
              "Activities",
              "Events",
              "Fees",
              "Canteen",
              "Transport",
              "Supplies",
              "Uniform",
              "Counselling",
            ].map((item) => (
              <span
                key={item}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
  // return (
//     <section className="relative overflow-hidden isolate">
      
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-[#ac6cf4]/10 to-[#ac6cf4]/5" />

//       <div className="relative max-w-7xl mx-auto px-6 py-20 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
         
//           <div className="space-y-8">
//             <div className="space-y-4">
//               <div className="inline-flex items-center space-x-2 bg-[#ac6cf4]/20 text-[#ac6cf4] px-3 py-1 rounded-full text-sm font-medium">
//                 <span>🎨</span>
//                 <span>Student Creations</span>
//               </div>

//               <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
//                 What Have You
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ac6cf4] to-[#ac6cf4]/80">
//                   {" "}
//                   Created?
//                 </span>
//               </h2>

//               <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
//                 We'd love to see the amazing things you've built! Share your 
//                 projects, inventions, art, experiments, or anything cool you've 
//                 made while learning with us. Your
//                 <span className="font-semibold text-slate-700">
//                   {" "}
//                   creativity inspires others
//                 </span>{" "}
//                 and helps build our community of young innovators.
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-4">
//               <button 
//                 onClick={onShowFormClick}
//                 className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#ac6cf4] to-[#ac6cf4]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-[#ac6cf4]/25 transform hover:-translate-y-0.5 transition-all duration-300 ease-out"
//               >
//                 <span>Share Your Creation</span>
//                 <svg
//                   className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                   />
//                 </svg>
//               </button>

//               <button className="inline-flex items-center px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-[#ac6cf4] hover:text-[#ac6cf4] transition-all duration-300 ease-out">
//                 View Gallery
//               </button>
//             </div>
//           </div>

//           {/* Image container */}
//           <div className="relative">
            
//             <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#ac6cf4]/40 to-[#ac6cf4]/60 rounded-full opacity-60" />
//             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#ac6cf4]/30 to-[#ac6cf4]/50 rounded-full opacity-40" />

//             {/* Main image placeholder */}
//             <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-200">
             
//                <img
//                 src={require("../assets/student-building-project.png")}
//                 alt="Student Creations Showcase"
//                 className="w-full max-w-sm mx-auto rounded-xl transform hover:scale-105 transition-transform duration-300"
//               />

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export default ShowcaseSection;