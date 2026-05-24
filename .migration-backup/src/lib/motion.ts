export const springEase = [0.22, 1, 0.36, 1] as const;

export const viewportOnce = {
  once: true,
  amount: 0.2,
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: springEase,
    },
  },
};

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -32,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: springEase,
    },
  },
};

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 32,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: springEase,
    },
  },
};

export const softScaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: springEase,
    },
  },
};