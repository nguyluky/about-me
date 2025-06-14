"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import assert from "assert";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Briefcase,
  Code,
  Coffee,
  Cpu,
  CreditCard,
  ExternalLink,
  Facebook,
  Github,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Server,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function MobileMenu({
  activeSection,
  scrollToSection,
  t,
}: {
  activeSection: string;
  scrollToSection: (s: string) => any;
  t: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700 hover:border-zinc-600 transition-colors"
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          className="w-6 h-6 flex flex-col justify-center items-center"
        >
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 6 },
            }}
            className="w-5 h-0.5 bg-zinc-300 block transition-all origin-center"
          />
          <motion.span
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            className="w-5 h-0.5 bg-zinc-300 block mt-1 transition-all"
          />
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -6 },
            }}
            className="w-5 h-0.5 bg-zinc-300 block mt-1 transition-all origin-center"
          />
        </motion.div>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, scale: 1, y: 0 },
          closed: { opacity: 0, scale: 0.95, y: -10 },
        }}
        transition={{ duration: 0.2 }}
        className={`absolute top-full right-0 mt-2 w-64 bg-zinc-800/95 backdrop-blur-md border border-zinc-700 rounded-xl shadow-xl ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="p-4 space-y-2">
          <MobileNavItem
            title={t("nav.about")}
            icon={<User className="w-4 h-4" />}
            isActive={activeSection === "about"}
            onClick={() => {
              scrollToSection("about");
              setIsOpen(false);
            }}
          />
          <MobileNavItem
            title={t("nav.skills")}
            icon={<Code className="w-4 h-4" />}
            isActive={activeSection === "skills"}
            onClick={() => {
              scrollToSection("skills");
              setIsOpen(false);
            }}
          />
          <MobileNavItem
            title={t("nav.projects")}
            icon={<Briefcase className="w-4 h-4" />}
            isActive={activeSection === "projects"}
            onClick={() => {
              scrollToSection("projects");
              setIsOpen(false);
            }}
          />
          <MobileNavItem
            title={t("nav.contact")}
            icon={<Mail className="w-4 h-4" />}
            isActive={activeSection === "contact"}
            onClick={() => {
              scrollToSection("contact");
              setIsOpen(false);
            }}
          />
          <MobileNavItem
            title={t("nav.support")}
            icon={<Coffee className="w-4 h-4" />}
            isActive={activeSection === "support"}
            onClick={() => {
              scrollToSection("support");
              setIsOpen(false);
            }}
          />
        </div>
      </motion.div>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

function MobileNavItem({
  title,
  icon,
  isActive,
  onClick,
}: {
  title: string;
  icon: any;
  isActive: boolean;
  onClick: () => any;
}) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 text-left ${
        isActive
          ? "bg-zinc-700 text-zinc-100 shadow-lg"
          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"
      }`}
    >
      <div className={`${isActive ? "text-zinc-300" : "text-zinc-500"}`}>
        {icon}
      </div>
      <span className="font-medium">{title}</span>
      {isActive && (
        <motion.div
          layoutId="mobile-active-indicator"
          className="ml-auto w-2 h-2 bg-zinc-400 rounded-full"
        />
      )}
    </motion.button>
  );
}

export default function AboutMe() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  // Refs for each section
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  //   useEffect(() => {
  //     if (cursorRef.current) {
  //       cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`
  //     }
  //   }, [mousePosition])

  // Handle scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      // Get positions of each section
      const aboutPosition = aboutRef.current?.offsetTop || 0;
      const skillsPosition = skillsRef.current?.offsetTop || 0;
      const projectsPosition = projectsRef.current?.offsetTop || 0;
      const contactPosition =
        document.getElementById("contact")?.offsetTop || 0;
      const supportPosition =
        document.getElementById("support")?.offsetTop || 0;

      // Determine active section based on scroll position
      if (scrollPosition >= supportPosition) {
        setActiveSection("support");
      } else if (scrollPosition >= contactPosition) {
        setActiveSection("contact");
      } else if (scrollPosition >= projectsPosition) {
        setActiveSection("projects");
      } else if (scrollPosition >= skillsPosition) {
        setActiveSection("skills");
      } else {
        setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for the fixed header
        behavior: "smooth",
      });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100 overflow-hidden relative">
      {/* Custom cursor */}
      {/* <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full border-2 border-zinc-400 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          left: -15,
          top: -15,
          transition: "transform 0.1s ease-out",
        }}
      /> */}

      {/* Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,120,120,0.1)_0,rgba(0,0,0,0)_50%)]"
        ></motion.div>
        <ParticleBackground />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold"
            >
              Khắc Hiếu
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex gap-6"
              >
                <NavItem
                  title={t("nav.about")}
                  icon={<User className="w-4 h-4" />}
                  isActive={activeSection === "about"}
                  onClick={() => scrollToSection("about")}
                />
                <NavItem
                  title={t("nav.skills")}
                  icon={<Code className="w-4 h-4" />}
                  isActive={activeSection === "skills"}
                  onClick={() => scrollToSection("skills")}
                />
                <NavItem
                  title={t("nav.projects")}
                  icon={<Briefcase className="w-4 h-4" />}
                  isActive={activeSection === "projects"}
                  onClick={() => scrollToSection("projects")}
                />
                <NavItem
                  title={t("nav.contact")}
                  icon={<Mail className="w-4 h-4" />}
                  isActive={activeSection === "contact"}
                  onClick={() => scrollToSection("contact")}
                />
                <NavItem
                  title={t("nav.support")}
                  icon={<Coffee className="w-4 h-4" />}
                  isActive={activeSection === "support"}
                  onClick={() => scrollToSection("support")}
                />
              </motion.div>

              <LanguageSwitcher />
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center gap-4">
              <LanguageSwitcher />
              <MobileMenu
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                t={t}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="pt-24 pb-12">
        {/* About Section */}
        <section
          id="about"
          ref={aboutRef}
          className="min-h-screen flex items-center py-20"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="relative"
              >
                <motion.div
                  variants={fadeInUp}
                  className="absolute -top-20 -left-20 w-40 h-40 bg-zinc-800/50 rounded-full blur-3xl"
                />
                <motion.div
                  variants={fadeInUp}
                  className="absolute bottom-0 right-0 w-60 h-60 bg-zinc-700/30 rounded-full blur-3xl"
                />

                <motion.div variants={fadeInUp} className="relative z-10">
                  <div className="w-48 h-48 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center overflow-hidden border-2 border-zinc-600 rotate-3 hover:rotate-0 transition-all duration-500 shadow-xl">
                    <span className="text-7xl font-bold">K</span>
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-600">
                      <Cpu className="w-5 h-5 text-zinc-300" />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-8 relative z-10">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
                    Khắc Hiếu
                  </h1>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-px w-12 bg-zinc-700"></div>
                    <p className="text-xl text-zinc-400 tracking-wider uppercase">
                      {t("hero.role")}
                    </p>
                  </div>

                  <p className="text-zinc-400 mb-4">@nguyLuky</p>

                  <div className="flex gap-4 mt-6">
                    <a
                      href="https://github.com/nguyluky"
                      className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full transition-all duration-300 group hover:scale-110 transform"
                    >
                      <Github className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" />
                    </a>
                    <a
                      href="mailto:nguyluky@gmail.com"
                      className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full transition-all duration-300 group hover:scale-110 transform"
                    >
                      <Mail className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="relative"
              >
                <motion.div
                  variants={fadeInUp}
                  className="absolute top-20 right-20 w-40 h-40 bg-zinc-800/50 rounded-full blur-3xl"
                />

                <motion.div variants={fadeInUp} className="relative z-10">
                  <h2 className="text-3xl font-bold mb-6 inline-block relative">
                    {t("about.title")}
                    <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-zinc-400 to-transparent"></span>
                  </h2>

                  <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                    {t("about.description1")}
                  </p>

                  <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                    {t("about.description2")}
                  </p>

                  {/* <motion.a
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/resume.pdf"
                    download="Khac_Hieu_Resume.pdf"
                    className="group flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all duration-300 border border-zinc-700 hover:border-zinc-600"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t("hero.downloadResume")}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a> */}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={skillsRef}
          className="min-h-screen py-20 relative"
        >
          <div className="absolute inset-0 bg-zinc-800/30 skew-y-3 -z-10 transform-gpu"></div>
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">{t("skills.title")}</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {t("skills.subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <SkillCard
                variants={fadeInUp}
                icon={<Layout className="w-10 h-10" />}
                title={t("skills.frontend")}
                skills={[
                  "JavaScript",
                  "TypeScript",
                  "HTML",
                  "CSS/SCSS",
                  "UI/UX Design",
                ]}
                color="from-zinc-800 to-zinc-700"
              />

              <SkillCard
                variants={fadeInUp}
                icon={<Server className="w-10 h-10" />}
                title={t("skills.backend")}
                skills={[
                  "TypeScript APIs",
                  "PHP",
                  "Database Design",
                  "Web Scraping",
                ]}
                color="from-zinc-700 to-zinc-800"
              />

              <SkillCard
                variants={fadeInUp}
                icon={<Cpu className="w-10 h-10" />}
                title={t("skills.embedded")}
                skills={[
                  "ESP32 Programming",
                  "C/C++",
                  "Device Protocols",
                  "Hardware Integration",
                ]}
                color="from-zinc-800 to-zinc-700"
              />

              <SkillCard
                variants={fadeInUp}
                icon={<Code className="w-10 h-10" />}
                title={t("skills.fullstack")}
                skills={[
                  "End-to-End Solutions",
                  "API Integration",
                  "Project Architecture",
                  "Performance Optimization",
                ]}
                color="from-zinc-700 to-zinc-800"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="mt-20 text-center"
            >
              <h3 className="text-2xl font-semibold mb-8">
                {t("skills.techTitle")}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "JavaScript",
                  "TypeScript",
                  "PHP",
                  "C/C++",
                  "HTML",
                  "CSS",
                  "SCSS",
                  "React",
                  "Node.js",
                  "ESP32",
                  "Git",
                  "REST API",
                  "UI/UX",
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 hover:border-zinc-500 transition-all duration-300"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="min-h-screen py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">{t("projects.title")}</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {t("projects.subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <ProjectCard
                variants={fadeInUp}
                title="TKB-SGU"
                description={t("projects.tkbDescription")}
                technologies={["TypeScript", "SCSS", "API Design"]}
                githubLink="https://github.com/nguyluky/TKB-SGU-UI"
              />

              <ProjectCard
                variants={fadeInUp}
                title="ESP32 Android TV Remote"
                description={t("projects.esp32Description")}
                technologies={["C/C++", "ESP32", "Protocol Design"]}
                githubLink="https://github.com/nguyluky/ESP32_android_tv_remote_v2"
              />

              <ProjectCard
                variants={fadeInUp}
                title="Kahoot Clone"
                description={t("projects.kahootDescription")}
                technologies={["JavaScript", "CSS", "TypeScript"]}
                githubLink="https://github.com/nguyluky/clone-kaboot"
              />

              <ProjectCard
                variants={fadeInUp}
                title="Web Development Project"
                description={t("projects.web1Description")}
                technologies={["JavaScript", "CSS", "HTML"]}
                githubLink="https://github.com/nguyluky/web1"
              />

              <ProjectCard
                variants={fadeInUp}
                title="SGU API"
                description={t("projects.sguApiDescription")}
                technologies={["TypeScript", "API", "Web Scraping"]}
                githubLink="https://github.com/nguyluky/thongtindaotao_sgu_api"
              />

              <ProjectCard
                variants={fadeInUp}
                title="Web2 Project"
                description={t("projects.web2Description")}
                technologies={["PHP", "TypeScript", "Full-Stack"]}
                githubLink="https://github.com/nguyluky/web2"
              />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-20 relative">
          <div className="absolute inset-0 bg-zinc-900/50 -skew-y-3 -z-10 transform-gpu"></div>
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">{t("contact.title")}</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {t("contact.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="relative"
              >
                <motion.div
                  variants={fadeInUp}
                  className="absolute -top-20 -left-20 w-40 h-40 bg-zinc-800/50 rounded-full blur-3xl"
                />

                <motion.div variants={fadeInUp} className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-6">
                    {t("contact.info")}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-zinc-800 p-3 rounded-lg">
                        <Mail className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-zinc-300 font-medium">
                          {t("contact.email")}
                        </p>
                        <a
                          href="mailto:contact@example.com"
                          className="text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                          nguyluky@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-zinc-800 p-3 rounded-lg">
                        <Github className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-zinc-300 font-medium">
                          {t("contact.github")}
                        </p>
                        <a
                          href="https://github.com/nguyluky"
                          className="text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                          github.com/nguyluky
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-zinc-800 p-3 rounded-lg">
                        <MapPin className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-zinc-300 font-medium">
                          {t("contact.location")}
                        </p>
                        <p className="text-zinc-400">
                          {t("contact.locationValue")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">
                    {t("contact.follow")}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/NguyLuky/"
                      target="_blank"
                      className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-lg transition-all duration-300 group hover:scale-110 transform"
                    >
                      <Facebook className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" />
                    </a>
                    {/* <a */}
                    {/*   href="#" */}
                    {/*   className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-lg transition-all duration-300 group hover:scale-110 transform" */}
                    {/* > */}
                    {/*   <Twitter className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" /> */}
                    {/* </a> */}
                    <a
                      href="https://linkedin.com/in/hiếu-nguyễn-a14a0b322"
                      target="_blank"
                      className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-lg transition-all duration-300 group hover:scale-110 transform"
                    >
                      <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" />
                    </a>
                    {/* <a */}
                    {/*   href="#" */}
                    {/*   className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-lg transition-all duration-300 group hover:scale-110 transform" */}
                    {/* > */}
                    {/*   <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" /> */}
                    {/* </a> */}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="relative"
              >
                <motion.div
                  variants={fadeInUp}
                  className="absolute top-20 right-20 w-40 h-40 bg-zinc-800/50 rounded-full blur-3xl"
                />

                <motion.form
                  variants={fadeInUp}
                  className="relative z-10 bg-zinc-800/50 backdrop-blur-sm p-8 rounded-xl border border-zinc-700"
                  // action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfmPEu7NxvMNx5kZgggDTA8OJMr681Wrvv6wbuipWYYZl7XPQ/formResponse"
                  // method="POST"
                  onSubmit={(e) => {
                    e.preventDefault();

                    const target = e.target as HTMLFormElement;
                    const name = (
                      target.querySelector("#name") as HTMLInputElement
                    ).value;
                    const email = (
                      target.querySelector("#email") as HTMLInputElement
                    ).value;
                    const message = (
                      target.querySelector("#message") as HTMLInputElement
                    ).value;

                    const formData = new FormData();
                    formData.append("entry.535451468", name);
                    formData.append("entry.748577980", email);
                    formData.append("entry.1641976334", message);

                    const url =
                      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfmPEu7NxvMNx5kZgggDTA8OJMr681Wrvv6wbuipWYYZl7XPQ/formResponse";
                    fetch(url, {
                      method: "POST",
                      mode: "no-cors",
                      body: formData,
                    })
                      .then(() => {
                        toast.success("success", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        });
                      })
                      .catch(() => {
                        toast.error("error", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        });
                      });
                  }}
                >
                  <h3 className="text-2xl font-semibold mb-6">
                    {t("contact.sendMessage")}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-zinc-300 mb-2"
                      >
                        {t("contact.name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="entry.535451468"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 text-zinc-200"
                        placeholder={t("contact.namePlaceholder")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-zinc-300 mb-2"
                      >
                        {t("contact.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="entry.748577980"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 text-zinc-200"
                        placeholder={t("contact.emailPlaceholder")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-zinc-300 mb-2"
                      >
                        {t("contact.message")}
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        name="entry.1641976334"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 text-zinc-200 resize-none"
                        placeholder={t("contact.messagePlaceholder")}
                      ></textarea>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded-lg transition-colors duration-300 mt-2"
                      type="submit"
                    >
                      {t("contact.sendButton")}
                    </motion.button>
                  </div>
                </motion.form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section id="support" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">{t("support.title")}</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {t("support.subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-zinc-800 border border-zinc-700 rounded-xl p-8 text-center relative overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-zinc-700/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-zinc-700/30 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-zinc-700 rounded-full flex items-center justify-center mb-6">
                    <Coffee className="w-10 h-10 text-zinc-300" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {t("support.buyMeCoffee")}
                  </h3>
                  <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
                    {t("support.description")}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Coffee className="w-6 h-6 text-amber-500" />
                        <h4 className="text-lg font-semibold">
                          {t("support.buyMeCoffee")}
                        </h4>
                      </div>
                      <p className="text-zinc-400 text-sm mb-6">
                        {t("support.description")}
                      </p>
                      <motion.a
                        href="https://coff.ee/nguyluky"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
                      >
                        <Coffee className="w-5 h-5" />
                        <span>{t("support.buyMeCoffee")}</span>
                      </motion.a>
                    </div>
                    <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <CreditCard className="w-6 h-6 text-blue-500" />
                        <h4 className="text-lg font-semibold">
                          {t("support.bankTransfer")}
                        </h4>
                      </div>
                      <div className="space-y-3 text-left">
                        <div>
                          <p className="text-zinc-400 text-sm">
                            {t("support.bankName")}
                          </p>
                          <p className="text-zinc-200 font-medium">
                            {t("support.bankNameValue")}
                          </p>
                        </div>
                        <div>
                          <p className="text-zinc-400 text-sm">
                            {t("support.accountNumber")}
                          </p>
                          <p className="text-zinc-200 font-mono text-lg">
                            {t("support.accountNumberValue")}
                          </p>
                        </div>
                        <div>
                          <p className="text-zinc-400 text-sm">
                            {t("support.accountName")}
                          </p>
                          <p className="text-zinc-200 font-medium">
                            {t("support.accountNameValue")}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          navigator.clipboard.writeText(
                            t("support.accountNumberValue")
                          );

                          // You could add a toast notification here
                          toast.success("copy success", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                          });
                        }}
                        className="w-full mt-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded-lg transition-colors duration-300 text-sm"
                      >
                        Copy Account Number
                      </motion.button>
                    </div>
                  </div>

                  {/* <div className="mt-8 pt-8 border-t border-zinc-700"> */}
                  {/*   <h4 className="text-lg font-medium mb-4">{t("support.crypto")}</h4> */}
                  {/*   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto"> */}
                  {/*     <div className="bg-zinc-900 p-4 rounded-lg"> */}
                  {/*       <div className="flex items-center gap-2 mb-2"> */}
                  {/*         <Bitcoin className="w-5 h-5 text-amber-500" /> */}
                  {/*         <span className="text-zinc-300 font-medium">Bitcoin</span> */}
                  {/*       </div> */}
                  {/*       <p className="text-zinc-500 text-sm truncate">bc1q...a7xd</p> */}
                  {/*     </div> */}
                  {/*     <div className="bg-zinc-900 p-4 rounded-lg"> */}
                  {/*       <div className="flex items-center gap-2 mb-2"> */}
                  {/*         <div className="w-5 h-5 text-indigo-400 flex items-center justify-center"> */}
                  {/*           <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"> */}
                  {/*             <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" /> */}
                  {/*           </svg> */}
                  {/*         </div> */}
                  {/*         <span className="text-zinc-300 font-medium">Ethereum</span> */}
                  {/*       </div> */}
                  {/*       <p className="text-zinc-500 text-sm truncate">0x71...9e47</p> */}
                  {/*     </div> */}
                  {/*   </div> */}
                  {/* </div> */}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-zinc-950/50 backdrop-blur-sm text-zinc-500 text-center border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://github.com/nguyluky"
              className="text-zinc-500 hover:text-zinc-300 transition-colors duration-300 hover:scale-110 transform"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-zinc-500 hover:text-zinc-300 transition-colors duration-300 hover:scale-110 transform"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} Khắc Hiếu (nguyLuky).{" "}
            {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </main>
  );
}

function NavItem({
  title,
  icon,
  isActive,
  onClick,
}: {
  title: string;
  icon: any;
  onClick: () => any;
  isActive: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all duration-300 ${
        isActive
          ? "bg-zinc-800 text-zinc-100"
          : "text-zinc-400 hover:text-zinc-200"
      }`}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}

function SkillCard({
  variants,
  icon,
  title,
  skills,
  color,
}: {
  variants: any;
  icon: any;
  title: string;
  skills: string[];
  color: string;
}) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`bg-gradient-to-br ${color} rounded-xl p-6 hover:shadow-xl transition-all duration-500 border border-zinc-700 hover:border-zinc-500 group`}
    >
      <div className="mb-4 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="text-zinc-400 flex items-center gap-2 group-hover:text-zinc-300 transition-colors duration-300"
          >
            <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full group-hover:bg-zinc-400 transition-colors duration-300"></div>
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectCard({
  variants,
  title,
  description,
  technologies,
  githubLink,
}: {
  variants: any;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
}) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-500 transition-all duration-500 group hover:shadow-xl"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-zinc-100 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-zinc-400 mb-4 group-hover:text-zinc-300 transition-colors duration-300">
          {description}
        </p>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-zinc-900 text-zinc-400 text-xs rounded group-hover:bg-zinc-700 group-hover:text-zinc-300 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <a
          href={githubLink}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors duration-300 group-hover:translate-x-1 transform transition-transform"
        >
          <Github className="w-4 h-4" />
          <span>{githubLink.replace("nguyluky", "...")}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      constructor() {
        assert(canvas);
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(${150 + Math.random() * 50}, ${
          150 + Math.random() * 50
        }, ${150 + Math.random() * 50}, ${0.2 + Math.random() * 0.3})`;
      }

      update() {
        assert(canvas);
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        assert(ctx);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(100, window.innerWidth / 20);

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles with lines
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 150, 150, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 0.5 }}
    />
  );
}
