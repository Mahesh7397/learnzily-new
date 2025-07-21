import React, { useState } from 'react'
import { 
  Navbar, 
  NavBody, 
  NavItems, 
  MobileNav, 
  NavbarLogo, 
  NavbarButton, 
  MobileNavHeader, 
  MobileNavToggle, 
  MobileNavMenu 
} from "../component/ui/Resizable-Navbar";
import { HeroWithMockup } from "../component/ui/hero-with-mockup";
import { BookOpen } from "lucide-react";
import { FeatureSteps } from '../component/ui/feature-steps';
import { FeatureCards } from '../component/ui/feature-cards';
import { PremiumTestimonials } from '../component/ui/premium-testimonials';
import { Pricing } from '../component/ui/pricing';
import StickyFooter from '../component/ui/footer';

const Index = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

     const navItems = [
    { name: "About", link: "/about" },
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
  ];

  const mainFeatures = [
    { 
      step: 'Step 1', 
      title: 'Study Resources with Tutor Assistance',
      content: 'Access vast study resources tailored to your university with personal tutor assistance and smart study reminders.', 
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop' 
    },
    { 
      step: 'Step 2',
      title: 'Powerful AI Learning Assistant',
      content: 'Get AI-powered question predictions, flashcard generation, content summarization, and topic explanations.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      step: 'Step 3',
      title: 'Forum & Peer Collaboration',
      content: 'Connect with peers, work on projects together, and earn money by completing academic tasks.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
    },
  ];

  const pricingPlans = [
    {
      name: "BASIC",
      price: "0",
      yearlyPrice: "0",
      period: "per month",
      features: [
        "Access to basic study resources",
        "AI flashcard generation",
        "Community forum access",
        "Basic study reminders",
        "Up to 3 study sessions per day",
      ],
      description: "Perfect for students getting started with smart learning",
      buttonText: "Get Started Free",
      href: "/signup",
      isPopular: false,
    },
    {
      name: "PREMIUM",
      price: "15",
      yearlyPrice: "12",
      period: "per month",
      features: [
        "Everything in Basic",
        "Unlimited AI tutoring sessions",
        "Advanced analytics & insights",
        "Priority support",
        "Collaborative study groups",
        "Custom study schedules",
        "Exam prediction & prep",
      ],
      description: "Ideal for serious students aiming for academic excellence",
      buttonText: "Upgrade to Premium",
      href: "/signup",
      isPopular: true,
    },
    {
      name: "UNIVERSITY",
      price: "49",
      yearlyPrice: "39",
      period: "per month",
      features: [
        "Everything in Premium",
        "Institution-wide access",
        "Advanced progress tracking",
        "Dedicated account manager",
        "Custom integrations",
        "API access",
        "Bulk user management",
        "Advanced reporting",
      ],
      description: "For universities and educational institutions",
      buttonText: "Contact Sales",
      href: "#contact",
      isPopular: false,
    },
  ];
  
  return (
    <div className="min-h-screen bg-background">
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
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 hover:text-brand transition-colors"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
                href="/login"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="gradient"
                className="w-full"
                href="/signup"
              >
                Get Started
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
            <div className="pt-20">
        <HeroWithMockup
          title="Transform Your Learning Journey with LearnEze"
          description="The ultimate AI-powered learning platform that combines smart study tools, peer collaboration, and personalized tutoring to accelerate your academic success."
          primaryCta={{
            text: "Start Learning Free",
            href: "/signup",
          }}
          secondaryCta={{
            text: "Watch Demo",
            href: "#demo",
            icon: <BookOpen className="mr-2 h-4 w-4" />,
          }}
          mockupImage={{
            alt: "LearnEze Platform Dashboard",
            width: 1248,
            height: 765,
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
          }}
        />
      </div>
      <section id="features" className="py-20">
        <FeatureSteps
          features={mainFeatures}
          title="Your Smart Learning Journey"
          autoPlayInterval={4000}
          imageHeight="h-[500px]"
        />
      </section>

      <FeatureCards/>

      <PremiumTestimonials/>
      
      <Pricing plans={pricingPlans}/>

      {/* Spacer for sticky footer */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/10 to-background px-4">
        <div className="text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-brand to-brand-foreground bg-clip-text text-transparent">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who are already achieving their academic goals with LearnEze
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavbarButton variant="gradient" className="text-lg px-8 py-3" href="/signup">
              Start Your Journey
            </NavbarButton>
            <NavbarButton variant="secondary" className="text-lg px-8 py-3" href="#contact">
              Contact Us
            </NavbarButton>
          </div>
        </div>
      </div>
      <StickyFooter/>
    </div>
  )
}

export default Index