import { Scene } from "@/components/Scene";
import { ScrollSections } from "@/components/ScrollSections";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground">
      {/* 3D Canvas Rig */}
      <Scene />

      {/* Scrollable Storytelling Content managed by Framer Motion */}
      <div className="relative z-10 w-full">
        <ScrollSections />
      </div>
    </main>
  );
}
