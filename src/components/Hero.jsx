import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='flex flex-col justify-center items-center mt-5'
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className='w-5 h-5 rounded-full bg-[#f97316] shadow-[0_0_20px_rgba(249,115,22,0.6)]'
          />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className={`${styles.heroHeadText} text-white`}
          >
            Hi, I&apos;m <span className='text-[#f97316]'>Omar</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className={`${styles.heroSubText} mt-2 text-white-100`}
          >
            I build software that does real work.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='mt-4 text-secondary text-[17px] max-w-2xl leading-[30px]'
          >
            Full-stack developer and freelance engineer focused on AI-powered tools and automation.
          </motion.p>
        </div>
      </motion.div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
