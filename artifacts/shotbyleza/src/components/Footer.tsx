import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="container mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-display font-bold text-foreground hover:text-primary transition-colors">
                ShotByLeza
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Stories in frames. Moments in motion. Sydney-based photographer
              and content creator capturing life&apos;s authentic moments.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Navigate
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/portfolio"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Portfolio
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Photoshoots
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/shotbyleza"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:alizafaixal@gmail.com"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              alizafaixal@gmail.com
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © ShotByLeza {currentYear}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">Sydney, Australia</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;