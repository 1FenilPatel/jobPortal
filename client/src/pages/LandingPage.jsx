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
      className="max-w-screen-xl mx-auto flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 px-4"
    >
      {/* Hero Heading */}
      <section className="text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="gradient-title text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight"
        >
          Find Your Dream Job
          <span className="block mt-4 text-2xl sm:text-4xl lg:text-6xl">
            and get
            <motion.img
              src="/logo.png"
              alt="Hirrd Logo"
              className="inline-block h-10 sm:h-20 lg:h-28 ml-2 align-middle"
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
          className="text-gray-300 mt-4 text-sm sm:text-xl"
        >
          Explore thousands of job listings or find the perfect candidate
        </motion.p>
      </section>

      {/* Find Jobs Button */}
      <motion.div className="flex justify-center mt-2 sm:mt-4" whileHover={{ scale: 1.1 }}>
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
      </motion.div>

      {/* Company Logos Carousel */}
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent className="flex gap-4 sm:gap-10 items-center justify-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 sm:basis-1/4 lg:basis-1/6">
              <motion.img
                src={path}
                alt={name}
                className="h-6 sm:h-10 object-contain mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Banner Image */}
      <motion.img
        src="/banner.jpeg"
        alt="Hero Banner"
        className="w-full max-h-[500px] object-cover rounded-md"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Job Seeker / Employer Cards */}
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

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="mt-10">
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
