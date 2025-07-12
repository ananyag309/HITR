import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const TagSelector = ({ tags, onChange, placeholder = "Add tags..." }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions] = useState([
    'JavaScript', 'React', 'Node.js', 'Python', 'HTML', 'CSS', 'MongoDB',
    'Express', 'JWT', 'API', 'Frontend', 'Backend', 'Database', 'Authentication',
    'TypeScript', 'Vue.js', 'Angular', 'Redux', 'GraphQL', 'Docker'
  ]);

  const addTag = (tagToAdd) => {
    const trimmedTag = tagToAdd.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      onChange([...tags, trimmedTag]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  ).slice(0, 5);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg min-h-[50px] bg-white">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:bg-purple-200 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] outline-none bg-transparent"
          disabled={tags.length >= 5}
        />
      </div>
      
      {inputValue && filteredSuggestions.length > 0 && (
        <div className="border border-gray-200 rounded-lg bg-white shadow-lg max-h-40 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => addTag(suggestion)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100 last:border-b-0"
            >
              <Plus className="w-4 h-4 text-gray-400" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      <p className="text-sm text-gray-500">
        Press Enter or comma to add tags. Maximum 5 tags allowed.
      </p>
    </div>
  );
};

export default TagSelector;
