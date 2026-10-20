import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/system/Icon";
import { EASE, Reveal } from "@/components/system/Reveal";
import type { FaqItem } from "@/data/content";

export const FAQ = ({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) => {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${uid}-b${i}`;
        const panel = `${uid}-p${i}`;
        return (
          <Reveal key={item.q} delay={Math.min(i, 6) * 0.04} className="border-b border-line">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-4 py-6 text-left sm:items-center sm:gap-6 sm:py-7"
              >
                <span className={cn("min-w-0 flex-1 pr-2 text-[18px] font-medium tracking-tight transition-colors sm:text-[21px]", isOpen ? "text-brand" : "group-hover:text-foreground")}>{item.q}</span>
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-premium",
                    isOpen ? "rotate-45 border-brand bg-brand text-ink" : "border-line text-soft group-hover:border-white/25",
                  )}
                >
                  <Icon name="plus-lg" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-8 pr-14 text-[16.5px] leading-relaxed text-soft">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </div>
  );
};

export function faqLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
