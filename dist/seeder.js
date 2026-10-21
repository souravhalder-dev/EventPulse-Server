"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_js_1 = require("./models/User.js");
const Event_js_1 = require("./models/Event.js");
const Category_js_1 = require("./models/Category.js");
const Booking_js_1 = require("./models/Booking.js");
const Inquiry_js_1 = require("./models/Inquiry.js");
dotenv_1.default.config();
const categoriesData = [
    {
        name: 'Artificial Intelligence',
        slug: 'artificial-intelligence',
        description: 'Generative AI, Large Language Models, Autonomous Agents, and Neural Architectures.',
        icon: 'Brain',
        itemCount: 4,
        featured: true,
    },
    {
        name: 'Frontend & Modern Web',
        slug: 'frontend-modern-web',
        description: 'React, Next.js, TypeScript, WebAssembly, and high-performance component systems.',
        icon: 'Layout',
        itemCount: 3,
        featured: true,
    },
    {
        name: 'Cloud & DevOps',
        slug: 'cloud-devops',
        description: 'Kubernetes, Serverless architectures, Microservices, and Platform Engineering.',
        icon: 'Cloud',
        itemCount: 3,
        featured: true,
    },
    {
        name: 'Cybersecurity & Privacy',
        slug: 'cybersecurity-privacy',
        description: 'Zero Trust architecture, Cloud Security, Threat Intelligence, and Cryptography.',
        icon: 'ShieldCheck',
        itemCount: 2,
        featured: true,
    },
    {
        name: 'Mobile & UI/UX',
        slug: 'mobile-ui-ux',
        description: 'Cross-platform engineering, Design Systems, Spatial Computing, and User Experience.',
        icon: 'Smartphone',
        itemCount: 2,
        featured: true,
    },
    {
        name: 'Data Science & Big Data',
        slug: 'data-science-big-data',
        description: 'Distributed data lakes, Real-time streaming, Analytics engineering, and MLOps.',
        icon: 'Database',
        itemCount: 2,
        featured: true,
    },
];
const eventsData = [
    {
        title: 'Global AI & Autonomous Agents Summit 2026',
        slug: 'global-ai-autonomous-agents-summit-2026',
        shortDescription: 'The premier international gathering of AI researchers, model architects, and autonomous agent builders.',
        description: 'Explore the frontiers of artificial general intelligence, multi-agent frameworks, cognitive architectures, and real-time inference optimization. Featuring keynotes from visionary researchers, hands-on masterclasses on reasoning models, and exclusive networking sessions with leading AI venture partners.',
        category: 'Artificial Intelligence',
        price: 349,
        date: new Date('2026-11-15T09:00:00Z'),
        endDate: new Date('2026-11-17T18:00:00Z'),
        time: '09:00 AM - 05:30 PM PST',
        location: 'Moscone Convention Center, San Francisco, CA',
        isVirtual: false,
        featuredImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
        ],
        capacity: 650,
        ticketsSold: 420,
        rating: 4.9,
        reviewCount: 38,
        featured: true,
        status: 'upcoming',
        organizer: 'NextGen AI Institute',
        speakers: [
            {
                name: 'Dr. Elena Rostova',
                role: 'Chief AI Scientist',
                company: 'Synthetix Research Labs',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
            },
            {
                name: 'Marcus Vance',
                role: 'VP of Cognitive Systems',
                company: 'Vanguard DeepMind',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            },
            {
                name: 'Kavita Patel',
                role: 'Founding Engineer',
                company: 'AgenticFlow AI',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
            },
        ],
        agenda: [
            { time: '09:00 AM', topic: 'Opening Keynote: The Dawn of Multi-Modal Reasoning Engines', speaker: 'Dr. Elena Rostova' },
            { time: '11:00 AM', topic: 'Architecting Resilient Multi-Agent Autonomous Workflows', speaker: 'Marcus Vance' },
            { time: '02:00 PM', topic: 'Inference Efficiency and Low-Latency Serving at Scale', speaker: 'Kavita Patel' },
            { time: '04:15 PM', topic: 'Panel Discussion: Responsible Deployment of High-Agency AI', speaker: 'All Speakers' },
        ],
    },
    {
        title: 'React & Modern Frontend World 2026',
        slug: 'react-modern-frontend-world-2026',
        shortDescription: 'Deep dive into React 19, Server Components, Vite optimizations, and next-generation UI engineering.',
        description: 'Join over a thousand frontend architects and senior software engineers for two intensive days of technical presentations, interactive workshops, and live architecture reviews. Learn production patterns for React Server Actions, fine-grained reactivity, and enterprise design systems.',
        category: 'Frontend & Modern Web',
        price: 249,
        date: new Date('2026-11-22T09:00:00Z'),
        endDate: new Date('2026-11-23T17:30:00Z'),
        time: '09:30 AM - 05:00 PM CET',
        location: 'Beurs van Berlage, Amsterdam, Netherlands',
        isVirtual: false,
        featuredImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
        ],
        capacity: 500,
        ticketsSold: 310,
        rating: 4.8,
        reviewCount: 29,
        featured: true,
        status: 'upcoming',
        organizer: 'Frontend Guild Europe',
        speakers: [
            {
                name: 'David Chen',
                role: 'Principal Frontend Architect',
                company: 'Vercel Ecosystems',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
            },
            {
                name: 'Clara Sorensen',
                role: 'Design Systems Lead',
                company: 'Spotify Design',
                avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
            },
        ],
        agenda: [
            { time: '09:30 AM', topic: 'State of React 19: Mastering Actions & Suspense in Production', speaker: 'David Chen' },
            { time: '11:45 AM', topic: 'Scalable Component Architecture Across 40+ Micro-frontends', speaker: 'Clara Sorensen' },
            { time: '02:30 PM', topic: 'Zero-Runtime CSS vs Utility Engines: Benchmarking Performance', speaker: 'David Chen' },
        ],
    },
    {
        title: 'Cloud Native & Kubernetes Summit Tokyo',
        slug: 'cloud-native-kubernetes-summit-tokyo',
        shortDescription: 'Enterprise cloud infrastructure, eBPF telemetry, service meshes, and GitOps at petabyte scale.',
        description: 'The definitive gathering for DevOps engineers, Site Reliability Engineers, and platform leaders across the Asia-Pacific region. Experience comprehensive case studies on Kubernetes multi-cluster routing, Zero-Downtime database migrations, and telemetry-driven autoscaling.',
        category: 'Cloud & DevOps',
        price: 199,
        date: new Date('2026-12-05T08:30:00Z'),
        endDate: new Date('2026-12-06T18:00:00Z'),
        time: '08:30 AM - 06:00 PM JST',
        location: 'Tokyo International Forum, Tokyo, Japan',
        isVirtual: false,
        featuredImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        ],
        capacity: 450,
        ticketsSold: 280,
        rating: 4.9,
        reviewCount: 44,
        featured: true,
        status: 'upcoming',
        organizer: 'Cloud Engineering Foundation APAC',
        speakers: [
            {
                name: 'Kenji Takahashi',
                role: 'Head of Infrastructure',
                company: 'CyberCloud Global',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
            },
            {
                name: 'Amira Al-Mansoor',
                role: 'Principal SRE',
                company: 'HyperScale Networks',
                avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
            },
        ],
        agenda: [
            { time: '08:30 AM', topic: 'Keynote: eBPF-Powered Observability and Network Hardening', speaker: 'Kenji Takahashi' },
            { time: '11:00 AM', topic: 'Automating Global Multi-Region Failover with GitOps', speaker: 'Amira Al-Mansoor' },
            { time: '03:00 PM', topic: 'FinOps in Action: Slashing Cloud Expenditures by 45%', speaker: 'Kenji Takahashi' },
        ],
    },
    {
        title: 'CyberSec Horizon: Zero-Trust Global Forum',
        slug: 'cybersec-horizon-zero-trust-global-forum',
        shortDescription: 'Defending critical digital infrastructure against next-gen AI-driven cybersecurity threats.',
        description: 'An elite symposium bringing together Chief Information Security Officers, penetration testers, and cryptographers to analyze active threats, post-quantum cryptography migrations, and AI-enabled automated threat remediation.',
        category: 'Cybersecurity & Privacy',
        price: 399,
        date: new Date('2026-12-12T09:00:00Z'),
        endDate: new Date('2026-12-13T17:00:00Z'),
        time: '09:00 AM - 05:00 PM GMT',
        location: 'ExCeL London, Royal Victoria Dock, London, UK',
        isVirtual: false,
        featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
        ],
        capacity: 350,
        ticketsSold: 215,
        rating: 4.9,
        reviewCount: 31,
        featured: true,
        status: 'upcoming',
        organizer: 'International Cybersecurity Council',
        speakers: [
            {
                name: 'Rachel Sterling',
                role: 'Chief Information Security Officer',
                company: 'Sentinel Defense Global',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
            },
        ],
        agenda: [
            { time: '09:00 AM', topic: 'Zero Trust in Practice: Identity As The True Perimeter', speaker: 'Rachel Sterling' },
            { time: '01:30 PM', topic: 'Live Incident Response Simulation: Defending Distributed APIs', speaker: 'Rachel Sterling' },
        ],
    },
    {
        title: 'Open Source Community Day & Hackathon',
        slug: 'open-source-community-day-hackathon',
        shortDescription: 'Collaborate with maintainers, contribute to popular repositories, and build tools for the open web.',
        description: 'A completely free celebration of community-driven software development. Bring your laptop and collaborate directly with project leads on documentation, bug fixes, feature requests, and new library ecosystems.',
        category: 'Frontend & Modern Web',
        price: 0,
        date: new Date('2026-11-28T10:00:00Z'),
        endDate: new Date('2026-11-28T20:00:00Z'),
        time: '10:00 AM - 08:00 PM EST',
        location: 'MIT Media Lab, Cambridge, MA',
        isVirtual: false,
        featuredImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        ],
        capacity: 300,
        ticketsSold: 245,
        rating: 4.9,
        reviewCount: 52,
        featured: false,
        status: 'upcoming',
        organizer: 'Open Source Pioneers Foundation',
        speakers: [
            {
                name: 'Lucas Silva',
                role: 'Lead OSS Maintainer',
                company: 'OpenCore Labs',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
            },
        ],
        agenda: [
            { time: '10:00 AM', topic: 'Kickoff: Contribution Guidelines & Open Repositories Overview', speaker: 'Lucas Silva' },
            { time: '11:00 AM', topic: 'Hackathon Sprint Begins: Mentorship & Live Code Review', speaker: 'Community Mentors' },
            { time: '06:00 PM', topic: 'Project Demos & Award Presentations', speaker: 'Lucas Silva' },
        ],
    },
    {
        title: 'Virtual AI Engineering & LLMOps Masterclass',
        slug: 'virtual-ai-engineering-llmops-masterclass',
        shortDescription: 'Interactive global online workshop on RAG pipelines, vector search, and fine-tuning reasoning models.',
        description: 'Join from anywhere in the world for an intensive 6-hour interactive masterclass covering advanced Retrieval-Augmented Generation (RAG) architectures, hybrid vector-keyword retrieval, context window management, and deterministic evaluation benchmarks.',
        category: 'Artificial Intelligence',
        price: 99,
        date: new Date('2026-12-08T14:00:00Z'),
        endDate: new Date('2026-12-08T20:00:00Z'),
        time: '02:00 PM - 08:00 PM UTC',
        location: 'Virtual Online (Interactive Livestream & Labs)',
        isVirtual: true,
        featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        ],
        capacity: 1000,
        ticketsSold: 780,
        rating: 4.8,
        reviewCount: 64,
        featured: true,
        status: 'upcoming',
        organizer: 'AI Architects Global',
        speakers: [
            {
                name: 'Dr. Sophia Wei',
                role: 'Research Director',
                company: 'VectorMind Systems',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
            },
        ],
        agenda: [
            { time: '02:00 PM', topic: 'Advanced Chunking & Semantic Hybrid Retrieval', speaker: 'Dr. Sophia Wei' },
            { time: '04:30 PM', topic: 'Automated Red-Teaming and Guardrails for Enterprise LLMs', speaker: 'Dr. Sophia Wei' },
        ],
    },
    {
        title: 'Mobile Architecture & Design Systems Con',
        slug: 'mobile-architecture-design-systems-con',
        shortDescription: 'Cross-platform engineering with React Native, Flutter, Swift, and unified design token pipelines.',
        description: 'Learn how premier engineering organizations scale mobile applications to hundreds of millions of users without sacrificing performance, battery efficiency, or accessible user interface elegance.',
        category: 'Mobile & UI/UX',
        price: 189,
        date: new Date('2026-12-18T09:00:00Z'),
        endDate: new Date('2026-12-19T17:00:00Z'),
        time: '09:00 AM - 05:00 PM SGT',
        location: 'Suntec Convention Centre, Singapore',
        isVirtual: false,
        featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
        ],
        capacity: 400,
        ticketsSold: 210,
        rating: 4.7,
        reviewCount: 22,
        featured: false,
        status: 'upcoming',
        organizer: 'Mobile Leaders APAC',
        speakers: [
            {
                name: 'Jonathan Tan',
                role: 'Mobile Tech Lead',
                company: 'Grab Holdings',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
            },
        ],
        agenda: [
            { time: '09:00 AM', topic: 'Bridging React Native and Native Swift Modules at Scale', speaker: 'Jonathan Tan' },
        ],
    },
    {
        title: 'Big Data & Real-Time Stream Processing Expo',
        slug: 'big-data-real-time-stream-processing-expo',
        shortDescription: 'High-throughput Kafka, Apache Flink pipelines, Iceberg tables, and real-time analytical warehouses.',
        description: 'Experience firsthand how data engineers build ultra low-latency event processing architectures handling millions of transactions every second with exactly-once processing semantics.',
        category: 'Data Science & Big Data',
        price: 279,
        date: new Date('2027-01-14T09:00:00Z'),
        endDate: new Date('2027-01-15T17:30:00Z'),
        time: '09:00 AM - 05:30 PM CST',
        location: 'McCormick Place, Chicago, IL',
        isVirtual: false,
        featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
        ],
        capacity: 450,
        ticketsSold: 190,
        rating: 4.8,
        reviewCount: 19,
        featured: false,
        status: 'upcoming',
        organizer: 'Big Data Society Global',
        speakers: [
            {
                name: 'Vikram Joshi',
                role: 'Data Platform Architect',
                company: 'StreamingScale Systems',
                avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
            },
        ],
        agenda: [
            { time: '09:00 AM', topic: 'Apache Flink & Iceberg: Building Real-Time Lakehouses', speaker: 'Vikram Joshi' },
        ],
    },
];
const seedDatabase = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eventpulse_db';
        await mongoose_1.default.connect(mongoUri);
        console.log(`[Seeder] Connected to MongoDB at ${mongoUri}`);
        // Clear existing collections
        await User_js_1.User.deleteMany({});
        await Event_js_1.Event.deleteMany({});
        await Category_js_1.Category.deleteMany({});
        await Booking_js_1.Booking.deleteMany({});
        await Inquiry_js_1.Inquiry.deleteMany({});
        console.log('[Seeder] Cleared old data.');
        // 1. Seed Categories
        const categories = await Category_js_1.Category.insertMany(categoriesData);
        console.log(`[Seeder] Seeded ${categories.length} categories.`);
        // 2. Seed Users
        // Admin user: admin@example.com / Admin@123456
        const adminUser = await User_js_1.User.create({
            name: 'Sarah Jenkins (Admin)',
            email: 'admin@example.com',
            password: 'Admin@123456',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
            bio: 'Platform Administrator and Tech Events Curator at EventPulse.',
            phone: '+1 (415) 555-8901',
        });
        // Standard user: user@example.com / User@123456
        const standardUser = await User_js_1.User.create({
            name: 'Alex Morgan',
            email: 'user@example.com',
            password: 'User@123456',
            role: 'user',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            bio: 'Full-Stack Developer passionate about React, TypeScript, and Generative AI.',
            phone: '+1 (415) 555-4321',
        });
        console.log('[Seeder] Seeded Demo Accounts:');
        console.log('  Admin: admin@example.com / Admin@123456');
        console.log('  User:  user@example.com / User@123456');
        // 3. Seed Events
        const eventsWithCreator = eventsData.map((ev) => ({
            ...ev,
            createdBy: adminUser._id,
        }));
        const createdEvents = await Event_js_1.Event.insertMany(eventsWithCreator);
        console.log(`[Seeder] Seeded ${createdEvents.length} events.`);
        // 4. Seed Bookings for Demo User
        await Booking_js_1.Booking.create([
            {
                user: standardUser._id,
                event: createdEvents[0]._id,
                ticketQuantity: 1,
                totalAmount: createdEvents[0].price,
                status: 'confirmed',
                bookingReference: 'EP-A7K2-8921',
                attendeeDetails: {
                    fullName: 'Alex Morgan',
                    email: 'user@example.com',
                    company: 'Nexus Software Labs',
                    jobTitle: 'Senior Software Engineer',
                },
            },
            {
                user: standardUser._id,
                event: createdEvents[1]._id,
                ticketQuantity: 2,
                totalAmount: createdEvents[1].price * 2,
                status: 'confirmed',
                bookingReference: 'EP-B4X9-3312',
                attendeeDetails: {
                    fullName: 'Alex Morgan',
                    email: 'user@example.com',
                    company: 'Nexus Software Labs',
                    jobTitle: 'Senior Software Engineer',
                },
            },
        ]);
        console.log('[Seeder] Seeded sample bookings for demo user.');
        // 5. Seed Inquiries from Contact Form
        await Inquiry_js_1.Inquiry.create([
            {
                name: 'Elena Rostova',
                email: 'elena.rostova@synthetix.org',
                subject: 'Speaker Partnership & Workshop Proposal',
                message: 'Hello EventPulse Team! We would love to collaborate on hosting a 2-hour hands-on workshop on cognitive architectures during the upcoming San Francisco summit.',
                category: 'Speaker Application',
                status: 'in-progress',
                adminNotes: 'Reviewing proposal with technical committee. Slated for Stage 2.',
            },
            {
                name: 'Marcus Sterling',
                email: 'marcus@cloudforward.tech',
                subject: 'Corporate Sponsorship Opportunities for Q4',
                message: 'We are interested in becoming a Platinum Tier Sponsor for the Cloud Native Tokyo Summit and would like the detailed prospectus and booth package options.',
                category: 'Sponsorship',
                status: 'new',
            },
            {
                name: 'Diana Prince',
                email: 'diana.prince@developerhub.io',
                subject: 'Group Ticketing Discount for University Student Chapter',
                message: 'We have 25 engineering students eager to attend the React World conference. Are there educational or student discount bundles available?',
                category: 'Ticketing',
                status: 'resolved',
                adminNotes: 'Provided 40% student group voucher code.',
            },
        ]);
        console.log('[Seeder] Seeded initial contact inquiries.');
        console.log('[Seeder] Database seeding completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('[Seeder Error]:', error);
        process.exit(1);
    }
};
seedDatabase();
