'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
}

export default function Pagination({ currentPage = 1, totalPages = 8, onPageChange }: PaginationProps) {
    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) onPageChange?.(page);
    };

    const renderPageNumbers = () => {
        const pages: (number | string)[] = [];
        for (let i = 1; i <= Math.min(3, totalPages); i++) pages.push(i);
        if (totalPages > 4) {
            pages.push('...');
            pages.push(totalPages);
        } else if (totalPages === 4) pages.push(4);
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-1">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:border-[#1A2853]/30 hover:text-[#1A2853] transition-colors disabled:opacity-50"
            >
                <ChevronLeftIcon className="w-4 h-4" />
            </button>
            {renderPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageClick(page)}
                    disabled={page === '...'}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${page === currentPage ? 'bg-[#1A2853] text-white' : page === '...' ? 'text-gray-400' : 'border border-gray-200 text-gray-600 hover:border-[#1A2853]/30'
                        }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:border-[#1A2853]/30 hover:text-[#1A2853] transition-colors disabled:opacity-50"
            >
                <ChevronRightIcon className="w-4 h-4" />
            </button>
        </div>
    );
}
