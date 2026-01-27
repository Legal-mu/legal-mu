'use client';

interface ProgressBarProps {
    currentStep: number;
    totalSteps?: number;
}

export default function ProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
    return (
        <div className="flex gap-2 mb-8">
            {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                    key={index}
                    className={`flex-1 h-1 rounded-full transition-colors ${index < currentStep ? 'bg-[#1E3A5F]' : 'bg-slate-200'
                        }`}
                />
            ))}
        </div>
    );
}
