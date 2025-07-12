import React from 'react';

// Try to import react-quill, fallback to enhanced simple editor if not available
let ReactQuill;
let quillAvailable = false;

try {
  ReactQuill = require('react-quill').default;
  require('react-quill/dist/quill.snow.css');
  quillAvailable = true;
} catch (error) {
  console.log('React Quill not available, using enhanced editor');
  quillAvailable = false;
}

const RichTextEditor = ({ value, onChange, placeholder = "Write your description..." }) => {
  // If react-quill is available, use it with full features
  if (quillAvailable && ReactQuill) {
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['blockquote', 'code-block'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ],
    };

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike',
      'list', 'bullet',
      'align',
      'link', 'image',
      'blockquote', 'code-block',
      'color', 'background'
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

  // Enhanced fallback editor with all requested features
  return (
    <div className="rich-text-editor">
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        {/* Enhanced toolbar */}
        <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
          {/* Text formatting */}
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
            onClick={() => insertFormatting('**', '**')}
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 italic"
            onClick={() => insertFormatting('*', '*')}
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => insertFormatting('~~', '~~')}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
          
          <div className="border-l border-gray-300 mx-1"></div>
          
          {/* Lists */}
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => insertText('\n• ')}
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => insertText('\n1. ')}
            title="Numbered List"
          >
            1. List
          </button>
          
          <div className="border-l border-gray-300 mx-1"></div>
          
          {/* Alignment */}
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => insertText('\n<p style="text-align: left;">')}
            title="Align Left"
          >
            ← Left
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => insertText('\n<p style="text-align: center;">')}
            title="Align Center"
          >
            ↔ Center
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => insertText('\n<p style="text-align: right;">')}
            title="Align Right"
          >
            → Right
          </button>
          
          <div className="border-l border-gray-300 mx-1"></div>
          
          {/* Links and Images */}
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={insertLink}
            title="Insert Link"
          >
            🔗 Link
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={insertImage}
            title="Insert Image"
          >
            🖼️ Image
          </button>
          
          <div className="border-l border-gray-300 mx-1"></div>
          
          {/* Emoji */}
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => insertText('😊')}
            title="Insert Emoji"
          >
            😊
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => insertText('👍')}
            title="Insert Emoji"
          >
            👍
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => insertText('💡')}
            title="Insert Emoji"
          >
            💡
          </button>
        </div>
        
        {/* Text area */}
        <textarea
          ref={(textarea) => {
            if (textarea) {
              // Store textarea reference for formatting functions
              window.currentTextarea = textarea;
            }
          }}
          className="rich-text-textarea w-full p-4 min-h-[200px] resize-none outline-none text-gray-900"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      

    </div>
  );

  function insertFormatting(start, end) {
    const textarea = window.currentTextarea;
    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const selectedText = value.substring(startPos, endPos);
      const newValue = value.substring(0, startPos) + start + selectedText + end + value.substring(endPos);
      onChange(newValue);
      
      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(startPos + start.length, endPos + start.length);
      }, 0);
    }
  }

  function insertText(text) {
    const textarea = window.currentTextarea;
    if (textarea) {
      const startPos = textarea.selectionStart;
      const newValue = value.substring(0, startPos) + text + value.substring(startPos);
      onChange(newValue);
      
      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(startPos + text.length, startPos + text.length);
      }, 0);
    }
  }

  function insertLink() {
    const url = prompt('Enter URL:');
    const text = prompt('Enter link text:');
    if (url && text) {
      insertText(`[${text}](${url})`);
    }
  }

  function insertImage() {
    const url = prompt('Enter image URL:');
    const alt = prompt('Enter image description:');
    if (url) {
      insertText(`![${alt || 'Image'}](${url})`);
    }
  }
};

export default RichTextEditor;
