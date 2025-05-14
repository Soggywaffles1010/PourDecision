// components/FilterColumn.tsx
'use client';
import React from 'react';
import GlassButton from './thbutton';

type FilterOption = {
  id: string;
  name: string;
  count: number; // The number of products available for this filter
};

type FilterColumnProps = {
  title: string;
  filters: FilterOption[];
  onApplyFilters: () => void;
};

const FilterColumn: React.FC<FilterColumnProps> = ({ title, filters, onApplyFilters }) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl backdrop-blur-md border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">{title}</div>
        <GlassButton text="Apply Filters" onClick={onApplyFilters} />
      </div>

      {/* Body Section (Filter Options) */}
      <div className="flex flex-col gap-2">
        {filters.map((filter) => (
          <div key={filter.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" id={filter.id} className="w-4 h-4" />
              <label htmlFor={filter.id} className="text-sm">{filter.name}</label>
            </div>
            <div className="text-sm text-gray-500">{filter.count} products</div>
          </div>
        ))}
      </div>

      {/* Tail Section (Optional, can add other functionality like Clear Filters) */}
      {/* You can add any extra functionality if needed */}
    </div>
  );
};

export default FilterColumn;
