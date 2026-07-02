import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

export default function BrandLogo({
  href = "/",
  className = "",
  showWordmark = true,
  wordmarkClassName = "",
}: BrandLogoProps) {
  return (
    <Link href={href} className={`flex items-center gap-2.5 group ${className}`.trim()}>
      <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        <Image
          src="/brand-logo.svg"
          alt="KrayoNova logo"
          fill
          className="object-cover"
          priority
        />
      </div>
      {showWordmark && (
        <span className={`font-display font-bold text-xl tracking-tight text-text-main ${wordmarkClassName}`.trim()}>
          KrayoNova
        </span>
      )}
    </Link>
  );
}