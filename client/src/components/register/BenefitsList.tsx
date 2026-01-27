interface BenefitsListProps {
    title?: string;
    benefits: { icon: string; text: string }[];
}

export default function BenefitsList({
    title = 'Why Join Legal.mu?',
    benefits,
}: BenefitsListProps) {
    return (
        <div className="bg-white p-7 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-5">{title}</h3>
            <div className="space-y-4">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-blue-500">
                            {benefit.icon}
                        </div>
                        <span className="text-sm text-slate-600">{benefit.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
