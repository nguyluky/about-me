"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
    Briefcase,
    Code,
    ExternalLink,
    Facebook,
    Folder,
    Github,
    Mail,
    MessageSquare,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";

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
            className={`p-6 border rounded-2xl space-y-4 hover:bg-secondary/60 transition-colors ${colSpan}`}
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            ) : null}
        </div>
    );
}

export function SkillsSection() {
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
        <div className="h-[72px] md:h-[84px] overflow-hidden">
            <div
                className={animate ? "ease-in-out duration-700 transition-transform" : ""}
                style={{
                    transform: `translateY(-${index * 100 / (titles.length + 1)}%)`,
                }}
            >
                {loopTitles.map((title, i) => (
                    <h2
                        key={i}
                        className="h-[72px] md:h-[84px] flex items-center text-5xl md:text-6xl font-bold"
                    >
                        {title}
                    </h2>
                ))}
            </div>
        </div>
    );
}


export default function AboutMe() {
    const { t } = useLanguage();

    const navLinks = [
        { name: "About", href: "#about", icon: User },
        { name: "Skills", href: "#skills", icon: Code },
        { name: "Projects", href: "#projects", icon: Folder },
        { name: "Experience", href: "#experience", icon: Briefcase },
        { name: "Contact", href: "#contact", icon: MessageSquare },
    ];

    const contacts = [
        {
            title: "Email",
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

    return (
        <div className="min-h-screen bg-background text-foreground">
            <aside className="fixed left-6 top-1/2 transform -translate-y-1/2 w-20 flex flex-col items-center justify-center gap-6 z-40">
                <div className="flex flex-col items-center gap-8">
                    {/* <div className="text-center">
                        <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Luky
                        </h1>
                    </div> */}

                    <nav className="flex flex-col items-center gap-6">
                        {navLinks.map((link) => {
                            const IconComponent = link.icon;
                            return (
                                <div
                                    className="relative"
                                    key={link.name}
                                >
                                    <a
                                        href={link.href}
                                        className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 text-muted-foreground hover:text-primary"
                                    >
                                        <IconComponent className="w-4 h-4" />
                                    </a>

                                    {/* TODO */}
                                    <span className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 hidden">
                                        {link.name}
                                    </span>
                                </div>
                            );
                        })}
                    </nav>

                    <div className="flex flex-col items-center gap-4 border-t border-border pt-4">
                        {
                            contacts.map(e => (
                                <a href={e.link}
                                    title={e.title}
                                    key={e.title}
                                    target="_blank"
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 text-muted-foreground hover:text-primary"
                                >
                                    <e.icon className="w-4 h-4" />
                                </a>
                            ))
                        }
                    </div>
                </div>
            </aside>

            <div className="ml-20 flex justify-center">
                <main className="max-w-4xl">
                    {/* Main Content */}
                    <section className="flex items-center h-screen">
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

                    <section id="about" className="flex items-center h-screen border-t">
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
                                    <div className="grid gap-4 h-full">

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
                    <section id="skills" className="flex items-center h-screen border-t w-full">

                        <SkillsSection />
                    </section>
                    <section id="projects" className="flex items-center h-screen border-t w-full">
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
                </main>
            </div>
        </div>
    );
}
