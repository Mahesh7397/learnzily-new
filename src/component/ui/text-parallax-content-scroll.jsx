import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
export const TextParallaxContentExample = () => {
  return <div className="bg-background">
      <TextParallaxContent imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" subheading="Learn Anywhere" heading="Study through any device, anywhere.">
        <ExampleContent title="Flexible Learning Experience" content="Access your study materials, take quizzes, and connect with tutors from any device. Whether you're at home, in the library, or on the go, LearnEze adapts to your lifestyle and learning preferences." buttonText="Start Learning" />
      </TextParallaxContent>
      <TextParallaxContent imgUrl="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" subheading="AI-Powered" heading="Smart learning, higher grades.">
        <ExampleContent title="Intelligent Study Assistant" content="Our AI analyzes your learning patterns and creates personalized study plans. Get predictive exam questions, smart flashcards, and content summaries tailored to help you achieve higher grades and better academic performance." buttonText="Explore AI Features" />
      </TextParallaxContent>
      <TextParallaxContent imgUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" subheading="Community" heading="Connect, collaborate, succeed.">
        <ExampleContent title="Peer Learning Network" content="Join a community of ambitious students. Collaborate on projects, participate in study groups, share knowledge, and even earn money by helping others. Success is better when shared." buttonText="Join Community" />
      </TextParallaxContent>
    </div>;
};
const IMG_PADDING = 12;


const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children
}) => {
  return <div style={{
    paddingLeft: IMG_PADDING,
    paddingRight: IMG_PADDING
  }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>;
};

const StickyImage = ({
  imgUrl
}) => {
  const targetRef = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return <motion.div style={{
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: `calc(100vh - ${IMG_PADDING * 2}px)`,
    top: IMG_PADDING,
    scale
  }} ref={targetRef} className="sticky z-0 overflow-hidden rounded-3xl">
      <motion.div className="absolute inset-0 bg-background/70 dark:bg-background/80" style={{
      opacity
    }} />
    </motion.div>;
};

const OverlayCopy = ({
  subheading,
  heading
}) => {
  const targetRef = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
  return <motion.div style={{
    y,
    opacity
  }} ref={targetRef} className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white">
      <p className="mb-2 text-center text-xl md:mb-4 font-bold text-blue-950 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold text-blue-950 md:text-7xl">{heading}</p>
    </motion.div>;
};

const ExampleContent = ({
  title,
  content,
  buttonText
}) => <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-foreground">
      {title}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-muted-foreground md:text-2xl">
        {content}
      </p>
      <button className="w-full rounded-lg bg-gradient-to-r from-brand to-brand-foreground px-9 py-4 text-xl text-white transition-all duration-300 hover:scale-105 md:w-fit">
        {buttonText} <ArrowUpRight className="inline ml-2 h-5 w-5" />
      </button>
    </div>
  </div>;