"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardSide = "left" | "right";

interface InteractiveCardGridProps<T> {
  items: T[];
  getItemKey: (item: T, index: number) => string;
  getTitle: (item: T) => ReactNode;
  renderDetails: (item: T, isActive: boolean) => ReactNode;
  renderVisual?: (item: T, isActive: boolean) => ReactNode;
  renderEyebrow?: (item: T, isActive: boolean) => ReactNode;
  gridClassName?: string;
  cardClassName?: string;
  contentClassName?: string;
}

const transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function InteractiveCardGrid<T>({
  items,
  getItemKey,
  getTitle,
  renderDetails,
  renderVisual,
  renderEyebrow,
  gridClassName,
  cardClassName,
  contentClassName,
}: InteractiveCardGridProps<T>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);
  const [cardSides, setCardSides] = useState<Record<number, CardSide>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const resolvedActiveIndex = activeIndex !== null && activeIndex < items.length ? activeIndex : null;

  const updateCardSides = useEffectEvent(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const midpoint = containerRect.left + containerRect.width / 2;
    const nextSides: Record<number, CardSide> = {};

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      nextSides[index] = center <= midpoint ? "left" : "right";
    });

    setCardSides(nextSides);
  });

  const handleOutsidePointerDown = useEffectEvent((event: PointerEvent) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (!containerRef.current?.contains(target)) {
      setActiveIndex(null);
    }
  });

  const handleEscapeKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setActiveIndex(null);
    }
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateSupport = () => setSupportsHover(mediaQuery.matches);

    updateSupport();
    mediaQuery.addEventListener("change", updateSupport);

    return () => mediaQuery.removeEventListener("change", updateSupport);
  }, []);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, items.length);
    updateCardSides();
  }, [items.length]);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(() => updateCardSides());

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    cardRefs.current.forEach((card) => {
      if (card) {
        resizeObserver.observe(card);
      }
    });

    window.addEventListener("resize", updateCardSides);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateCardSides);
    };
  }, [items.length]);

  useEffect(() => {
    if (resolvedActiveIndex === null) {
      return;
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [resolvedActiveIndex]);

  const onCardKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveIndex((current) => (current === index ? null : index));
    }

    if (event.key === "Escape") {
      setActiveIndex(null);
    }
  };

  return (
    <div className="relative">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-background/45 backdrop-blur-md"
        animate={{ opacity: resolvedActiveIndex === null ? 0 : 1 }}
        transition={transition}
      />

      <div
        ref={containerRef}
        className={cn("relative grid gap-6 px-1 py-3", gridClassName)}
        onMouseLeave={() => {
          if (supportsHover) {
            setActiveIndex(null);
          }
        }}
      >
        {items.map((item, index) => {
          const isActive = resolvedActiveIndex === index;
          const hasActiveCard = resolvedActiveIndex !== null;
          const detailDirection = cardSides[index] ?? (index % 2 === 0 ? "left" : "right");

          return (
            <motion.div
              key={getItemKey(item, index)}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...transition, delay: index * 0.05 }}
              animate={
                isActive
                  ? { scale: 1.03, y: -10, opacity: 1, filter: "blur(0px)" }
                  : hasActiveCard
                    ? { scale: 0.985, y: 0, opacity: 0.42, filter: "blur(2px)" }
                    : { scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }
              }
              className={cn("relative z-10 h-full outline-none", isActive && "z-30")}
              onMouseEnter={() => {
                if (supportsHover) {
                  setActiveIndex(index);
                }
              }}
              onClick={() => setActiveIndex((current) => (current === index ? null : index))}
              onKeyDown={(event) => onCardKeyDown(event, index)}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
            >
              <Card
                className={cn(
                  "relative flex h-full overflow-hidden border-border/60 bg-background/75 shadow-[0_20px_48px_-28px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-shadow duration-500",
                  isActive && "border-primary/35 shadow-[0_30px_80px_-38px_rgba(147,51,234,0.45)]",
                  cardClassName,
                )}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_58%)]" />

                <div className="relative flex h-full flex-1 flex-col">
                  {renderVisual ? <div className="shrink-0">{renderVisual(item, isActive)}</div> : null}

                  <div className={cn("flex flex-1 flex-col p-6", contentClassName)}>
                    {renderEyebrow ? <div className="mb-4">{renderEyebrow(item, isActive)}</div> : null}

                    <h3
                      className={cn(
                        "text-xl font-semibold tracking-tight text-foreground transition-colors duration-300",
                        isActive && "text-primary",
                      )}
                    >
                      {getTitle(item)}
                    </h3>

                    <AnimatePresence initial={false} mode="wait">
                      {isActive ? (
                        <motion.div
                          key="details"
                          layout
                          initial={{ opacity: 0, x: detailDirection === "left" ? -28 : 28, y: 8 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          exit={{ opacity: 0, x: detailDirection === "left" ? -28 : 28, y: 4 }}
                          transition={transition}
                          className="overflow-hidden pt-4"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {renderDetails(item, isActive)}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}