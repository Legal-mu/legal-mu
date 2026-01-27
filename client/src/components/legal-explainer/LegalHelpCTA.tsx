import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function LegalHelpCTA() {
    return (
        <section className="max-w-[1440px] mx-auto mt-32 px-4 sm:px-8 lg:px-12 pb-32">
            <div className="bg-white rounded-[40px] p-12 md:p-16 lg:p-20 shadow-sm border border-gray-50 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-[700px]">
                    <h2 className="text-[40px] md:text-[48px] font-bold text-[#1A2853] mb-6 leading-[110%]">
                        Need Professional Legal Help?
                    </h2>
                    <p className="text-[18px] md:text-[20px] leading-[160%] text-[#64748B] font-medium">
                        Our Legal Information Hub provides the foundation for personalized representation and advice, connect with verified specialists in our lawyer's directory.
                    </p>
                </div>

                <button className="flex-shrink-0 bg-[#1A2853] text-white px-10 py-5 rounded-2xl flex items-center gap-4 group hover:bg-[#1A2853]/90 transition-all shadow-xl">
                    <span className="text-[18px] font-bold">Find a Lawyer</span>
                    <ArrowRightIcon className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </button>
            </div>

        </section>
    );
}
