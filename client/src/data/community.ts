// Community dummy data - Replace with API call: const data = await fetch('/api/community')

export const COMMUNITY_STATS = {
    members: '2,500+',
    discussions: '15,000+',
    solvedCases: '1,200+',
    expertsOnline: '45',
};

export const FORUM_TOPICS = [
    {
        id: 1,
        title: 'Understanding Employment Contract Clauses in Mauritius',
        category: 'Employment Law',
        author: 'Sarah K.',
        replies: 24,
        views: 456,
        lastActivity: '2 hours ago',
        excerpt: 'What clauses should I look for in an employment contract before signing? Are there any specific protections under Mauritian labor law?',
        tags: ['Employment', 'Contracts', 'Labor Law'],
    },
    {
        id: 2,
        title: 'Property Boundary Dispute Resolution Process',
        category: 'Property Law',
        author: 'Michael R.',
        replies: 18,
        views: 332,
        lastActivity: '5 hours ago',
        excerpt: 'Need guidance on resolving a boundary dispute with my neighbor. What are the legal steps and how long does the process typically take?',
        tags: ['Property', 'Disputes', 'Mediation'],
    },
    {
        id: 3,
        title: 'Legal Requirements for Starting a Business in Mauritius',
        category: 'Corporate Law',
        author: 'David L.',
        replies: 42,
        views: 789,
        lastActivity: '1 day ago',
        excerpt: 'Planning to register a new business. What are the mandatory legal requirements and documents needed for company registration?',
        tags: ['Business', 'Registration', 'Corporate'],
    },
    {
        id: 4,
        title: 'Child Custody Rights After Divorce',
        category: 'Family Law',
        author: 'Jennifer M.',
        replies: 31,
        views: 621,
        lastActivity: '3 hours ago',
        excerpt: 'What factors do courts consider when determining child custody arrangements in Mauritius? Looking for recent case examples.',
        tags: ['Family Law', 'Custody', 'Divorce'],
    },
];

export const SUCCESS_STORIES = [
    {
        id: 1,
        name: 'Raj Patel',
        case: 'Property Dispute Resolution',
        quote: 'The Legal.mu community provided invaluable advice and connected me with an excellent attorney. My 2-year property dispute was resolved in just 3 months with a favorable settlement!',
        avatar: '👨',
        result: 'Won',
    },
    {
        id: 2,
        name: 'Sophie Chen',
        case: 'Wrongful Termination',
        quote: 'After being wrongfully terminated, I found expert guidance in the forum and was matched with a lawyer who helped me secure full compensation and reinstatement. Very grateful!',
        avatar: '👩',
        result: 'Settled',
    },
    {
        id: 3,
        name: 'Ahmed Hassan',
        case: 'Business Registration',
        quote: 'Started my business with complete confidence thanks to the Legal.mu community. Got all my questions answered and avoided costly mistakes. Highly recommend!',
        avatar: '👨',
        result: 'Success',
    },
];
