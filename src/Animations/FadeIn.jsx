import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

const variants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 1 },
};

const FadeIn = ({ children }) => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start("visible");
  }, [controls]);
  return (
    <motion.div animate={controls} initial="hidden" variants={variants}>
      {children}
    </motion.div>
  );
};
export default FadeIn;
