import React from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn } from "../utils/motion";

const Tech = () => {
  return (
    <motion.div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology, index) => (
        <motion.div
          key={technology.name}
          variants={fadeIn("up", "spring", index * 0.08, 0.75)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          whileHover={{ y: -8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className='flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-orange-500/20 bg-tertiary/80 p-4 shadow-[0_0_24px_rgba(249,115,22,0.12)]'
        >
          <img
            src={technology.icon}
            alt={technology.name}
            className='h-14 w-14 object-contain'
            loading='lazy'
          />
          <p className='mt-2 text-center text-[11px] text-secondary'>{technology.name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SectionWrapper(Tech, "");
