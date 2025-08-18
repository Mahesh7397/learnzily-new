import { useState, useEffect } from "react";
import { Navbar, NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "../component/ui/Resizable-Navbar";
import { TextParallaxContentExample } from "../component/ui/text-parallax-content-scroll";
import LoaderOne from "../component/ui/loader-one";
import StickyFooter from "../component/ui/footer";
const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [{
    name: "Home",
    link: "/"
  }, {
    name: "Features",
    link: "/#features"
  }, {
    name: "Pricing",
    link: "/#pricing"
  }, {
    name: "Testimonials",
    link: "/#testimonials"
  }, {
    name: "Contact",
    link: "/#contact"
  }];
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <NavbarLogo />
          <div className="mt-8">
            <LoaderOne />
          </div>
          <p className="mt-4 text-muted-foreground">Loading amazing content...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2 md:gap-4">
            <NavbarButton variant="secondary" href="/login">Login</NavbarButton>
            <NavbarButton variant="gradient" href="/signup">Get Started</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => <a key={`mobile-link-${idx}`} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="relative text-neutral-600 dark:text-neutral-300 hover:text-brand transition-colors">
                <span className="block">{item.name}</span>
              </a>)}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant="secondary" className="w-full" href="/login">
                Login
              </NavbarButton>
              <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant="gradient" className="w-full" href="/signup">
                Get Started
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <NavbarLogo />
            <h1 className="text-4xl md:text-6xl font-bold mt-8 mb-6 bg-gradient-to-r from-foreground via-brand to-brand-foreground bg-clip-text text-transparent">
              About <span className="text-brand">L</span>earn<span className="text-brand-foreground">E</span>ze
            </h1>
            <p className="text-xl text-muted-foreground">
              Transforming education through AI-powered learning solutions
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none text-center mb-16">
            <p className="text-lg leading-relaxed mb-6 text-muted-foreground max-w-3xl mx-auto">
              <span className="text-brand font-semibold">LearnEze</span> is an innovative AI-powered learning platform designed to revolutionize how students learn and achieve their academic goals. Our mission is to make quality education accessible, personalized, and effective for every learner.
            </p>
            
            <p className="text-lg leading-relaxed mb-6 text-muted-foreground max-w-3xl mx-auto">
              With cutting-edge artificial intelligence, personalized tutoring, and collaborative learning features, we're building the future of education - one student at a time. <span className="text-brand-foreground font-semibold">Learn through any device, anywhere</span>, and make studying easy to achieve higher ranks and grades.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-gradient-to-br from-brand/5 to-brand-foreground/5 p-8 rounded-2xl border border-brand/10">
                <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-foreground rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold text-2xl">AI</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Smart <span className="text-brand">L</span>earning</h3>
                <p className="text-muted-foreground">Powered by advanced AI to personalize your learning experience and adapt to your unique study patterns.</p>
              </div>

              <div className="bg-gradient-to-br from-brand-foreground/5 to-brand/5 p-8 rounded-2xl border border-brand-foreground/10">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-foreground to-brand rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold text-2xl">24/7</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Anytime <span className="text-brand-foreground">A</span>ccess</h3>
                <p className="text-muted-foreground">Study from anywhere, on any device. Your learning journey never stops with our cloud-based platform.</p>
              </div>

              <div className="bg-gradient-to-br from-brand-foreground/5 to-brand/5 p-8 rounded-2xl border border-brand-foreground/10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Higher <span className="text-primary">G</span>rades</h3>
                <p className="text-muted-foreground">Proven methods and personalized study plans designed to help you achieve better academic performance.</p>
              </div>
            </div>
          </div>
        </div>
        
        <TextParallaxContentExample />
      </div>

      {/* Footer */}
      <StickyFooter />
    </div>;
};
export default About;