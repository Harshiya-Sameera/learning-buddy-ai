import { Quiz, Resource, QuizAttempt, LearningProgress } from '../types';

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics including variables, functions, and control structures.',
    difficulty: 'beginner',
    category: 'Programming',
    createdAt: '2024-01-15T10:00:00Z',
    questions: [
      {
        id: '1',
        question: 'What is the correct way to declare a variable in JavaScript?',
        options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'],
        correctAnswer: 0,
        explanation: 'The var keyword is used to declare variables in JavaScript.'
      },
      {
        id: '2',
        question: 'Which of the following is a primitive data type in JavaScript?',
        options: ['Array', 'Object', 'String', 'Function'],
        correctAnswer: 2,
        explanation: 'String is a primitive data type in JavaScript, while Array, Object, and Function are reference types.'
      },
      {
        id: '3',
        question: 'What does the === operator do in JavaScript?',
        options: ['Assignment', 'Comparison without type coercion', 'Comparison with type coercion', 'Addition'],
        correctAnswer: 1,
        explanation: 'The === operator performs strict equality comparison without type coercion.'
      }
    ]
  },
  {
    id: '2',
    title: 'React Hooks Deep Dive',
    description: 'Advanced quiz covering React hooks including useState, useEffect, and custom hooks.',
    difficulty: 'intermediate',
    category: 'Programming',
    createdAt: '2024-01-16T14:30:00Z',
    questions: [
      {
        id: '1',
        question: 'When is the useEffect hook executed?',
        options: ['Before render', 'After render', 'During render', 'Never'],
        correctAnswer: 1,
        explanation: 'useEffect runs after the render is committed to the screen.'
      },
      {
        id: '2',
        question: 'What is the purpose of the dependency array in useEffect?',
        options: ['To pass props', 'To control when the effect runs', 'To define state', 'To create refs'],
        correctAnswer: 1,
        explanation: 'The dependency array controls when the effect should re-run based on value changes.'
      }
    ]
  },
  {
    id: '3',
    title: 'Data Structures & Algorithms',
    description: 'Comprehensive quiz on common data structures and algorithmic concepts.',
    difficulty: 'advanced',
    category: 'Computer Science',
    createdAt: '2024-01-17T09:15:00Z',
    questions: [
      {
        id: '1',
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Binary search has O(log n) time complexity as it eliminates half the search space in each iteration.'
      },
      {
        id: '2',
        question: 'Which data structure uses LIFO principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 1,
        explanation: 'Stack follows Last In, First Out (LIFO) principle.'
      }
    ]
  },
  {
    id: '4',
    title: 'Python Basics',
    description: 'Essential Python concepts including syntax, data types, and basic operations.',
    difficulty: 'beginner',
    category: 'Programming',
    createdAt: '2024-01-18T11:00:00Z',
    questions: [
      {
        id: '1',
        question: 'Which of the following is the correct way to create a list in Python?',
        options: ['list = [1, 2, 3]', 'list = (1, 2, 3)', 'list = {1, 2, 3}', 'list = <1, 2, 3>'],
        correctAnswer: 0,
        explanation: 'Square brackets [] are used to create lists in Python.'
      },
      {
        id: '2',
        question: 'What is the output of print(type(5.0))?',
        options: ['<class \'int\'>', '<class \'float\'>', '<class \'number\'>', '<class \'decimal\'>'],
        correctAnswer: 1,
        explanation: '5.0 is a floating-point number, so its type is float.'
      },
      {
        id: '3',
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1,
        explanation: 'The def keyword is used to define functions in Python.'
      }
    ]
  },
  {
    id: '5',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to machine learning concepts, algorithms, and applications.',
    difficulty: 'intermediate',
    category: 'Data Science',
    createdAt: '2024-01-19T13:45:00Z',
    questions: [
      {
        id: '1',
        question: 'What is supervised learning?',
        options: [
          'Learning without labeled data',
          'Learning with labeled input-output pairs',
          'Learning through trial and error',
          'Learning by clustering data'
        ],
        correctAnswer: 1,
        explanation: 'Supervised learning uses labeled data to train models to predict outputs for new inputs.'
      },
      {
        id: '2',
        question: 'Which algorithm is commonly used for classification problems?',
        options: ['K-means', 'Linear Regression', 'Random Forest', 'PCA'],
        correctAnswer: 2,
        explanation: 'Random Forest is a popular ensemble method used for classification tasks.'
      }
    ]
  },
  {
    id: '6',
    title: 'Database Design Principles',
    description: 'Learn about relational databases, normalization, and SQL fundamentals.',
    difficulty: 'intermediate',
    category: 'Computer Science',
    createdAt: '2024-01-20T16:20:00Z',
    questions: [
      {
        id: '1',
        question: 'What is the primary purpose of database normalization?',
        options: [
          'To increase data redundancy',
          'To reduce data redundancy and improve data integrity',
          'To make queries slower',
          'To increase storage space'
        ],
        correctAnswer: 1,
        explanation: 'Normalization reduces data redundancy and improves data integrity by organizing data efficiently.'
      },
      {
        id: '2',
        question: 'Which SQL command is used to retrieve data from a database?',
        options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
        correctAnswer: 2,
        explanation: 'SELECT is the SQL command used to query and retrieve data from database tables.'
      }
    ]
  },
  {
    id: '7',
    title: 'Cybersecurity Essentials',
    description: 'Basic cybersecurity concepts, threats, and protection strategies.',
    difficulty: 'beginner',
    category: 'Computer Science',
    createdAt: '2024-01-21T09:30:00Z',
    questions: [
      {
        id: '1',
        question: 'What does HTTPS stand for?',
        options: [
          'HyperText Transfer Protocol Secure',
          'HyperText Transfer Protocol Standard',
          'HyperText Transfer Protocol System',
          'HyperText Transfer Protocol Service'
        ],
        correctAnswer: 0,
        explanation: 'HTTPS stands for HyperText Transfer Protocol Secure, which encrypts data transmission.'
      },
      {
        id: '2',
        question: 'What is a firewall?',
        options: [
          'A type of malware',
          'A network security device that monitors traffic',
          'A programming language',
          'A database management system'
        ],
        correctAnswer: 1,
        explanation: 'A firewall is a network security device that monitors and controls incoming and outgoing network traffic.'
      }
    ]
  },
  {
    id: '8',
    title: 'Digital Marketing Basics',
    description: 'Introduction to digital marketing strategies, SEO, and social media marketing.',
    difficulty: 'beginner',
    category: 'Business',
    createdAt: '2024-01-22T14:15:00Z',
    questions: [
      {
        id: '1',
        question: 'What does SEO stand for?',
        options: [
          'Social Engine Optimization',
          'Search Engine Optimization',
          'Site Engine Optimization',
          'System Engine Optimization'
        ],
        correctAnswer: 1,
        explanation: 'SEO stands for Search Engine Optimization, the practice of improving website visibility in search results.'
      },
      {
        id: '2',
        question: 'Which metric measures the percentage of visitors who leave after viewing only one page?',
        options: ['Conversion rate', 'Click-through rate', 'Bounce rate', 'Engagement rate'],
        correctAnswer: 2,
        explanation: 'Bounce rate measures the percentage of single-page sessions where users leave without interacting further.'
      }
    ]
  },
  {
    id: '9',
    title: 'Cloud Computing Fundamentals',
    description: 'Understanding cloud services, deployment models, and major cloud providers.',
    difficulty: 'intermediate',
    category: 'Technology',
    createdAt: '2024-01-23T10:45:00Z',
    questions: [
      {
        id: '1',
        question: 'What are the three main cloud service models?',
        options: [
          'IaaS, PaaS, SaaS',
          'Public, Private, Hybrid',
          'AWS, Azure, GCP',
          'Storage, Compute, Network'
        ],
        correctAnswer: 0,
        explanation: 'The three main cloud service models are Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS).'
      },
      {
        id: '2',
        question: 'Which cloud deployment model offers the highest level of control and security?',
        options: ['Public cloud', 'Private cloud', 'Hybrid cloud', 'Community cloud'],
        correctAnswer: 1,
        explanation: 'Private cloud offers the highest level of control and security as it\'s dedicated to a single organization.'
      }
    ]
  },
  {
    id: '10',
    title: 'UI/UX Design Principles',
    description: 'Essential design principles, user experience concepts, and design thinking.',
    difficulty: 'beginner',
    category: 'Design',
    createdAt: '2024-01-24T15:30:00Z',
    questions: [
      {
        id: '1',
        question: 'What does UX stand for?',
        options: ['User Experience', 'User Extension', 'Universal Experience', 'User Execution'],
        correctAnswer: 0,
        explanation: 'UX stands for User Experience, which focuses on how users interact with and experience a product.'
      },
      {
        id: '2',
        question: 'Which principle suggests that similar elements should be grouped together?',
        options: ['Proximity', 'Alignment', 'Contrast', 'Repetition'],
        correctAnswer: 0,
        explanation: 'The proximity principle states that related elements should be placed close together to show their relationship.'
      }
    ]
  },
  {
    id: '11',
    title: 'Node.js Backend Development',
    description: 'Server-side JavaScript development with Node.js, Express, and APIs.',
    difficulty: 'intermediate',
    category: 'Programming',
    createdAt: '2024-01-25T11:20:00Z',
    questions: [
      {
        id: '1',
        question: 'What is Node.js?',
        options: [
          'A JavaScript framework',
          'A JavaScript runtime built on Chrome\'s V8 engine',
          'A database management system',
          'A web browser'
        ],
        correctAnswer: 1,
        explanation: 'Node.js is a JavaScript runtime environment that allows you to run JavaScript on the server side.'
      },
      {
        id: '2',
        question: 'Which module is used to create HTTP servers in Node.js?',
        options: ['fs', 'path', 'http', 'url'],
        correctAnswer: 2,
        explanation: 'The http module is used to create HTTP servers and clients in Node.js.'
      }
    ]
  },
  {
    id: '12',
    title: 'Mobile App Development',
    description: 'Introduction to mobile app development concepts and frameworks.',
    difficulty: 'intermediate',
    category: 'Technology',
    createdAt: '2024-01-26T09:45:00Z',
    questions: [
      {
        id: '1',
        question: 'What is React Native?',
        options: [
          'A web framework',
          'A mobile app development framework',
          'A database',
          'A testing tool'
        ],
        correctAnswer: 1,
        explanation: 'React Native is a framework for building mobile applications using React and JavaScript.'
      },
      {
        id: '2',
        question: 'Which programming language is primarily used for iOS app development?',
        options: ['Java', 'Kotlin', 'Swift', 'C#'],
        correctAnswer: 2,
        explanation: 'Swift is the primary programming language used for iOS app development.'
      }
    ]
  },
  {
    id: '13',
    title: 'Project Management Fundamentals',
    description: 'Essential project management concepts, methodologies, and tools.',
    difficulty: 'beginner',
    category: 'Business',
    createdAt: '2024-01-27T14:30:00Z',
    questions: [
      {
        id: '1',
        question: 'What does Agile methodology emphasize?',
        options: [
          'Detailed documentation',
          'Following a strict plan',
          'Iterative development and customer collaboration',
          'Working in isolation'
        ],
        correctAnswer: 2,
        explanation: 'Agile methodology emphasizes iterative development, customer collaboration, and responding to change.'
      },
      {
        id: '2',
        question: 'What is a sprint in Scrum?',
        options: [
          'A type of meeting',
          'A time-boxed iteration',
          'A project deliverable',
          'A team role'
        ],
        correctAnswer: 1,
        explanation: 'A sprint is a time-boxed iteration in Scrum, typically lasting 1-4 weeks.'
      }
    ]
  },
  {
    id: '14',
    title: 'Graphic Design Basics',
    description: 'Fundamental graphic design principles, color theory, and typography.',
    difficulty: 'beginner',
    category: 'Design',
    createdAt: '2024-01-28T16:15:00Z',
    questions: [
      {
        id: '1',
        question: 'What are the primary colors in the RGB color model?',
        options: [
          'Red, Yellow, Blue',
          'Red, Green, Blue',
          'Cyan, Magenta, Yellow',
          'Red, Orange, Yellow'
        ],
        correctAnswer: 1,
        explanation: 'The primary colors in the RGB color model are Red, Green, and Blue.'
      },
      {
        id: '2',
        question: 'What is typography?',
        options: [
          'The art of drawing',
          'The art and technique of arranging type',
          'The study of colors',
          'The process of printing'
        ],
        correctAnswer: 1,
        explanation: 'Typography is the art and technique of arranging type to make written language legible and appealing.'
      }
    ]
  },
  {
    id: '15',
    title: 'DevOps Fundamentals',
    description: 'Introduction to DevOps practices, CI/CD, and automation tools.',
    difficulty: 'intermediate',
    category: 'Technology',
    createdAt: '2024-01-29T13:40:00Z',
    questions: [
      {
        id: '1',
        question: 'What does CI/CD stand for?',
        options: [
          'Continuous Integration/Continuous Deployment',
          'Code Integration/Code Deployment',
          'Continuous Improvement/Continuous Development',
          'Central Integration/Central Deployment'
        ],
        correctAnswer: 0,
        explanation: 'CI/CD stands for Continuous Integration and Continuous Deployment/Delivery.'
      },
      {
        id: '2',
        question: 'What is the main goal of DevOps?',
        options: [
          'To replace developers',
          'To eliminate testing',
          'To bridge the gap between development and operations',
          'To reduce code quality'
        ],
        correctAnswer: 2,
        explanation: 'DevOps aims to bridge the gap between development and operations teams to improve collaboration and efficiency.'
      }
    ]
  },
  {
    id: '16',
    title: 'Financial Literacy Basics',
    description: 'Essential financial concepts including budgeting, investing, and personal finance.',
    difficulty: 'beginner',
    category: 'Business',
    createdAt: '2024-01-30T10:25:00Z',
    questions: [
      {
        id: '1',
        question: 'What is compound interest?',
        options: [
          'Interest paid only on the principal',
          'Interest paid on both principal and accumulated interest',
          'A type of loan',
          'A banking fee'
        ],
        correctAnswer: 1,
        explanation: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods.'
      },
      {
        id: '2',
        question: 'What is diversification in investing?',
        options: [
          'Putting all money in one investment',
          'Spreading investments across different assets',
          'Only investing in stocks',
          'Avoiding all risks'
        ],
        correctAnswer: 1,
        explanation: 'Diversification is the practice of spreading investments across different assets to reduce risk.'
      }
    ]
  },
  {
    id: '17',
    title: 'Artificial Intelligence Basics',
    description: 'Introduction to AI concepts, machine learning, and neural networks.',
    difficulty: 'intermediate',
    category: 'Data Science',
    createdAt: '2024-01-31T15:50:00Z',
    questions: [
      {
        id: '1',
        question: 'What is artificial intelligence?',
        options: [
          'A type of computer hardware',
          'The simulation of human intelligence in machines',
          'A programming language',
          'A database system'
        ],
        correctAnswer: 1,
        explanation: 'Artificial Intelligence is the simulation of human intelligence processes by machines and computer systems.'
      },
      {
        id: '2',
        question: 'What is a neural network?',
        options: [
          'A computer network',
          'A computing system inspired by biological neural networks',
          'A type of database',
          'A programming framework'
        ],
        correctAnswer: 1,
        explanation: 'A neural network is a computing system inspired by biological neural networks that constitute animal brains.'
      }
    ]
  },
  {
    id: '18',
    title: 'Web Accessibility Standards',
    description: 'Understanding web accessibility guidelines and inclusive design principles.',
    difficulty: 'intermediate',
    category: 'Design',
    createdAt: '2024-02-01T12:30:00Z',
    questions: [
      {
        id: '1',
        question: 'What does WCAG stand for?',
        options: [
          'Web Content Accessibility Guidelines',
          'World Computer Access Group',
          'Web Code Analysis Guide',
          'Website Content Approval Guidelines'
        ],
        correctAnswer: 0,
        explanation: 'WCAG stands for Web Content Accessibility Guidelines, which provide standards for web accessibility.'
      },
      {
        id: '2',
        question: 'What is the minimum color contrast ratio recommended by WCAG for normal text?',
        options: ['3:1', '4.5:1', '7:1', '2:1'],
        correctAnswer: 1,
        explanation: 'WCAG recommends a minimum color contrast ratio of 4.5:1 for normal text to ensure readability.'
      }
    ]
  }
];

export const mockResources: Resource[] = [
  // Programming Resources - All Videos
  {
    id: '1',
    title: 'JavaScript ES6+ Complete Course',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=WBPrJSw7yQA',
    description: 'Complete JavaScript course covering ES6+ features, modern syntax, and best practices for web development.',
    category: 'Programming',
    thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'React.js Full Course 2024',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    description: 'Complete React.js tutorial covering hooks, components, state management, and modern React patterns.',
    category: 'Programming',
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-16T11:30:00Z'
  },
  {
    id: '3',
    title: 'Python Programming Tutorial',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    description: 'Learn Python from scratch with this comprehensive tutorial covering syntax, data structures, and applications.',
    category: 'Programming',
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-18T09:20:00Z'
  },
  {
    id: '4',
    title: 'Advanced JavaScript Concepts',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=Mus_vwhTCq0',
    description: 'Deep dive into advanced JavaScript concepts including closures, prototypes, and asynchronous programming.',
    category: 'Programming',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-19T14:10:00Z'
  },
  {
    id: '5',
    title: 'Full-Stack Web Development',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
    description: 'Complete full-stack development course covering frontend, backend, and database technologies.',
    category: 'Programming',
    thumbnail: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-20T11:45:00Z'
  },
  {
    id: '6',
    title: 'Vue.js Complete Guide',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c',
    description: 'Learn Vue.js from basics to advanced concepts including Vuex, Vue Router, and composition API.',
    category: 'Programming',
    thumbnail: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-22T13:20:00Z'
  },
  {
    id: '7',
    title: 'Angular Development Tutorial',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=k5E2AVpwsko',
    description: 'Complete Angular tutorial covering components, services, routing, and modern Angular development.',
    category: 'Programming',
    thumbnail: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-23T10:15:00Z'
  },
  {
    id: '8',
    title: 'Node.js Backend Development',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
    description: 'Complete Node.js tutorial covering server-side development, Express.js, and API creation.',
    category: 'Programming',
    thumbnail: 'https://images.pexels.com/photos/1181448/pexels-photo-1181448.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-24T14:50:00Z'
  },

  // Data Science Resources - All Videos
  {
    id: '9',
    title: 'Machine Learning Course',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=ukzFI9rgwfU',
    description: 'Complete machine learning course covering algorithms, supervised and unsupervised learning.',
    category: 'Data Science',
    thumbnail: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-25T09:30:00Z'
  },
  {
    id: '10',
    title: 'Data Science with Python',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
    description: 'Learn data science using Python, pandas, numpy, matplotlib, and scikit-learn libraries.',
    category: 'Data Science',
    thumbnail: 'https://images.pexels.com/photos/1181500/pexels-photo-1181500.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-26T15:40:00Z'
  },
  {
    id: '11',
    title: 'Deep Learning Fundamentals',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=aircAruvnKk',
    description: 'Introduction to neural networks and deep learning concepts with practical examples.',
    category: 'Data Science',
    thumbnail: 'https://images.pexels.com/photos/1181525/pexels-photo-1181525.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-27T12:25:00Z'
  },
  {
    id: '12',
    title: 'TensorFlow Tutorial',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk',
    description: 'Complete TensorFlow tutorial for machine learning and deep learning applications.',
    category: 'Data Science',
    thumbnail: 'https://images.pexels.com/photos/1181575/pexels-photo-1181575.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-29T16:20:00Z'
  },
  {
    id: '13',
    title: 'Data Visualization Guide',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=_ZEWDGpM-vM',
    description: 'Learn data visualization techniques using matplotlib, seaborn, and plotly in Python.',
    category: 'Data Science',
    thumbnail: 'https://images.pexels.com/photos/1181600/pexels-photo-1181600.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-30T14:35:00Z'
  },
  {
    id: '14',
    title: 'Artificial Intelligence Basics',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=ad79nYk2keg',
    description: 'Introduction to AI concepts, machine learning algorithms, and neural networks.',
    category: 'Data Science',
    thumbnail: 'https://images.pexels.com/photos/1181625/pexels-photo-1181625.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-01-31T10:45:00Z'
  },

  // Design Resources - All Videos
  {
    id: '15',
    title: 'UI/UX Design Principles',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=0JCUH5daCCE',
    description: 'Learn essential UI/UX design principles, user research methods, and design thinking process.',
    category: 'Design',
    thumbnail: 'https://images.pexels.com/photos/1181650/pexels-photo-1181650.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-01T13:15:00Z'
  },
  {
    id: '16',
    title: 'Figma Complete Course',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=FTlczfBm-bQ',
    description: 'Master Figma for UI/UX design, prototyping, and collaborative design workflows.',
    category: 'Design',
    thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-02T09:30:00Z'
  },
  {
    id: '17',
    title: 'Color Theory for Designers',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=Qj1FK8n7WgY',
    description: 'Understanding color theory, color harmony, and psychological effects of colors in design.',
    category: 'Design',
    thumbnail: 'https://images.pexels.com/photos/1181700/pexels-photo-1181700.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-03T11:20:00Z'
  },
  {
    id: '18',
    title: 'Typography Masterclass',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=sByzHoiYFX0',
    description: 'Complete guide to typography, font selection, and creating readable, beautiful text layouts.',
    category: 'Design',
    thumbnail: 'https://images.pexels.com/photos/1181725/pexels-photo-1181725.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-04T15:45:00Z'
  },
  {
    id: '19',
    title: 'Web Design Trends 2024',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=ldwlOzRvYOU',
    description: 'Latest web design trends, best practices, and modern design techniques for 2024.',
    category: 'Design',
    thumbnail: 'https://images.pexels.com/photos/1181750/pexels-photo-1181750.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-05T12:10:00Z'
  },
  {
    id: '20',
    title: 'Graphic Design Fundamentals',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=YqQx75OPRa0',
    description: 'Learn fundamental graphic design principles, composition, and visual hierarchy.',
    category: 'Design',
    thumbnail: 'https://images.pexels.com/photos/1181775/pexels-photo-1181775.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-06T14:25:00Z'
  },

  // Business Resources - All Videos
  {
    id: '21',
    title: 'Digital Marketing Masterclass',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
    description: 'Complete digital marketing course covering SEO, social media, content marketing, and analytics.',
    category: 'Business',
    thumbnail: 'https://images.pexels.com/photos/1181800/pexels-photo-1181800.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-07T16:40:00Z'
  },
  {
    id: '22',
    title: 'Entrepreneurship Fundamentals',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=ZoqgAy3h4OM',
    description: 'Learn the fundamentals of entrepreneurship, business planning, and startup strategies.',
    category: 'Business',
    thumbnail: 'https://images.pexels.com/photos/1181825/pexels-photo-1181825.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-08T10:15:00Z'
  },
  {
    id: '23',
    title: 'Financial Planning Basics',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=HQzoZfc3GwQ',
    description: 'Personal and business financial planning, budgeting, investment strategies, and financial analysis.',
    category: 'Business',
    thumbnail: 'https://images.pexels.com/photos/1181850/pexels-photo-1181850.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-09T13:30:00Z'
  },
  {
    id: '24',
    title: 'Leadership and Management',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=VhJ_19_Yzx4',
    description: 'Effective leadership strategies, team management, communication skills, and organizational behavior.',
    category: 'Business',
    thumbnail: 'https://images.pexels.com/photos/1181875/pexels-photo-1181875.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-10T11:45:00Z'
  },
  {
    id: '25',
    title: 'Project Management Course',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=3qQic7TfCM8',
    description: 'Complete project management course covering methodologies, tools, and best practices.',
    category: 'Business',
    thumbnail: 'https://images.pexels.com/photos/1181900/pexels-photo-1181900.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-11T15:20:00Z'
  },

  // Technology Resources - All Videos
  {
    id: '26',
    title: 'Cloud Computing Fundamentals',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=M988_fsOSWo',
    description: 'Understanding cloud services, deployment models, and major cloud providers like AWS, Azure, and GCP.',
    category: 'Technology',
    thumbnail: 'https://images.pexels.com/photos/1181925/pexels-photo-1181925.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-12T09:45:00Z'
  },
  {
    id: '27',
    title: 'DevOps Complete Course',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=j5Zsa_eOXeY',
    description: 'Complete DevOps tutorial covering CI/CD, Docker, Kubernetes, and automation tools.',
    category: 'Technology',
    thumbnail: 'https://images.pexels.com/photos/1181950/pexels-photo-1181950.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-13T14:30:00Z'
  },
  {
    id: '28',
    title: 'Cybersecurity Essentials',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
    description: 'Learn cybersecurity fundamentals, threat analysis, and protection strategies.',
    category: 'Technology',
    thumbnail: 'https://images.pexels.com/photos/1181975/pexels-photo-1181975.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    createdAt: '2024-02-14T11:15:00Z'
  }
];

// Reset dashboard to show 0 initially
export const mockQuizAttempts: QuizAttempt[] = [];

export const mockLearningProgress: LearningProgress = {
  userId: '1',
  totalQuizzesCompleted: 0,
  averageScore: 0,
  streak: 0,
  weakAreas: [],
  strongAreas: [],
  lastActive: new Date().toISOString()
};