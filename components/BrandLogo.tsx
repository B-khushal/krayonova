import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type BrandLogoProps = {
  href?: string;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  size?: "sm" | "md" | "lg";
  wordmarkExtra?: ReactNode;
};

export default function BrandLogo({
  href = "/",
  className = "",
  showWordmark = true,
  wordmarkClassName = "",
  size = "md",
  wordmarkExtra,
}: BrandLogoProps) {
  const sizeClasses = {
    sm: {
      box: "h-9 w-auto max-h-9 px-1.5 py-1 rounded-lg",
      iconBox: "h-8 w-8 rounded-lg p-0.5",
    },
    md: {
      box: "h-11 w-auto max-h-11 px-2 py-1 rounded-xl",
      iconBox: "h-10 w-10 rounded-xl p-1",
    },
    lg: {
      box: "h-14 w-auto max-h-14 px-2.5 py-1.5 rounded-2xl",
      iconBox: "h-12 w-12 rounded-2xl p-1",
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 group transition-transform duration-300 active:scale-[0.98] ${className}`.trim()}
    >
      <div
        className={`relative overflow-hidden bg-white border border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] group-hover:border-black/20 group-hover:scale-[1.02] transition-all duration-300 flex items-center justify-center shrink-0 ${
          showWordmark ? currentSize.box : currentSize.iconBox
        }`}
      >
        <Image
          src="/KrayoNova-Logo.png"
          alt="KrayoNova logo"
          width={400}
          height={400}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
      {wordmarkExtra && (
        <div className="flex items-center">
          {wordmarkExtra}
        </div>
      )}
    </Link>
  );
}