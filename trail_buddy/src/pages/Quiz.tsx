import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockQuizzes } from '../data/mockData';
import { Quiz as QuizType, QuizAttempt } from '../types';
import {
  Trophy, Clock, ArrowRight, CheckCircle, XCircle,
  Search, Filter, Star, Award
} from 'lucide-react';

const Quiz: React.FC = () => {
  const { user, addQuizAttempt } = useAuth();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const navigate = useNavigate();

  const categories = ['all', ...Array.from(new Set(mockQuizzes.map(q => q.category)))];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredQuizzes = mockQuizzes.filter(quiz => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleQuizSelect = (quiz: QuizType) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < selectedQuiz!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      let correct = 0;
      selectedQuiz!.questions.forEach((q, i) => {
        if (answers[i] === q.correctAnswer) correct++;
      });
      setScore(correct);

      if (user) {
        const attempt: QuizAttempt = {
          id: Date.now().toString(),
          quizId: selectedQuiz!.id,
          userId: user.id,
          score: correct,
          totalQuestions: selectedQuiz!.questions.length,
          completedAt: new Date().toISOString(),
          answers
        };
        addQuizAttempt(attempt);
      }
      setShowResults(true);
    }
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return { message: "Outstanding! 🌟", color: "text-green-600", icon: Award };
    if (percentage >= 80) return { message: "Excellent work! 🎉", color: "text-green-600", icon: Star };
    if (percentage >= 70) return { message: "Good job! 👍", color: "text-blue-600", icon: Trophy };
    if (percentage >= 60) return { message: "Not bad! Keep practicing 📚", color: "text-yellow-600", icon: Trophy };
    return { message: "Keep studying! You'll improve 💪", color: "text-orange-600", icon: Trophy };
  };

  if (showResults && selectedQuiz) {
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
    const scoreInfo = getScoreMessage(percentage);
    const ScoreIcon = scoreInfo.icon;

    return (
      <div className="min-h-screen bg-cover bg-center relative py-8" style={{ backgroundImage: `url('/dash-image.jpg')` }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <ScoreIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
              <p className="text-gray-600">Here's how you performed on {selectedQuiz.title}</p>
              <div className={`mt-4 text-lg font-semibold ${scoreInfo.color}`}>
                {scoreInfo.message}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-blue-800">Correct Answers</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-gray-600">{selectedQuiz.questions.length}</div>
                <div className="text-sm text-gray-800">Total Questions</div>
              </div>
              <div className={`rounded-lg p-6 text-center ${percentage >= 80 ? 'bg-green-50' : percentage >= 60 ? 'bg-yellow-50' : 'bg-red-50'}`}>
                <div className={`text-3xl font-bold ${percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {percentage}%
                </div>
                <div className={`text-sm ${percentage >= 80 ? 'text-green-800' : percentage >= 60 ? 'text-yellow-800' : 'text-red-800'}`}>
                  Score
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <button onClick={handleBackToQuizzes} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Take Another Quiz
              </button>
              <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-cover bg-center relative py-8" style={{ backgroundImage: `url('/dash-image.jpg')` }}>
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="bg-white/40 rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{selectedQuiz.title}</h1>
                  <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {selectedQuiz.questions.length}</p>
                </div>
                <button onClick={handleBackToQuizzes} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">{question.question}</h2>
              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${answers[currentQuestion] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${answers[currentQuestion] === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                        {answers[currentQuestion] === index && <div className="w-full h-full rounded-full bg-white/40 scale-50"></div>}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={handleBackToQuizzes} className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">
                  Back to Quizzes
                </button>
                <button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === undefined}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {currentQuestion === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  <ArrowRight className="inline ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative py-8" style={{ backgroundImage: `url('/dash-image.jpg')` }}>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Quizzes</h1>
          <p className="text-gray-600 mt-2">Test your knowledge and track your progress</p>
        </div>

        <div className="bg-white/40 rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Search & Filter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search quizzes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff === 'all' ? 'All Levels' : diff}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white/40 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
                <span className="text-sm text-gray-500">{quiz.category}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
              <p className="text-gray-600 mb-4">{quiz.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{quiz.questions.length} questions</span>
              </div>
              <button
                onClick={() => handleQuizSelect(quiz)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
              >
                <Trophy className="inline mr-2 h-4 w-4" />
                Start Quiz
              </button>
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12 text-gray-600">No quizzes found. Adjust your filters or search keywords.</div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
