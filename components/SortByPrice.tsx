'use client';

export type SortOption = 'none' | 'price-asc' | 'price-desc';

interface SortByPriceProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortByPrice({ value, onChange }: SortByPriceProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort by:
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="none">Default</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
      </select>
    </div>
  );
}
