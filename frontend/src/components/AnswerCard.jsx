import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Check, User, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import Cookies from 'js-cookie';

const AnswerCard = ({ answer, questionOwnerId, onAcceptAnswer, userCanAccept }) => {
  const [votes, setVotes] = useState({
    upvotes: answer.upvotes || 0,
    downvotes: answer.downvotes || 0
  });
  const [userVote, setUserVote] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get('token');
  const currentUserId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

  const handleVote = async (voteType) => {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/answers/${answer._id}/vote`, {
        action: voteType,
        userId: currentUserId
      });

      setVotes({
        upvotes: response.data.answer.upvotes,
        downvotes: response.data.answer.downvotes
      });
      
      setUserVote(voteType);
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptAnswer = async () => {
    if (!userCanAccept) return;
    
    try {
      await api.put(`/answers/${answer._id}/accept`);
      onAcceptAnswer(answer._id);
    } catch (error) {
      console.error('Error accepting answer:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border rounded-lg p-6 ${
        answer.status === 'accepted' ? 'border-green-300 bg-green-50' : 'border-gray-200'
      }`}
    >
      <div className="flex gap-4">
        {/* Voting Section */}
        <div className="flex flex-col items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote('upvote')}
            disabled={loading}
            className={`p-2 rounded-full transition-all ${
              userVote === 'upvote'
                ? 'bg-green-100 text-green-600'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
          
          <span className="text-lg font-semibold text-gray-700">
            {votes.upvotes - votes.downvotes}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote('downvote')}
            disabled={loading}
            className={`p-2 rounded-full transition-all ${
              userVote === 'downvote'
                ? 'bg-red-100 text-red-600'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>

          {/* Accept Answer Button */}
          {userCanAccept && answer.status !== 'accepted' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAcceptAnswer}
              className="p-2 rounded-full hover:bg-green-100 text-gray-400 hover:text-green-600 transition-all"
              title="Accept this answer"
            >
              <Check className="w-6 h-6" />
            </motion.button>
          )}

          {answer.status === 'accepted' && (
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <Check className="w-6 h-6" />
            </div>
          )}
        </div>

        {/* Answer Content */}
        <div className="flex-1">
          {answer.status === 'accepted' && (
            <div className="mb-3 flex items-center gap-2 text-green-600 text-sm font-medium">
              <Check className="w-4 h-4" />
              Accepted Answer
            </div>
          )}

          <div 
            className="prose prose-sm max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: answer.body }}
          />

          {/* Answer Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(answer.createdAt)}
              </span>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
              <User className="w-4 h-4 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900">
                  {answer.user?.username || 'Unknown User'}
                </div>
                <div className="text-xs text-blue-600">
                  {answer.user?.reputation || 0} reputation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnswerCard;
