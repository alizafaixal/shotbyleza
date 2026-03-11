import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const PageLayout = ({ children, showFooter = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      {/* ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-[30%] right-[-140px] h-[320px] w-[320px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[20%] h-[260px] w-[260px] rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_35%)]" />
      </div>

      <Navbar />
      <main className="flex-1 relative">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default PageLayout;