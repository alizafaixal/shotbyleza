import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Instagram, Mail, MapPin, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";

const shootTypes = [
  "Model Portfolio",
  "Event Photography",
  "Club Photography",
  "Fashion & E-Commerce",
  "Couple Photography",
  "Family Photography",
  "Portraits",
  "Headshots",
  "Others",
];

const googleReviewsLink =
  "https://www.google.com/search?sca_esv=6b4ddb55862f8c40&hl=en-AU&sxsrf=ANbL-n6dps65EX4WmzrZxsdvMg4IOtNB5Q:1772947735992&kgmid=/g/11z1xtf076&q=shotbyleza&shndl=30&source=sh/x/loc/uni/m1/1&kgs=ad90e9fb572993ba&shem=shrtsdl&utm_source=shrtsdl,sh/x/loc/uni/m1/1&sei=kQ-tae3SLObm2roPh6yJ-Ag#mpd=~13490776049045509526/customers/reviews&lrd=0x24cc0d7a369a62e1:0x86bf0923a7b9c833,1,,,,";

const featuredReviews = [
  {
    name: "Eiman Rana",
    rating: 5,
    text: "Leza is extremely talented and very professional. Lovely to work with and absolutely loved her content. definitely recommend hiring her for photoshoots and videography!",
  },
  {
    name: "Aashna Shrishrimal",
    rating: 5,
    text: "I met Aliza when I was initially starting out to do freelance modelling and had a great experience with the shoot. She made me feel comfortable and gave me directions. The photos turned out great! and since then have collaborated on 3 more shoots which have all gone smoothly and helped me be more confident!",
  },
  {
    name: "Basma Khalid",
    rating: 5,
    text: "had an incredible experience with shotbyleza. She is an exceptionally talented fashion and portrait photographer with a great eye for detail, lighting, and composition. From the moment we started the shoot, she made the whole experience feel relaxed and enjoyable while still being very professional.Her ability to direct poses and capture flattering angles is amazing, and the final photos looked absolutely stunning. You can really see her passion for fashion photography and portrait photography in her work.If you’re looking for a skilled fashion or portrait photographer in Sydney, I highly recommend shotbyleza.",
  },
];

const Contact = () => {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    shootType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_1vneowx",
        "template_7l6shd9",
        {
          name: formData.name,
          email: formData.email,
          instagram: formData.instagram,
          shootType: formData.shootType,
          message: formData.message,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        instagram: "",
        shootType: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell me about your vision, event, or shoot idea.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I usually respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <h2 className="text-2xl font-display font-bold text-foreground mb-8">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-secondary border-border"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-secondary border-border"
                  />
                </div>

                <Input
                  placeholder="Instagram Handle (optional)"
                  value={formData.instagram}
                  onChange={(e) =>
                    setFormData({ ...formData, instagram: e.target.value })
                  }
                  className="bg-secondary border-border"
                />

                <Select
                  value={formData.shootType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, shootType: value })
                  }
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select Shoot Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {shootTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="bg-secondary border-border"
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(255,0,51,0.15)]"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="bg-secondary border border-border rounded-2xl p-6 text-center mt-6"
              >
                <p className="text-sm text-muted-foreground">
                  I personally respond to all inquiries within{" "}
                  <span className="text-primary font-semibold">24 hours</span>.
                </p>

                <p className="text-sm text-muted-foreground mt-2">
                  For urgent bookings, feel free to contact me directly.
                </p>

                <div className="mt-4 space-y-2">
                  <a
                    href="tel:0450546461"
                    className="block text-primary font-medium hover:underline"
                  >
                    Call me → 0450 546 461
                  </a>

                  <a
                    href="https://instagram.com/shotbyleza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary font-medium hover:underline"
                  >
                    Message on Instagram →
                  </a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-8">
                  Contact Info
                </h2>

                <div className="space-y-6">
                  <a
                    href="mailto:alizafaixal@gmail.com"
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <span>alizafaixal@gmail.com</span>
                  </a>

                  <a
                    href="https://instagram.com/shotbyleza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <Instagram size={20} />
                    </div>
                    <span>@shotbyleza</span>
                  </a>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <span>Sydney, Australia</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-foreground">
                      Google Reviews
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Real client feedback from Google
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-primary">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold text-foreground">5.0</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      10+ Google reviews
                    </p>
                  </div>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className="space-y-4"
                >
                  {featuredReviews.map((review, index) => (
                    <motion.div
                      key={`${review.name}-${index}`}
                      variants={fadeUp}
                      className="border border-border rounded-xl p-4 bg-background"
                    >
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {review.name}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 text-primary">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium text-foreground">
                            {review.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {review.text}
                      </p>
                    </motion.div>
                  ))}

                  <a
                    href={googleReviewsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-primary font-medium hover:underline pt-2"
                  >
                    Read more on Google →
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;