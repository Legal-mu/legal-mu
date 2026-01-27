interface TestimonialPanelProps {
    rating?: number;
    quote: string;
    authorName: string;
    authorTitle: string;
    authorAvatar?: string;
}

export default function TestimonialPanel({
    rating = 3,
    quote,
    authorName,
    authorTitle,
}: TestimonialPanelProps) {
    return (
        <div className="bg-white p-7 rounded-2xl shadow-sm">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className={i < rating ? 'text-[#1E3A5F]' : 'text-slate-300'}>
                        ★
                    </span>
                ))}
            </div>

            {/* Quote */}
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
                "{quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                    👤
                </div>
                <div>
                    <div className="text-sm font-semibold text-slate-800">{authorName}</div>
                    <div className="text-xs text-slate-500">{authorTitle}</div>
                </div>
            </div>
        </div>
    );
}
