'use client';

import { useState } from 'react';

interface CategoryFilterProps {
    categories: string[];
    defaultSelected?: string;
    onCategoryChange?: (category: string) => void;
}

export default function CategoryFilter({ categories, defaultSelected = 'All Areas', onCategoryChange }: CategoryFilterProps) {
    const [selected, setSelected] = useState(defaultSelected);

    const handleClick = (category: string) => {
        setSelected(category);
        onCategoryChange?.(category);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleClick(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selected === category
                            ? 'bg-[#1A2853] text-white shadow-md'
                            : 'bg-white text-[#64748B] border border-gray-200 hover:border-[#1A2853]/30 hover:text-[#1A2853]'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
