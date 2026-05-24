import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const coverImage = "/assets/images/cover.jpg";
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      {/* floating accents */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[10%] hidden lg:block z-10"
      >
        <div className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-xs tracking-[0.25em] uppercase text-white/70">
          Sydney Based
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-36 right-[10%] hidden lg:block z-10"
      >
        <div className="rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md px-4 py-2 text-xs tracking-[0.25em] uppercase text-primary">
          Photo • Reel • Story
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="space-y-6"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7 },
              },
            }}
            className="text-primary text-xs sm:text-sm font-medium tracking-[0.35em] uppercase"
          >
            Photography & Content Creation
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(14px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.9 },
              },
            }}
            className="text-5xl sm:text-7xl md:text-8xl font-display font-bold tracking-tight text-foreground"
          >
            Shot
            <span className="text-primary">By</span>
            Leza
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.8 },
              },
            }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto"
          >
            Stories in frames. Moments in motion.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7 },
              },
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium shadow-[0_0_40px_rgba(255,0,51,0.15)]"
            >
              <Link to="/portfolio">View Portfolio</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/15 bg-white/5 backdrop-blur-md hover:bg-foreground hover:text-background px-8 py-6 text-base font-medium"
            >
              <Link to="/contact">Book a Shoot</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/50">
            Scroll
          </span>
          <div className="h-12 w-8 rounded-full border border-white/15 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="h-2.5 w-2.5 rounded-full bg-primary"
            />
          </div>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;