import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';

interface QuickFiltersProps {
  activeFilters: string[];
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'rating4', label: 'Rating 4.0+', icon: '⭐' },
  { id: 'pure-veg', label: 'Pure Veg', icon: '🥬' },
  { id: 'offers', label: 'Offers', icon: '🏷️' },
  { id: 'fast-delivery', label: 'Fast Delivery', icon: '⚡' },
  { id: 'vitamin-d', label: 'Vitamin D', icon: '☀️' },
  { id: 'omega-3', label: 'Omega-3', icon: '🐟' },
  { id: 'high-protein', label: 'High Protein', icon: '💪' },
  { id: 'low-calorie', label: 'Low Calorie', icon: '🔥' },
];

const sortOptions = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'rating', label: 'Rating' },
  { id: 'delivery-time', label: 'Delivery Time' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
];

const QuickFilters = ({ activeFilters, onFilterChange }: QuickFiltersProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {/* Sort Dropdown */}
      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors shrink-0">
        <span className="text-sm font-medium">Sort</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {/* Filters */}
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg border transition-all shrink-0",
            activeFilters.includes(filter.id)
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card hover:bg-secondary/50"
          )}
        >
          <span>{filter.icon}</span>
          <span className="text-sm font-medium whitespace-nowrap">{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickFilters;
