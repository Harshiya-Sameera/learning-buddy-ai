// src/types/index.ts

export enum Sender {
  User = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: Sender;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  questions: QuizQuestion[];
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  answers: number[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'pdf';
  url: string;
  description: string;
  category: string;
  thumbnail?: string;
  createdAt: string;
}

export interface LearningProgress {
  userId: string;
  totalQuizzesCompleted: number;
  averageScore: number;
  streak: number;
  weakAreas: string[];
  strongAreas: string[];
  lastActive: string;
}
