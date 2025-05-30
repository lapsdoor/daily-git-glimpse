
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Code } from 'lucide-react';

interface FilterBarProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  timePeriod: string;
  onTimePeriodChange: (period: string) => void;
}

const popularLanguages = [
  { value: 'all', label: 'All Languages' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
];

const timePeriods = [
  { value: 'daily', label: 'Today' },
  { value: 'weekly', label: 'This Week' },
  { value: 'monthly', label: 'This Month' },
];

export function FilterBar({ selectedLanguage, onLanguageChange, timePeriod, onTimePeriodChange }: FilterBarProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-8 border border-gray-800">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-purple-400" />
          <span className="text-white font-medium">Language:</span>
        </div>
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {popularLanguages.map((lang) => (
              <SelectItem 
                key={lang.value} 
                value={lang.value}
                className="text-white hover:bg-gray-700"
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-green-400" />
          <span className="text-white font-medium">Period:</span>
        </div>
        <Select value={timePeriod} onValueChange={onTimePeriodChange}>
          <SelectTrigger className="w-full sm:w-40 bg-gray-800 border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {timePeriods.map((period) => (
              <SelectItem 
                key={period.value} 
                value={period.value}
                className="text-white hover:bg-gray-700"
              >
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
