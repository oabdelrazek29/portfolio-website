import React from "react";
import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn } from "../utils/motion";

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology, index) => (
        <motion.div
          key={technology.name}
          variants={fadeIn("up", "spring", index * 0.08, 0.75)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          whileHover={{ y: -8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className='w-28 h-28'
        >
          <BallCanvas icon={technology.icon} />
        </motion.div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
