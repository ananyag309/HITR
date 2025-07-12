import { useState } from "react";
import { X, FileText, Tag as TagIcon } from "lucide-react";
import Cookies from "js-cookie";
import api from "../lib/api";
import RichTextEditor from "./RichTextEditor";
import TagSelector from "./TagSelector";
import { motion } from "framer-motion";

const CreateQuestionForm = ({ onClose, onQuestionCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Authentication token is missing.");

      // Validation
      if (!formData.title.trim() || formData.title.length < 5) {
        throw new Error("Title must be at least 5 characters long.");
      }
      if (!formData.body.trim() || formData.body.length < 20) {
        throw new Error("Description must be at least 20 characters long.");
      }
      if (formData.tags.length === 0) {
        throw new Error("At least one tag is required.");
      }

      const response = await api.post("/questions/create", formData);
      const data = response.data;
      onQuestionCreated(data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-600" />
            Ask a Question
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
            >
              {error}
            </motion.div>
          )}

          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Question Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., How to implement authentication in React?"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              maxLength={100}
              required
            />
            <p className="text-sm text-gray-500">
              {formData.title.length}/100 characters
            </p>
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Detailed Description *
            </label>
            <RichTextEditor
              value={formData.body}
              onChange={(value) => setFormData({ ...formData, body: value })}
              placeholder="Provide a detailed description of your question. Include code examples, error messages, or any relevant context..."
            />
            <p className="text-sm text-gray-500">
              Use the formatting tools above to make your question clear and easy to read.
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <TagIcon className="w-4 h-4" />
              Tags *
            </label>
            <TagSelector
              tags={formData.tags}
              onChange={(tags) => setFormData({ ...formData, tags })}
              placeholder="Start typing to add tags (e.g., React, JavaScript, API)..."
            />
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Writing Guidelines</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Be specific and provide context</li>
              <li>• Include relevant code snippets or error messages</li>
              <li>• Use appropriate tags to help others find your question</li>
              <li>• Search for similar questions before posting</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Question"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateQuestionForm;
