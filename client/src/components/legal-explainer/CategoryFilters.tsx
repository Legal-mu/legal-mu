export default function CategoryFilters() {
    const categories = [
        'All Topics',
        'Civil Law',
        'Property Law',
        'Corporate Governance',
        'Criminal Law',
        'International Law',
        'Family Law'
    ];

    return (
        <div className="max-w-[1440px] mx-auto mt-24 mb-16 flex flex-wrap justify-center gap-3 px-4">
            {categories.map((cat, idx) => (
                <button
                    key={cat}
                    className={`px-8 py-3 rounded-full text-[14px] font-bold transition-all ${idx === 0
                            ? 'bg-[#1A2853] text-white shadow-lg'
                            : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#1A2853]/30 hover:text-[#1A2853]'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
