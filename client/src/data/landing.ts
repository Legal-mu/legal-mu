import {
    MagnifyingGlassIcon,
    ScaleIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    BriefcaseIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';

export const stats = [
    { label: "Cases Won", value: "500+" },
    { label: "Success Rate", value: "98%" },
    { label: "Years Experience", value: "20+" },
    { label: "Expert Attorneys", value: "15" }
];

export const practiceAreas = [
    {
        title: "Corporate Law",
        description: "Navigating complex business regulations, mergers and acquisitions with strategic foresight.",
        icon: BriefcaseIcon,
        link: "/services"
    },
    {
        title: "Family Law",
        description: "Compassionate support for divorce, custody and sensitive family matters when you need it most.",
        icon: UserGroupIcon,
        link: "/services"
    },
    {
        title: "Criminal Defense",
        description: "Aggressive and strategic defense to protect your rights and future against all charges.",
        icon: ShieldCheckIcon,
        link: "/services"
    }
];

export const lawyers = [
    { name: "Zaryab Khattak", role: "Attorney", img: "/lawyer1.jpg" },
    { name: "Hamza Khan", role: "Barrister", img: "/lawyer2.jpg" },
    { name: "Ahsen Khalil", role: "Notary", img: "/lawyer3.jpg" },
    { name: "Maryam Ali", role: "Prosecutor", img: "/lawyer4.jpg" }
];

export const testimonials = [
    {
        quote: "Legal.mu provided exceptional support during a complex corporate litigation. Their expertise and dedication are unmatched in Mauritius.",
        author: "Robert Desmarais",
        role: "CEO, Global Tech Ltd",
        avatar: "/avatar1.png"
    }
];

export const blogPosts = [
    {
        category: "CORPORATE LAW",
        date: "Dec 15, 2023",
        title: "Navigating New Business Regulations in 2025",
        img: "/blog1.jpg",
        duration: "5 min read"
    },
    {
        category: "FAMILY LAW",
        date: "Dec 12, 2023",
        title: "Understanding Joint Custody Agreements",
        img: "/blog2.jpg",
        duration: "8 min read"
    },
    {
        category: "CRIMINAL DEFENSE",
        date: "Dec 10, 2023",
        title: "Your Rights During a Traffic Stop",
        img: "/blog3.jpg",
        duration: "6 min read"
    }
];
