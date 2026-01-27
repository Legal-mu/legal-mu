interface FormSelectProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}

export default function FormSelect({
    label,
    name,
    options,
    placeholder = 'Select...',
    value,
    onChange,
    required = false,
}: FormSelectProps) {
    return (
        <div className="mb-5">
            <label htmlFor={name} className="block text-[14px] font-bold text-[#0F172A] mb-2">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-[14px] text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-white appearance-none cursor-pointer"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center'
                }}
            >
                <option value="" disabled className="text-[#94A3B8]">
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
