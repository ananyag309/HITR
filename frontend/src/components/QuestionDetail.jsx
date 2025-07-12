import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MessageCircle, Award, ChevronUp, ChevronDown, Calendar, 
  User, Tag, ArrowLeft, CheckCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import api from '../lib/api';
import Navbar from './shared/Navbar';
import AnswerForm from './AnswerForm';
import AnswerCard from './AnswerCard';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const [questionVotes, setQuestionVotes] = useState(0);

  const token = Cookies.get('token');
  const currentUserId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

  useEffect(() => {
    if (id) {
      fetchQuestionDetail();
    }
  }, [id]);

  const fetchQuestionDetail = async () => {
    try {
      setLoading(true);
      
      // Fetch question details and answers
      const response = await api.get(`/questions/${id}/user-answers`);
      const data = response.data;

      if (data.question) {
        setQuestion(data.question);
        setQuestionVotes(data.question.votes || 0);
      }
      
      if (data.answers) {
        setAnswers(data.answers);
      }
    } catch (err) {
      console.error('Error fetching question:', err);
      setError(err.response?.data?.error || 'Failed to load question');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionVote = async (voteType) => {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const response = await api.post(`/questions/${id}/vote`, {
        voteType,
        userId: currentUserId
      });

      setQuestionVotes(response.data.votes);
      setUserVote(voteType);
    } catch (error) {
      console.error('Error voting on question:', error);
    }
  };

  const handleAnswerSubmitted = (newAnswer) => {
    setAnswers(prev => [newAnswer, ...prev]);
    fetchQuestionDetail(); // Refresh to get updated data
  };

  const handleAcceptAnswer = (answerId) => {
    setAnswers(prev => 
      prev.map(answer => ({
        ...answer,
        status: answer._id === answerId ? 'accepted' : 'pending'
      }))
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg font-medium">{error}</div>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Question not found</div>
          </div>
        </div>
      </div>
    );
  }

  const userCanAccept = currentUserId === question.questionAuthor?.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Questions
        </motion.button>

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-6 mb-6"
        >
          <div className="flex gap-6">
            {/* Question Voting */}
            <div className="flex flex-col items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuestionVote('up')}
                className={`p-2 rounded-full transition-all ${
                  userVote === 'up'
                    ? 'bg-green-100 text-green-600'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <ChevronUp className="w-6 h-6" />
              </motion.button>
              
              <span className="text-lg font-semibold text-gray-700">
                {questionVotes}
              </span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuestionVote('down')}
                className={`p-2 rounded-full transition-all ${
                  userVote === 'down'
                    ? 'bg-red-100 text-red-600'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Question Content */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {question.title}
              </h1>

              <div 
                className="prose prose-sm max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: question.body }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Question Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Asked {formatDate(question.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {answers.length} answers
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">
                      {question.questionAuthor?.username || 'Unknown User'}
                    </div>
                    <div className="text-xs text-blue-600">
                      {question.questionAuthor?.reputation || 0} reputation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Answers Section */}
        <div className="space-y-6">
          {/* Answers Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {answers.length} Answer{answers.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {/* Answers List */}
          {answers.length > 0 ? (
            <div className="space-y-4">
              {answers
                .sort((a, b) => {
                  // Show accepted answer first
                  if (a.status === 'accepted' && b.status !== 'accepted') return -1;
                  if (b.status === 'accepted' && a.status !== 'accepted') return 1;
                  // Then sort by vote count
                  return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
                })
                .map((answer) => (
                  <AnswerCard
                    key={answer._id}
                    answer={answer}
                    questionOwnerId={question.questionAuthor?.id}
                    onAcceptAnswer={handleAcceptAnswer}
                    userCanAccept={userCanAccept}
                  />
                ))
              }
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No answers yet. Be the first to help!</p>
            </div>
          )}

          {/* Answer Form */}
          <AnswerForm
            questionId={id}
            onAnswerSubmitted={handleAnswerSubmitted}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
