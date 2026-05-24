import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeLeft, fadeRight, viewportOnce } from "@/lib/motion";

const QuickAbout = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary border border-border shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
              <video
                src="/assets/about-video.MOV"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-primary/50 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl bg-primary/10 blur-sm -z-10" />
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-6"
          >
            <p className="text-primary text-sm font-medium tracking-widest uppercase">
              The Photographer
            </p>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Hi, I&apos;m Aliza
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              A Sydney-based photographer and content creator capturing real
              emotions, unscripted energy, and real stories. From fashion shows
              to event chaos to quiet portrait moments and brand work, I create
              visuals that feel alive.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
            >
              Learn more about me
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuickAbout;