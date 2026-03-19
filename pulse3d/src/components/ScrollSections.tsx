"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Example transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const muscleOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);
  const cardioOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 1, 0]);
  const dataOpacity = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
  const aiOpacity = useTransform(scrollYProgress, [0.75, 0.82, 0.90], [0, 1, 0]);
  const wearableOpacity = useTransform(scrollYProgress, [0.90, 0.93, 0.96], [0, 1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.96, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Noise Texture Overlay for tactile human feel */}
      <div className="bg-noise" />

      {/* Section 1: Hero (0-15%) */}
      <section id="overview" className="h-[150vh] relative flex items-start justify-center pt-[30vh]">
        <motion.div style={{ opacity: heroOpacity }} className="sticky top-[30vh] max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6">
            Awaken Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent">
              Full Potential.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-text-body mb-4 font-light">
            Technology designed to understand your body's unique rhythm.
          </p>
          <p className="text-lg text-text-body/70 mb-10 max-w-2xl mx-auto">
            Experience fitness intelligence that maps your movement, respects your recovery, and adapts to you.
          </p>
          <a 
            href="http://localhost:8000"
            className="inline-block px-8 py-4 rounded-full bg-primary-accent text-white font-medium text-lg hover:bg-primary-accent/90 transition-all shadow-[0_0_30px_rgba(42,127,255,0.3)]"
          >
            Begin Your Journey
          </a>
        </motion.div>
      </section>

      {/* Section 2: Muscle Activation (15-35%) */}
      <section id="muscle" className="h-[200vh] relative flex items-start justify-start md:pl-[10vw] pt-[40vh]">
        <motion.div style={{ opacity: muscleOpacity }} className="sticky top-[40vh] max-w-xl px-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">See your body in motion.</h2>
          <p className="text-xl text-text-body mb-6">Pulse3D maps muscle engagement and movement efficiency in real time.</p>
          <ul className="space-y-4 text-primary-accent font-medium">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-accent shadow-[0_0_10px_#2A7FFF]" /> 
              Muscle activation mapping
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-accent shadow-[0_0_10px_#2A7FFF]" /> 
              Movement accuracy tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-accent shadow-[0_0_10px_#2A7FFF]" /> 
              Injury prevention insights
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Section 3: Cardio (35-55%) */}
      <section id="cardio" className="h-[200vh] relative flex items-start justify-end md:pr-[10vw] pt-[40vh]">
        <motion.div style={{ opacity: cardioOpacity }} className="sticky top-[40vh] max-w-xl px-6 text-right">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Your heart.<br/>Your rhythm.</h2>
          <p className="text-xl text-text-body mb-6">Monitor heart rate zones and recovery metrics with a platform that breathes with you.</p>
          <ul className="space-y-4 text-human-accent font-medium flex flex-col items-end">
            <li className="flex items-center gap-2">
              Live heartbeat visualization
              <span className="w-2 h-2 rounded-full bg-human-accent shadow-[0_0_10px_#FF6B6B] animate-pulse" /> 
            </li>
            <li className="flex items-center gap-2">
              Cardiovascular endurance
              <span className="w-2 h-2 rounded-full bg-human-accent shadow-[0_0_10px_#FF6B6B] animate-pulse" style={{ animationDelay: '0.2s' }} /> 
            </li>
            <li className="flex items-center gap-2">
              Stress and recovery timing
              <span className="w-2 h-2 rounded-full bg-human-accent shadow-[0_0_10px_#FF6B6B] animate-pulse" style={{ animationDelay: '0.4s' }} /> 
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Section 4: Data Cloud (55-75%) */}
      <section id="insights" className="h-[200vh] relative flex items-start justify-start md:pl-[10vw] pt-[40vh]">
        <motion.div style={{ opacity: dataOpacity }} className="sticky top-[40vh] max-w-xl px-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Your performance.<br/>Fully decoded.</h2>
          <p className="text-xl text-text-body mb-6">AI-powered insights transform raw fitness data into actionable intelligence.</p>
          <div className="flex flex-wrap gap-4 mt-8">
            {["Calories", "Intensity", "Training Load", "Sleep", "Recovery"].map((tag) => (
              <div key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-sm">
                {tag}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Section 5: AI Coach (75-90%) */}
      <section id="coach" className="h-[150vh] relative flex items-start justify-end md:pr-[10vw] pt-[40vh]">
        <motion.div style={{ opacity: aiOpacity }} className="sticky top-[40vh] max-w-xl px-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-accent via-secondary-accent to-performance" />
            <h2 className="text-3xl font-display font-bold mb-2 text-white flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-performance animate-pulse shadow-[0_0_15px_#00FF9C]" />
              Your AI fitness companion.
            </h2>
            <p className="text-lg text-text-body mb-6">Pulse3D learns your body's language and adapts to exactly what you need today.</p>
            <div className="space-y-3">
              <div className="p-3 bg-performance/10 rounded-lg border border-performance/20 text-performance text-sm font-medium">
                ↗ Increase cardio tomorrow
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-white/80 text-sm font-medium">
                ↘ Reduce shoulder load
              </div>
              <div className="p-3 bg-primary-accent/10 rounded-lg border border-primary-accent/20 text-primary-accent text-sm font-medium">
                ✧ Focus on recovery today
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 6: Wearable Eco (90-95%) */}
      <section id="technology" className="h-[100vh] relative flex items-center justify-center pt-20">
        <motion.div style={{ opacity: wearableOpacity }} className="text-center px-6 max-w-2xl">
          <h2 className="text-4xl font-display font-bold mb-4 text-white">Powered by intelligent wearables.</h2>
          <p className="text-xl text-text-body">Pulse3D connects seamlessly with next-generation biometric sensors.</p>
        </motion.div>
      </section>

      {/* Section 7: Final (95-100%) */}
      <section className="h-[100vh] relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-40">
        <motion.div style={{ opacity: finalOpacity }}>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6">
            Know your body.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-performance to-secondary-accent">
              Unlock your potential.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-text-body mb-12 font-light max-w-2xl mx-auto">
            Fitness intelligence designed for the future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="http://localhost:8000"
              className="px-8 py-4 rounded-full bg-white text-black font-medium text-lg hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Start Your Fitness Journey
            </a>
            <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/10 transition-all">
              See how it works
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
