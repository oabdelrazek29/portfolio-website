import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  live_site_link,
  source_code_link,
}) => {
  const openLive = () => {
    const url = live_site_link || source_code_link;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const openRepo = (event) => {
    event.stopPropagation();
    window.open(source_code_link, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div
          role='button'
          tabIndex={0}
          onClick={openLive}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openLive();
            }
          }}
          className='relative w-full h-[230px] cursor-pointer'
        >
          <img
            src={image}
            alt={name}
            className='w-full h-full object-cover rounded-2xl'
          />

          <motion.div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <motion.button
              type='button'
              aria-label={`${name} GitHub repository`}
              onClick={openRepo}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='GitHub'
                className='w-1/2 h-1/2 object-contain'
              />
            </motion.button>
          </motion.div>
        </motion.div>

        <div
          role='button'
          tabIndex={0}
          onClick={openLive}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openLive();
            }
          }}
          className='mt-5 cursor-pointer'
        >
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Featured work across productivity tools, developer automation, and this
          portfolio. Click a project to open the live site; use the GitHub icon for
          the repository.
        </motion.p>
      </motion.div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
