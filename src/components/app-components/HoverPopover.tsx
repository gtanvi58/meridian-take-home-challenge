"use client";
import { motion } from "framer-motion";

type HoverPopoverProps = {
  title: string;
  position: { x: number; y: number };
};

export default function HoverPopover({ title, position }: HoverPopoverProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className="fixed z-50 bg-white border border-slate-200 shadow-lg rounded-lg p-3 text-sm text-slate-700 max-w-xs"
      style={{
        top: position.y + 8,
        left: position.x,
      }}
    >
      {title}
    </motion.div>
  );
}
