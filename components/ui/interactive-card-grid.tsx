"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useState,
} from "react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InteractiveCardGridProps<T> {
  items: T[];
  getItemKey: (item: T, index: number) => string;
  getTitle: (item: T) => ReactNode;
  getTagline: (item: T) => ReactNode;
  renderBack: (item: T, isFlipped: boolean) => ReactNode;
  renderFrontVisual?: (item: T, isFlipped: boolean) => ReactNode;
  renderFrontEyebrow?: (item: T, isFlipped: boolean) => ReactNode;
  gridClassName?: string;
  cardClassName?: string;
  frontContentClassName?: string;
  backContentClassName?: string;
}

const transition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function InteractiveCardGrid<T>({
  items,
  getItemKey,
  getTitle,
  getTagline,
  renderBack,
  renderFrontVisual,
  renderFrontEyebrow,
  gridClassName,
  cardClassName,
  frontContentClassName,
  backContentClassName,
}: InteractiveCardGridProps<T>) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [toggledCards, setToggledCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setToggledCards((current) => ({
      ...current,
      [index]: !current[index],
    }));
  };

  const onCardKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard(index);
    }

    if (event.key === "Escape") {
      setToggledCards((current) => ({
        ...current,
        [index]: false,
      }));
    }
  };

  return (
    <div className={cn("relative grid gap-6 px-1 py-3", gridClassName)}>
      {items.map((item, index) => {
        const isFlipped = hoveredIndex === index || Boolean(toggledCards[index]);

        return (
          <motion.div
            key={getItemKey(item, index)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...transition, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={cn("group relative h-full [perspective:1400px]", cardClassName)}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") {
                setHoveredIndex(index);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") {
                setHoveredIndex((current) => (current === index ? null : current));
              }
            }}
            onPointerUp={(event) => {
              if (event.pointerType !== "mouse") {
                toggleCard(index);
              }
            }}
            onKeyDown={(event) => onCardKeyDown(event, index)}
            role="button"
            tabIndex={0}
            aria-pressed={isFlipped}
            aria-label={`Flip card for ${String(getTitle(item))}`}
          >
            <div
              className="grid h-full transform-gpu [transform-style:preserve-3d] will-change-transform"
              style={{
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <Card
                className={cn(
                  "[grid-area:1/1] flex h-full flex-col overflow-hidden border-primary/20 bg-white/90 shadow-[0_20px_50px_-30px_rgba(126,34,206,0.45)] [backface-visibility:hidden] transition-all duration-500 ease-in-out group-hover:border-primary/35 group-hover:shadow-[0_30px_78px_-36px_rgba(147,51,234,0.55)]",
                  "dark:bg-background/85 dark:shadow-[0_24px_64px_-34px_rgba(147,51,234,0.52)] dark:group-hover:shadow-[0_34px_90px_-38px_rgba(168,85,247,0.6)]",
                )}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,181,253,0.5),transparent_60%)]" />

                <div className="relative flex h-full min-h-0 flex-1 flex-col">
                  {renderFrontVisual ? <div className="shrink-0">{renderFrontVisual(item, isFlipped)}</div> : null}

                  <div className={cn("flex min-h-0 flex-1 flex-col p-5", frontContentClassName)}>
                    {renderFrontEyebrow ? <div className="mb-4">{renderFrontEyebrow(item, isFlipped)}</div> : null}

                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {getTitle(item)}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {getTagline(item)}
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                className={cn(
                  "[grid-area:1/1] flex h-full flex-col overflow-hidden border-primary/35 bg-gradient-to-br from-primary/10 via-white to-primary/5 shadow-[0_24px_64px_-34px_rgba(147,51,234,0.55)] transition-all duration-500 ease-in-out group-hover:shadow-[0_36px_90px_-40px_rgba(147,51,234,0.58)]",
                  "[backface-visibility:hidden] [transform:rotateY(180deg)] dark:from-primary/25 dark:via-background/90 dark:to-primary/10",
                )}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_62%)]" />
                <div
                  className={cn("relative flex h-full min-h-0 flex-1 flex-col overflow-y-auto p-5", backContentClassName)}
                  onClick={(event) => event.stopPropagation()}
                >
                  {renderBack(item, isFlipped)}
                </div>
              </Card>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}