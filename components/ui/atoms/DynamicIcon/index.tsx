import * as OutlineIcons from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";

export type IconName = keyof typeof OutlineIcons;

export interface DynamicIconProps {
  icon: IconName;
  className?: string;
  solid?: boolean;
}

export function DynamicIcon({ icon, className, solid }: DynamicIconProps) {
  const { ...icons } = solid ? SolidIcons : OutlineIcons;

  const TheIcon = icons[icon];

  return <TheIcon className={className} />;
}

export default DynamicIcon;
