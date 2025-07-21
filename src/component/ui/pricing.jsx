"use client";

import { buttonVariants } from "./button";
import { Label } from "./label";
import { Switch } from "./switch";
import { cn } from "../../lib/Utlis";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

const demoPlans = [
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

export function Pricing({
  plans = demoPlans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you.\nAll plans include access to our learning platform and community support.",
}) {
  const [isMonthly, setIsMonthly] = useState(true);
  const switchRef = useRef(null);

  const handleToggle = (checked) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--brand))",
          "hsl(var(--brand-foreground))",
          "hsl(var(--primary))",
          "hsl(var(--secondary))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <section id="pricing" className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 mb-10">
        <span className="text-sm font-medium">Monthly</span>
        <Label>
          <Switch
            ref={switchRef}
            checked={!isMonthly}
            onCheckedChange={handleToggle}
            className="relative"
          />
        </Label>
        <span className="text-sm font-medium">
          Annual <span className="text-brand font-semibold">(Save 20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
            }}
            className={cn(
              "rounded-2xl border p-8 bg-card text-center relative flex flex-col",
              plan.isPopular ? "border-brand border-2 shadow-lg" : "border-border",
              plan.isPopular && "transform scale-105"
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-brand text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-bold text-muted-foreground mb-4">
                {plan.name}
              </h3>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold">
                  <NumberFlow
                    value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                    format={{ style: "currency", currency: "USD" }}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                  />
                </span>
                {plan.price !== "0" && (
                  <span className="text-sm text-muted-foreground">
                    / {plan.period}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {plan.price === "0" ? "Free forever" : isMonthly ? "billed monthly" : "billed annually"}
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-left">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <a
                href={plan.href}
                className={cn(
                  buttonVariants({
                    variant: plan.isPopular ? "default" : "outline",
                    size: "lg"
                  }),
                  "w-full"
                )}
              >
                {plan.buttonText}
              </a>
              <p className="text-xs text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
