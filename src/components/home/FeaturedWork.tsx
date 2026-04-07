import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const featuredImages = [
  {
    id: 1,
    src: "/assets/images/model/1.jpg",
    alt: "Model portfolio photography",
    category: "Model Portfolio",
  },
  {
    id: 2,
    src: "/assets/images/events/10.jpg",
    alt: "Event photography",
    category: "Event",
  },
  {
    id: 3,
    src: "/assets/images/fashion/1.jpg",
    alt: "Fashion and e-commerce photography",
    category: "Fashion & E-Commerce",
  },
  {
    id: 4,
    src: "/assets/images/portraits/1.jpg",
    alt: "Portrait photography",
    category: "Portraits",
  },
  {
    id: 5,
    src: "/assets/images/club/1.jpg",
    alt: "Club photography",
    category: "Club",
  },
  {
    id: 6,
    src: "/assets/images/model/2.jpg",
    alt: "Model portfolio photography",
    category: "Model Portfolio",
  },
];

const FeaturedWork = () => {
  return (
    <section className="py-24 bg-card relative">
      <div className="container mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Selected Work
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Featured Projects
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredImages.map((image) => (
            <motion.div
              key={image.id}
              variants={fadeUp}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border border-border bg-background shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <span className="text-primary text-sm font-medium tracking-wider uppercase">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mt-12"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-foreground hover:text-primary font-medium transition-colors group"
          >
            View Full Portfolio
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork;