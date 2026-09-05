import prisma from '../config/db.js';

export const EXPANDED_COURSES = [
  // 1. PROGRAMMING
  {
    title: 'Python for Beginners & Problem Solving',
    slug: 'python-for-beginners',
    description: 'Master core Python from scratch: variables, data structures, OOPs, file handling, libraries, and competitive problem-solving algorithms.',
    category: 'Programming',
    level: 'Beginner',
    durationHours: 18.5,
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80',
    instructor: 'Dr. Vikramaditya Rao',
    instructorRole: 'Senior Python Architect & Ex-IISc Researcher',
    badge: 'Bestseller',
    rating: 4.9,
    reviewCount: 3420,
    enrolledCount: 14850,
    skills: ['Python 3', 'OOP', 'Data Structures', 'File I/O', 'Algorithms', 'Debugging'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-py-1',
        title: 'Module 1: Python Fundamentals & Environment',
        description: 'Variables, data types, type casting, input/output, and VS Code configuration.',
        lessons: [
          {
            id: 'les-py-1',
            title: '1.1 Python Setup & Writing First Script',
            duration: '14 mins',
            videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
            summary: 'Install Python 3.12+, setup VS Code environment and write clean Python code.',
            content: 'Python is a high-level interpreted programming language with clear syntax and massive open-source ecosystem.\n\nKey Concepts:\n- Running scripts via CLI (`python script.py`)\n- Interactive REPL\n- Linting with Ruff and Black.',
            codeSnippet: 'def greet(name: str) -> str:\n    return f"Hello {name}, welcome to Python!"\n\nif __name__ == "__main__":\n    print(greet("Aspirant"))',
            quiz: [
              { id: 'q-py-1', question: 'Which keyword defines a function in Python?', options: ['function', 'def', 'fn', 'fun'], answer: 1, explanation: 'The `def` keyword defines functions in Python.' }
            ]
          },
          {
            id: 'les-py-2',
            title: '1.2 Data Types, Collections (Lists, Dicts, Tuples, Sets)',
            duration: '20 mins',
            videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
            summary: 'Deep dive into Python built-in collections, mutability, and dictionary lookups.',
            content: 'Lists are mutable ordered sequences. Tuples are immutable. Dictionaries provide O(1) hash map lookups. Sets maintain unique unordered values.',
            codeSnippet: 'aspirant = {\n    "name": "Pravin",\n    "skills": ["Python", "SQL", "React"],\n    "certifications": 3\n}\nprint(f"{aspirant[\'name\']} has {len(aspirant[\'skills\'])} skills.")',
            quiz: [
              { id: 'q-py-2', question: 'Which collection type in Python is immutable?', options: ['List', 'Dictionary', 'Tuple', 'Set'], answer: 2, explanation: 'Tuples cannot be modified after instantiation.' }
            ]
          }
        ]
      },
      {
        id: 'mod-py-2',
        title: 'Module 2: Object-Oriented Programming in Python',
        description: 'Classes, inheritance, encapsulation, magic dunder methods, and decorators.',
        lessons: [
          {
            id: 'les-py-3',
            title: '2.1 Classes, Constructors & Encapsulation',
            duration: '22 mins',
            videoUrl: 'https://www.youtube.com/embed/JeznW_7DlB0',
            summary: 'Build robust object-oriented software with __init__, class variables, and custom methods.',
            content: 'OOP encapsulates state and behavior together in reusable classes.',
            codeSnippet: 'class BankAccount:\n    def __init__(self, owner: str, balance: float = 0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount: float):\n        self.balance += amount\n        return self.balance',
            quiz: [
              { id: 'q-py-3', question: 'What is the standard constructor method in Python?', options: ['__new__', '__init__', 'constructor', 'create'], answer: 1, explanation: '`__init__` acts as the constructor in Python.' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Modern C++ & Object-Oriented Programming',
    slug: 'modern-cpp-mastery',
    description: 'Learn C++20 from memory management, pointers, and references to STL containers, templates, and modern smart pointers.',
    category: 'Programming',
    level: 'Beginner to Advanced',
    durationHours: 25.0,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
    instructor: 'Prof. Rajesh Kulkarni',
    instructorRole: 'C++ Systems Programmer & Competitive Programming Coach',
    badge: 'Popular',
    rating: 4.88,
    reviewCount: 2190,
    enrolledCount: 11200,
    skills: ['C++20', 'Pointers & References', 'STL Containers', 'Dynamic Memory', 'Templates', 'OOP in C++'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-cpp-1',
        title: 'Module 1: C++ Syntax, Memory Allocation & Pointers',
        description: 'Stack vs Heap memory, raw pointers, references, and pointer arithmetic.',
        lessons: [
          {
            id: 'les-cpp-1',
            title: '1.1 Memory Management & Pointer Arithmetic in C++',
            duration: '24 mins',
            videoUrl: 'https://www.youtube.com/embed/vLnPwxZdW4Y',
            summary: 'Understand memory addresses, dereferencing, and dynamic allocation with new/delete.',
            content: 'C++ gives developers direct access to physical memory. Learn how to prevent memory leaks and dangling pointers.',
            codeSnippet: '#include <iostream>\n\nint main() {\n    int val = 42;\n    int* ptr = &val;\n    std::cout << "Value: " << *ptr << " at Address: " << ptr << std::endl;\n    return 0;\n}',
            quiz: [
              { id: 'q-cpp-1', question: 'Which operator dereferences a pointer in C++?', options: ['&', '*', '->', '%'], answer: 1, explanation: 'The `*` dereference operator accesses the value stored at the address pointed to.' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Java Core & Object-Oriented System Architecture',
    slug: 'java-core-architecture',
    description: 'Master Java 21 LTS: JVM internals, Garbage Collection, Generics, Collections Framework, Multithreading, and Streams API.',
    category: 'Programming',
    level: 'Beginner to Intermediate',
    durationHours: 26.0,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    instructor: 'Pooja Iyer',
    instructorRole: 'Lead Java Architect & Enterprise Consultant',
    badge: 'Enterprise Grade',
    rating: 4.92,
    reviewCount: 2840,
    enrolledCount: 13400,
    skills: ['Java 21', 'JVM Architecture', 'Collections', 'Multithreading', 'Streams API', 'Design Patterns'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-java-1',
        title: 'Module 1: Java 21 Language Syntax & OOP Pillars',
        description: 'Encapsulation, Polymorphism, Abstract classes, Interfaces, and Records.',
        lessons: [
          {
            id: 'les-java-1',
            title: '1.1 Java 21 Virtual Threads & Modern Records',
            duration: '22 mins',
            videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
            summary: 'Learn immutable records, virtual threads (Project Loom), and pattern matching.',
            content: 'Java 21 brings immense performance improvements for high-throughput enterprise systems.',
            codeSnippet: 'public record Aspirant(String name, String rollNumber, int score) {\n    public boolean isQualified() { return score >= 75; }\n}',
            quiz: [
              { id: 'q-java-1', question: 'What is the return type of a method that does not return any value in Java?', options: ['null', 'void', 'empty', 'blank'], answer: 1, explanation: '`void` indicates that a method does not return any value.' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'TypeScript for Modern Software Engineering',
    slug: 'typescript-mastery',
    description: 'Type annotations, Generics, Utility types, Discriminated Unions, Interface vs Type, and strict compile-time safety.',
    category: 'Programming',
    level: 'Intermediate',
    durationHours: 14.0,
    thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc13c734098?w=800&auto=format&fit=crop&q=80',
    instructor: 'Devendra Patel',
    instructorRole: 'Staff Frontend Architect',
    badge: 'Must Have',
    rating: 4.94,
    reviewCount: 1980,
    enrolledCount: 9800,
    skills: ['TypeScript 5+', 'Generics', 'Utility Types', 'Type Guards', 'Strict Typing', 'Node.js TS'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-ts-1',
        title: 'Module 1: Advanced Types & Generic Functions',
        description: 'Master generics, keyof operators, conditional types, and utility types (Pick, Omit, Partial, Record).',
        lessons: [
          {
            id: 'les-ts-1',
            title: '1.1 Generic Types & Type Inference in TypeScript',
            duration: '18 mins',
            videoUrl: 'https://www.youtube.com/embed/ahCwqrYqo9o',
            summary: 'Build reusable, strongly-typed components and API service handlers with TypeScript Generics.',
            content: 'Generics allow writing flexible, reusable functions and interfaces while preserving strict type validation.',
            codeSnippet: 'interface ApiResponse<T> {\n  success: boolean;\n  data: T;\n  error?: string;\n}\n\nasync function fetchTyped<T>(url: string): Promise<ApiResponse<T>> {\n  const res = await fetch(url);\n  return res.json();\n}',
            quiz: [
              { id: 'q-ts-1', question: 'Which utility type constructs a type with all properties of T set to optional?', options: ['Required<T>', 'Partial<T>', 'Readonly<T>', 'Pick<T>'], answer: 1, explanation: '`Partial<T>` makes all properties in T optional.' }
            ]
          }
        ]
      }
    ]
  },

  // 2. WEB DEVELOPMENT & FULL STACK
  {
    title: 'Full-Stack Web Development Bootcamp (MERN / Next.js)',
    slug: 'fullstack-web-development',
    description: 'Learn modern web development from HTML5/CSS3 to JavaScript ES6+, React, Node.js, Express, MongoDB, and production deployment.',
    category: 'Web Development',
    level: 'Beginner to Pro',
    durationHours: 32.0,
    thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=80',
    instructor: 'Ananya Sharma',
    instructorRole: 'Staff Frontend Engineer & Open Source Contributor',
    badge: 'Comprehensive',
    rating: 4.95,
    reviewCount: 4890,
    enrolledCount: 21500,
    skills: ['HTML5 & CSS3', 'JavaScript ES6+', 'React 19', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'TailwindCSS'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-fs-1',
        title: 'Module 1: Semantic HTML5 & Modern CSS3 Flexbox / Grid',
        description: 'Semantic markup, accessibility, CSS Grid, Flexbox, and mobile-first responsive design.',
        lessons: [
          {
            id: 'les-fs-1',
            title: '1.1 Modern Semantic HTML5 & CSS Flexbox Layouts',
            duration: '22 mins',
            videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
            summary: 'Structure modern web pages with semantic HTML5 tags and CSS Flexbox alignment.',
            content: 'Semantic HTML provides clear structural meaning to search engines and accessibility tools.',
            codeSnippet: '<header class="navbar flex justify-between p-4 bg-slate-900 text-white">\n  <h1 class="font-bold">GovtPrep IT Academy</h1>\n</header>',
            quiz: [
              { id: 'q-fs-1', question: 'Which HTML element contains the primary document content?', options: ['<section>', '<main>', '<content>', '<aside>'], answer: 1, explanation: 'The `<main>` tag is the standard semantic container for core content.' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Mastering React 19 & Next.js: Modern Frontend Architecture',
    slug: 'mastering-react-nextjs',
    description: 'Build lightning-fast web applications with React 19, Hooks, Server Components, State Management (Zustand), and Next.js App Router.',
    category: 'Web Development',
    level: 'Intermediate',
    durationHours: 24.0,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    instructor: 'Rohan Deshmukh',
    instructorRole: 'Principal UI Architect & Tech Lead',
    badge: 'Trending',
    rating: 4.92,
    reviewCount: 2840,
    enrolledCount: 12900,
    skills: ['React 19', 'Next.js App Router', 'Server Components', 'React Hooks', 'Zustand', 'TypeScript', 'TailwindCSS'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-react-1',
        title: 'Module 1: React 19 Hooks & Server Components',
        description: 'Virtual DOM, reconciliation, useState, useEffect, useMemo, and Next.js App Router.',
        lessons: [
          {
            id: 'les-react-1',
            title: '1.1 React 19 Core Hooks & Server Components',
            duration: '25 mins',
            videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
            summary: 'Learn React 19 state management, hooks, and Server vs Client component boundaries.',
            content: 'React 19 simplifies component rendering with automated optimization and server components.',
            codeSnippet: 'export default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;\n}',
            quiz: [
              { id: 'q-react-1', question: 'What is the purpose of React `useState` hook?', options: ['Manage local component state', 'Perform HTTP requests', 'Directly mutate DOM nodes', 'Load CSS styles'], answer: 0, explanation: '`useState` manages reactive local state inside functional components.' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Backend Engineering with Node.js, Express & Microservices',
    slug: 'nodejs-backend-engineering',
    description: 'Build scalable, secure REST APIs and microservices with Node.js, Express, JWT Authentication, Redis Caching, and Docker.',
    category: 'Web Development',
    level: 'Intermediate to Advanced',
    durationHours: 22.0,
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=80',
    instructor: 'Sameer Gupta',
    instructorRole: 'Principal Backend Engineer',
    badge: 'Industry Essential',
    rating: 4.91,
    reviewCount: 2130,
    enrolledCount: 10500,
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Security', 'Redis Caching', 'Rate Limiting', 'Prisma ORM'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-node-1',
        title: 'Module 1: Express.js Routing, Middleware & JWT Authentication',
        description: 'Middleware pipelines, input validation, JWT token issuance, and password hashing with bcrypt.',
        lessons: [
          {
            id: 'les-node-1',
            title: '1.1 Building Secure REST APIs with Express & JWT',
            duration: '28 mins',
            videoUrl: 'https://www.youtube.com/embed/oeJDNDzHkXU',
            summary: 'Configure Express server, build middleware chains, and issue secure JSON Web Tokens.',
            content: 'Express is a minimal Node.js framework for fast, robust API backend services.',
            codeSnippet: 'import express from "express";\nconst app = express();\napp.use(express.json());\napp.get("/api/health", (req, res) => res.json({ status: "OK" }));',
            quiz: [
              { id: 'q-node-1', question: 'Which function parses JSON request bodies in modern Express?', options: ['express.json()', 'express.bodyParser()', 'express.parse()', 'express.data()'], answer: 0, explanation: '`express.json()` is the built-in middleware for parsing application/json requests.' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Python Django & FastAPI Full-Stack Web Services',
    slug: 'django-fastapi-backend',
    description: 'Learn Python web frameworks: Django ORM, Admin, Templates, plus modern high-performance asynchronous APIs with FastAPI & Pydantic.',
    category: 'Web Development',
    level: 'Intermediate',
    durationHours: 20.0,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    instructor: 'Meera Nambiar',
    instructorRole: 'Lead Python Backend Engineer',
    badge: 'High Speed',
    rating: 4.89,
    reviewCount: 1670,
    enrolledCount: 8400,
    skills: ['FastAPI', 'Django 5', 'Pydantic', 'AsyncIO', 'SQLAlchemy / Django ORM', 'Swagger Docs'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-fastapi-1',
        title: 'Module 1: High-Performance Async APIs with FastAPI & Pydantic',
        description: 'Asynchronous route handlers, automatic OpenAPI documentation, and type-validated Pydantic models.',
        lessons: [
          {
            id: 'les-fastapi-1',
            title: '1.1 FastAPI Setup, Path Parameters & Pydantic Models',
            duration: '20 mins',
            videoUrl: 'https://www.youtube.com/embed/0rsztfGLzN0',
            summary: 'Build high-throughput Python async endpoints with automatic Swagger documentation.',
            content: 'FastAPI leverages Python type hints to validate requests and generate interactive OpenAPI documentation.',
            codeSnippet: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Course(BaseModel):\n    title: str\n    category: str\n    is_free: bool = True\n\n@app.post("/courses")\nasync def create_course(course: Course):\n    return {"message": "Created", "data": course}',
            quiz: [
              { id: 'q-fastapi-1', question: 'Which tool does FastAPI use for data validation and schema definitions?', options: ['Pydantic', 'Marshmallow', 'Cerberus', 'Joi'], answer: 0, explanation: 'FastAPI uses Pydantic for data parsing and validation.' }
            ]
          }
        ]
      }
    ]
  },

  // 3. MOBILE APP DEVELOPMENT
  {
    title: 'Flutter & Dart: Cross-Platform iOS & Android Mastery',
    slug: 'flutter-dart-mobile-development',
    description: 'Build native iOS and Android apps with Flutter, Dart, Stateless/Stateful Widgets, Provider & Bloc state management, and Firebase.',
    category: 'Mobile Development',
    level: 'Beginner to Intermediate',
    durationHours: 28.0,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    instructor: 'Aditya Verma',
    instructorRole: 'Senior Mobile Engineer & Flutter GDE',
    badge: 'Cross-Platform',
    rating: 4.93,
    reviewCount: 2450,
    enrolledCount: 11900,
    skills: ['Flutter 3+', 'Dart Language', 'Widgets Tree', 'State Management (Bloc/Provider)', 'REST API Integration', 'Firebase Mobile'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-flutter-1',
        title: 'Module 1: Dart Fundamentals & Flutter Widget Architecture',
        description: 'Everything is a Widget: Layouts, Scaffold, AppBar, ListView, and handling gestures.',
        lessons: [
          {
            id: 'les-flutter-1',
            title: '1.1 Building UI Layouts with Flutter Stateless & Stateful Widgets',
            duration: '26 mins',
            videoUrl: 'https://www.youtube.com/embed/1gDhl4leEzA',
            summary: 'Understand the Flutter reactive widget tree, MaterialApp, Scaffold, and stateful lifecycle.',
            content: 'Flutter compiles Dart directly to native ARM machine code for 60/120 FPS mobile performance.',
            codeSnippet: 'import "package:flutter/material.dart";\n\nvoid main() => runApp(const MyApp());\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(home: Scaffold(appBar: AppBar(title: const Text("GovtPrep Mobile"))));\n  }\n}',
            quiz: [
              { id: 'q-fl-1', question: 'Which language is used to build Flutter mobile applications?', options: ['Kotlin', 'Dart', 'Swift', 'TypeScript'], answer: 1, explanation: 'Flutter applications are built using the Dart programming language.' }
            ]
          }
        ]
      }
    ]
  },

  // 4. DATABASE & DATA ENGINEERING
  {
    title: 'SQL, PostgreSQL & Relational Database Engineering',
    slug: 'sql-postgresql-mastery',
    description: 'Master SQL Queries, Joins, Aggregations, Window Functions, Indexing (B-Tree), Transactions (ACID), and PostgreSQL optimization.',
    category: 'Database',
    level: 'Beginner to Advanced',
    durationHours: 18.0,
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    instructor: 'Sanjay Deshpande',
    instructorRole: 'Principal Database Architect',
    badge: 'Core Skill',
    rating: 4.96,
    reviewCount: 3820,
    enrolledCount: 18200,
    skills: ['SQL', 'PostgreSQL', 'Complex Joins', 'Window Functions', 'Indexing & Query Plans', 'ACID Transactions', 'Database Design'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-sql-1',
        title: 'Module 1: Complex Queries, Subqueries & Window Functions',
        description: 'SELECT, GROUP BY, HAVING, INNER/OUTER JOINs, and analytic window functions (ROW_NUMBER, RANK, DENSE_RANK).',
        lessons: [
          {
            id: 'les-sql-1',
            title: '1.1 Advanced SQL Joins & Window Functions (RANK, OVER)',
            duration: '24 mins',
            videoUrl: 'https://www.youtube.com/embed/HXV3zeRRBAQ',
            summary: 'Solve complex analytical SQL queries using window partitions and multi-table joins.',
            content: 'Window functions perform calculations across sets of table rows related to the current query row without collapsing rows.',
            codeSnippet: 'SELECT \n    candidate_name,\n    exam_score,\n    category,\n    DENSE_RANK() OVER (PARTITION BY category ORDER BY exam_score DESC) as rank_in_category\nFROM exam_results;',
            quiz: [
              { id: 'q-sql-1', question: 'Which clause is used to filter groups created by GROUP BY in SQL?', options: ['WHERE', 'HAVING', 'FILTER', 'LIMIT'], answer: 1, explanation: '`HAVING` filters aggregated groups, whereas `WHERE` filters individual rows before grouping.' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'MongoDB & NoSQL Document Database Architecture',
    slug: 'mongodb-nosql-mastery',
    description: 'Schema design for MongoDB, CRUD operations, Aggregation Pipeline, Indexing strategies, Replication, and Sharding for scale.',
    category: 'Database',
    level: 'Beginner to Intermediate',
    durationHours: 16.0,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    instructor: 'Tanvi Joshi',
    instructorRole: 'NoSQL Data Architect',
    badge: 'Popular',
    rating: 4.89,
    reviewCount: 2010,
    enrolledCount: 9400,
    skills: ['MongoDB', 'BSON Documents', 'Aggregation Framework', 'Index Strategies', 'Mongoose / Prisma', 'Replication'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-mongo-1',
        title: 'Module 1: MongoDB CRUD & Multi-Stage Aggregation Pipeline',
        description: '$match, $group, $project, $lookup (joins), $unwind, and index optimization.',
        lessons: [
          {
            id: 'les-mongo-1',
            title: '1.1 Mastering the MongoDB Aggregation Pipeline ($match, $group, $lookup)',
            duration: '25 mins',
            videoUrl: 'https://www.youtube.com/embed/ofme2o29ngU',
            summary: 'Transform and aggregate multi-million document collections with MongoDB Pipelines.',
            content: 'Aggregation pipelines process documents through multiple sequential stages to compute analytic results.',
            codeSnippet: 'db.courses.aggregate([\n  { $match: { isPublished: true, isFree: true } },\n  { $group: { _id: "$category", totalCourses: { $sum: 1 }, avgRating: { $avg: "$rating" } } },\n  { $sort: { totalCourses: -1 } }\n]);',
            quiz: [
              { id: 'q-mng-1', question: 'Which MongoDB aggregation stage performs an equality match join with another collection?', options: ['$join', '$lookup', '$merge', '$populate'], answer: 1, explanation: 'The `$lookup` stage performs left outer joins to another collection in the same database.' }
            ]
          }
        ]
      }
    ]
  },

  // 5. DATA STRUCTURES & ALGORITHMS (DSA)
  {
    title: 'Data Structures & Algorithms in C++ & Java (Placement Prep)',
    slug: 'dsa-placement-mastery',
    description: 'Master Arrays, Two Pointers, Linked Lists, Trees, Graphs, Dynamic Programming, and top 150 LeetCode interview problems.',
    category: 'DSA',
    level: 'All Levels',
    durationHours: 35.0,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    instructor: 'Aman Singhal',
    instructorRole: 'Ex-Google SDE & Competitive Programming Mentor',
    badge: 'Interview Ready',
    rating: 4.97,
    reviewCount: 5120,
    enrolledCount: 24500,
    skills: ['Time & Space Complexity', 'Arrays & Strings', 'Trees & BST', 'Graphs (BFS/DFS)', 'Dynamic Programming', 'LeetCode Patterns'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-dsa-1',
        title: 'Module 1: Asymptotic Complexity & Two-Pointer Patterns',
        description: 'Big-O notation, Slided Window, Two Pointers, and Binary Search.',
        lessons: [
          {
            id: 'les-dsa-1',
            title: '1.1 Master Big-O Notation & Two-Pointer Algorithm Pattern',
            duration: '22 mins',
            videoUrl: 'https://www.youtube.com/embed/8hly31xKli0',
            summary: 'Calculate time complexities (O(1), O(log n), O(n), O(n log n)), and solve Two Sum in O(n) time.',
            content: 'Two pointers is a fundamental algorithmic pattern that simplifies search across ordered collections.',
            codeSnippet: 'function twoSum(nums, target) {\n  let map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    let complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}',
            quiz: [
              { id: 'q-dsa-1', question: 'What is the time complexity of searching in a Balanced Binary Search Tree (AVL/Red-Black)?', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'], answer: 1, explanation: 'Balanced BSTs maintain O(log N) height for search, insert, and delete.' }
            ]
          }
        ]
      }
    ]
  },

  // 6. CLOUD & DEVOPS
  {
    title: 'Cloud Computing & DevOps Fundamentals (AWS, Docker, CI/CD)',
    slug: 'cloud-devops-fundamentals',
    description: 'Learn Linux command line, Docker containers, Kubernetes orchestration, AWS Cloud essentials, and automated GitHub Actions pipelines.',
    category: 'Cloud & DevOps',
    level: 'Beginner to Intermediate',
    durationHours: 20.0,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    instructor: 'Karthik Nair',
    instructorRole: 'Cloud Solutions Architect & DevOps Lead',
    badge: 'Industry Essential',
    rating: 4.89,
    reviewCount: 1890,
    enrolledCount: 9200,
    skills: ['Linux Shell', 'Docker', 'Kubernetes', 'AWS (EC2, S3, RDS)', 'CI/CD Pipelines', 'GitHub Actions', 'Nginx'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-devops-1',
        title: 'Module 1: Docker Containerization & Multi-Stage Builds',
        description: 'Dockerfiles, container lifecycles, volumes, networks, and Docker Compose.',
        lessons: [
          {
            id: 'les-devops-1',
            title: '1.1 Docker Containers & Multi-Stage Production Builds',
            duration: '26 mins',
            videoUrl: 'https://www.youtube.com/embed/gAkwW2tuIqE',
            summary: 'Package applications with Docker containers for deterministic production deployments.',
            content: 'Containers package application code, system libraries, and runtime dependencies together for consistent execution everywhere.',
            codeSnippet: 'FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build',
            quiz: [
              { id: 'q-dck-1', question: 'Which command runs a Docker container in the background (detached mode)?', options: ['docker run -d', 'docker run -b', 'docker start -bg', 'docker exec -d'], answer: 0, explanation: 'The `-d` flag runs containers in detached mode in the background.' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'AWS Cloud Practitioner & Solutions Architect Fundamentals',
    slug: 'aws-cloud-solutions-architect',
    description: 'Learn Amazon Web Services: EC2 Compute, S3 Storage, VPC Networking, IAM Security, RDS Databases, Lambda Serverless, and CloudFront CDN.',
    category: 'Cloud & DevOps',
    level: 'Beginner to Intermediate',
    durationHours: 22.0,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    instructor: 'Harish Ranganathan',
    instructorRole: 'AWS Certified Solutions Architect & Enterprise Trainer',
    badge: 'High Salary',
    rating: 4.95,
    reviewCount: 3100,
    enrolledCount: 14200,
    skills: ['AWS EC2', 'AWS S3', 'VPC & Subnets', 'IAM Security', 'AWS Lambda Serverless', 'CloudWatch', 'Route 53'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-aws-1',
        title: 'Module 1: AWS Global Infrastructure, IAM & EC2 Compute',
        description: 'Regions, Availability Zones, IAM policies, roles, EC2 instances, security groups, and SSH keys.',
        lessons: [
          {
            id: 'les-aws-1',
            title: '1.1 AWS IAM Roles, Policies & Launching Secure EC2 Instances',
            duration: '25 mins',
            videoUrl: 'https://www.youtube.com/embed/3hLmDS179YE',
            summary: 'Master AWS Identity & Access Management (IAM) and configure secure Linux virtual servers on EC2.',
            content: 'IAM manages authentication and authorization across all AWS services following the principle of least privilege.',
            codeSnippet: '{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": ["s3:GetObject", "s3:ListBucket"],\n      "Resource": "arn:aws:s3:::govtprep-assets/*"\n    }\n  ]\n}',
            quiz: [
              { id: 'q-aws-1', question: 'Which AWS service provides highly scalable object storage with 99.999999999% durability?', options: ['Amazon EBS', 'Amazon S3', 'Amazon EFS', 'Amazon RDS'], answer: 1, explanation: 'Amazon S3 (Simple Storage Service) provides 11 9s of durability for object storage.' }
            ]
          }
        ]
      }
    ]
  },

  // 7. CYBERSECURITY
  {
    title: 'Cybersecurity Fundamentals & Ethical Hacking',
    slug: 'cybersecurity-ethical-hacking',
    description: 'Learn Network Security, Web Application Penetration Testing (OWASP Top 10), Cryptography, Linux Security, and SOC Analyst defense.',
    category: 'Cybersecurity',
    level: 'Beginner to Intermediate',
    durationHours: 24.0,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    instructor: 'Capt. Abhay Sharma (Retd.)',
    instructorRole: 'Cybersecurity Consultant & CEH Instructor',
    badge: 'Trending',
    rating: 4.93,
    reviewCount: 2950,
    enrolledCount: 13800,
    skills: ['Network Security', 'OWASP Top 10', 'Penetration Testing', 'Wireshark', 'Burp Suite', 'Cryptography', 'Incident Response'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-sec-1',
        title: 'Module 1: Web Vulnerabilities (SQLi, XSS, CSRF) & Defense',
        description: 'Understand OWASP Top 10 vulnerabilities, SQL Injection prevention with parameterized queries, and XSS sanitization.',
        lessons: [
          {
            id: 'les-sec-1',
            title: '1.1 Preventing SQL Injection & Cross-Site Scripting (XSS)',
            duration: '26 mins',
            videoUrl: 'https://www.youtube.com/embed/inWWhr5tnEA',
            summary: 'Analyze how attackers exploit unsanitized inputs and implement parameterized queries and Content Security Policy (CSP).',
            content: 'Web security begins with input validation, output encoding, and parameterized database interactions.',
            codeSnippet: '// SECURE: Parameterized query preventing SQL Injection\nconst query = "SELECT * FROM users WHERE email = $1 AND is_active = true";\nconst result = await db.query(query, [userSuppliedEmail]);',
            quiz: [
              { id: 'q-sec-1', question: 'What is the primary countermeasure against SQL Injection in web applications?', options: ['Strong passwords', 'Parameterized queries / Prepared statements', 'Using HTTPS', 'Client-side JS regex only'], answer: 1, explanation: 'Prepared statements separate SQL code from user data, preventing attackers from injecting commands.' }
            ]
          }
        ]
      }
    ]
  },

  // 8. AI / ML & GENERATIVE AI
  {
    title: 'AI & Machine Learning with Python: Zero to Neural Networks',
    slug: 'ai-machine-learning-python',
    description: 'Learn Data Science, NumPy, Pandas, Scikit-Learn, Linear Regression, Decision Trees, Deep Learning with PyTorch, and GenAI fundamentals.',
    category: 'AI / ML',
    level: 'Beginner to Intermediate',
    durationHours: 26.5,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80',
    instructor: 'Dr. Siddharth Sen',
    instructorRole: 'AI Research Scientist & IIT Bombay Alumnus',
    badge: 'High Demand',
    rating: 4.96,
    reviewCount: 3950,
    enrolledCount: 16800,
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-Learn', 'Supervised Learning', 'PyTorch', 'Neural Networks', 'LLMs & GenAI'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-ai-1',
        title: 'Module 1: Machine Learning Pipelines with Scikit-Learn',
        description: 'Data preprocessing, feature scaling, training classifiers, and evaluating accuracy, precision, recall.',
        lessons: [
          {
            id: 'les-ai-1',
            title: '1.1 NumPy Vectorization & Training First Random Forest Classifier',
            duration: '28 mins',
            videoUrl: 'https://www.youtube.com/embed/7eh4d6sabA0',
            summary: 'Clean datasets, split training/testing samples, and train high-accuracy classification models.',
            content: 'Machine learning algorithms learn statistical patterns from historical data to make predictions on unseen inputs.',
            codeSnippet: 'from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)\nprint(f"Accuracy: {clf.score(X_test, y_test):.2%}")',
            quiz: [
              { id: 'q-ai-1', question: 'Which metric measures the proportion of true positive predictions among all positive claims?', options: ['Recall', 'Precision', 'F1-Score', 'ROC-AUC'], answer: 1, explanation: 'Precision = TP / (TP + FP), measuring exactness of positive predictions.' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Generative AI, Large Language Models (LLMs) & LangChain',
    slug: 'generative-ai-llms-langchain',
    description: 'Build AI applications with OpenAI, Claude, Gemini, LangChain, RAG (Retrieval-Augmented Generation), Vector DBs (Chroma/Pinecone), and Prompt Engineering.',
    category: 'AI / ML',
    level: 'Intermediate',
    durationHours: 20.0,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    instructor: 'Nikhil Kashyap',
    instructorRole: 'GenAI Engineer & AI Startup Founder',
    badge: 'Cutting Edge',
    rating: 4.97,
    reviewCount: 2780,
    enrolledCount: 15400,
    skills: ['Prompt Engineering', 'LangChain', 'RAG Architecture', 'Vector Embeddings', 'ChromaDB', 'OpenAI API', 'Hugging Face'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-genai-1',
        title: 'Module 1: Prompt Engineering & RAG Architecture with Vector Databases',
        description: 'Context injection, embeddings, semantic similarity search, and building an AI Document Assistant.',
        lessons: [
          {
            id: 'les-genai-1',
            title: '1.1 Retrieval-Augmented Generation (RAG) & Vector Search',
            duration: '26 mins',
            videoUrl: 'https://www.youtube.com/embed/LhnCs7VXA4o',
            summary: 'Learn how RAG prevents hallucination by feeding relevant document chunks into LLM prompt contexts.',
            content: 'RAG indexes external documents as vector embeddings, retrieves the most semantically relevant chunks at runtime, and feeds them to the LLM.',
            codeSnippet: 'import { OpenAIEmbeddings } from "@langchain/openai";\nimport { MemoryVectorStore } from "langchain/vectorstores/memory";\n\nconst vectorStore = await MemoryVectorStore.fromTexts(\n  ["GovtPrep provides free IT courses with certificates."],\n  [{ id: 1 }],\n  new OpenAIEmbeddings()\n);',
            quiz: [
              { id: 'q-gen-1', question: 'What does RAG stand for in Generative AI architectures?', options: ['Rapid Access Generation', 'Retrieval-Augmented Generation', 'Randomized Array Graph', 'Recurrent Agent Generator'], answer: 1, explanation: 'RAG stands for Retrieval-Augmented Generation.' }
            ]
          }
        ]
      }
    ]
  },

  // 9. DATA ANALYTICS & BI
  {
    title: 'Data Analytics Mastery with Power BI, Tableau & SQL',
    slug: 'data-analytics-powerbi-tableau',
    description: 'Learn business intelligence from data modeling and DAX formulas in Power BI to interactive storytelling dashboards in Tableau and SQL data wrangling.',
    category: 'Data Analytics',
    level: 'Beginner to Intermediate',
    durationHours: 19.0,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    instructor: 'Shweta Mathur',
    instructorRole: 'Lead BI Consultant & Analytics Director',
    badge: 'High Demand',
    rating: 4.91,
    reviewCount: 3120,
    enrolledCount: 13600,
    skills: ['Power BI', 'Tableau', 'DAX Measures', 'Data Modeling (Star Schema)', 'Excel Analytics', 'Business KPIs', 'Storytelling'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-bi-1',
        title: 'Module 1: Power BI Data Modeling & DAX Calculated Measures',
        description: 'Star schema relationships, calculated columns, CALCULATE, SUMX, FILTER, and time intelligence functions.',
        lessons: [
          {
            id: 'les-bi-1',
            title: '1.1 Power BI Star Schema Modeling & Essential DAX Measures',
            duration: '22 mins',
            videoUrl: 'https://www.youtube.com/embed/AGrl-H87pRU',
            summary: 'Build clean dimensional star schemas and write high-performance DAX measure formulas.',
            content: 'Good data modeling simplifies reporting and enables blazing fast dashboard response times.',
            codeSnippet: 'Total Placed Candidates = \nCALCULATE(\n    COUNT(Candidates[CandidateID]),\n    Candidates[PlacementStatus] = "Placed"\n)',
            quiz: [
              { id: 'q-bi-1', question: 'Which DAX function is the most powerful in Power BI, allowing you to modify filter context?', options: ['SUM', 'CALCULATE', 'COUNTROWS', 'LOOKUPVALUE'], answer: 1, explanation: '`CALCULATE` evaluates an expression in a modified filter context.' }
            ]
          }
        ]
      }
    ]
  },

  // 10. UI/UX DESIGN
  {
    title: 'UI/UX Design Masterclass with Figma & Design Systems',
    slug: 'ui-ux-design-figma',
    description: 'Master User Experience research, wireframing, UI typography, color theory, Auto-Layout, Components, interactive prototypes in Figma, and design systems.',
    category: 'UI / UX',
    level: 'Beginner to Advanced',
    durationHours: 17.5,
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
    instructor: 'Kavya Nair',
    instructorRole: 'Staff Product Designer & UX Researcher',
    badge: 'Creative',
    rating: 4.94,
    reviewCount: 2280,
    enrolledCount: 10900,
    skills: ['Figma', 'Auto-Layout', 'Design Systems', 'Wireframing', 'Typography & Color', 'Interactive Prototyping', 'User Research'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-ux-1',
        title: 'Module 1: Figma Auto-Layout, Components & Interactive Prototyping',
        description: 'Responsive frames, component variants, interactive micro-animations, and design token architectures.',
        lessons: [
          {
            id: 'les-ux-1',
            title: '1.1 Figma Auto-Layout 5.0, Component Sets & Design Tokens',
            duration: '24 mins',
            videoUrl: 'https://www.youtube.com/embed/jwCcwSmsnuk',
            summary: 'Master dynamic resizing with Auto-Layout and organize scalable UI design systems.',
            content: 'Figma Auto Layout mirrors CSS Flexbox, allowing designers to create components that adapt to content and screen sizes.',
            codeSnippet: '// Design System Token Sample\nexport const designTokens = {\n  colors: { primary: "#7c3aed", surface: "#0f172a", text: "#f8fafc" },\n  radius: { sm: "8px", md: "12px", lg: "16px" }\n};',
            quiz: [
              { id: 'q-ux-1', question: 'Which Figma feature automatically adjusts padding and spacing as text or items change?', options: ['Constraints', 'Auto Layout', 'Smart Animate', 'Masking'], answer: 1, explanation: 'Auto Layout dynamically adjusts frame dimensions according to child elements and padding.' }
            ]
          }
        ]
      }
    ]
  },

  // 11. SOFTWARE TESTING & QA
  {
    title: 'Software Testing & Automation (Selenium, Playwright & QA)',
    slug: 'software-testing-automation-qa',
    description: 'From Manual Testing fundamentals, test cases, and bug lifecycles to modern test automation with Selenium, Playwright, TestNG, and CI/CD testing.',
    category: 'Testing & QA',
    level: 'Beginner to Intermediate',
    durationHours: 19.5,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    instructor: 'Rajeev Menon',
    instructorRole: 'Principal QA Architect & Automation Lead',
    badge: 'High Placement',
    rating: 4.88,
    reviewCount: 1920,
    enrolledCount: 8900,
    skills: ['Manual Testing', 'Selenium WebDriver', 'Playwright', 'TestNG / JUnit', 'API Testing (Postman)', 'Page Object Model', 'CI/CD QA'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-qa-1',
        title: 'Module 1: Automation Frameworks with Selenium & Playwright',
        description: 'Page Object Model (POM), locators (XPath, CSS), assertions, and automated test reporting.',
        lessons: [
          {
            id: 'les-qa-1',
            title: '1.1 Modern End-to-End Testing with Playwright & TypeScript',
            duration: '22 mins',
            videoUrl: 'https://www.youtube.com/embed/Xz6qhhnv4w8',
            summary: 'Write resilient automated end-to-end tests with automatic waiting and cross-browser coverage.',
            content: 'Playwright enables fast, reliable end-to-end testing for modern web apps with built-in auto-waiting.',
            codeSnippet: 'import { test, expect } from "@playwright/test";\n\ntest("verify free courses list loads", async ({ page }) => {\n  await page.goto("http://localhost:5173/tech-courses");\n  await expect(page.locator("h1")).toContainText("Free IT");\n});',
            quiz: [
              { id: 'q-qa-1', question: 'What is the primary advantage of the Page Object Model (POM) pattern in test automation?', options: ['Makes tests run 10x faster', 'Reduces code duplication and enhances test maintainability', 'Removes need for assertions', 'Translates Java to Python'], answer: 1, explanation: 'POM separates page structure/locators from test logic, making test suites easy to update when UI changes.' }
            ]
          }
        ]
      }
    ]
  },

  // 12. SYSTEM DESIGN & SOFTWARE ENGINEERING
  {
    title: 'System Design & High-Level Architecture (HLD / LLD)',
    slug: 'system-design-software-architecture',
    description: 'Master Scalability, Load Balancers, Caching (Redis), CDNs, Database Sharding, Message Queues (Kafka/RabbitMQ), Microservices, and Design Patterns.',
    category: 'Software Engineering',
    level: 'Intermediate to Advanced',
    durationHours: 25.0,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    instructor: 'Arjun Swaminathan',
    instructorRole: 'Staff Systems Architect & Tech Lead',
    badge: 'Interview Critical',
    rating: 4.98,
    reviewCount: 4120,
    enrolledCount: 19800,
    skills: ['High-Level Design (HLD)', 'Low-Level Design (LLD)', 'Load Balancing', 'Redis Caching', 'Database Sharding', 'Message Queues', 'Microservices'],
    isPublished: true,
    isFree: true,
    modules: [
      {
        id: 'mod-sys-1',
        title: 'Module 1: Scalability, Caching & Distributed Systems Architecture',
        description: 'Horizontal vs Vertical scaling, CAP theorem, Consistent Hashing, Cache-aside pattern, and rate limiters.',
        lessons: [
          {
            id: 'les-sys-1',
            title: '1.1 Designing Large-Scale Distributed Caching & Rate Limiting Systems',
            duration: '28 mins',
            videoUrl: 'https://www.youtube.com/embed/i5COn_2S62M',
            summary: 'Architect resilient systems capable of handling millions of requests per second using Redis caching clusters.',
            content: 'Distributed caching drastically reduces database read latency and shields backend services from traffic spikes.',
            codeSnippet: '// Token Bucket Rate Limiter Concept\nclass RateLimiter {\n  constructor(capacity, refillRatePerSec) {\n    this.capacity = capacity;\n    this.tokens = capacity;\n    this.refillRate = refillRatePerSec;\n    this.lastRefill = Date.now();\n  }\n  allowRequest() {\n    this.refill();\n    if (this.tokens >= 1) { this.tokens--; return true; }\n    return false;\n  }\n}',
            quiz: [
              { id: 'q-sys-1', question: 'According to the CAP theorem, which two guarantees can a distributed system provide in the presence of a network partition (P)?', options: ['Consistency (C) or Availability (A)', 'Speed or Durability', 'Replication or Sharding', 'Compression or Encryption'], answer: 0, explanation: 'When a network partition occurs, a distributed system must choose between Consistency (CP) or Availability (AP).' }
            ]
          }
        ]
      }
    ]
  }
];

async function seedAllCourses() {
  console.log('🌱 Starting comprehensive Free IT Courses library seeding in MongoDB...');
  
  try {
    for (const courseData of EXPANDED_COURSES) {
      let totalLessons = 0;
      courseData.modules.forEach(m => {
        totalLessons += (m.lessons ? m.lessons.length : 0);
      });
      (courseData as any).lessonsCount = totalLessons;

      const upserted = await prisma.course.upsert({
        where: { slug: courseData.slug },
        update: {
          ...courseData,
        },
        create: {
          ...courseData,
        },
      });

      console.log(`✅ Seeded: "${upserted.title}" [${upserted.category}] (${upserted.lessonsCount} lessons)`);
    }

    console.log(`\n🎉 Successfully populated ${EXPANDED_COURSES.length} comprehensive Free IT Courses into MongoDB!`);
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAllCourses();
