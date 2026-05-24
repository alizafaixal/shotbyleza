import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Calendar,
  Shirt,
  ShoppingBag,
  Heart,
  Users,
  UserCircle2,
} from "lucide-react";

const serviceCategories = [
  "Model Portfolio",
  "Events",
  "Club Photography",
  "Fashion & E-Commerce",
  "Portraits",
  "Headshots",
  "Couple Shoot",
  "Family Photography",
];

const servicePackages = [
  // MODEL PORTFOLIO
  {
    category: "Model Portfolio",
    icon: Camera,
    title: "Model Portfolio – Starter",
    price: "$300",
    description:
      "A relaxed starter session for aspiring models who want clean, confident images for their first portfolio.",
    features: [
      "1 hour indoor or outdoor shoot",
      "1–2 outfit options",
      "Pre-shoot call to understand your style",
      "25–30 selected images in a private online gallery",
      "5 professionally edited photos ready for portfolio use",
    ],
  },
  {
    category: "Model Portfolio",
    icon: Camera,
    title: "Model Portfolio – Creative",
    price: "$600",
    description:
      "A creative portfolio session with multiple looks and locations to build more variety in your portfolio.",
    features: [
      "2 hour photoshoot",
      "2 locations",
      "Indoor or outdoor natural light options",
      "Beach, city, or lifestyle-style locations",
      "Styling call and portfolio planning before the shoot",
      "3 outfit changes",
      "1 trending reel",
    ],
  },
  {
    category: "Model Portfolio",
    icon: Camera,
    title: "Model Portfolio – Editorial",
    price: "$1000",
    description:
      "A full editorial experience designed for models wanting a stronger, more complete portfolio with styled content.",
    features: [
      "5 hour photoshoot",
      "Hair and makeup artist included",
      "4 outfit changes",
      "3 locations",
      "30 professionally edited photos",
      "1 drone shot",
      "2 trending reels",
    ],
  },

  // EVENT PHOTOGRAPHY
  {
    category: "Events",
    icon: Calendar,
    title: "Family Event Coverage",
    price: "From $400",
    description:
      "Professional coverage for family gatherings and special moments captured naturally and beautifully.",
    features: [
      "2–4 hour session",
      "Selection from 250+ photos",
      "50 professionally edited photos",
      "Private online gallery delivery",
    ],
  },
  
  {
    category: "Events",
    icon: Calendar,
    title: "Birthday Event",
    price: "$300",
    description:
      "Capture the best candid and key moments from your birthday celebration, indoors or outdoors.",
    features: [
      "2 hour event coverage",
      "Indoor or outdoor event",
      "30 professionally edited photos",
      "Private online gallery delivery",
    ],
  },
  {
    category: "Events",
    icon: Calendar,
    title: "Baby Shower / Gender Reveal",
    price: "$350",
    description:
      "A beautiful way to preserve one of life’s most exciting celebrations with both photos and short-form video.",
    features: [
      "2 hour coverage",
      "30 professionally edited photos",
      "2–4 videos of the gender reveal or baby shower recap",
      "Private online gallery delivery",
    ],
  },
  {
  category: "Events",
  icon: Calendar,
  title: "Dating Event Coverage",
  price: "$550",
  description:
    "Content-focused coverage for dating events designed to capture the energy, social atmosphere, guest interactions, and key moments that make the night feel memorable both in person and online. Perfect for speed dating nights, singles mixers, and community events that need strong visual content for promotion and social media.",
  features: [
    "Event photography coverage for dating and social events",
    "Candid guest interactions and atmosphere shots",
    "Organiser, host, and venue content",
    "Dating interviews or Vox-pop style clips",
    "Event recap content for social media",
    "1–2 reels for Instagram or TikTok",
    "Private online gallery delivery",
  ],
  },
  {
    category: "Club Photography",
    icon: Calendar,
    title: "Club Photography – Essential",
    price: "$400",
    description:
      "Nightlife coverage focused on capturing the atmosphere, crowd, and energy of your event.",
    features: [
      "3 hour photography coverage",
      "Selection from 200+ photos",
      "20 professionally edited photos",
      "Ideal for promotion and social media",
    ],
  },
  {
    category: "Club Photography",
    icon: Calendar,
    title: "Club Photography – Full Coverage",
    price: "$650",
    description:
      "Extended nightlife coverage with photography and reel content for clubs, parties, and event brands.",
    features: [
      "6 hour event coverage",
      "Selection from 200+ photos",
      "50 professionally edited photos",
      "2 reels — trending reel, interview, or event recap",
    ],
  },

  // FASHION PHOTOGRAPHY
  {
    category: "Fashion & E-Commerce",
    icon: Shirt,
    title: "Fashion Show / Brand Launch Coverage",
    price: "$900",
    description:
      "High-energy fashion event coverage for runway shows, launches, and branded experiences.",
    features: [
      "4 hour coverage of a fashion show or brand launch",
      "300 photos delivered",
      "40 professionally edited photos",
      "Interview or event recap content included",
    ],
  },

  // E-COMMERCE
  {
    category: "Fashion & E-Commerce",
    icon: ShoppingBag,
    title: "E-Commerce Product Shoot",
    price: "$850",
    description:
      "Clean and creative product photography for brands wanting polished imagery for social media, websites, and campaigns.",
    features: [
      "4 hour indoor or outdoor shoot",
      "Featuring 5–10 products",
      "Selection from 400 images",
      "50+ edited photos",
    ],
  },

  // PORTRAITS
  {
    category: "Portraits",
    icon: UserCircle2,
    title: "Portrait Session",
    price: "$280",
    description:
      "A simple portrait session focused on capturing natural, confident, and timeless images.",
    features: [
      "1 location",
      "Indoor or outdoor portraits",
      "20 professionally edited photos",
      "Private online gallery delivery",
    ],
  },

  // HEADSHOTS
  {
    category: "Headshots",
    icon: UserCircle2,
    title: "Headshots Session",
    price: "$250",
    description:
      "Clean and polished headshots for personal branding, LinkedIn, business, or creative portfolios.",
    features: [
      "1 location shoot",
      "Indoor or outdoor option",
      "Guidance on posing and expressions",
      "10 professionally edited headshots",
      "Private online gallery delivery",
    ],
  },

  // Couple Shoot
  {
    category: "Couple Shoot",
    icon: Heart,
    title: "Couple Shoot – Classic",
    price: "$350",
    description:
      "A relaxed couple session designed to capture genuine connection in a beautiful setting.",
    features: [
      "1 hour couple shoot",
      "1 location",
      "1 outfit",
      "Selection from 50+ photos",
      "5 professionally edited photos",
    ],
  },
  {
    category: "Couple Shoot",
    icon: Heart,
    title: "Couple Shoot – Premium",
    price: "$550",
    description:
      "A more cinematic couple experience with multiple locations and outfit changes for a fuller gallery.",
    features: [
      "2 locations",
      "Location options can include city, bar, cafe, library, Opera House, or beach",
      "2 outfit changes",
      "Creative direction throughout the shoot",
      "Private online gallery delivery",
    ],
  },

  // FAMILY PHOTOGRAPHY
  {
    category: "Family Photography",
    icon: Users,
    title: "Family Event Coverage",
    price: "From $400",
    description:
      "Thoughtful coverage for family celebrations, gatherings, and special moments you want to remember.",
    features: [
      "2–4 hour session",
      "Selection from 250+ photos",
      "50 professionally edited photos",
      "Private online gallery delivery",
    ],
  },
  {
    category: "Family Photography",
    icon: Users,
    title: "Family Portraits",
    price: "$450",
    description:
      "A portrait-focused family session capturing warm, natural moments together indoors or outdoors.",
    features: [
      "Indoor or outdoor family portraits",
      "1 location",
      "20 professionally edited photos",
      "Private online gallery delivery",
    ],
  },
  {
    category: "Family Photography",
    icon: Users,
    title: "Premium Family Package",
    price: "$650",
    description:
      "A flexible family session designed to capture both portraits and real moments during quality time together.",
    features: [
      "Covers a family event or outdoor family quality-time session",
      "Flexible with locations",
      "Flexible with outfit changes",
      "20 professionally edited portraits",
      "Natural and candid moments included",
    ],
  },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]);

  const filteredServices = servicePackages.filter(
    (item) => item.category === activeCategory
  );

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
              Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Photography experiences designed for real moments, creative
              direction, and visuals that feel like you — whether it’s a model
              portfolio, event, fashion campaign, or family memories.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border bg-background py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
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
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={`${service.category}-${service.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all group flex flex-col"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                <p className="text-sm uppercase tracking-wide text-primary mb-2">
                  {service.category}
                </p>

                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                  {service.title}
                </h3>

                <p className="text-3xl font-semibold text-foreground mb-5">
                  {service.price}
                </p>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8 text-muted-foreground">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-foreground/30 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <Link to="/contact">Enquire Now</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;