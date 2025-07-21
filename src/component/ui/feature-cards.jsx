import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/Utlis";
import {
  Target,
  Calendar,
  GraduationCap,
  Brain,
  BookOpen,
  Users,
  MessageCircle,
  DollarSign,
  Clock,
  Calculator,
  Zap,
  FileText,
  Download,
  UserPlus,
  HandHeart,
} from "lucide-react";

const features = [
  {
    title: "Smart Prep & Mock Interviews",
    description:
      "AI-powered quiz and interview preparations with mock interview setup to ace your performance",
    icon: <Target className="w-8 h-8" />,
    gradient: "from-sky-400 to-blue-500",
  },
  {
    title: "Schedule Planner & Reminders",
    description:
      "Smart scheduling with progress tracking and automated reminders",
    icon: <Calendar className="w-8 h-8" />,
    gradient: "from-cyan-400 to-sky-500",
  },
  {
    title: "Advanced Grading Tools",
    description:
      "Grade tracker, calculator, percentage calculator, and grade predictor",
    icon: <Calculator className="w-8 h-8" />,
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    title: "AI-Powered Question Predictor",
    description:
      "AI predicts exam questions, generates flashcards, summarizes content",
    icon: <Brain className="w-8 h-8" />,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    title: "Resources Hub",
    description:
      "University-specific resources, handwritten notes, textbooks, and past papers",
    icon: <BookOpen className="w-8 h-8" />,
    gradient: "from-cyan-500 to-sky-600",
  },
  {
    title: "Tutor Platform",
    description: "Become a tutor or find one - earn money from smart students",
    icon: <GraduationCap className="w-8 h-8" />,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "Forum & Community",
    description: "Connect with peers, discuss topics, and build your network",
    icon: <MessageCircle className="w-8 h-8" />,
    gradient: "from-sky-600 to-blue-700",
  },
  {
    title: "Paid Task System",
    description:
      "Complete assignments, help with projects, earn instant money",
    icon: <DollarSign className="w-8 h-8" />,
    gradient: "from-cyan-600 to-sky-700",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

export function FeatureCards() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-brand to-brand-foreground bg-clip-text text-transparent">
            All Features in One Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for academic success, from AI-powered learning
            to peer collaboration
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.2 },
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              className="group relative"
            >
              <div
                className={cn(
                  "relative p-6 rounded-2xl border border-border/50 backdrop-blur-sm",
                  "bg-gradient-to-br",
                  feature.gradient,
                  "shadow-lg hover:shadow-2xl transition-all duration-300",
                  "shimmer overflow-hidden"
                )}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-white">
                  <div className="mb-4 p-3 bg-white/20 rounded-xl backdrop-blur-sm w-fit">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:scale-105 transition-transform duration-200">
                    {feature.title}
                  </h3>

                  <p className="text-white/90 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Floating orbs */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-float" />
                <div
                  className="absolute bottom-4 left-4 w-1 h-1 bg-white/40 rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
