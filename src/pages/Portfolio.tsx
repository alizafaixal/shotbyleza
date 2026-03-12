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
  "Model Portfolio",
  "Event",
  "Fashion & E-Commerce",
  "Club",
  "Portraits",
];

const portfolioImages = [
  { id: 1, src: "/assets/src/images/portraits/1.jpg", category: "Portraits" },
  { id: 2, src: "/assets/images/portraits/2.jpg", category: "Portraits" },
  { id: 3, src: "/assets/images/portraits/3.jpg", category: "Portraits" },
  { id: 4, src: "/assets/images/portraits/4.jpg", category: "Portraits" },
  { id: 5, src: "/assets/images/portraits/5.jpg", category: "Portraits" },
  { id: 6, src: "/assets/images/portraits/6.jpg", category: "Portraits" },
  { id: 7, src: "/assets/images/portraits/7.jpeg", category: "Portraits" },
  { id: 8, src: "/assets/images/portraits/8.jpg", category: "Portraits" },
  { id: 9, src: "/assets/images/portraits/9.jpg", category: "Portraits" },
  { id: 10, src: "/assets/images/portraits/10.jpg", category: "Portraits" },
  { id: 11, src: "/assets/images/portraits/11.jpg", category: "Portraits" },
  { id: 12, src: "/assets/images/portraits/12.jpg", category: "Portraits" },

  { id: 13, src: "/assets/images/events/1.jpg", category: "Event" },
  { id: 14, src: "/assets/images/events/2.jpg", category: "Event" },
  { id: 15, src: "/assets/images/events/3.jpg", category: "Event" },
  { id: 16, src: "/assets/images/events/4.jpg", category: "Event" },
  { id: 17, src: "/assets/images/events/5.jpg", category: "Event" },
  { id: 18, src: "/assets/images/events/6.jpg", category: "Event" },
  { id: 19, src: "/assets/images/events/7.jpg", category: "Event" },
  { id: 20, src: "/assets/images/events/8.jpg", category: "Event" },
  { id: 21, src: "/assets/images/events/9.jpg", category: "Event" },
  { id: 22, src: "/assets/images/events/10.jpg", category: "Event" },
  { id: 23, src: "/assets/images/events/11.jpg", category: "Event" },
  { id: 24, src: "/assets/images/events/12.jpg", category: "Event" },
  { id: 25, src: "/assets/images/events/13.jpg", category: "Event" },
  { id: 26, src: "/assets/images/events/14.jpg", category: "Event" },
  { id: 27, src: "/assets/images/events/15.jpg", category: "Event" },
  { id: 28, src: "/assets/images/events/16.jpg", category: "Event" },
  { id: 29, src: "/assets/images/events/17.jpg", category: "Event" },
  { id: 30, src: "/assets/images/events/18.jpg", category: "Event" },
  { id: 31, src: "/assets/images/events/19.jpg", category: "Event" },
  { id: 32, src: "/assets/images/events/20.jpg", category: "Event" },
  { id: 33, src: "/assets/images/events/21.jpg", category: "Event" },
  { id: 34, src: "/assets/images/events/22.jpg", category: "Event" },
  { id: 35, src: "/assets/images/events/23.jpg", category: "Event" },
  { id: 36, src: "/assets/images/events/24.jpg", category: "Event" },
  { id: 37, src: "/assets/images/events/25.jpg", category: "Event" },
  { id: 38, src: "/assets/images/events/26.jpg", category: "Event" },
  { id: 39, src: "/assets/images/events/27.jpg", category: "Event" },

  { id: 40, src: "/assets/images/model/1.jpg", category: "Model Portfolio" },
  { id: 41, src: "/assets/images/model/2.jpg", category: "Model Portfolio" },
  { id: 42, src: "/assets/images/model/3.jpg", category: "Model Portfolio" },
  { id: 43, src: "/assets/images/model/4.jpg", category: "Model Portfolio" },
  { id: 44, src: "/assets/images/model/5.jpg", category: "Model Portfolio" },
  { id: 45, src: "/assets/images/model/6.jpg", category: "Model Portfolio" },
  { id: 46, src: "/assets/images/model/7.jpg", category: "Model Portfolio" },
  { id: 47, src: "/assets/images/model/8.jpg", category: "Model Portfolio" },
  { id: 48, src: "/assets/images/model/9.jpg", category: "Model Portfolio" },
  { id: 49, src: "/assets/images/model/10.jpg", category: "Model Portfolio" },
  { id: 50, src: "/assets/images/model/11.jpg", category: "Model Portfolio" },
  { id: 51, src: "/assets/images/model/12.jpg", category: "Model Portfolio" },
  { id: 52, src: "/assets/images/model/13.jpg", category: "Model Portfolio" },
  { id: 53, src: "/assets/images/model/14.jpg", category: "Model Portfolio" },
  { id: 54, src: "/assets/images/model/15.jpg", category: "Model Portfolio" },
  { id: 55, src: "/assets/images/model/16.jpg", category: "Model Portfolio" },
  { id: 56, src: "/assets/images/model/17.jpg", category: "Model Portfolio" },
  { id: 57, src: "/assets/images/model/18.jpg", category: "Model Portfolio" },
  { id: 58, src: "/assets/images/model/19.jpg", category: "Model Portfolio" },
  { id: 59, src: "/assets/images/model/20.jpg", category: "Model Portfolio" },
  { id: 60, src: "/assets/images/model/21.jpg", category: "Model Portfolio" },
  { id: 65, src: "/assets/images/model/26.jpg", category: "Model Portfolio" },
  { id: 66, src: "/assets/images/model/27.jpg", category: "Model Portfolio" },
  { id: 67, src: "/assets/images/model/28.jpg", category: "Model Portfolio" },
  { id: 68, src: "/assets/images/model/29.jpg", category: "Model Portfolio" },
  { id: 69, src: "/assets/images/model/30.jpg", category: "Model Portfolio" },
  { id: 70, src: "/assets/images/model/31.jpg", category: "Model Portfolio" },
  { id: 71, src: "/assets/images/model/32.jpg", category: "Model Portfolio" },

  { id: 72, src: "/assets/images/fashion/1.jpg", category: "Fashion & E-Commerce" },
  { id: 73, src: "/assets/images/fashion/2.jpg", category: "Fashion & E-Commerce" },
  { id: 74, src: "/assets/images/fashion/3.jpg", category: "Fashion & E-Commerce" },
  { id: 75, src: "/assets/images/fashion/4.jpg", category: "Fashion & E-Commerce" },
  { id: 76, src: "/assets/images/fashion/5.jpg", category: "Fashion & E-Commerce" },
  { id: 77, src: "/assets/images/fashion/6.jpg", category: "Fashion & E-Commerce" },
  { id: 79, src: "/assets/images/fashion/8.jpg", category: "Fashion & E-Commerce" },
  { id: 80, src: "/assets/images/fashion/9.jpg", category: "Fashion & E-Commerce" },
  { id: 81, src: "/assets/images/fashion/10.jpg", category: "Fashion & E-Commerce" },
  { id: 82, src: "/assets/images/fashion/11.jpg", category: "Fashion & E-Commerce" },
  { id: 83, src: "/assets/images/fashion/12.jpg", category: "Fashion & E-Commerce" },
  { id: 84, src: "/assets/images/fashion/13.jpg", category: "Fashion & E-Commerce" },
  { id: 85, src: "/assets/images/fashion/14.jpg", category: "Fashion & E-Commerce" },
  { id: 86, src: "/assets/images/fashion/15.jpg", category: "Fashion & E-Commerce" },
  { id: 87, src: "/assets/images/fashion/16.jpg", category: "Fashion & E-Commerce" },
  { id: 88, src: "/assets/images/fashion/17.jpg", category: "Fashion & E-Commerce" },
  { id: 89, src: "/assets/images/fashion/18.jpg", category: "Fashion & E-Commerce" },
  { id: 90, src: "/assets/images/fashion/19.jpg", category: "Fashion & E-Commerce" },
  { id: 92, src: "/assets/images/fashion/21.jpg", category: "Fashion & E-Commerce" },
  { id: 93, src: "/assets/images/fashion/22.jpg", category: "Fashion & E-Commerce" },
  { id: 94, src: "/assets/images/fashion/23.jpg", category: "Fashion & E-Commerce" },
  { id: 95, src: "/assets/images/fashion/24.jpg", category: "Fashion & E-Commerce" },
  { id: 96, src: "/assets/images/fashion/25.jpg", category: "Fashion & E-Commerce" },
  { id: 97, src: "/assets/images/fashion/26.jpg", category: "Fashion & E-Commerce" },
  { id: 98, src: "/assets/images/fashion/27.jpg", category: "Fashion & E-Commerce" },
  { id: 99, src: "/assets/images/fashion/28.jpg", category: "Fashion & E-Commerce" },
  { id: 100, src: "/assets/images/fashion/29.jpg", category: "Fashion & E-Commerce" },
  { id: 101, src: "/assets/images/fashion/30.jpg", category: "Fashion & E-Commerce" },
  { id: 102, src: "/assets/images/fashion/31.jpg", category: "Fashion & E-Commerce" },
  { id: 103, src: "/assets/images/fashion/32.jpg", category: "Fashion & E-Commerce" },
  { id: 105, src: "/assets/images/fashion/34.jpg", category: "Fashion & E-Commerce" },
  { id: 106, src: "/assets/images/fashion/35.jpg", category: "Fashion & E-Commerce" },
  { id: 107, src: "/assets/images/fashion/36.jpg", category: "Fashion & E-Commerce" },
  { id: 108, src: "/assets/images/fashion/37.jpg", category: "Fashion & E-Commerce" },
  { id: 109, src: "/assets/images/fashion/38.jpg", category: "Fashion & E-Commerce" },
  { id: 110, src: "/assets/images/fashion/39.jpg", category: "Fashion & E-Commerce" },
  { id: 111, src: "/assets/images/fashion/40.jpg", category: "Fashion & E-Commerce" },
  { id: 112, src: "/assets/images/fashion/41.jpeg", category: "Fashion & E-Commerce" },
  { id: 113, src: "/assets/images/fashion/42.jpg", category: "Fashion & E-Commerce" },
  { id: 114, src: "/assets/images/fashion/43.jpg", category: "Fashion & E-Commerce" },
  { id: 115, src: "/assets/images/fashion/44.jpg", category: "Fashion & E-Commerce" },
  { id: 116, src: "/assets/images/fashion/45.jpg", category: "Fashion & E-Commerce" },
  { id: 117, src: "/assets/images/fashion/46.jpg", category: "Fashion & E-Commerce" },
  { id: 118, src: "/assets/images/fashion/47.jpg", category: "Fashion & E-Commerce" },
  { id: 119, src: "/assets/images/fashion/48.jpg", category: "Fashion & E-Commerce" },
  { id: 120, src: "/assets/images/fashion/49.jpg", category: "Fashion & E-Commerce" },
  { id: 121, src: "/assets/images/fashion/50.jpg", category: "Fashion & E-Commerce" },

  { id: 122, src: "/assets/images/club/1.jpg", category: "Club" },
  { id: 123, src: "/assets/images/club/2.jpg", category: "Club" },
  { id: 124, src: "/assets/images/club/3.jpg", category: "Club" },
  { id: 125, src: "/assets/images/club/4.jpg", category: "Club" },
  { id: 126, src: "/assets/images/club/5.jpg", category: "Club" },
  { id: 127, src: "/assets/images/club/6.jpg", category: "Club" },
  { id: 128, src: "/assets/images/club/7.jpg", category: "Club" },
  { id: 129, src: "/assets/images/club/8.jpg", category: "Club" },
  { id: 130, src: "/assets/images/club/9.jpg", category: "Club" },
  { id: 131, src: "/assets/images/club/10.jpg", category: "Club" },
  { id: 132, src: "/assets/images/club/11.jpg", category: "Club" },
  { id: 133, src: "/assets/images/club/12.jpg", category: "Club" },
  { id: 134, src: "/assets/images/club/13.jpg", category: "Club" },
  { id: 135, src: "/assets/images/club/14.jpg", category: "Club" },
  { id: 136, src: "/assets/images/club/15.jpg", category: "Club" },
  { id: 137, src: "/assets/images/club/16.jpg", category: "Club" },
  { id: 138, src: "/assets/images/club/17.jpg", category: "Club" },
  { id: 139, src: "/assets/images/club/18.jpg", category: "Club" },
  { id: 140, src: "/assets/images/club/19.jpg", category: "Club" },
  { id: 141, src: "/assets/images/club/20.jpg", category: "Club" },
  { id: 142, src: "/assets/images/club/21.jpg", category: "Club" },
  { id: 143, src: "/assets/images/club/22.jpg", category: "Club" },
  { id: 144, src: "/assets/images/club/23.jpg", category: "Club" },
  { id: 145, src: "/assets/images/club/24.jpg", category: "Club" },
  { id: 146, src: "/assets/images/club/25.jpg", category: "Club" },
  { id: 147, src: "/assets/images/club/26.jpg", category: "Club" },
  { id: 148, src: "/assets/images/club/27.jpg", category: "Club" },
  { id: 149, src: "/assets/images/club/28.jpg", category: "Club" },
  { id: 150, src: "/assets/images/club/29.jpg", category: "Club" },
  { id: 151, src: "/assets/images/club/30.jpg", category: "Club" },
  { id: 152, src: "/assets/images/club/31.jpg", category: "Club" },
  { id: 153, src: "/assets/images/club/32.jpg", category: "Club" },
  { id: 154, src: "/assets/images/club/33.jpg", category: "Club" },
  { id: 155, src: "/assets/images/club/34.jpg", category: "Club" },
  { id: 156, src: "/assets/images/club/35.jpg", category: "Club" },
  { id: 157, src: "/assets/images/club/36.jpg", category: "Club" },
  { id: 158, src: "/assets/images/club/37.jpg", category: "Club" },
  { id: 159, src: "/assets/images/club/38.jpg", category: "Club" },
  { id: 160, src: "/assets/images/club/39.jpg", category: "Club" },
  { id: 161, src: "/assets/images/club/40.jpg", category: "Club" },
  { id: 162, src: "/assets/images/club/41.jpg", category: "Club" },
  { id: 163, src: "/assets/images/club/42.jpg", category: "Club" },
  { id: 164, src: "/assets/images/club/43.jpg", category: "Club" },
  { id: 165, src: "/assets/images/club/44.jpg", category: "Club" },
  { id: 166, src: "/assets/images/club/45.jpg", category: "Club" },
  { id: 167, src: "/assets/images/club/46.jpg", category: "Club" },
  { id: 168, src: "/assets/images/club/47.jpg", category: "Club" },
  { id: 169, src: "/assets/images/club/48.jpg", category: "Club" },
  { id: 170, src: "/assets/images/club/49.jpg", category: "Club" },
  { id: 171, src: "/assets/images/club/50.jpg", category: "Club" },
  { id: 172, src: "/assets/images/club/51.jpg", category: "Club" },
  { id: 173, src: "/assets/images/club/52.jpg", category: "Club" },
  { id: 174, src: "/assets/images/club/53.jpg", category: "Club" },
  { id: 175, src: "/assets/images/club/54.jpg", category: "Club" },
  { id: 176, src: "/assets/images/club/55.jpg", category: "Club" },
  { id: 177, src: "/assets/images/club/56.jpg", category: "Club" },
  { id: 178, src: "/assets/images/club/57.jpg", category: "Club" },
  { id: 179, src: "/assets/images/club/58.jpg", category: "Club" },
  { id: 180, src: "/assets/images/club/59.jpg", category: "Club" },
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
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedImage(null);
                }}
                className={`px-5 py-3 rounded-full text-sm md:text-base transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-primary/10 border border-border"
                }`}
              >
                {category}
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