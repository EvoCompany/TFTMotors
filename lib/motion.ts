export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

export const cardHover = {
  rest: { y: 0, boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)" },
  hover: {
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.18)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export const borderReveal = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export const imageZoom = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
