import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Calendar, Award, MessageCircle, 
  ThumbsUp, CheckCircle, Edit, Settings 
} from 'lucide-react';
import Navbar from './shared/Navbar';
import api from '../lib/api';
import Cookies from 'js-cookie';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userQuestions, setUserQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState(null);

  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      window.location.href = '/login';
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/user');
      
      if (response.data) {
        setUser(response.data.user);
        setUserQuestions(response.data.questions || []);
        setUserAnswers(response.data.answers || []);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = (content) => {
    if (!content) return '';
    
    // Strip HTML and markdown for preview
    let text = content
      .replace(/<[^>]*>/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/~~(.*?)~~/g, '$1');
    
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
        >
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {user?.username || 'Unknown User'}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {formatDate(user?.createdAt || user?.dateJoined)}</span>
                    </div>
                  </div>
                  
                  {/* Reputation */}
                  <div className="flex items-center gap-1 text-purple-600">
                    <Award className="w-5 h-5" />
                    <span className="text-lg font-semibold">{user?.reputation || 0}</span>
                    <span className="text-sm">reputation</span>
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userQuestions.length}</div>
                <div className="text-gray-600">Questions Asked</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userAnswers.length}</div>
                <div className="text-gray-600">Answers Given</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {userAnswers.filter(answer => answer.status === 'accepted').length}
                </div>
                <div className="text-gray-600">Accepted Answers</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'questions', label: 'Questions' },
                { id: 'answers', label: 'Answers' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {/* Recent Questions */}
                    {userQuestions.slice(0, 3).map(question => (
                      <div key={question._id} className="border-l-4 border-blue-400 pl-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MessageCircle className="w-4 h-4" />
                          <span>Asked a question</span>
                          <span>{formatDate(question.createdAt)}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mt-1">
                          <a href={`/questions/${question._id}`} className="hover:text-purple-600">
                            {question.title}
                          </a>
                        </h4>
                      </div>
                    ))}
                    
                    {/* Recent Answers */}
                    {userAnswers.slice(0, 3).map(answer => (
                      <div key={answer._id} className="border-l-4 border-green-400 pl-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Answered a question</span>
                          <span>{formatDate(answer.createdAt)}</span>
                          {answer.status === 'accepted' && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              Accepted
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mt-1">
                          {renderContent(answer.body)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-4">
                {userQuestions.length > 0 ? (
                  userQuestions.map(question => (
                    <div key={question._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-2">
                            <a href={`/questions/${question._id}`} className="hover:text-purple-600">
                              {question.title}
                            </a>
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {renderContent(question.body)}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{formatDate(question.createdAt)}</span>
                            <span>{question.votes || 0} votes</span>
                            <span>{question.answerCount || 0} answers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No questions asked yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'answers' && (
              <div className="space-y-4">
                {userAnswers.length > 0 ? (
                  userAnswers.map(answer => (
                    <div key={answer._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {answer.status === 'accepted' && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Accepted
                              </span>
                            )}
                            <span className="text-sm text-gray-500">
                              Answer to: <a href={`/questions/${answer.question?._id}`} className="text-purple-600 hover:underline">
                                {answer.question?.title || 'Unknown Question'}
                              </a>
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">
                            {renderContent(answer.body)}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{formatDate(answer.createdAt)}</span>
                            <span>{answer.upvotes || 0} upvotes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ThumbsUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No answers given yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
