"use client"

import { motion } from "framer-motion"
import { Linkedin, Youtube, Instagram, Mail, Phone } from "lucide-react"
import { AnimatedTooltip } from "./animated-tooltip"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const socialVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
}

const backgroundVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
  },
}

// Footer Data
const footerData = {
  sections: [
    { title: "About", links: ["Home", "About Us", "Our Mission", "Contact Us"] },
    { title: "Features", links: ["AI Learning", "Study Resources", "Tutor Platform", "Forum"] },
    { title: "Pricing", links: ["Free Plan", "Premium", "University", "Student Discount"] },
    { title: "Support", links: ["Help Center", "Documentation", "Community", "Contact"] },
  ],
  social: [
    { href: "https://www.linkedin.com/in/mohamedfazil2005", label: "LinkedIn", icon: <Linkedin className="w-5 h-5" /> },
    { href: "https://www.youtube.com/@ShaZilTech-l9k", label: "YouTube", icon: <Youtube className="w-5 h-5" /> },
    { href: "https://www.instagram.com/__fazil_rm__/", label: "Instagram", icon: <Instagram className="w-5 h-5" /> },
    { href: "mailto:mohamedfazilrm@gmail.com", label: "Email", icon: <Mail className="w-5 h-5" /> },
  ],
  developers: [
    {
      id: 1,
      name: "Mohamed Fazil",
      designation: "Founder & CEO",
      image: "/lovable-uploads/9c2196af-84fb-4534-bc06-d4b4e15d2e76.png"
    },
    {
      id: 2,
      name: "Maheswaran",
      designation: "Software Developer",
      image: "/lovable-uploads/18920ae7-5850-454f-b724-928a0497b113.png"
    }
  ],
  contact: {
    email: "mohamedfazilrm@gmail.com",
    phone: "+1 (555) 123-4567"
  },
  title: "LearnEze",
  subtitle: "Smart Learning Platform",
  copyright: "©2024 LearnEze. All rights reserved",
}

// NavSection Component
const NavSection = ({ title, links, index }) => (
  <motion.div variants={itemVariants} custom={index} className="flex flex-col gap-2">
    <motion.h3
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      className="mb-2 uppercase text-muted-foreground text-xs font-semibold tracking-wider border-b border-border pb-1 hover:text-foreground transition-colors duration-300"
    >
      {title}
    </motion.h3>
    {links.map((link, linkIndex) => (
      <motion.a
        key={linkIndex}
        variants={linkVariants}
        custom={linkIndex}
        href={link === "Contact Us" ? "#contact" : "#"}
        whileHover={{
          x: 8,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-sans text-xs md:text-sm group relative"
      >
        <span className="relative">
          {link}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-brand"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </motion.a>
    ))}
  </motion.div>
)

// SocialLink Component
const SocialLink = ({ href, label, icon, index }) => (
  <motion.a
    variants={socialVariants}
    custom={index}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{
      scale: 1.2,
      rotate: 12,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    }}
    whileTap={{ scale: 0.9 }}
    className="w-10 h-10 rounded-full bg-muted hover:bg-gradient-to-r hover:from-brand hover:to-brand-foreground flex items-center justify-center transition-colors duration-300 group"
    aria-label={label}
  >
    <motion.div
      className="text-muted-foreground group-hover:text-white"
      whileHover={{ scale: 1.1 }}
    >
      {icon}
    </motion.div>
  </motion.a>
)

// StickyFooter Component
export default function StickyFooter() {
  return (
    <div id="contact" className="relative h-[70vh]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <div className="relative h-[calc(100vh+70vh)] -top-[100vh]">
        <div className="h-[70vh] sticky top-[calc(100vh-70vh)]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-gradient-to-br from-card via-muted to-card/90 py-6 md:py-12 px-4 md:px-12 h-full w-full flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />

            <motion.div
              variants={backgroundVariants}
              className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-brand/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <motion.div
              variants={backgroundVariants}
              className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-brand-foreground/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />

            {/* Developers Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative z-10 mb-8"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Meet Our Team</h3>
                <AnimatedTooltip items={footerData.developers} className="justify-center" />
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${footerData.contact.email}`} className="hover:text-foreground transition-colors">
                    {footerData.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${footerData.contact.phone}`} className="hover:text-foreground transition-colors">
                    {footerData.contact.phone}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={containerVariants} className="relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 lg:gap-20">
                {footerData.sections.map((section, index) => (
                  <NavSection key={section.title} title={section.title} links={section.links} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Footer Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mt-6 relative z-10"
            >
              {/* Left Section: Title */}
              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[6vw] leading-[0.8] font-serif bg-gradient-to-r from-foreground via-brand to-brand-foreground bg-clip-text text-transparent cursor-default"
                >
                  {footerData.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="flex items-center gap-3 md:gap-4 mt-3 md:mt-4"
                >
                  <motion.div
                    className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-brand to-brand-foreground"
                    animate={{ scaleX: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="text-muted-foreground text-xs md:text-sm font-sans hover:text-foreground transition-colors duration-300"
                  >
                    {footerData.subtitle}
                  </motion.p>
                </motion.div>
              </div>

              {/* Right Section: Copyright and Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="text-left md:text-right"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3 hover:text-foreground transition-colors duration-300"
                >
                  {footerData.copyright}
                </motion.p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 2, staggerChildren: 0.1 }}
                  className="flex gap-2 md:gap-3"
                >
                  {footerData.social.map((social, index) => (
                    <SocialLink
                      key={social.label}
                      href={social.href}
                      label={social.label}
                      icon={social.icon}
                      index={index}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
