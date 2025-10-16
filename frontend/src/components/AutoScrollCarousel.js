import React from 'react';
import { motion } from 'framer-motion';

const AutoScrollCarousel = ({ items, renderItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden py-4"
    >
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
        className="flex gap-8 w-fit"
        whileHover={{ animationPlayState: "paused" }}
      >
        {/* Original items */}
        {items.map((item, idx) => renderItem(item, `original-${idx}`))}
        
        {/* Duplicated items for infinite scroll */}
        {items.map((item, idx) => renderItem(item, `duplicate-${idx}`))}
      </motion.div>
    </motion.div>
  );
};

export default AutoScrollCarousel;