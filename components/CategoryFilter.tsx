'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  showFavoritesOnly,
  onToggleFavorites,
}: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <button
        onClick={onToggleFavorites}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          showFavoritesOnly
            ? 'bg-red-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        <span>{showFavoritesOnly ? '❤️' : '🤍'}</span>
        <span>Favorites Only</span>
      </button>
    </div>
  );
}