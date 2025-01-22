import React from "react";

interface ProductFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const handleCheckboxChange = (category: string) => {
    onCategoryChange(category);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Filter by Category
      </label>
      <div className="mt-2 space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-1">
            <input
              type="checkbox"
              id={`category-${category}`}
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
              className="h-4 w-4 flex-none text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor={`category-${category}`}
              className="ml-2 block text-sm text-gray-700"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
