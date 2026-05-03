import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // 0.1 = slow, 0.5 = dramatic
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export function ParallaxSection({ children, speed = 0.2, className, style, id }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 80}px`, `-${speed * 80}px`]);

  return (
    <div ref={ref} id={id} className={`relative overflow-hidden ${className ?? ""}`} style={style}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

interface FloatingOrbProps {
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  scrollSpeed?: number;
}

export function FloatingOrb({ color, size, top, left, right, bottom, delay = 0, scrollSpeed = 0.15 }: FloatingOrbProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        background: `radial-gradient(circle at 40% 40%, ${color}40, ${color}10 50%, transparent 70%)`,
        filter: "blur(40px)",
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -25, 20, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 10 + delay * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export function SectionOrbs({ children, ...props }: { children: ReactNode; id?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className="relative" {...props}>
      {children}
    </div>
  );
}
