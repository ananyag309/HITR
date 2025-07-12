import React, { useState } from 'react';
import { Send, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import RichTextEditor from './RichTextEditor';
import Cookies from 'js-cookie';

const AnswerForm = ({ questionId, onAnswerSubmitted }) => {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = Cookies.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim() || answer.length < 10) {
      setError('Answer must be at least 10 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/answers/create', {
        questionId,
        body: answer
      });

      setAnswer('');
      onAnswerSubmitted(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <Edit3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600 mb-4">You need to be logged in to post an answer.</p>
        <button
          onClick={() => window.location.href = '/login'}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Edit3 className="w-5 h-5 text-purple-600" />
        Your Answer
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div>
          <RichTextEditor
            value={answer}
            onChange={setAnswer}
            placeholder="Share your knowledge! Provide a detailed answer with examples, code snippets, or explanations..."
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Make sure your answer is helpful and adds value to the discussion.
          </p>
          
          <motion.button
            type="submit"
            disabled={loading || !answer.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Post Answer
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AnswerForm;
