// Resources dummy data - Replace with API call: const data = await fetch('/api/resources')

export const RESOURCE_CATEGORIES = [
    {
        id: 1,
        name: 'Legal Guides',
        icon: '📚',
        count: 45,
        description: 'Comprehensive guides on various legal topics',
        color: 'from-blue-500 to-blue-600',
    },
    {
        id: 2,
        name: 'Templates',
        icon: '📄',
        count: 32,
        description: 'Ready-to-use legal document templates',
        color: 'from-purple-500 to-purple-600',
    },
    {
        id: 3,
        name: 'FAQs',
        icon: '❓',
        count: 68,
        description: 'Answers to common legal questions',
        color: 'from-green-500 to-green-600',
    },
    {
        id: 4,
        name: 'Legal News',
        icon: '📰',
        count: 156,
        description: 'Latest updates in Mauritian law',
        color: 'from-orange-500 to-orange-600',
    },
];

export const FEATURED_RESOURCES = [
    {
        id: 1,
        title: 'Complete Guide to Business Registration in Mauritius (2025)',
        category: 'Legal Guides',
        description: 'Comprehensive step-by-step guide covering all legal requirements, documentation, and procedures for starting a business in Mauritius. Includes registration fees, timeline, and common pitfalls to avoid.',
        downloadCount: 1234,
        type: 'PDF',
        pages: 45,
        lastUpdated: '2025-01-15',
    },
    {
        id: 2,
        title: 'Standard Employment Contract Template',
        category: 'Templates',
        description: 'Professional employment contract template fully compliant with current Mauritian labor laws. Includes provisions for salary, benefits, termination clauses, and confidentiality agreements.',
        downloadCount: 892,
        type: 'DOCX',
        pages: 12,
        lastUpdated: '2024-12-20',
    },
    {
        id: 3,
        title: 'Property Purchase Agreement Template',
        category: 'Templates',
        description: 'Standard property purchase agreement template for Mauritius real estate transactions. Covers payment terms, conditions precedent, warranties, and legal compliance requirements.',
        downloadCount: 756,
        type: 'DOCX',
        pages: 18,
        lastUpdated: '2024-12-15',
    },
    {
        id: 4,
        title: 'Understanding Your Rights: Family Law in Mauritius',
        category: 'Legal Guides',
        description: 'Comprehensive guide to family law rights covering divorce procedures, child custody, spousal support, and property division under Mauritian law. Includes recent case law examples.',
        downloadCount: 645,
        type: 'PDF',
        pages: 38,
        lastUpdated: '2024-11-30',
    },
];

export const RECENT_NEWS = [
    {
        id: 1,
        title: 'New Labor Law Amendments Effective January 2025',
        date: '2024-12-15',
        excerpt: 'Significant changes to employment regulations including updated minimum wage, enhanced employee protections, and new compliance requirements that all employers must implement.',
        category: 'Employment Law',
    },
    {
        id: 2,
        title: 'Supreme Court Landmark Ruling on Property Disputes',
        date: '2024-12-10',
        excerpt: 'The Supreme Court has issued a landmark decision affecting property ownership rights and boundary disputes, setting new precedents for similar cases nationwide.',
        category: 'Property Law',
    },
    {
        id: 3,
        title: 'Streamlined Immigration Process for Work Permits',
        date: '2024-12-05',
        excerpt: 'New digital platform and streamlined procedures for work permit applications now in effect, reducing processing time from 8 weeks to 3-4 weeks.',
        category: 'Immigration Law',
    },
];
