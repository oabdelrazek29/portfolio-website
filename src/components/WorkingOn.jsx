import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { workingOnLog } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const LogCard = ({ index, entry }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.75)}
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
    className='bg-tertiary border border-white/10 p-6 rounded-2xl w-full'
  >
    <p className='text-orange-400 text-[12px] font-semibold tracking-widest'>
      {String(index + 1).padStart(2, "0")}
    </p>
    <p className='mt-3 text-white text-[16px] leading-[28px]'>{entry}</p>
  </motion.div>
);

const WorkingOn = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Current focus</p>
        <h2 className={styles.sectionHeadText}>Working On.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        A lightweight development log for active builds and experiments.
      </motion.p>

      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.9)}
        className='mt-12 flex flex-col gap-5'
      >
        {workingOnLog.map((entry, index) => (
          <LogCard key={entry} index={index} entry={entry} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(WorkingOn, "working-on");
