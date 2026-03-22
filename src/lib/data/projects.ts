import {
    Zap,
    Boxes,
    Shield,
    Cpu,
    Globe,
    Code2
} from 'lucide-svelte';

export interface Tag {
    name: string;
    icon?: any;
    color?: string;
}

export interface Language {
    name: string;
    color: string;
    percentage: number;
}

export interface Project {
    slug: string;
    title: string;
    date: string;
    description: string;
    longDescription: string;
    features?: string[];
    technicalHighlights?: string[];
    tags: Tag[];
    preview: {
        repo: string;
        description: string;
        stars?: number;
        contributors?: string[];
    };
    languages?: Language[];
    isPrivate?: boolean;
    demoUrl?: string;
    githubUrl?: string;
}

export const projects: Project[] = [
    {
        slug: "termus-melesu",
        title: "Termus Melesu (Retra)",
        date: "January 04, 2026",
        description: "A digital notebook for small shops to track glass bottle circulation and credit. Features PWA support, offline sync, and AI-powered business analytics via Groq.",
        longDescription: "Termus Melesu (ጠርሙስ መልሱ) is a sophisticated digital solution tailored for small Ethiopian retailers. It addresses the unique challenge of tracking glass bottle circulation, which represents a significant asset for these businesses. The platform offers a Progressive Web App (PWA) experience, ensuring it works seamlessly on mobile devices with offline capabilities for areas with intermittent connectivity. Beyond simple tracking, it provides actionable insights through AI-powered analytics, helping shop owners optimize their inventory and financial health.",
        features: [
            "Installable PWA with offline-ready capabilities",
            "AI-Powered Business Summaries via Groq AI",
            "Real-time bottle circulation and credit tracking",
            "Premium Glassmorphism UI with fluid animations",
            "Secure PIN-protected transaction management"
        ],
        technicalHighlights: [
            "Next.js 15 (App Router) for high-performance rendering",
            "Supabase for real-time data sync and secure authentication",
            "Groq AI (gpt-oss-120b) integration for business intelligence",
            "Framer Motion for spring-based, natural UI interactions"
        ],
        tags: [
            { name: "Next.js", color: "#000000" },
            { name: "Supabase", color: "#3ECF8E" },
            { name: "Groq AI", color: "#F55036" },
            { name: "PWA", color: "#5A0FC8" }
        ],
        preview: {
            repo: "termus-melesu",
            description: "Digital notebook for retailers to track glass bottle circulation",
            stars: 1,
            contributors: ["/firaol.jpg"]
        },
        languages: [
            { name: "TypeScript", color: "#3178c6", percentage: 68.5 },
            { name: "CSS", color: "#563d7c", percentage: 19.2 },
            { name: "JavaScript", color: "#f1e05a", percentage: 12.3 }
        ],
        demoUrl: "https://termus-melesu.vercel.app",
        githubUrl: "https://github.com/f9ine99/termus-melesu"
    },
    {
        slug: "dawud-charity",
        title: "Dawud Charity",
        date: "November 13, 2025",
        description: "A collaborative project with <a href=\"https://github.com/khadijahm12k-creator\" target=\"_blank\" rel=\"noopener noreferrer\">Khadija</a>—a robust charity platform where donors can securely contribute and admins can manage donations, track proofs, and coordinate organization activities.",
        longDescription: "Dawud Charity is a comprehensive platform designed to bring transparency and accountability to charitable giving. In collaboration with Khadija, we built a system that allows donors to track their contributions in real-time, submit payment proofs, and see the tangible impact of their donations. For administrators, the platform provides a powerful dashboard to manage donor relations, verify proofs, and oversee all charitable activities, ensuring that every penny reaches its intended destination. The backend is powered by FastAPI and SQLAlchemy, providing a secure and scalable foundation.",
        features: [
            "Transparent donation tracking system for contributors",
            "Secure payment proof submission and verification",
            "Advanced admin dashboard for organizational coordination",
            "Real-time donation counters and impact visualization"
        ],
        technicalHighlights: [
            "FastAPI backed by SQLAlchemy for a secure RESTful API",
            "React frontend utilizing Shadcn UI for a professional interface",
            "Supabase for scalable cloud database and secure storage",
            "JWT validation and Scoped access control for admin security"
        ],
        tags: [
            { name: "FastAPI", color: "#05998b" },
            { name: "React", color: "#61dafb" },
            { name: "Supabase", color: "#3ECF8E" },
            { name: "Shadcn UI", color: "#000000" },
            { name: "JWT", color: "#bb9af7" },
            { name: "SQLAlchemy", color: "#d26d1a" }
        ],
        preview: {
            repo: "dawud-charity",
            description: "A transparent and accountable donation system for charity",
            stars: 1,
            contributors: ["/firaol.jpg", "https://github.com/khadijahm12k-creator.png"]
        },
        languages: [
            { name: "TypeScript", color: "#3178c6", percentage: 45.3 },
            { name: "Python", color: "#3572A5", percentage: 38.8 },
            { name: "CSS", color: "#563d7c", percentage: 10.1 },
            { name: "HTML", color: "#e34c26", percentage: 5.8 }
        ],
        demoUrl: "https://mufti-dawud.vercel.app/",
        githubUrl: "https://github.com/f9ine99/dawud-charity"
    },
    {
        slug: "nyx-portfolio",
        title: "Fira-portfolio",
        date: "March 19, 2026",
        description: "The website you're currently browsing! A premium, terminal-inspired portfolio built with SvelteKit and glassmorphism UI.",
        longDescription: "Fira-portfolio is the latest iteration of my personal portfolio, born from a desire to combine the raw, powerful aesthetic of a terminal with the sleek, modern feel of glassmorphism. Built with SvelteKit and TypeScript, it prioritizes performance and user experience while offering a unique visual identity. The project explores advanced UI concepts like custom cursor effects, dynamic bento grids, and intricate glassmorphic layers, all while maintaining a clean and professional standard.",
        features: [
            "Terminal-inspired design system with glassmorphic depth",
            "Dynamic Bento-grid layouts for performance and visual density",
            "Custom micro-interactions and smooth page transitions",
            "Responsive and optimized for high-end user experiences"
        ],
        technicalHighlights: [
            "SvelteKit 5 (Runes) for reactive and lightweight components",
            "TypeScript for type-safe development and robust architecture",
            "Lucide Icons integration and custom SVG animations",
            "Vite-powered development environment for instant feedback"
        ],
        tags: [
            { name: "SvelteKit", color: "#ff3e00" },
            { name: "TypeScript", color: "#3178c6" },
            { name: "Vite", color: "#646cff" }
        ],
        preview: {
            repo: "my-portfolio",
            description: "Premium, terminal-inspired portfolio website",
            stars: 0,
            contributors: ["/firaol.jpg"]
        },
        languages: [
            { name: "Svelte", color: "#ff3e00", percentage: 52.4 },
            { name: "TypeScript", color: "#3178c6", percentage: 33.1 },
            { name: "CSS", color: "#563d7c", percentage: 14.5 }
        ],
        githubUrl: "https://github.com/f9ine99/my-portfolio"
    },
    {
        slug: "detectify",
        title: "Detectify",
        date: "April 19, 2024",
        description: "Open-source web defacement detection with an integrated uptime checker for safeguarding online presence and monitoring website integrity.",
        longDescription: "Detectify is a security-focused tool designed to monitor websites for unauthorized changes and downtime. It provides a robust defacement detection engine alongside a reliable uptime checker, alerting owners immediately if their site is compromised or inaccessible. This project was built to address the growing need for accessible, open-source security monitoring for individuals and small organizations.",
        features: [
            "Automated web defacement detection engine",
            "Integrated website uptime and availability monitoring",
            "Comprehensive log management for security audits",
            "Customizable alert system for immediate response"
        ],
        technicalHighlights: [
            "Python-based scanning engine for periodic integrity checks",
            "Integrated Uptime checker using asynchronous requests",
            "Local logging system for historical data persistence",
            "Lightweight and container-ready architecture"
        ],
        tags: [
            { name: "Security", color: "#f7768e" },
            { name: "Monitoring", color: "#7aa2f7" },
            { name: "Python", color: "#3776ab" }
        ],
        preview: {
            repo: "Detectify",
            description: "Web defacement detection with integrated Uptime checker",
            stars: 0,
            contributors: ["/firaol.jpg"]
        },
        languages: [
            { name: "Python", color: "#3572A5", percentage: 82.6 },
            { name: "Shell", color: "#89e051", percentage: 11.4 },
            { name: "Dockerfile", color: "#384d54", percentage: 6.0 }
        ],
        githubUrl: "https://github.com/f9ine99/Detectify"
    },
    {
        slug: "xor-encryptor",
        title: "XOR Text Encryptor",
        date: "December 28, 2025",
        description: "XOR-based text encryption and decryption implemented in x86 Assembly for EMU8086 programs, focusing on low-level security concepts.",
        longDescription: "This project is an exploration into low-level programming and fundamental cryptography. Implemented in x86 Assembly for the EMU8086 micro-environment, it provides a functional XOR-based encryption and decryption tool. The project focuses on efficient register usage, direct memory manipulation, and the core logic of bitwise operations in security applications.",
        features: [
            "Symmetric XOR-based text encryption and decryption",
            "Direct user input handling via DOS interrupts",
            "Original text restoration with bitwise logic",
            "Designed and optimized for EMU8086 environment"
        ],
        technicalHighlights: [
            "Pure x86 Assembly implementation",
            "Low-level string manipulation and buffer management",
            "Efficient register-based character processing",
            "Utilizes DOS 21h and BIOS 16h interrupts"
        ],
        tags: [
            { name: "Assembly", color: "#6E4C13" },
            { name: "x86", color: "#bb9af7" },
            { name: "Security", color: "#f7768e" },
            { name: "Low-level", color: "#ff9e64" }
        ],
        preview: {
            repo: "xor-text-encryptor-asm",
            description: "XOR-based text encryption/decryption in x86 Assembly",
            stars: 0,
            contributors: ["/firaol.jpg"]
        },
        languages: [
            { name: "Assembly", color: "#6E4C13", percentage: 100 }
        ],
        githubUrl: "https://github.com/f9ine99/xor-text-encryptor-asm"
    },
    {
        slug: "furi-cadaster",
        title: "Furi-Cadaster",
        date: "2025",
        description: "An office management and land identification (kart) system built to modernize legacy Excel-based workflows into a database-driven, user-friendly web application with real-time updates.",
        longDescription: "Furi-Cadaster is a full-stack web application developed to digitize and streamline office management and land identification kart systems. Previously reliant on cumbersome Excel spreadsheets, the organization needed a modern, scalable solution. This system provides a clean, intuitive interface for managing land records, office operations, and user accounts. It features real-time updates via WebSockets, secure authentication with JWT, and a robust SQLite database managed through SQLAlchemy. The project represents a significant leap from manual, error-prone processes to a reliable, centralized digital platform.",
        features: [
            "Digitized land identification (kart) and record system",
            "Real-time layout updates via WebSockets connectivity",
            "Secure user authentication and session management",
            "Intuitive administrative dashboard for record verification"
        ],
        technicalHighlights: [
            "Python Flask backend with SQLAlchemy ORM integration",
            "Multi-client synchronization using Flask-SocketIO",
            "Robust SQLite database for centralized data management",
            "JWT-based security layer for protected endpoints"
        ],
        tags: [
            { name: "Flask", color: "#000000" },
            { name: "SQLAlchemy", color: "#d26d1a" },
            { name: "JWT", color: "#bb9af7" },
            { name: "WebSocket", color: "#27c93f" },
            { name: "SQLite", color: "#003B57" },
            { name: "HTML/CSS", color: "#e34c26" }
        ],
        preview: {
            repo: "Furi-Cadaster",
            description: "Office management and land identification kart system",
            stars: 0,
            contributors: ["/firaol.jpg"]
        },
        isPrivate: true,
        languages: [
            { name: "Python", color: "#3572A5", percentage: 48.2 },
            { name: "HTML", color: "#e34c26", percentage: 32.5 },
            { name: "CSS", color: "#563d7c", percentage: 12.8 },
            { name: "JavaScript", color: "#f1e05a", percentage: 6.5 }
        ]
    }
];

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
