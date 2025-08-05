import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Trophy, BookOpen, BarChart3, Plus, Edit, Trash2, Sparkles, Zap, Star, Code } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '1,234',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Trophy,
      label: 'Active Quizzes',
      value: '45',
      color: 'text-green-600',
      bg: 'bg-green-100',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: BookOpen,
      label: 'Learning Resources',
      value: '234',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart3,
      label: 'Quiz Completions',
      value: '5,678',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Quiz',
      description: 'Add a new quiz to the platform',
      icon: Plus,
      link: '/admin/quizzes/create',
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Add Resource',
      description: 'Upload learning materials',
      icon: Plus,
      link: '/admin/resources/create',
      gradient: 'from-green-600 to-green-700'
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: Users,
      link: '/admin/users',
      gradient: 'from-purple-600 to-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-20 h-20 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-10 right-20 w-20 h-20 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Code className="absolute top-20 left-1/4 h-8 w-8 text-purple-300 opacity-20 animate-float" />
        <Sparkles className="absolute top-40 right-1/3 h-6 w-6 text-blue-300 opacity-30 animate-float-delayed" />
        <Star className="absolute bottom-40 left-1/3 h-10 w-10 text-pink-300 opacity-25 animate-float" />
        <Zap className="absolute bottom-20 right-1/4 h-7 w-7 text-indigo-300 opacity-20 animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-purple-200 text-lg">Manage your learning platform with powerful tools</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-200">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-purple-300" />
                Quick Actions
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10"
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${action.gradient} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{action.title}</h3>
                      <p className="text-sm text-purple-200">{action.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-300" />
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">New user registered: Alex Johnson</p>
                    <p className="text-xs text-purple-300">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Quiz completed: JavaScript Fundamentals</p>
                    <p className="text-xs text-purple-300">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-3 h-3 bg-purple-400 rounded-full shadow-lg"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">New resource uploaded: React Best Practices</p>
                    <p className="text-xs text-purple-300">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-3 h-3 bg-orange-400 rounded-full shadow-lg"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">User feedback received</p>
                    <p className="text-xs text-purple-300">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;