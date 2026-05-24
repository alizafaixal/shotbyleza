import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Camera, Globe, Heart } from "lucide-react";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";

const About = () => {
  return (
    <PageLayout>
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              About Me
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The person behind the lens, the stories, and the passion.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary border border-border shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
                <video
                  src="/assets/about-video.MOV"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-primary/50 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary/15 rounded-2xl blur-sm -z-10" />
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="space-y-8"
            >
              <div>
                <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                  Hello, I&apos;m
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                  Aliza
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  A Sydney-based photographer and content creator capturing real
                  emotions, unscripted energy, and real stories. From fashion
                  shows to events chaos to quiet portrait moments and brand
                  work, I create visuals that feel alive.
                </p>
                <p>
                  Photography for me isn&apos;t just about capturing what&apos;s in
                  front of the lens — it&apos;s about freezing a feeling, a vibe,
                  a moment that tells a story even years later.
                </p>
                <p>
                  Whether I&apos;m documenting the raw energy of a packed dance
                  floor, the intimate connection in a portrait session, or the
                  breathtaking landscapes I discover while traveling, my goal
                  remains the same: to create images that move you.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(255,0,51,0.15)]"
              >
                <Link to="/contact">Let&apos;s Work Together</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              The ShotByLeza Way
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              My Approach
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Camera,
                title: "Story First",
                description:
                  "Every shoot is about more than just pretty photos. Whether it’s a personal portrait, a fashion moment, a family memory, or event coverage, my focus is always on telling your story in a way that feels real, elevated, and timeless.",
              },
              {
                icon: Heart,
                title: "Comfort & Confidence",
                description:
                  "I know not everyone feels natural in front of the camera, and that’s okay. My approach is relaxed, guided, and easy so you feel comfortable, confident, and fully yourself. The goal is to capture you at your best without making it feel forced.",
              },
              {
                icon: Globe,
                title: "Creative Direction",
                description:
                  "ShotByLeza is all about blending clean visuals with strong creative energy. I pay attention to styling, mood, movement, lighting, and detail to create images and content that feel polished, modern, and memorable while still staying true to you and your brand.",
              },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="text-center p-8 rounded-2xl border border-border bg-background/50 backdrop-blur-sm"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you have a specific vision in mind or just want to explore
              possibilities, I&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/contact">Book a Session</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground/30 hover:bg-foreground hover:text-background"
              >
                <Link to="/portfolio">View My Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;