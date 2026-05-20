import React, { useRef, useState } from "react";
import Tilt from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const expandTransition = {
  duration: 0.42,
  ease: [0.25, 0.1, 0.25, 1],
};

const ProjectExpandedDetails = ({ sections, panelId }) => (
  <motion.div
    id={panelId}
    role='region'
    aria-label='Project details'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.32, delay: 0.06 }}
    className='px-5 pb-6 pt-4'
  >
    <motion.div
      initial={{ y: 8 }}
      animate={{ y: 0 }}
      exit={{ y: 4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className='space-y-6'
    >
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.04 * sectionIndex,
            ease: "easeOut",
          }}
        >
          {sectionIndex > 0 && (
            <motion.hr
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, delay: 0.02 * sectionIndex }}
              className='mb-5 border-0 h-px bg-white/5 origin-left'
            />
          )}
          <h4 className='text-white font-semibold text-[15px] tracking-wide'>
            {section.title}
          </h4>
          <motion.div
            className='mt-3 space-y-3'
            initial='hidden'
            animate='show'
            variants={{
              show: {
                transition: { staggerChildren: 0.04 },
              },
            }}
          >
            {section.paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph.slice(0, 48)}
                variants={{
                  hidden: { opacity: 0, y: 4 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.28 }}
                className='text-secondary text-[13px] leading-[22px]'
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  imageFit,
  live_site_link,
  source_code_link,
  details,
}) => {
  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef(null);
  const panelId = `project-details-${index}`;
  const isLogo = imageFit === "contain";
  const hasDetails = Array.isArray(details) && details.length > 0;

  const openLive = () => {
    const url = live_site_link || source_code_link;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const openRepo = (event) => {
    event.stopPropagation();
    window.open(source_code_link, "_blank", "noopener,noreferrer");
  };

  const toggleDetails = (event) => {
    event.stopPropagation();
    setExpanded((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => {
          wrapperRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        });
      }
      return next;
    });
  };

  return (
    <motion.div
      ref={wrapperRef}
      layout
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      whileHover={expanded ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className='w-full sm:w-[360px] flex flex-col scroll-mt-24'
    >
      <div className='bg-tertiary overflow-hidden rounded-2xl'>
        <Tilt
          options={{
            max: expanded ? 0 : 45,
            scale: 1,
            speed: 450,
          }}
          className='p-5 w-full'
        >
          <motion.div layout='position'>
            <motion.div
              role='button'
              tabIndex={0}
              onClick={openLive}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLive();
                }
              }}
              className={`relative w-full h-[230px] cursor-pointer rounded-2xl overflow-hidden ${
                isLogo ? "bg-[#0f0f1a]" : ""
              }`}
            >
              <img
                src={image}
                alt={name}
                className={`w-full h-full rounded-2xl ${
                  isLogo ? "object-contain p-6" : "object-cover"
                }`}
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

            <motion.div layout='position' className='mt-4 flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <p
                  key={`${name}-${tag.name}`}
                  className={`text-[14px] ${tag.color}`}
                >
                  #{tag.name}
                </p>
              ))}
            </motion.div>

            {hasDetails && (
              <motion.button
                type='button'
                layout='position'
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={toggleDetails}
                whileTap={{ scale: 0.98 }}
                className='mt-5 text-[14px] text-secondary hover:text-white transition-colors duration-300 ease-out'
              >
                {expanded ? "Less info" : "More info"}
              </motion.button>
            )}
          </motion.div>
        </Tilt>

        <AnimatePresence initial={false}>
          {expanded && hasDetails && (
            <motion.div
              key='expanded-panel'
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={expandTransition}
              className='overflow-hidden border-t border-white/5'
            >
              <ProjectExpandedDetails sections={details} panelId={panelId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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

      <motion.div layout className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Featured work across productivity tools, developer automation, and this
          portfolio. Click a project to open the live site; use the GitHub icon for
          the repository.
        </motion.p>
      </motion.div>

      <motion.div layout className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
