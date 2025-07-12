import React from "react";
import { MessageCircle, ThumbsUp, Eye, Clock, User, Tag } from "lucide-react";

export const QuestionCard = React.forwardRef(({ question }, ref) => {
  // Function to render rich text content
  const renderContent = (content) => {
    if (!content) return '';
    
    // If content has HTML tags, render as HTML
    if (content.includes('<') && content.includes('>')) {
      return (
        <div 
          className="prose prose-sm prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    
    // Otherwise, convert markdown-style formatting to HTML
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded" />')
      .replace(/\n• /g, '<br/>• ')
      .replace(/\n\d+\. /g, '<br/>1. ');
    
    return (
      <div 
        className="prose prose-sm prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    );
  };

  return (
    <div
      ref={ref}
      className="bg-[#1a1f2e] rounded-xl border border-gray-700/20 hover:border-indigo-400/30
                 transform transition-all duration-200 hover:shadow-lg hover:shadow-indigo-400/5
                 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-700/20">
        <div className="flex items-start justify-between">
          <h3
            className="text-xl font-medium text-gray-100 hover:text-indigo-300
                       transition-colors duration-200 cursor-pointer flex-1"
            onClick={() => (window.location.href = `/questions/${question._id}`)}
          >
            {question.title}
          </h3>
          <div className="flex items-center gap-4 ml-4">
            <div className="flex items-center gap-1 text-gray-400">
              <Eye size={16} />
              <span>{question.views || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Clock size={16} />
              <span>{new Date(question.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Question Body with Rich Text Support */}
        <div className="mt-3 text-gray-300 text-sm line-clamp-3">
          {renderContent(question.body)}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {question.tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-900/30 text-indigo-300 
                         rounded-md text-xs font-medium border border-indigo-700/30"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Question Stats */}
      <div className="px-6 py-4 bg-gray-800/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-400">
              <MessageCircle size={16} />
              <span>{question.answerCount || 0} answers</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <ThumbsUp size={16} />
              <span>{question.votes || 0} votes</span>
            </div>
          </div>
          
          {/* Author Info */}
          <div className="flex items-center gap-2 text-gray-400">
            <User size={16} />
            <span>{question.user?.username || 'Anonymous'}</span>
            <span className="text-xs">({question.user?.reputation || 0} rep)</span>
          </div>
        </div>
      </div>
    </div>
  );
});

QuestionCard.displayName = "QuestionCard";

export default QuestionCard;
