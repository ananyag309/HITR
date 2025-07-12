import React from 'react';

// Try to import react-quill, fallback to simple editor if not available
let ReactQuill;
let quillAvailable = false;

try {
  ReactQuill = require('react-quill').default;
  require('react-quill/dist/quill.snow.css');
  quillAvailable = true;
} catch (error) {
  console.log('React Quill not available, using simple editor');
  quillAvailable = false;
}

const RichTextEditor = ({ value, onChange, placeholder = "Write your description..." }) => {
  // If react-quill is available, use it
  if (quillAvailable && ReactQuill) {
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ],
    };

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike',
      'list', 'bullet',
      'align',
      'link', 'image'
    ];

    return (
      <div className="rich-text-editor">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            minHeight: '200px'
          }}
        />
        <style jsx global>{`
          .ql-toolbar {
            border-top-left-radius: 8px !important;
            border-top-right-radius: 8px !important;
            border-bottom: 1px solid #e5e7eb;
          }
          .ql-container {
            border-bottom-left-radius: 8px !important;
            border-bottom-right-radius: 8px !important;
            min-height: 150px;
          }
          .ql-editor {
            min-height: 150px;
            font-size: 14px;
            line-height: 1.6;
          }
          .ql-editor.ql-blank::before {
            font-style: normal;
            color: #9ca3af;
          }
        `}</style>
      </div>
    );
  }

  // Fallback simple editor
  return (
    <div className="rich-text-editor">
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        {/* Simple toolbar */}
        <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
          <button
            type="button"
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
            onClick={() => {
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
            B
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 italic"
            onClick={() => {
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
            I
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => {
              onChange(value + '\n• ');
            }}
          >
            • List
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => {
              onChange(value + '\n1. ');
            }}
          >
            1. List
          </button>
        </div>
        
        {/* Text area */}
        <textarea
          className="rich-text-textarea w-full p-4 min-h-[200px] resize-none outline-none text-gray-900"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      
      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Simple Editor Mode:</strong> Use **bold**, *italic*, • for bullets, 1. for numbered lists
        </p>
        <p className="text-xs text-blue-600 mt-1">
          💡 For full rich text editor, install dependencies: <code className="bg-blue-100 px-1 rounded">npm install react-quill quill</code>
        </p>
      </div>
    </div>
  );
};

export default RichTextEditor;
