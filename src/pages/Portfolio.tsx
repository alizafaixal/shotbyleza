import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

const InstagramEmbed = ({ permalink }: { permalink: string }) => {
  useEffect(() => {
    const processEmbeds = () => {
      if (window.instgrm?.Embeds?.process) {
        window.instgrm.Embeds.process();
      }
    };

    const existingScript = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = processEmbeds;
      document.body.appendChild(script);
    } else {
      processEmbeds();
    }
  }, [permalink]);

  return (
    <div className="w-full flex justify-center overflow-hidden rounded-xl">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "12px",
          boxShadow:
            "0 0 1px 0 rgba(0,0,0,0.15), 0 8px 24px 0 rgba(0,0,0,0.08)",
          margin: "0 auto",
          maxWidth: "420px",
          minWidth: "326px",
          width: "100%",
        }}
      />
    </div>
  );
};

const categories = [
  { label: "Model Portfolio", folder: "model" },
  { label: "Event", folder: "events" },
  { label: "Fashion & E-Commerce", folder: "fashion" },
  { label: "Club", folder: "club" },
  { label: "Portraits", folder: "portraits" },
];

const generateImages = (folder: string, label: string, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${folder}-${i + 1}`,
    src: `/assets/images/${folder}/${i + 1}.jpg`,
    category: label,
    title: `${label} ${i + 1}`,
  }));
};

const portfolioImages = [
  ...generateImages("model", "Model Portfolio", 40),
  ...generateImages("events", "Event", 30),
  ...generateImages("club", "Club", 35),
  ...generateImages("fashion", "Fashion & E-Commerce", 20),
  ...generateImages("portraits", "Portraits", 25),
];


const portfolioVideos = [
  {
    id: 1,
    category: "Event",
    title: "Dating Event Recap Reel",
    type: "instagram",
    permalink: "https://www.instagram.com/reel/DO5SUCBj0jO/",
  },
  {
    id: 2,
    category: "Event",
    title: "Dating Event Social Reel",
    type: "instagram",
    permalink: "https://www.instagram.com/reel/DO5P8l4D9HQ/",
  },
  {
    id: 3,
    category: "Event",
    title: "Dating Event Highlight Reel",
    type: "instagram",
    permalink: "https://www.instagram.com/reel/DOfeavQjyzC/",
  },
  {
    id: 4,
    category: "Model Portfolio",
    title: "Model Portfolio Reel",
    type: "instagram",
    permalink: "https://www.instagram.com/reel/DPk6kFcD_PN/",
  },
  {
    id: 5,
    category: "Model Portfolio",
    title: "Model Portfolio Behind The Scenes",
    type: "instagram",
    permalink: "https://www.instagram.com/reel/DP83XEIkmJr/",
  },
  {
    id: 6,
    category: "Fashion & E-Commerce",
    title: "Fashion Reel",
    type: "instagram",
    permalink: "https://www.instagram.com/reel/DNLXpbSPAZ9/",
  },
  {
    id: 7,
    category: "Fashion & E-Commerce",
    title: "Fashion Campaign Reel",
    type: "instagram",
    permalink: "https://www.instagram.com/reel/DOssexrj7Yz/",
  },
];

const Portfolio = () => {
 const [activeCategory, setActiveCategory] = useState(categories[0].label);
const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = portfolioImages.filter(
    (img) => img.category === activeCategory
  );

  const filteredVideos = portfolioVideos.filter(
    (video) => video.category === activeCategory
  );

  const currentImageIndex =
    selectedImage !== null
      ? filteredImages.findIndex((img) => img.id === selectedImage)
      : -1;

  const navigateImage = (direction: "prev" | "next") => {
    if (currentImageIndex === -1) return;

    const newIndex =
      direction === "prev"
        ? (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
        : (currentImageIndex + 1) % filteredImages.length;

    setSelectedImage(filteredImages[newIndex].id);
  };

  const activeImage = filteredImages.find((img) => img.id === selectedImage);

  return (
    <PageLayout>
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              Portfolio
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A curated collection of photography and visual storytelling across
              portfolios, events, fashion, portraits, and branded content.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border bg-background py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
            <button
              key={category.label}
              onClick={() => {
                setActiveCategory(category.label);
                setSelectedImage(null);
              }}
              className={`px-5 py-3 rounded-full text-sm md:text-base transition-all ${
                activeCategory === category.label
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-primary/10 border border-border"
              }`}
            >
              {category.label}
            </button>
          ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Photo Gallery
            </h2>

          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  onClick={() => setSelectedImage(image.id)}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border border-border bg-card"
                >
                  <img
                    src={image.src}
                    alt={image.title ?? image.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <p className="text-primary text-xs font-medium tracking-widest uppercase mb-1">
                      {image.category}
                    </p>
                    <h3 className="text-foreground text-lg font-medium">
                      {image.title ?? image.category}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {activeCategory !== "Club" && activeCategory !== "Portraits" && (
        <section className="pb-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Video Work
            </h2>
            <p className="text-muted-foreground">
              Reels, event recaps, interviews, and short-form content.
            </p>
          </div>

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden p-4"
                >
                  {video.type === "instagram" ? (
                    <InstagramEmbed permalink={video.permalink} />
                  ) : (
                    <div className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden">
                      <video
                        controls
                        poster={video.poster}
                        className="w-full h-full object-cover"
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                        <Play size={14} className="text-primary" />
                        <span className="text-xs text-foreground font-medium">
                          Reel
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5">
                    <p className="text-primary text-xs font-medium tracking-widest uppercase mb-1">
                      {video.category}
                    </p>
                    <h3 className="text-foreground text-lg font-medium">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <p className="text-foreground font-medium mb-2">
                No videos added for this category yet
              </p>
              <p className="text-muted-foreground">
                Add Instagram Reel links or local videos to the{" "}
                <code>portfolioVideos</code> array.
              </p>
            </div>
          )}
        </div>
      </section>
      )}

      <AnimatePresence>
        {selectedImage !== null && activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all z-10"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <img
                  src={activeImage.src}
                  alt={activeImage.title ?? activeImage.category}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg mx-auto"
                />
                <div className="text-center">
                  <p className="text-primary text-sm font-medium tracking-widest uppercase">
                    {activeImage.category}
                  </p>
                  <h3 className="text-foreground text-xl font-display font-medium mt-1">
                    {activeImage.title ?? activeImage.category}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Portfolio;