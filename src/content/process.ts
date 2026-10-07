import { Compass, Hammer, LineChart, Map, Rocket, type LucideIcon } from "lucide-react";

export const processSteps: { n: string; title: string; desc: string; icon: LucideIcon }[] = [
  { n: "01", title: "Discover", desc: "Understand the business, market and goals.", icon: Compass },
  { n: "02", title: "Strategy", desc: "Create a customised growth strategy.", icon: Map },
  { n: "03", title: "Build", desc: "Build websites, campaigns, funnels and automation systems.", icon: Hammer },
  { n: "04", title: "Launch", desc: "Launch campaigns and systems.", icon: Rocket },
  { n: "05", title: "Optimize", desc: "Analyse performance and continuously improve.", icon: LineChart },
];
