// Services dummy data - Replace with API call: const data = await fetch('/api/services')
export const SERVICES = [
    {
        id: 1,
        title: 'Corporate & Business Law',
        description: 'Expert legal counsel for businesses of all sizes. From startup incorporation to complex mergers, we provide strategic guidance to protect your interests and fuel growth in Mauritius\' dynamic business environment.',
        icon: '💼',
        priceRange: 'Rs 25,000 - Rs 150,000',
        features: [
            'Company Registration & Incorporation',
            'Commercial Contracts & Agreements',
            'Mergers, Acquisitions & Joint Ventures',
            'Corporate Governance & Compliance',
            'Business Restructuring & Dissolution'
        ],
        popular: true,
        successRate: '96%',
        avgDuration: '2-6 weeks',
    },
    {
        id: 2,
        title: 'Family Law & Matrimonial',
        description: 'Compassionate and discreet legal support during life\'s most challenging moments. We handle divorce, custody, and family matters with sensitivity while protecting your rights and your children\'s best interests.',
        icon: '👨‍👩‍👧',
        priceRange: 'Rs 15,000 - Rs 80,000',
        features: [
            'Divorce & Legal Separation',
            'Child Custody & Visitation Rights',
            'Adoption & Guardianship',
            'Matrimonial Property Division',
            'Spousal & Child Support'
        ],
        popular: false,
        successRate: '94%',
        avgDuration: '3-8 months',
    },
    {
        id: 3,
        title: 'Criminal Defense',
        description: 'Aggressive defense with a proven track record. Our experienced trial lawyers fight tirelessly for your rights, from first appearance to trial and appeals, ensuring the strongest possible defense at every stage.',
        icon: '⚖️',
        priceRange: 'Rs 30,000 - Rs 200,000',
        features: [
            'Criminal Investigation Representation',
            'Bail Applications & Hearings',
            'Trial Defense & Litigation',
            'Appeals & Sentence Reviews',
            'White Collar Crime Defense'
        ],
        popular: true,
        successRate: '91%',
        avgDuration: '4-12 months',
    },
    {
        id: 4,
        title: 'Property & Real Estate',
        description: 'Secure your property investments with expert legal guidance. We handle everything from due diligence to title transfers, ensuring smooth transactions and protecting you from costly mistakes in property deals.',
        icon: '🏢',
        priceRange: 'Rs 20,000 - Rs 100,000',
        features: [
            'Property Purchase & Sale',
            'Title Searches & Verification',
            'Lease & Rental Agreements',
            'Property Dispute Resolution',
            'Land Registration & Transfer'
        ],
        popular: false,
        successRate: '98%',
        avgDuration: '1-3 months',
    },
    {
        id: 5,
        title: 'Employment & Labour Law',
        description: 'Protecting workplace rights for both employers and employees. Navigate complex labour regulations, resolve disputes fairly, and ensure full compliance with Mauritian employment laws.',
        icon: '👔',
        priceRange: 'Rs 12,000 - Rs 60,000',
        features: [
            'Employment Contract Drafting',
            'Workplace Dispute Mediation',
            'Unfair Dismissal Claims',
            'Labour Tribunal Representation',
            'HR Policy & Compliance'
        ],
        popular: false,
        successRate: '95%',
        avgDuration: '2-6 months',
    },
    {
        id: 6,
        title: 'Immigration & Work Permits',
        description: 'Streamline your path to working and living in Mauritius. Expert handling of visa applications, work permits, and citizenship with high success rates and efficient processing for individuals and businesses.',
        icon: '✈️',
        priceRange: 'Rs 18,000 - Rs 90,000',
        features: [
            'Occupation & Residence Permits',
            'Work Permit Applications',
            'Citizenship & Naturalization',
            'Visa Extensions & Renewals',
            'Immigration Appeals'
        ],
        popular: true,
        successRate: '97%',
        avgDuration: '6-12 weeks',
    },
];
