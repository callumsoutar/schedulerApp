import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  value,
  onChange,
  placeholder = 'Search members...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedName, setSelectedName] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (search.length >= 2) {
        const { data, error } = await supabase
          .from('members')
          .select('id, name')
          .ilike('name', `%${search}%`)
          .limit(5);

        if (!error && data) {
          setResults(data);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      const fetchMember = async () => {
        const { data } = await supabase
          .from('members')
          .select('name')
          .eq('id', value)
          .single();
        
        if (data) {
          setSelectedName(data.name);
        }
      };
      fetchMember();
    }
  }, [value]);

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        {value ? (
          <div className="flex items-center justify-between p-2 border rounded-lg bg-white">
            <span>{selectedName}</span>
            <button
              type="button"
              onClick={() => {
                onChange('');
                setSelectedName('');
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsOpen(true)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {results.map((result) => (
            <button
              key={result.id}
              type="button"
              className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              onClick={() => {
                onChange(result.id);
                setSelectedName(result.name);
                setIsOpen(false);
                setSearch('');
              }}
            >
              {result.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;