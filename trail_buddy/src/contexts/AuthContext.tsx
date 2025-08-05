import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, QuizAttempt, LearningProgress } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  isLoading: boolean;
  quizAttempts: QuizAttempt[];
  learningProgress: LearningProgress;
  addQuizAttempt: (attempt: QuizAttempt) => void;
  updateLearningProgress: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo - using a Map for better lookup performance
const createMockUsers = (): Map<string, User & { password: string }> => {
  const users = new Map();
  
  const studentUser: User & { password: string } = {
    id: '1',
    email: 'student@example.com',
    name: 'Alex Johnson',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    bio: 'Passionate learner exploring the world of technology and programming. Always eager to take on new challenges and expand my knowledge.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    createdAt: '2024-01-15T10:30:00Z',
    password: 'password'
  };
  
  const adminUser: User & { password: string } = {
    id: '2',
    email: 'admin@example.com',
    name: 'Sarah Wilson',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    bio: 'Educational technology enthusiast with 10+ years of experience in creating engaging learning experiences.',
    location: 'New York, NY',
    website: 'https://sarahwilson.edu',
    createdAt: '2024-01-10T09:15:00Z',
    password: 'password'
  };
  
  users.set(studentUser.email, studentUser);
  users.set(adminUser.email, adminUser);
  
  return users;
};

// Initialize mock users
let mockUsers = createMockUsers();

// Load any additional users from localStorage
const loadStoredUsers = () => {
  try {
    const storedUsers = localStorage.getItem('learningBuddyAllUsers');
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      parsedUsers.forEach((user: User & { password: string }) => {
        mockUsers.set(user.email, user);
      });
    }
  } catch (error) {
    console.error('Error loading stored users:', error);
  }
};

// Save all users to localStorage
const saveUsersToStorage = () => {
  try {
    const usersArray = Array.from(mockUsers.values());
    localStorage.setItem('learningBuddyAllUsers', JSON.stringify(usersArray));
  } catch (error) {
    console.error('Error saving users to storage:', error);
  }
};

// Calculate learning streak
const calculateLearningStreak = (attempts: QuizAttempt[]): number => {
  if (attempts.length === 0) return 0;

  const sortedAttempts = attempts.sort((a, b) => 
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const attempt of sortedAttempts) {
    const attemptDate = new Date(attempt.completedAt);
    attemptDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((currentDate.getTime() - attemptDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === streak) {
      streak++;
    } else if (daysDiff === streak + 1) {
      // Allow for one day gap (yesterday)
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Analyze learning areas
const analyzeLearningAreas = (attempts: QuizAttempt[], quizzes: any[]): { strongAreas: string[], weakAreas: string[] } => {
  if (attempts.length === 0) return { strongAreas: [], weakAreas: [] };

  const categoryPerformance: { [key: string]: { total: number, correct: number } } = {};

  attempts.forEach(attempt => {
    const quiz = quizzes.find(q => q.id === attempt.quizId);
    if (quiz) {
      const category = quiz.category;
      const percentage = (attempt.score / attempt.totalQuestions) * 100;
      
      if (!categoryPerformance[category]) {
        categoryPerformance[category] = { total: 0, correct: 0 };
      }
      
      categoryPerformance[category].total += attempt.totalQuestions;
      categoryPerformance[category].correct += attempt.score;
    }
  });

  const strongAreas: string[] = [];
  const weakAreas: string[] = [];

  Object.entries(categoryPerformance).forEach(([category, performance]) => {
    const percentage = (performance.correct / performance.total) * 100;
    if (percentage >= 80) {
      strongAreas.push(category);
    } else if (percentage < 60) {
      weakAreas.push(category);
    }
  });

  return { strongAreas, weakAreas };
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [learningProgress, setLearningProgress] = useState<LearningProgress>({
    userId: '',
    totalQuizzesCompleted: 0,
    averageScore: 0,
    streak: 0,
    weakAreas: [],
    strongAreas: [],
    lastActive: new Date().toISOString()
  });

  // Load quiz attempts from localStorage
  const loadQuizAttempts = (userId: string) => {
    try {
      const storedAttempts = localStorage.getItem(`learningBuddyQuizAttempts_${userId}`);
      if (storedAttempts) {
        const attempts = JSON.parse(storedAttempts);
        setQuizAttempts(attempts);
        return attempts;
      }
    } catch (error) {
      console.error('Error loading quiz attempts:', error);
    }
    return [];
  };

  // Save quiz attempts to localStorage
  const saveQuizAttempts = (userId: string, attempts: QuizAttempt[]) => {
    try {
      localStorage.setItem(`learningBuddyQuizAttempts_${userId}`, JSON.stringify(attempts));
    } catch (error) {
      console.error('Error saving quiz attempts:', error);
    }
  };

  // Update learning progress based on quiz attempts
  const updateLearningProgress = () => {
    if (!user || quizAttempts.length === 0) {
      setLearningProgress({
        userId: user?.id || '',
        totalQuizzesCompleted: 0,
        averageScore: 0,
        streak: 0,
        weakAreas: [],
        strongAreas: [],
        lastActive: new Date().toISOString()
      });
      return;
    }

    // Import quiz data for analysis
    import('../data/mockData').then(({ mockQuizzes }) => {
      const totalScore = quizAttempts.reduce((sum, attempt) => 
        sum + (attempt.score / attempt.totalQuestions) * 100, 0
      );
      const averageScore = Math.round(totalScore / quizAttempts.length);
      const streak = calculateLearningStreak(quizAttempts);
      const { strongAreas, weakAreas } = analyzeLearningAreas(quizAttempts, mockQuizzes);

      const newProgress: LearningProgress = {
        userId: user.id,
        totalQuizzesCompleted: quizAttempts.length,
        averageScore,
        streak,
        weakAreas,
        strongAreas,
        lastActive: new Date().toISOString()
      };

      setLearningProgress(newProgress);

      // Save to localStorage
      try {
        localStorage.setItem(`learningBuddyProgress_${user.id}`, JSON.stringify(newProgress));
      } catch (error) {
        console.error('Error saving learning progress:', error);
      }
    });
  };

  // Add new quiz attempt
  const addQuizAttempt = (attempt: QuizAttempt) => {
    if (!user) return;

    const newAttempts = [...quizAttempts, attempt];
    setQuizAttempts(newAttempts);
    saveQuizAttempts(user.id, newAttempts);
  };

  // Load learning progress from localStorage
  const loadLearningProgress = (userId: string) => {
    try {
      const storedProgress = localStorage.getItem(`learningBuddyProgress_${userId}`);
      if (storedProgress) {
        const progress = JSON.parse(storedProgress);
        setLearningProgress(progress);
      }
    } catch (error) {
      console.error('Error loading learning progress:', error);
    }
  };

  useEffect(() => {
    // Load stored users first
    loadStoredUsers();
    
    // Check for stored user session on app load
    const storedUser = localStorage.getItem('learningBuddyUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Verify the user still exists in our user database
        const existingUser = mockUsers.get(parsedUser.email);
        if (existingUser) {
          // Remove password from user object before setting
          const { password, ...userWithoutPassword } = existingUser;
          setUser(userWithoutPassword);
          // Load user's quiz attempts and progress
          const attempts = loadQuizAttempts(existingUser.id);
          loadLearningProgress(existingUser.id);
        } else {
          // User no longer exists, clear the session
          localStorage.removeItem('learningBuddyUser');
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('learningBuddyUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Update progress whenever quiz attempts change
  useEffect(() => {
    if (user) {
      updateLearningProgress();
    }
  }, [quizAttempts, user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email
      const foundUser = mockUsers.get(email.toLowerCase());
      
      // Check if user exists and password matches
      if (foundUser && foundUser.password === password) {
        // Remove password from user object before setting
        const { password: userPassword, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('learningBuddyUser', JSON.stringify(userWithoutPassword));
        
        // Load user's quiz attempts and progress
        const attempts = loadQuizAttempts(foundUser.id);
        loadLearningProgress(foundUser.id);
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock registration delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const normalizedEmail = email.toLowerCase();
      
      // Check if user already exists
      if (mockUsers.has(normalizedEmail)) {
        setIsLoading(false);
        return false;
      }
      
      // Create new user with password
      const newUserWithPassword: User & { password: string } = {
        id: Date.now().toString(),
        email: normalizedEmail,
        name,
        role: 'student',
        createdAt: new Date().toISOString(),
        password: password
      };
      
      // Add to mock users database
      mockUsers.set(normalizedEmail, newUserWithPassword);
      saveUsersToStorage();
      
      // Remove password before setting user state
      const { password: userPassword, ...newUser } = newUserWithPassword;
      setUser(newUser);
      localStorage.setItem('learningBuddyUser', JSON.stringify(newUser));
      
      // Initialize empty quiz attempts and progress
      setQuizAttempts([]);
      setLearningProgress({
        userId: newUser.id,
        totalQuizzesCompleted: 0,
        averageScore: 0,
        streak: 0,
        weakAreas: [],
        strongAreas: [],
        lastActive: new Date().toISOString()
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<void> => {
    if (!user) return;
    
    try {
      // Mock profile update delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update user object
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      
      // Update in localStorage
      localStorage.setItem('learningBuddyUser', JSON.stringify(updatedUser));
      
      // Update in mock users database (preserve password)
      const existingUserWithPassword = mockUsers.get(user.email);
      if (existingUserWithPassword) {
        const updatedUserWithPassword = { ...existingUserWithPassword, ...profileData };
        mockUsers.set(user.email, updatedUserWithPassword);
        saveUsersToStorage();
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    try {
      // Mock password reset delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const normalizedEmail = email.toLowerCase();
      const foundUser = mockUsers.get(normalizedEmail);
      
      if (!foundUser) {
        return false;
      }
      
      // Update password in user record
      const updatedUser = { ...foundUser, password: newPassword };
      mockUsers.set(normalizedEmail, updatedUser);
      saveUsersToStorage();
      
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setQuizAttempts([]);
    setLearningProgress({
      userId: '',
      totalQuizzesCompleted: 0,
      averageScore: 0,
      streak: 0,
      weakAreas: [],
      strongAreas: [],
      lastActive: new Date().toISOString()
    });
    localStorage.removeItem('learningBuddyUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile, 
      resetPassword,
      isLoading,
      quizAttempts,
      learningProgress,
      addQuizAttempt,
      updateLearningProgress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};