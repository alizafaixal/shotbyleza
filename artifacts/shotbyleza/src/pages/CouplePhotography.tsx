import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Heart, Camera, Sparkles, Check } from "lucide-react";

const coupleStories = [
  {
    title: "Graduation Love Story",
    subtitle: "Soft, romantic portraits for milestone moments.",
    images: [
      "/assets/images/couple/grad1.webp",
      "/assets/images/couple/grad2.JPG",
    ],
  },
  {
    title: "Golden Hour Beach Session",
    subtitle: "Cinematic couple portraits by the water at sunset.",
    images: [
      "/assets/images/couple/beach1.JPG",
      "/assets/images/couple/beach2.JPG",
      "/assets/images/couple/beach3.JPG",
      "/assets/images/couple/beach4.JPG",
    ],
  },
  {
    title: "City Night Couple Shoot",
    subtitle: "Flash, city lights, and editorial nightlife energy.",
    images: [
      "/assets/images/couple/night1.JPG",
      "/assets/images/couple/night2.JPG",
    ],
  },
  {
    title: "Editorial Romance",
    subtitle: "Stylish couple photos with a fashion-led feeling.",
    images: [
      "/assets/images/couple/grad1.webp",
      "/assets/images/couple/beach1.JPG",
      "/assets/images/couple/night1.JPG",
    ],
  },
];

const packages = [
  {
    name: "Couple Shoot – Classic",
    price: "$350",
    description:
      "A relaxed couple session designed to capture genuine connection in a beautiful setting.",
    features: [
      "1 hour couple shoot",
      "1 location",
      "1 outfit",
      "Selection from 50+ photos",
      "5 professionally edited photos",
      "Private online gallery",
    ],
  },
  {
    name: "Couple Shoot – Premium",
    price: "$550",
    description:
      "A more cinematic couple experience with multiple locations and outfit changes for a fuller gallery.",
    features: [
      "2 locations",
      "2 outfit changes",
      "Creative direction throughout the shoot",
      "Selection from 80+ photos",
      "10 professionally edited photos",
      "Private online gallery",
    ],
  },
];

const testimonials = [
  {
    name: "Aashna",
    text: "She made me feel comfortable and gave great direction. The photos turned out beautiful.",
  },
  {
    name: "Eiman",
    text: "Extremely talented, professional, and lovely to work with. Definitely recommend.",
  },
];

const CouplePhotography = () => {
  return (
    <PageLayout>
      <section className="relative min-h-[85vh] bg-background flex items-center overflow-hidden">
        <img
          src="/assets/images/couple/hero.jpg"
          alt="Couple photography Sydney"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 border border-primary/40 rounded-full px-5 py-2 text-primary tracking-[0.35em] uppercase text-xs mb-6">
              <Heart size={16} />
              Sydney Couple Photography
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
              Couple Photography in Sydney
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Romantic, natural, and cinematic couple photoshoots for couples,
              engagements, anniversaries, and beautiful everyday love stories.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Book a Couple Shoot
              </Link>

              <a
                href="#packages"
                className="border border-border bg-card/60 text-foreground px-8 py-4 rounded-lg font-medium hover:bg-card transition-colors"
              >
                View Packages
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-primary tracking-[0.35em] uppercase text-sm mb-4">
              Real moments, softly directed
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-5">
              A few love stories I’ve captured
            </h2>
            <p className="text-muted-foreground text-lg">
              Each session has its own mood — soft, romantic, editorial,
              playful, or cinematic. I’ll guide you through natural movement and
              posing so it feels easy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coupleStories.map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-1 h-[420px]">
                  {story.images.map((src, imgIndex) => (
                    <div
                      key={src}
                      className={`overflow-hidden ${
                        imgIndex === 0 ? "row-span-2" : ""
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${story.title} ${imgIndex + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>

                <div className="p-6">
                  <p className="text-primary tracking-[0.25em] uppercase text-xs mb-2">
                    Sydney Couple Photography
                  </p>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground">{story.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="py-20 bg-card/30 border-y border-border"
      >
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-primary tracking-[0.35em] uppercase text-sm mb-4">
              Packages
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-5">
              Couple Photoshoot Packages
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose a simple romantic shoot or a fuller editorial-style couple
              session.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="bg-background border border-border rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Camera size={28} />
                </div>

                <p className="text-primary tracking-[0.25em] uppercase text-xs mb-3">
                  Couple Shoot
                </p>

                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  {pkg.name}
                </h3>

                <p className="text-4xl font-bold text-foreground mb-5">
                  {pkg.price}
                </p>

                <p className="text-muted-foreground mb-8">{pkg.description}</p>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <Check className="text-primary mt-1" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="block text-center border border-border rounded-lg py-4 text-foreground font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  Enquire Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-primary tracking-[0.35em] uppercase text-sm mb-4">
              Kind words
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Client Love
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((review) => (
              <div
                key={review.name}
                className="bg-card border border-border rounded-2xl p-7"
              >
                <Sparkles className="text-primary mb-4" size={24} />
                <p className="text-muted-foreground text-lg mb-5">
                  “{review.text}”
                </p>
                <p className="text-foreground font-medium">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-5">
            Ready to book your couple shoot?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Tell me your idea, preferred location, and date. I usually reply
            within 24 hours.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-background text-foreground px-9 py-4 rounded-lg font-medium hover:bg-background/90 transition-colors"
          >
            Book a Shoot
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default CouplePhotography;
