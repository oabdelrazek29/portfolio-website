import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas, StarsCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className='relative mx-auto h-screen w-full overflow-hidden'>
      <StarsCanvas className='pointer-events-none absolute inset-0 z-0 h-full w-full' />

      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-primary via-primary/75 to-transparent sm:via-primary/55'
      />

      <div className='pointer-events-none absolute bottom-0 right-0 z-[2] h-[38vh] w-full sm:top-[88px] sm:h-[calc(100vh-88px)] sm:w-[58%] md:w-[52%] lg:w-[48%]'>
        <EarthCanvas variant='hero' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 mx-auto flex max-w-7xl flex-row items-start gap-5 ${styles.paddingX} pt-[120px]`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='mt-5 flex flex-col items-center justify-center'
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className='h-5 w-5 rounded-full bg-[#f97316] shadow-[0_0_20px_rgba(249,115,22,0.6)]'
          />
          <div className='violet-gradient h-40 w-1 sm:h-80' />
        </motion.div>

        <div className='max-w-xl sm:max-w-2xl'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className={`${styles.heroHeadText} text-white`}
          >
            Hi, I&apos;m{" "}
            <span className='text-[#f97316]'>Omar Abdelrazek</span>
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
            className='mt-4 max-w-2xl text-[17px] leading-[30px] text-secondary'
          >
            Full-stack developer and freelance engineer focused on AI-powered tools and
            automation.
          </motion.p>
        </div>
      </motion.div>

      <div className='absolute bottom-32 z-10 flex w-full justify-center xs:bottom-10'>
        <a href='#about'>
          <div className='flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 border-secondary p-2'>
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className='mb-1 h-3 w-3 rounded-full bg-secondary'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
