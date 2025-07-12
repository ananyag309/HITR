import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import Cookies from "js-cookie";
import {
  ArrowRight,
  Star,
  Users,
  Clock,
  Code,
  ChevronRight,
  Search,
  ExternalLink,
  MessageCircle,
  ThumbsUp,
  Tag
} from "lucide-react";
import { Avatar } from "./ui/avatar";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    fetchRecentQuestions();
  }, []);

  const fetchRecentQuestions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/questions`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.slice(0, 5)); // Show only recent 5
      }
    } catch (error) {
      console.log('Could not fetch questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const BackgroundDots = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
        }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-purple-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );

  const renderQuestionContent = (content) => {
    if (!content) return '';
    
    // Strip HTML and markdown for preview
    let text = content
      .replace(/<[^>]*>/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/~~(.*?)~~/g, '$1');
    
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <BackgroundDots />
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Welcome to StackIt
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Where developers collaborate, learn, and grow together. Ask
                questions, share knowledge, and build amazing things.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {!token ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/signup'}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                  >
                    Get Started
                    <ArrowRight size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/questions'}
                    className="px-8 py-4 border border-purple-400 text-purple-300 rounded-full font-semibold hover:bg-purple-400/10 transition-all"
                  >
                    Explore Questions
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/questions'}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                  >
                    Browse Questions
                    <Search size={20} />
                  </motion.button>
                </>
              )}
            </motion.div>

            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="mt-8 text-gray-400"
            >
              <a 
                href="https://github.com/ananyag309/HITR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors inline-flex items-center gap-2"
              >
                <ExternalLink size={16} />
                Learn more about StackIt on GitHub
              </a>
            </motion.p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-black/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Why Choose StackIt?</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Built by developers, for developers. Experience the next generation of collaborative coding.
              </p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <MessageCircle size={40} />,
                  title: "Rich Q&A System",
                  description: "Ask detailed questions with rich text formatting, code highlighting, and image support."
                },
                {
                  icon: <Users size={40} />,
                  title: "Community Driven",
                  description: "Vote on answers, accept solutions, and build reputation in our supportive developer community."
                },
                {
                  icon: <Code size={40} />,
                  title: "Real-time Collaboration",
                  description: "Get instant notifications, collaborate on solutions, and learn from experienced developers."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all group"
                >
                  <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Recent Questions Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="text-4xl font-bold mb-4">Recent Questions</h2>
                <p className="text-gray-300">
                  See what the community is discussing right now
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.location.href = '/questions'}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                View All
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : questions.length > 0 ? (
                questions.map((question, index) => (
                  <motion.div
                    key={question._id}
                    variants={fadeInUp}
                    onClick={() => window.location.href = `/questions/${question._id}`}
                    className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                          {question.title}
                        </h3>
                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {renderQuestionContent(question.body)}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {question.tags?.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-purple-900/30 text-purple-300 rounded-md text-sm"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                          {question.tags?.length > 3 && (
                            <span className="text-gray-400 text-sm">
                              +{question.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-400 ml-6">
                        <div className="flex items-center gap-1">
                          <ThumbsUp size={16} />
                          <span>{question.votes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle size={16} />
                          <span>{question.answerCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          <span>{question.user?.username || 'Anonymous'}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                  <h3 className="text-xl font-semibold mb-2">No questions yet</h3>
                  <p className="text-gray-400 mb-6">Be the first to ask a question in our community!</p>
                  {!token && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => window.location.href = '/signup'}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold"
                    >
                      Get Started
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Team Banner Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border-t border-purple-500/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              {...fadeInUp}
              className="bg-black/50 border border-purple-500/50 rounded-2xl p-12 backdrop-blur-md shadow-2xl shadow-purple-500/10"
            >
              <motion.h2 
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 40px rgba(168, 85, 247, 0.3)",
                    "0 0 20px rgba(168, 85, 247, 0.5)"
                  ]
                }}
                transition={{
                  textShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                TEAM NAME - 4118
              </motion.h2>
              <motion.p 
                className="text-2xl text-gray-300 mb-8 font-semibold tracking-wider"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                🚀 ODOO HACKATHON 2025 🚀
              </motion.p>
              
              {/* Decorative elements */}
              <div className="flex justify-center items-center space-x-8 mt-8">
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  animate={{ scaleX: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="w-4 h-4 bg-purple-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  animate={{ scaleX: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
