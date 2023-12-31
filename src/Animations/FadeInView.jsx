import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const variants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 1 },
};

const FadeInView = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
export default FadeInView;
