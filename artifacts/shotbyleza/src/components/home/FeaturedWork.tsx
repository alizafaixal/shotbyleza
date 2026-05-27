import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const DEFAULT_FEATURED_PATHS = [
  "model/1.webp",
  "events/10.webp",
  "fashion/1.webp",
  "portraits/1.webp",
  "club/1.webp",
  "model/2.webp",
];

interface ApiImage {
  imagePath: string;
  category: string;
  src: string;
  storagePath?: string | null;
  hidden: boolean;
}

const FeaturedWork = () => {
  const settings = useSiteSettings();
  const [imageMap, setImageMap] = useState<Record<string, { src: string; category: string }>>({});

  useEffect(() => {
    fetch("/api/portfolio/images")
      .then((r) => (r.ok ? r.json() : []))
      .then((imgs: ApiImage[]) => {
        const map: Record<string, { src: string; category: string }> = {};
        for (const img of imgs) {
          map[img.imagePath] = {
            src: img.storagePath ?? img.src,
            category: img.category,
          };
        }
        setImageMap(map);
      })
      .catch(() => {});
  }, []);

  const featuredPaths: string[] = settings.featured_images
    ? (JSON.parse(settings.featured_images) as string[])
    : DEFAULT_FEATURED_PATHS;

  const featuredImages = featuredPaths.map((imagePath, i) => {
    const api = imageMap[imagePath];
    return {
      id: i + 1,
      src: api?.src ?? `/assets/images/${imagePath}`,
      alt: api?.category ?? imagePath,
      category: api?.category ?? imagePath.split("/")[0].replace(/-/g, " "),
    };
  });

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
