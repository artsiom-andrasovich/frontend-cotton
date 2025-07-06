import { ALLOWED_COLORS, ALLOWED_ICONS } from "@/constants";

export type TCategoryIcon = (typeof ALLOWED_ICONS)[number];
export type TCategoryColor = (typeof ALLOWED_COLORS)[number];

export type TCategory = {
  name: string;
  color: TCategoryColor;
  icon: TCategoryIcon;
};
