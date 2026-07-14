import { icons } from "lucide-react";
import type { SVGProps } from "react";

function kebabToPascal(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function Icon({
  name,
  size = 20,
  ...rest
}: { name: string; size?: number } & Omit<SVGProps<SVGSVGElement>, "ref">) {
  const Cmp = icons[kebabToPascal(name) as keyof typeof icons];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={1.75} {...rest} />;
}
