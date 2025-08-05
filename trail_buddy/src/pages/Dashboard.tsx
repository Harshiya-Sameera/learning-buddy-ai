import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  BookOpen,
  Trophy,
  MessageCircle,
  TrendingUp,
  Target,
  Star,
  Flame
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, quizAttempts, learningProgress } = useAuth();

  const stats = [
    {
      icon: Trophy,
      label: 'Quizzes Completed',
      value: learningProgress.totalQuizzesCompleted,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      trend: learningProgress.totalQuizzesCompleted > 0 ? '+' + learningProgress.totalQuizzesCompleted : ''
    },
    {
      icon: Target,
      label: 'Average Score',
      value: `${learningProgress.averageScore}%`,
      color: 'text-green-600',
      bg: 'bg-green-100',
      trend: learningProgress.averageScore >= 80 ? 'Excellent!' : learningProgress.averageScore >= 60 ? 'Good' : ''
    },
    {
      icon: Flame,
      label: 'Learning Streak',
      value: `${learningProgress.streak} days`,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      trend: learningProgress.streak > 0 ? '🔥' : ''
    }
  ];

  const recentQuizzes = quizAttempts.slice(-3).reverse();
  const weeklyGoal = 5;
  const weeklyProgress = Math.min(learningProgress.totalQuizzesCompleted, weeklyGoal);
  const weeklyPercentage = (weeklyProgress / weeklyGoal) * 100;

  return (
    <div
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url('/dash-image.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-white">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-white/90 mt-2">
            {learningProgress.totalQuizzesCompleted === 0
              ? "Ready to start your learning journey?"
              : `You've completed ${learningProgress.totalQuizzesCompleted} quiz${learningProgress.totalQuizzesCompleted === 1 ? '' : 'es'}! Keep up the great work!`}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/30 rounded-xl p-6 border border-gray-200 shadow hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                  {stat.trend && (
                    <div className="text-right text-sm font-medium text-green-600">{stat.trend}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white/40 rounded-xl border border-gray-200 shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Quiz Results</h2>
            </div>
            <div className="p-6">
              {recentQuizzes.length > 0 ? (
                <div className="space-y-4">
                  {recentQuizzes.map((attempt, index) => {
                    const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
                    const getScoreColor = (score: number) => {
                      if (score >= 80) return 'text-green-600';
                      if (score >= 60) return 'text-yellow-600';
                      return 'text-red-600';
                    };

                    return (
                      <div key={index} className="flex justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex items-center space-x-3">
                          <Trophy className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">Quiz #{attempt.quizId}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(attempt.completedAt).toLocaleDateString()} at {new Date(attempt.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-semibold ${getScoreColor(percentage)}`}>
                            {percentage}%
                          </div>
                          <p className="text-sm text-gray-500">{attempt.score}/{attempt.totalQuestions} correct</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-700">
                  <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No quizzes completed yet</h3>
                  <p className="mb-4">Start taking quizzes to track your progress here</p>
                  <Link
                    to="/quiz"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    Take Your First Quiz
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions and Progress */}
          <div className="space-y-6">
            <div className="bg-white/40 rounded-xl p-6 border border-gray-200 shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Link
                  to="/quiz"
                  className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  <Trophy className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Take a Quiz</p>
                    <p className="text-sm text-gray-600">Test your knowledge</p>
                  </div>
                </Link>
                <Link
                  to="/chat"
                  className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                >
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">AI Chat</p>
                    <p className="text-sm text-gray-600">Get instant help</p>
                  </div>
                </Link>
                <Link
                  to="/recommendations"
                  className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                >
                  <BookOpen className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Browse Resources</p>
                    <p className="text-sm text-gray-600">Explore content</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white/40 rounded-xl p-6 border border-gray-200 shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Weekly Goal</span>
                  <span>{weeklyProgress}/{weeklyGoal} quizzes</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${weeklyPercentage}%` }}
                  ></div>
                </div>
              </div>

              {learningProgress.strongAreas.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-green-600 flex items-center mb-2">
                    <Star className="h-4 w-4 mr-1" /> Strong Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {learningProgress.strongAreas.map((area, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {learningProgress.weakAreas.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-yellow-600 flex items-center mb-2">
                    <Target className="h-4 w-4 mr-1" /> Areas to Improve
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {learningProgress.weakAreas.map((area, idx) => (
                      <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {learningProgress.streak > 0 && (
                <div className="mt-4 flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-medium text-orange-800">
                    {learningProgress.streak} day learning streak! 🔥
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
