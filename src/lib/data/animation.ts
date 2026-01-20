import { Variants } from "framer-motion";

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: {
    y: 30,
    opacity: 0,
    filter: "blur(5px)",
  },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0)",
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(5px)",
  },
  show: {
    opacity: 1,
    filter: "blur(0)",
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

// Split text animations
export const splitTextContainer: Variants = {
  hidden: { opacity: 0, filter: "blur(5px)"},
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const splitTextWord: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(5px)",
    y: 30,
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};