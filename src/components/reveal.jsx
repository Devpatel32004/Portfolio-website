"use client";

import { motion } from "framer-motion";

const variants = {
  hidden: { 
    opacity: 0, 
    y: 24,
    scale: 0.98,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
    }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  },
};

export function Reveal({ 
  children, 
  className, 
  delay = 0, 
  variant = "default",
  direction = null,
}) {
  let selectedVariant = variants.hidden;
  
  if (direction === "left") {
    selectedVariant = variants.slideInLeft;
  } else if (direction === "right") {
    selectedVariant = variants.slideInRight;
  } else if (variant === "scale") {
    selectedVariant = variants.scaleUp;
  } else {
    selectedVariant = {
      hidden: variants.hidden,
      visible: variants.visible,
    };
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "-50px" }}
      variants={selectedVariant}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for children animations
export function StaggerContainer({ children, className, staggerDelay = 0.1 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Child item for use with StaggerContainer
export function StaggerItem({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        },
      }}
    >
      {children}
    </motion.div>
  );
}
