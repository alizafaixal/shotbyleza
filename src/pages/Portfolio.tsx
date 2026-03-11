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
  { id: 1, src: "./src/images/portraits/1.JPG", category: "Portraits" },
  { id: 2, src: "./src/images/portraits/2.JPG", category: "Portraits" },
  { id: 3, src: "./src/images/portraits/3.jpg", category: "Portraits" },
  { id: 4, src: "./src/images/portraits/4.jpg", category: "Portraits" },
  { id: 5, src: "./src/images/portraits/5.jpg", category: "Portraits" },
  { id: 6, src: "./src/images/portraits/6.jpg", category: "Portraits" },
  { id: 7, src: "./src/images/portraits/7.jpeg", category: "Portraits" },
  { id: 8, src: "./src/images/portraits/8.JPG", category: "Portraits" },
  { id: 9, src: "./src/images/portraits/9.jpg", category: "Portraits" },
  { id: 10, src: "./src/images/portraits/10.jpg", category: "Portraits" },
  { id: 11, src: "./src/images/portraits/11.jpg", category: "Portraits" },
  { id: 12, src: "./src/images/portraits/12.jpg", category: "Portraits" },

  { id: 13, src: "./src/images/events/1.JPG", category: "Event" },
  { id: 14, src: "./src/images/events/2.JPG", category: "Event" },
  { id: 15, src: "./src/images/events/3.JPG", category: "Event" },
  { id: 16, src: "./src/images/events/4.JPG", category: "Event" },
  { id: 17, src: "./src/images/events/5.JPG", category: "Event" },
  { id: 18, src: "./src/images/events/6.JPG", category: "Event" },
  { id: 19, src: "./src/images/events/7.JPG", category: "Event" },
  { id: 20, src: "./src/images/events/8.JPG", category: "Event" },
  { id: 21, src: "./src/images/events/9.JPG", category: "Event" },
  { id: 22, src: "./src/images/events/10.JPG", category: "Event" },
  { id: 23, src: "./src/images/events/11.JPG", category: "Event" },
  { id: 24, src: "./src/images/events/12.JPG", category: "Event" },
  { id: 25, src: "./src/images/events/13.JPG", category: "Event" },
  { id: 26, src: "./src/images/events/14.JPG", category: "Event" },
  { id: 27, src: "./src/images/events/15.JPG", category: "Event" },
  { id: 28, src: "./src/images/events/16.JPG", category: "Event" },
  { id: 29, src: "./src/images/events/17.JPG", category: "Event" },
  { id: 30, src: "./src/images/events/18.JPG", category: "Event" },
  { id: 31, src: "./src/images/events/19.JPG", category: "Event" },
  { id: 32, src: "./src/images/events/20.JPG", category: "Event" },
  { id: 33, src: "./src/images/events/21.JPG", category: "Event" },
  { id: 34, src: "./src/images/events/22.JPG", category: "Event" },
  { id: 35, src: "./src/images/events/23.JPG", category: "Event" },
  { id: 36, src: "./src/images/events/24.JPG", category: "Event" },
  { id: 37, src: "./src/images/events/25.JPG", category: "Event" },
  { id: 38, src: "./src/images/events/26.JPG", category: "Event" },
  { id: 39, src: "./src/images/events/27.JPG", category: "Event" },

  { id: 40, src: "./src/images/model/1.JPG", category: "Model Portfolio" },
  { id: 41, src: "./src/images/model/2.JPG", category: "Model Portfolio" },
  { id: 42, src: "./src/images/model/3.JPG", category: "Model Portfolio" },
  { id: 43, src: "./src/images/model/4.JPG", category: "Model Portfolio" },
  { id: 44, src: "./src/images/model/5.JPG", category: "Model Portfolio" },
  { id: 45, src: "./src/images/model/6.JPG", category: "Model Portfolio" },
  { id: 46, src: "./src/images/model/7.JPG", category: "Model Portfolio" },
  { id: 47, src: "./src/images/model/8.JPG", category: "Model Portfolio" },
  { id: 48, src: "./src/images/model/9.JPG", category: "Model Portfolio" },
  { id: 49, src: "./src/images/model/10.JPG", category: "Model Portfolio" },
  { id: 50, src: "./src/images/model/11.JPG", category: "Model Portfolio" },
  { id: 51, src: "./src/images/model/12.JPG", category: "Model Portfolio" },
  { id: 52, src: "./src/images/model/13.JPG", category: "Model Portfolio" },
  { id: 53, src: "./src/images/model/14.JPG", category: "Model Portfolio" },
  { id: 54, src: "./src/images/model/15.JPG", category: "Model Portfolio" },
  { id: 55, src: "./src/images/model/16.JPG", category: "Model Portfolio" },
  { id: 56, src: "./src/images/model/17.JPG", category: "Model Portfolio" },
  { id: 57, src: "./src/images/model/18.JPG", category: "Model Portfolio" },
  { id: 58, src: "./src/images/model/19.JPG", category: "Model Portfolio" },
  { id: 59, src: "./src/images/model/20.JPG", category: "Model Portfolio" },
  { id: 60, src: "./src/images/model/21.JPG", category: "Model Portfolio" },
  { id: 65, src: "./src/images/model/26.JPG", category: "Model Portfolio" },
  { id: 66, src: "./src/images/model/27.JPG", category: "Model Portfolio" },
  { id: 67, src: "./src/images/model/28.JPG", category: "Model Portfolio" },
  { id: 68, src: "./src/images/model/29.JPG", category: "Model Portfolio" },
  { id: 69, src: "./src/images/model/30.JPG", category: "Model Portfolio" },
  { id: 70, src: "./src/images/model/31.JPG", category: "Model Portfolio" },
  { id: 71, src: "./src/images/model/32.JPG", category: "Model Portfolio" },

  { id: 72, src: "./src/images/fashion/1.JPG", category: "Fashion & E-Commerce" },
  { id: 73, src: "./src/images/fashion/2.JPG", category: "Fashion & E-Commerce" },
  { id: 74, src: "./src/images/fashion/3.JPG", category: "Fashion & E-Commerce" },
  { id: 75, src: "./src/images/fashion/4.JPG", category: "Fashion & E-Commerce" },
  { id: 76, src: "./src/images/fashion/5.JPG", category: "Fashion & E-Commerce" },
  { id: 77, src: "./src/images/fashion/6.JPG", category: "Fashion & E-Commerce" },
  { id: 79, src: "./src/images/fashion/8.JPG", category: "Fashion & E-Commerce" },
  { id: 80, src: "./src/images/fashion/9.JPG", category: "Fashion & E-Commerce" },
  { id: 81, src: "./src/images/fashion/10.JPG", category: "Fashion & E-Commerce" },
  { id: 82, src: "./src/images/fashion/11.JPG", category: "Fashion & E-Commerce" },
  { id: 83, src: "./src/images/fashion/12.JPG", category: "Fashion & E-Commerce" },
  { id: 84, src: "./src/images/fashion/13.JPG", category: "Fashion & E-Commerce" },
  { id: 85, src: "./src/images/fashion/14.JPG", category: "Fashion & E-Commerce" },
  { id: 86, src: "./src/images/fashion/15.JPG", category: "Fashion & E-Commerce" },
  { id: 87, src: "./src/images/fashion/16.JPG", category: "Fashion & E-Commerce" },
  { id: 88, src: "./src/images/fashion/17.JPG", category: "Fashion & E-Commerce" },
  { id: 89, src: "./src/images/fashion/18.JPG", category: "Fashion & E-Commerce" },
  { id: 90, src: "./src/images/fashion/19.JPG", category: "Fashion & E-Commerce" },
  { id: 92, src: "./src/images/fashion/21.JPG", category: "Fashion & E-Commerce" },
  { id: 93, src: "./src/images/fashion/22.JPG", category: "Fashion & E-Commerce" },
  { id: 94, src: "./src/images/fashion/23.JPG", category: "Fashion & E-Commerce" },
  { id: 95, src: "./src/images/fashion/24.JPG", category: "Fashion & E-Commerce" },
  { id: 96, src: "./src/images/fashion/25.JPG", category: "Fashion & E-Commerce" },
  { id: 97, src: "./src/images/fashion/26.JPG", category: "Fashion & E-Commerce" },
  { id: 98, src: "./src/images/fashion/27.JPG", category: "Fashion & E-Commerce" },
  { id: 99, src: "./src/images/fashion/28.JPG", category: "Fashion & E-Commerce" },
  { id: 100, src: "./src/images/fashion/29.JPG", category: "Fashion & E-Commerce" },
  { id: 101, src: "./src/images/fashion/30.JPG", category: "Fashion & E-Commerce" },
  { id: 102, src: "./src/images/fashion/31.JPG", category: "Fashion & E-Commerce" },
  { id: 103, src: "./src/images/fashion/32.JPG", category: "Fashion & E-Commerce" },
  { id: 105, src: "./src/images/fashion/34.JPG", category: "Fashion & E-Commerce" },
  { id: 106, src: "./src/images/fashion/35.JPG", category: "Fashion & E-Commerce" },
  { id: 107, src: "./src/images/fashion/36.JPG", category: "Fashion & E-Commerce" },
  { id: 108, src: "./src/images/fashion/37.JPG", category: "Fashion & E-Commerce" },
  { id: 109, src: "./src/images/fashion/38.JPG", category: "Fashion & E-Commerce" },
  { id: 110, src: "./src/images/fashion/39.JPG", category: "Fashion & E-Commerce" },
  { id: 111, src: "./src/images/fashion/40.JPG", category: "Fashion & E-Commerce" },
  { id: 112, src: "./src/images/fashion/41.jpeg", category: "Fashion & E-Commerce" },
  { id: 113, src: "./src/images/fashion/42.JPG", category: "Fashion & E-Commerce" },
  { id: 114, src: "./src/images/fashion/43.JPG", category: "Fashion & E-Commerce" },
  { id: 115, src: "./src/images/fashion/44.JPG", category: "Fashion & E-Commerce" },
  { id: 116, src: "./src/images/fashion/45.JPG", category: "Fashion & E-Commerce" },
  { id: 117, src: "./src/images/fashion/46.JPG", category: "Fashion & E-Commerce" },
  { id: 118, src: "./src/images/fashion/47.JPG", category: "Fashion & E-Commerce" },
  { id: 119, src: "./src/images/fashion/48.JPG", category: "Fashion & E-Commerce" },
  { id: 120, src: "./src/images/fashion/49.JPG", category: "Fashion & E-Commerce" },
  { id: 121, src: "./src/images/fashion/50.JPG", category: "Fashion & E-Commerce" },

  { id: 122, src: "./src/images/club/1.JPG", category: "Club" },
  { id: 123, src: "./src/images/club/2.JPG", category: "Club" },
  { id: 124, src: "./src/images/club/3.JPG", category: "Club" },
  { id: 125, src: "./src/images/club/4.JPG", category: "Club" },
  { id: 126, src: "./src/images/club/5.JPG", category: "Club" },
  { id: 127, src: "./src/images/club/6.JPG", category: "Club" },
  { id: 128, src: "./src/images/club/7.JPG", category: "Club" },
  { id: 129, src: "./src/images/club/8.JPG", category: "Club" },
  { id: 130, src: "./src/images/club/9.JPG", category: "Club" },
  { id: 131, src: "./src/images/club/10.JPG", category: "Club" },
  { id: 132, src: "./src/images/club/11.JPG", category: "Club" },
  { id: 133, src: "./src/images/club/12.JPG", category: "Club" },
  { id: 134, src: "./src/images/club/13.JPG", category: "Club" },
  { id: 135, src: "./src/images/club/14.JPG", category: "Club" },
  { id: 136, src: "./src/images/club/15.JPG", category: "Club" },
  { id: 137, src: "./src/images/club/16.JPG", category: "Club" },
  { id: 138, src: "./src/images/club/17.JPG", category: "Club" },
  { id: 139, src: "./src/images/club/18.JPG", category: "Club" },
  { id: 140, src: "./src/images/club/19.JPG", category: "Club" },
  { id: 141, src: "./src/images/club/20.JPG", category: "Club" },
  { id: 142, src: "./src/images/club/21.JPG", category: "Club" },
  { id: 143, src: "./src/images/club/22.JPG", category: "Club" },
  { id: 144, src: "./src/images/club/23.JPG", category: "Club" },
  { id: 145, src: "./src/images/club/24.JPG", category: "Club" },
  { id: 146, src: "./src/images/club/25.JPG", category: "Club" },
  { id: 147, src: "./src/images/club/26.JPG", category: "Club" },
  { id: 148, src: "./src/images/club/27.JPG", category: "Club" },
  { id: 149, src: "./src/images/club/28.JPG", category: "Club" },
  { id: 150, src: "./src/images/club/29.JPG", category: "Club" },
  { id: 151, src: "./src/images/club/30.JPG", category: "Club" },
  { id: 152, src: "./src/images/club/31.JPG", category: "Club" },
  { id: 153, src: "./src/images/club/32.JPG", category: "Club" },
  { id: 154, src: "./src/images/club/33.JPG", category: "Club" },
  { id: 155, src: "./src/images/club/34.JPG", category: "Club" },
  { id: 156, src: "./src/images/club/35.JPG", category: "Club" },
  { id: 157, src: "./src/images/club/36.JPG", category: "Club" },
  { id: 158, src: "./src/images/club/37.JPG", category: "Club" },
  { id: 159, src: "./src/images/club/38.JPG", category: "Club" },
  { id: 160, src: "./src/images/club/39.JPG", category: "Club" },
  { id: 161, src: "./src/images/club/40.JPG", category: "Club" },
  { id: 162, src: "./src/images/club/41.JPG", category: "Club" },
  { id: 163, src: "./src/images/club/42.JPG", category: "Club" },
  { id: 164, src: "./src/images/club/43.JPG", category: "Club" },
  { id: 165, src: "./src/images/club/44.JPG", category: "Club" },
  { id: 166, src: "./src/images/club/45.JPG", category: "Club" },
  { id: 167, src: "./src/images/club/46.JPG", category: "Club" },
  { id: 168, src: "./src/images/club/47.JPG", category: "Club" },
  { id: 169, src: "./src/images/club/48.JPG", category: "Club" },
  { id: 170, src: "./src/images/club/49.JPG", category: "Club" },
  { id: 171, src: "./src/images/club/50.JPG", category: "Club" },
  { id: 172, src: "./src/images/club/51.JPG", category: "Club" },
  { id: 173, src: "./src/images/club/52.JPG", category: "Club" },
  { id: 174, src: "./src/images/club/53.JPG", category: "Club" },
  { id: 175, src: "./src/images/club/54.JPG", category: "Club" },
  { id: 176, src: "./src/images/club/55.JPG", category: "Club" },
  { id: 177, src: "./src/images/club/56.JPG", category: "Club" },
  { id: 178, src: "./src/images/club/57.JPG", category: "Club" },
  { id: 179, src: "./src/images/club/58.JPG", category: "Club" },
  { id: 180, src: "./src/images/club/59.JPG", category: "Club" },
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