"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "@/components/ThemeToggle";
import {
    Briefcase,
    Code,
    ExternalLink,
    Facebook,
    Folder,
    Github,
    Linkedin,
    Mail,
    Menu,
    MessageSquare,
    Moon,
    Sun,
    User,
    X,
} from "lucide-react";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";

type SkillCategory = {
    title: string;
    icons: string;
    description?: string;
    colSpan?: string;
};

const skillCategories = [
    {
        title: "Programming Languages",
        icons: "c,cpp,ts,js,java,python,cs,php,dart,bash",
        description: "Working with multiple languages.",
    },
    {
        title: "Backend Development & DevOps",
        icons: "nodejs,express,fastapi,flask,graphql,prisma,docker,nginx,aws,azure,cloudflare",
        description: "Building APIs and backend services.",
    },
    {
        title: "Frontend Development",
        icons: "react,html,css,sass,tailwind,bootstrap,nextjs",
        description: "Building web interfaces.",
    },
    {
        title: "Databases",
        icons: "mongodb,mysql,postgres,redis,supabase",
        description: "Working with databases.",
    },
    {
        title: "Other",
        icons: "git,github,githubactions,postman,babel,jest,arduino,electron,figma",
        description: "Using tools for development.",
        colSpan: "md:col-span-2",
    },
];

function SkillCard({ title, icons, description, colSpan = "" }: SkillCategory) {
    const iconList = icons
        .split(",")
        .map((icon) => icon.trim())
        .filter(Boolean);

    return (
        <div
            className={`p-6 border rounded-2xl gap-4 hover:bg-secondary/60 transition-colors ${colSpan} h-full flex flex-col`}
        >
            <h3 className="font-semibold text-lg">{title}</h3>

            <div className="flex flex-wrap gap-3">
                {iconList.map((icon) => (
                    <img
                        key={icon}
                        src={`https://skillicons.dev/icons?i=${icon}`}
                        alt={icon}
                        title={icon}
                        loading="lazy"
                        className="w-10 h-10 rounded-md hover:scale-110 transition-transform duration-200"
                    />
                ))}
            </div>

            {description ? (
                <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
                    {description}
                </p>
            ) : null}
        </div>
    );
}

function SkillsSection() {
    return (
        <div className="max-w-5xl space-y-10 w-full">
            <h2 className="text-3xl md:text-4xl font-bold">Technical Skills</h2>

            <div className="grid md:grid-cols-2 gap-6 w-full">
                {skillCategories.map((skill) => (
                    <SkillCard key={skill.title} {...skill} />
                ))}
            </div>
        </div>
    );
}

function SkillsSectionMobile() {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? skillCategories.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === skillCategories.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(timer);
    }, []);
    return (
        <div className="relative mx-auto w-full max-w-3xl overflow-visible rounded-2xl space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold">Technical Skills</h2>

            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {skillCategories.map((skill) => (
                    <div className="w-full flex-shrink-0 px-2" key={skill.title}>
                        <SkillCard key={skill.title} {...skill} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActive(id);
                    }
                },
                {
                    threshold: 0.2, // chỉnh độ nhạy
                }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [ids]);

    return active;
}

function Title() {
    const titles = [
        "Software Developer",
        "Backend Developer",
        "System Developer",
        "Embedded Developer",
    ];
    const loopTitles = [...titles, titles[0]];
    const [index, setIndex] = useState(0);
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (index === titles.length) {
            const timeout = setTimeout(() => {
                setAnimate(false);
                setIndex(0);
            }, 700);

            return () => clearTimeout(timeout);
        } else {
            setAnimate(true);
        }
    }, [index, titles.length]);

    useEffect(() => {
        if (!animate) {
            const raf = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimate(true);
                });
            });

            return () => cancelAnimationFrame(raf);
        }
    }, [animate]);

    return (
        <div className="h-[95px] md:h-[84px] overflow-hidden">
            <div
                className={animate ? "ease-in-out duration-700 transition-transform" : ""}
                style={{
                    transform: `translateY(-${index * 100 / (titles.length + 1)}%)`,
                }}
            >
                {loopTitles.map((title, i) => (
                    <h2
                        key={i}
                        className="h-[100px] md:h-[84px] flex items-center text-5xl md:text-6xl font-bold"
                    >
                        {title}
                    </h2>
                ))}
            </div>
        </div>
    );
}
const navLinks = [
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Folder },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: MessageSquare },
];

const contacts = [
    {
        title: "Send Email",
        link: "mailto:nguyluky@gmail.com",
        icon: Mail,
    },
    {
        title: "Github",
        link: "https://github.com/nguyluky",
        icon: Github
    },
    {
        title: "Facebook",
        link: "https://www.facebook.com/NguyLuky/",
        icon: Facebook
    }
];

function SideThemeToggle({ isMobile }: { isMobile: boolean }) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);


    const iconClass = isMobile ? "w-6 h-6" : "w-4 h-4"

    if (!mounted) {
        return (
            <button
                className={
                    isMobile ? "lg:hidden fixed top-6 right-16 z-50 p-2 hover:bg-secondary rounded-lg transition-colors" :
                        "w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground"}
                aria-label="Toggle theme"
                type="button"
            >
                <Sun className={iconClass} />
            </button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <>
            <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={
                    isMobile ? "lg:hidden fixed top-6 right-16 z-50 p-2 hover:bg-secondary rounded-lg transition-colors" :
                        "w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground"}
            >
                {isDark ? <Sun className={iconClass} /> : <Moon className={iconClass} />}
            </button>

            {
                !isMobile && (
                    <span
                        className="absolute top-1/2 left-full -translate-y-1/2 ml-3
        px-3 py-1 text-xs rounded-md
        bg-primary text-primary-foreground whitespace-nowrap
        opacity-0 translate-x-[-8px]
        group-hover:opacity-100 group-hover:translate-x-0
        transition-all duration-300 ease-out"
                    >
                        {isDark ? "Light mode" : "Dark mode"}
                        <span
                            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full
          w-0 h-0
          border-t-[6px] border-b-[6px]
          border-r-[6px]
          border-t-transparent border-b-transparent border-r-primary"
                        />
                    </span>
                )
            }

        </>
    );
}

export default function AboutMe() {
    // const { t } = useLanguage();
    const isMobile = useIsMobile()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const sectionIds = useMemo(() => {
        return [...navLinks.map((l) => l.href.replace("#", "")), 'hero']
    }, [navLinks]);
    const active = useActiveSection(sectionIds);
    console.log(active)

    return (
        <>
            <Head>
                <title>NguyLuky Portfolio</title>
                <meta name="description" content="fullstack dev Portfolio" />

                <meta property="og:url" content="https://about.nguyluky.site/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="NguyLuky Portfolio" />
                <meta property="og:description" content="fullstack dev Portfolio" />
                <meta property="og:image" content="https://about.nguyluky.site/thumbnail.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="NguyLuky Portfolio" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="NguyLuky Portfolio" />
                <meta name="twitter:description" content="fullstack dev Portfolio" />
                <meta name="twitter:image" content="https://about.nguyluky.site/thumbnail.png" />
            </Head>
            <div className="min-h-screen bg-background text-foreground">
                <aside className="fixed left-6 top-1/2 transform -translate-y-1/2 w-20 flex-col items-center justify-center gap-6 z-40
                    hidden md:flex
                ">
                    <div className="flex flex-col items-center gap-8">
                        <nav className="flex flex-col items-center gap-6">
                            {navLinks.map((link) => {
                                const IconComponent = link.icon;
                                const isActive = active === link.href.replace("#", "");
                                return (
                                    <div
                                        className="relative group"
                                        key={link.name}
                                    >
                                        <a
                                            href={link.href}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300
                                                ${isActive
                                                    ? "border-primary bg-primary/20 text-primary scale-110"
                                                    : "border-border text-muted-foreground hover:border-primary hover:bg-primary/10 hover:text-primary"
                                                }
                                            `}
                                        >
                                            <IconComponent className="w-4 h-4" />
                                        </a>

                                        {/* TODO */}
                                        <span className=" absolute top-1/2 left-full -translate-y-1/2 ml-3
                                            px-3 py-1 text-xs rounded-md
                                            bg-primary text-primary-foreground whitespace-nowrap

                                            opacity-0 translate-x-[-8px] 
                                            group-hover:opacity-100 group-hover:translate-x-0

                                            transition-all duration-300 ease-out">
                                            {link.name}
                                            <span
                                                className="
                                                absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full
                                                w-0 h-0
                                                border-t-[6px] border-b-[6px]
                                                border-r-[6px]
                                                border-t-transparent border-b-transparent border-r-primary
                                                "
                                            />
                                        </span>
                                    </div>
                                );
                            })}
                        </nav>

                        <div className="flex flex-col items-center gap-4 border-t border-border pt-4">
                            {
                                contacts.map(e => (
                                    <div
                                        className="relative group"
                                        key={e.title}
                                    >
                                        <a href={e.link}
                                            title={e.title}
                                            target="_blank"
                                            className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 text-muted-foreground hover:text-primary"
                                        >
                                            <e.icon className="w-4 h-4" />
                                            <span className=" absolute top-1/2 left-full -translate-y-1/2 ml-3
                                            px-3 py-1 text-xs rounded-md
                                            bg-primary text-primary-foreground whitespace-nowrap

                                            opacity-0 translate-x-[-8px] 
                                            group-hover:opacity-100 group-hover:translate-x-0

                                            transition-all duration-300 ease-out">
                                                {e.title}
                                                <span
                                                    className="
                                                absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full
                                                w-0 h-0
                                                border-t-[6px] border-b-[6px]
                                                border-r-[6px]
                                                border-t-transparent border-b-transparent border-r-primary
                                                "
                                                />
                                            </span>
                                        </a>
                                    </div>
                                ))
                            }

                        </div>
                        <div className="flex flex-col items-center gap-4 border-t border-border pt-4">

                            <div className="relative group">
                                <SideThemeToggle isMobile={false} />

                            </div>
                        </div>
                    </div>
                </aside>


                <SideThemeToggle isMobile={true} />


                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden fixed top-6 right-6 z-50 p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                    {isMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

                {isMenuOpen && (
                    <div className="lg:hidden fixed bg-background/80 backdrop-blur z-40 h-fit w-fit top-16 right-10 shadow rounded">
                        <nav className="px-6 py-2 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-muted-foreground hover:text-primary transition-colors py-2 text-sm font-medium text-right"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                )}

                <main className=" flex justify-center h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth
                    md:ml-20 p-6 overflow-x-hidden
                ">
                    <div className="max-w-full md:max-w-4xl">
                        {/* Main Content */}
                        <section id="hero" className="snap-start flex items-center min-h-screen py-4">
                            <div className=" m-auto">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <p className="text-primary font-semibold text-sm">
                                                Hi, I'm
                                            </p>

                                            {/* TÊN CỦA BẠN */}
                                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent pb-1">
                                                NguyLuky
                                            </h1>
                                        </div>


                                        <Title />
                                    </div>

                                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                        I build systems where software meets the real world — from backend services and APIs
                                        to protocol analysis and embedded devices.
                                    </p>

                                    <div className="flex gap-4 pt-4">
                                        <a
                                            href="#contact"
                                            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                                        >
                                            Get in Touch
                                        </a>

                                        <a
                                            href="#projects"
                                            className="px-6 py-3 border border-border hover:bg-secondary rounded-lg transition-colors font-medium"
                                        >
                                            View Projects
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="about" className="snap-start flex items-center min-h-screen py-4 border-t">
                            <div className="max-w-5xl mx-auto space-y-10">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>

                                    <div className="grid lg:grid-cols-2 gap-8 items-start">

                                        {/* LEFT - INTRO + MINDSET */}
                                        <div className="p-6 border rounded-2xl space-y-5">
                                            <p className="text-muted-foreground leading-relaxed">
                                                I enjoy turning everyday problems into engineering challenges.
                                                Most of my projects start from simple frustrations and grow into
                                                complete systems.
                                            </p>

                                            <p className="text-muted-foreground leading-relaxed">
                                                I mainly work on backend systems and low-level problems where
                                                software meets real-world constraints. I like understanding how
                                                systems work internally, not just using them.
                                            </p>

                                            <p className="text-muted-foreground leading-relaxed">
                                                I’m especially interested in problems that require both system-level
                                                thinking and low-level detail — from building APIs to working close
                                                to hardware.
                                            </p>

                                            {/* Divider */}
                                            <div className="border-t pt-4 space-y-4">

                                                <div>
                                                    <h3 className="font-semibold mb-1">How I Work</h3>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        I break down complex problems, understand how systems behave,
                                                        and turn that into practical solutions.
                                                    </p>
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold mb-1">What Drives Me</h3>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        I enjoy building things that are not only technically interesting,
                                                        but also useful in real-world situations.
                                                    </p>
                                                </div>

                                            </div>
                                        </div>

                                        {/* RIGHT - SKILL BOXES */}
                                        <div className="gap-4 h-full hidden md:grid">

                                            <div className="p-5 border rounded-2xl hover:bg-secondary transition-colors">
                                                <h3 className="font-semibold mb-2">Backend Systems</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Building APIs and services that handle real-world workloads.
                                                </p>
                                            </div>

                                            <div className="p-5 border rounded-2xl hover:bg-secondary transition-colors">
                                                <h3 className="font-semibold mb-2">Understanding Systems</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Exploring how things work under the hood and analyzing behavior.
                                                </p>
                                            </div>

                                            <div className="p-5 border rounded-2xl hover:bg-secondary transition-colors">
                                                <h3 className="font-semibold mb-2">Working with Hardware</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Building software that interacts with devices and constrained environments.
                                                </p>
                                            </div>

                                            <div className="p-5 border rounded-2xl hover:bg-secondary transition-colors">
                                                <h3 className="font-semibold mb-2">Useful Tools</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Creating tools that solve real problems and improve workflows.
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="skills" className="snap-start flex items-center min-h-screen py-4 border-t w-full">
                            {
                                isMobile ? <SkillsSectionMobile /> : <SkillsSection />
                            }

                        </section>
                        <section id="projects" className="snap-start flex items-center min-h-screen py-4 border-t w-full">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Projects</h2>

                                <div className="grid md:grid-cols-2 gap-8">

                                    {/* Project 1 */}
                                    <div className="group border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                                        {/* <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-40"></div> */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2">ESP32 Android TV Remote</h3>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                Re-implemented the Android TV remote protocol in C/C++ on ESP32 by analyzing network traffic and existing implementations.
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">C/C++</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">ESP32</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">Embedded</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">Reverse Engineering</span>
                                            </div>

                                            <a href="#" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium">
                                                View Project
                                            </a>
                                        </div>
                                    </div>

                                    {/* Project 2 */}
                                    <div className="group border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                                        {/* <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-40"></div> */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2">SGU API</h3>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                Built an unofficial API by analyzing a university system and extracting data through network inspection and scraping.
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">TypeScript</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">Node.js</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">API Design</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">Web Scraping</span>
                                            </div>

                                            <a href="#" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium">
                                                View Project
                                            </a>
                                        </div>
                                    </div>

                                    {/* Project 3 */}
                                    <div className="group border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                                        {/* <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-40"></div> */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2">TKB SGU</h3>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                A timetable platform with real-time updates, used by 1,500+ students and handling active daily usage.
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">React</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">TypeScript</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">WebSocket</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">Node.js</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">Sass</span>
                                            </div>

                                            <a href="#" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium">
                                                View Project
                                            </a>
                                        </div>
                                    </div>

                                    {/* Project 4 */}
                                    <div className="group border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                                        {/* <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-40"></div> */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2">Express Auto Docs</h3>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                Automatically generates API documentation from TypeScript code to keep docs in sync with implementation.
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">TypeScript</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">Express</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">Tooling</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">Automation</span>
                                                <span className="text-xs bg-secondary px-2 py-1 rounded">Babel</span>
                                            </div>

                                            <a href="#" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium">
                                                View Project
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>

                        <section id="experience" className="snap-start flex items-center min-h-screen py-4 border-t w-full">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience</h2>

                                <div className="space-y-8">

                                    {/* Experience 1 */}
                                    <div className="border-l-2 border-primary pl-8 pb-8">
                                        <div className="flex justify-between items-start mb-2 flex-col md:flex-row gap-2">
                                            <div>
                                                <h3 className="text-xl font-semibold">Full-Stack Mentor</h3>
                                                <p className="text-primary font-medium">Cybersoft Academy</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground whitespace-nowrap">2024</p>
                                        </div>

                                        <p className="text-muted-foreground mb-3">
                                            Mentored students in building full-stack applications and solving real development problems.
                                        </p>

                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• Guided ~20 students through React and Node.js projects</li>
                                            <li>• Reviewed code and explained architecture decisions</li>
                                            <li>• Helped debug real-world issues and improve coding practices</li>
                                        </ul>
                                    </div>

                                    {/* Experience 2 */}
                                    <div className="border-l-2 border-muted pl-8 pb-8">
                                        <div className="flex justify-between items-start mb-2 flex-col md:flex-row gap-2">
                                            <div>
                                                <h3 className="text-xl font-semibold">Independent Developer</h3>
                                                <p className="text-primary font-medium">Personal Projects</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground whitespace-nowrap">2023 - 2025</p>
                                        </div>

                                        <p className="text-muted-foreground mb-3">
                                            Built and maintained multiple real-world projects focused on backend systems, reverse engineering, and embedded development.
                                        </p>

                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• Developed systems used by real users (1,500+ users)</li>
                                            <li>• Worked with undocumented APIs and protocol analysis</li>
                                            <li>• Designed and built full-stack applications end-to-end</li>
                                        </ul>
                                    </div>

                                    {/* Experience 3 */}
                                    <div className="border-l-2 border-muted pl-8">
                                        <div className="flex justify-between items-start mb-2 flex-col md:flex-row gap-2">
                                            <div>
                                                <h3 className="text-xl font-semibold">Self-Directed Learning</h3>
                                                <p className="text-primary font-medium">Engineering & Systems</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground whitespace-nowrap">Ongoing</p>
                                        </div>

                                        <p className="text-muted-foreground mb-3">
                                            Focused on learning system internals, networking, and embedded development through hands-on projects.
                                        </p>

                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• Explored system behavior through reverse engineering</li>
                                            <li>• Built projects combining software and hardware</li>
                                            <li>• Learned by solving real-world technical problems</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </section>
                        <section id="contact" className="snap-start flex items-center min-h-screen border-t w-full">
                            <div className="max-w-4xl mx-auto space-y-10">

                                {/* TEXT */}
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                        Let's work together
                                    </h2>

                                    <p className="text-lg text-muted-foreground max-w-2xl">
                                        I'm open to interesting projects, collaborations, or just a quick chat.
                                        If you're building something or have an idea, feel free to reach out.
                                    </p>
                                </div>

                                {/* CONTACT BUTTONS */}
                                <div className="flex flex-wrap gap-4">
                                    {contacts.map((e, i) => (
                                        <a
                                            key={i}
                                            href={e.link}
                                            className={
                                                i === 0
                                                    ? "inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium"
                                                    : "inline-flex items-center gap-2 px-6 py-3 border border-border hover:bg-secondary rounded-lg transition font-medium"
                                            }
                                        >
                                            <e.icon className="w-5 h-5" />
                                            {e.title}
                                        </a>
                                    ))}
                                </div>

                                {/* SUPPORT */}
                                <div className="border-t pt-6 space-y-4">
                                    <h3 className="font-semibold text-lg">Support My Work</h3>

                                    <p className="text-sm text-muted-foreground max-w-2xl">
                                        I build open-source projects and tools. If you find them useful,
                                        you can support my work or contribute to help me keep improving them.
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <a
                                            href="https://github.com/nguyluky"
                                            target="_blank"
                                            className="inline-flex items-center gap-2 px-5 py-2 border rounded-lg hover:bg-secondary transition text-sm"
                                        >
                                            ⭐ Star on GitHub
                                        </a>

                                        <a
                                            href="https://buymeacoffee.com/nguyluky"
                                            target="_blank"
                                            className="inline-flex items-center gap-2 px-5 py-2 border rounded-lg hover:bg-secondary transition text-sm"
                                        >
                                            ☕ Buy me a coffee
                                        </a>

                                        <a
                                            href="https://github.com/sponsors/nguyluky"
                                            target="_blank"
                                            className="inline-flex items-center gap-2 px-5 py-2 border rounded-lg hover:bg-secondary transition text-sm"
                                        >
                                            💖 Sponsor
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>

    );
}
