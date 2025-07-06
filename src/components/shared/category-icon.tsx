import { type TCategoryIcon } from "@/services/types";
import {
  Activity,
  BookOpen,
  Bot,
  Brain,
  CarFront,
  Clapperboard,
  Code,
  Ghost,
  Hamburger,
  Headphones,
  Leaf,
  Mail,
  Medal,
  Palette,
  Plane,
  Popcorn,
  Sigma,
  SplinePointer,
} from "lucide-react";

type TCategoryIconProps = {
  type: TCategoryIcon;
  className?: string;
};

export const CategoryIcon = ({ type, className }: TCategoryIconProps) => {
  switch (type) {
    case "bookOpen":
      return <BookOpen className={className} />;
    case "bot":
      return <Bot className={className} />;
    case "food":
      return <Hamburger className={className} />;
    case "music":
      return <Headphones className={className} />;
    case "ghost":
      return <Ghost className={className} />;
    case "movies":
      return <Popcorn className={className} />;
    case "design":
      return <SplinePointer className={className} />;
    case "art":
      return <Palette className={className} />;
    case "code":
      return <Code className={className} />;
    case "award":
      return <Medal className={className} />;
    case "mail":
      return <Mail className={className} />;
    case "math":
      return <Sigma className={className} />;
    case "activity":
      return <Activity className={className} />;
    case "video":
      return <Clapperboard className={className} />;
    case "nature":
      return <Leaf className={className} />;
    case "mind":
      return <Brain className={className} />;
    case "travel":
      return <Plane className={className} />;
    case "car":
      return <CarFront className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};
