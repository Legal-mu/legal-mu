interface FeatureCardProps {
    icon: 'shield' | 'dollar';
    title: string;
    description: React.ReactNode;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-white pt-[18px] pr-[28px] pb-[18px] pl-[28px] rounded-[30px] flex gap-[21px] items-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-[626px] h-[127px]">
            <div className="w-[77px] h-[85px] bg-[#F1F5F9] rounded-[15px] flex items-center justify-center flex-shrink-0 p-[15px]">
                {icon === 'shield' && (
                    <svg width="40" height="48" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                    </svg>
                )}
                {icon === 'dollar' && (
                    <svg width="40" height="48" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                )}
            </div>
            <div>
                <h3 className="text-[20px] font-bold text-[#0F172A] mb-0.5">{title}</h3>
                <p className="text-[12px] text-[#000000] leading-[160%] font-light">{description}</p>
            </div>
        </div>
    );
}
