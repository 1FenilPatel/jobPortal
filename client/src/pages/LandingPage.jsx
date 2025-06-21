import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import companies from "../data/company.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useGetAllJobs from "@/Hooks/useGetAllJobs";

const LandingPage = () => {
  useGetAllJobs();
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20"
    >
      <section className="text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4"
        >
          Find Your Dream Job {" "}
          <span className="flex items-center gap-2 sm:gap-6">
            and get {" "}
            <motion.img
              src="/logo.png"
              alt="Hirrd Logo"
              className="h-14 sm:h-24 lg:h-32"
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            />
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-gray-300 sm:mt-4 text-xs sm:text-xl"
        >
          Explore thousands of job listings or find the perfect candidate
        </motion.p>
      </section>

      <motion.div className="flex gap-6 justify-center" whileHover={{ scale: 1.1 }}>
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
      </motion.div>

      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <motion.img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <motion.img src="/banner.jpeg" alt="" className="w-full" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1.5 }} />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["For Job Seekers", "For Employers"].map((title, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                {title === "For Job Seekers"
                  ? "Search and apply for jobs, track applications, and more."
                  : "Post jobs, manage applications, and find the best candidates."}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.main>
  );
};

export default LandingPage;
