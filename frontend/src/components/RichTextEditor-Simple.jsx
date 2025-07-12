import React from 'react';

const RichTextEditor = ({ value, onChange, placeholder = "Write your description..." }) => {
  return (
    <div className="rich-text-editor">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Simple toolbar */}
        <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => {
              // Simple bold toggle - basic implementation
              const textarea = document.querySelector('.rich-text-textarea');
              if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selectedText = value.substring(start, end);
                const newValue = value.substring(0, start) + `**${selectedText}**` + value.substring(end);
                onChange(newValue);
              }
            }}
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => {
              // Simple italic toggle
              const textarea = document.querySelector('.rich-text-textarea');
              if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selectedText = value.substring(start, end);
                const newValue = value.substring(0, start) + `*${selectedText}*` + value.substring(end);
                onChange(newValue);
              }
            }}
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => {
              onChange(value + '\n• ');
            }}
          >
            • List
          </button>
        </div>
        
        {/* Text area */}
        <textarea
          className="rich-text-textarea w-full p-4 min-h-[200px] resize-none outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      
      <div className="mt-2 text-sm text-gray-500">
        <p>Basic formatting: **bold**, *italic*, • for bullet points</p>
        <p className="text-xs mt-1">
          💡 Install react-quill for full rich text editor: <code>npm install react-quill quill</code>
        </p>
      </div>
    </div>
  );
};

export default RichTextEditor;
