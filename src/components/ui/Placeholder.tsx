import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt: string;
  aspect?: "4/5" | "3/2" | "1/1" | "16/9" | "9/16";
  label?: string;
  className?: string;
};

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "16/9": "aspect-video",
  "9/16": "aspect-[9/16]",
};

/**
 * Editorial image slot. Renders the real image when `src` is present,
 * otherwise a soft paper-2 placeholder with a tiny label — sized exactly
 * to the final aspect ratio so the layout doesn't shift when real assets
 * drop in.
 */
export function Placeholder({ src, alt, aspect = "4/5", label, className }: Props) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-paper-2",
        aspectClass[aspect],
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-end justify-between p-4 text-ink-soft">
          <span className="label-caps opacity-60">{label ?? "Image"}</span>
          <span className="label-caps opacity-40">{aspect}</span>
        </div>
      )}
    </div>
  );
}
