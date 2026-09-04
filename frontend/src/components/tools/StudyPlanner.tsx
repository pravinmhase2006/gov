'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square, 
  Sparkles,
  Layers,
  AlertCircle,
  Download
} from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  weightage: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  notes?: string;
}

interface SubjectModule {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: Topic[];
}

interface ExamPlan {
  id: string;
  title: string;
  examDate: string;
  targetHoursPerDay: number;
  modules: SubjectModule[];
}

const PRESET_PLANS: Record<string, ExamPlan> = {
  'ssc-cgl': {
    id: 'ssc-cgl',
    title: 'SSC CGL (Tier 1 & Tier 2)',
    examDate: '2025-09-15',
    targetHoursPerDay: 5,
    modules: [
      {
        id: 'quant',
        name: 'Quantitative Aptitude',
        icon: '📐',
        color: 'from-blue-600 to-indigo-600',
        topics: [
          { id: 'q1', name: 'Percentage, Profit & Loss, Discount', weightage: '4-5 Qs', priority: 'High', completed: true },
          { id: 'q2', name: 'Ratio, Proportion & Mixture Alligation', weightage: '2-3 Qs', priority: 'Medium', completed: true },
          { id: 'q3', name: 'Time, Speed, Distance & Trains', weightage: '2-3 Qs', priority: 'High', completed: false },
          { id: 'q4', name: 'Algebra & Quadratic Identities', weightage: '3-4 Qs', priority: 'High', completed: false },
          { id: 'q5', name: 'Trigonometry & Heights and Distances', weightage: '3-4 Qs', priority: 'High', completed: false },
          { id: 'q6', name: 'Geometry & Mensuration 2D/3D', weightage: '4-5 Qs', priority: 'High', completed: false },
          { id: 'q7', name: 'Data Interpretation (Bar/Pie/Table)', weightage: '4 Qs', priority: 'Medium', completed: false }
        ]
      },
      {
        id: 'reasoning',
        name: 'General Intelligence & Reasoning',
        icon: '🧩',
        color: 'from-purple-600 to-pink-600',
        topics: [
          { id: 'r1', name: 'Analogy & Classification', weightage: '3-4 Qs', priority: 'High', completed: true },
          { id: 'r2', name: 'Coding-Decoding & Number Series', weightage: '4-5 Qs', priority: 'High', completed: true },
          { id: 'r3', name: 'Syllogism & Venn Diagrams', weightage: '2-3 Qs', priority: 'High', completed: false },
          { id: 'r4', name: 'Blood Relations & Direction Sense', weightage: '2-3 Qs', priority: 'Medium', completed: false },
          { id: 'r5', name: 'Paper Folding, Mirror Images & Non-Verbal', weightage: '3-4 Qs', priority: 'Medium', completed: false }
        ]
      },
      {
        id: 'english',
        name: 'English Language & Comprehension',
        icon: '📖',
        color: 'from-emerald-600 to-teal-600',
        topics: [
          { id: 'e1', name: 'Reading Comprehension & Cloze Test', weightage: '5-10 Qs', priority: 'High', completed: false },
          { id: 'e2', name: 'Spotting the Error & Sentence Improvement', weightage: '4-5 Qs', priority: 'High', completed: true },
          { id: 'e3', name: 'Direct/Indirect Speech & Active/Passive Voice', weightage: '4-6 Qs', priority: 'High', completed: false },
          { id: 'e4', name: 'Idioms, Phrases & One Word Substitution', weightage: '4-5 Qs', priority: 'Medium', completed: false },
          { id: 'e5', name: 'Synonyms, Antonyms & Spelling Errors', weightage: '4 Qs', priority: 'Medium', completed: false }
        ]
      },
      {
        id: 'ga',
        name: 'General Awareness & Static GK',
        icon: '🏛️',
        color: 'from-amber-600 to-orange-600',
        topics: [
          { id: 'g1', name: 'Indian Polity, Constitution & Articles', weightage: '4-5 Qs', priority: 'High', completed: false },
          { id: 'g2', name: 'Modern Indian History & Freedom Struggle', weightage: '3-4 Qs', priority: 'High', completed: false },
          { id: 'g3', name: 'Physical & Indian Geography (Rivers, Passes)', weightage: '3 Qs', priority: 'Medium', completed: false },
          { id: 'g4', name: 'General Science (Physics, Chemistry, Biology)', weightage: '5-6 Qs', priority: 'High', completed: false },
          { id: 'g5', name: 'Last 8 Months Current Affairs & Gov Schemes', weightage: '5-6 Qs', priority: 'High', completed: false }
        ]
      }
    ]
  },
  'sde-tech': {
    id: 'sde-tech',
    title: 'Full Stack & SDE-1 Career Roadmap',
    examDate: '2025-10-30',
    targetHoursPerDay: 4,
    modules: [
      {
        id: 'dsa',
        name: 'Data Structures & Algorithms',
        icon: '⚡',
        color: 'from-blue-600 to-cyan-600',
        topics: [
          { id: 'd1', name: 'Arrays, Two Pointers & Sliding Window', weightage: 'Frequent', priority: 'High', completed: true },
          { id: 'd2', name: 'HashMaps, Stacks & Queues', weightage: 'Frequent', priority: 'High', completed: true },
          { id: 'd3', name: 'Binary Trees, BST & Tree Traversals', weightage: 'Must Do', priority: 'High', completed: false },
          { id: 'd4', name: 'Graphs, BFS/DFS, Dijkstra & Topological Sort', weightage: 'Advanced', priority: 'High', completed: false },
          { id: 'd5', name: 'Dynamic Programming (1D & 2D Grid)', weightage: 'Advanced', priority: 'High', completed: false }
        ]
      },
      {
        id: 'cs-core',
        name: 'Computer Science Fundamentals',
        icon: '💻',
        color: 'from-violet-600 to-indigo-600',
        topics: [
          { id: 'c1', name: 'DBMS: SQL Queries, Indexing & Normalization', weightage: 'Core', priority: 'High', completed: false },
          { id: 'c2', name: 'Operating Systems: Threads, Deadlocks, Virtual Memory', weightage: 'Core', priority: 'High', completed: false },
          { id: 'c3', name: 'Computer Networks: TCP/IP, HTTP/HTTPS, DNS', weightage: 'Core', priority: 'Medium', completed: false },
          { id: 'c4', name: 'Low-Level System Design & Design Patterns (SOLID)', weightage: 'Core', priority: 'High', completed: false }
        ]
      }
    ]
  }
};

export default function StudyPlanner() {
  const [selectedExamKey, setSelectedExamKey] = useState<string>('ssc-cgl');
  const [currentPlan, setCurrentPlan] = useState<ExamPlan>(PRESET_PLANS['ssc-cgl']);
  const [newTopicName, setNewTopicName] = useState<string>('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('quant');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`govtprep_study_plan_${selectedExamKey}`);
      if (saved) {
        setCurrentPlan(JSON.parse(saved));
      } else {
        setCurrentPlan(PRESET_PLANS[selectedExamKey] || PRESET_PLANS['ssc-cgl']);
      }
    } catch {
      setCurrentPlan(PRESET_PLANS[selectedExamKey] || PRESET_PLANS['ssc-cgl']);
    }
  }, [selectedExamKey]);

  const savePlan = (updated: ExamPlan) => {
    setCurrentPlan(updated);
    try {
      localStorage.setItem(`govtprep_study_plan_${selectedExamKey}`, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const toggleTopic = (moduleId: string, topicId: string) => {
    const nextModules = currentPlan.modules.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          topics: mod.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t)
        };
      }
      return mod;
    });

    savePlan({ ...currentPlan, modules: nextModules });
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    const nextModules = currentPlan.modules.map(mod => {
      if (mod.id === selectedModuleId) {
        const newTopic: Topic = {
          id: `custom-${Date.now()}`,
          name: newTopicName.trim(),
          weightage: 'Target',
          priority: 'High',
          completed: false
        };
        return { ...mod, topics: [...mod.topics, newTopic] };
      }
      return mod;
    });

    savePlan({ ...currentPlan, modules: nextModules });
    setNewTopicName('');
  };

  const handleDeleteTopic = (moduleId: string, topicId: string) => {
    const nextModules = currentPlan.modules.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          topics: mod.topics.filter(t => t.id !== topicId)
        };
      }
      return mod;
    });

    savePlan({ ...currentPlan, modules: nextModules });
  };

  // Stats calculation
  const allTopics = currentPlan.modules.flatMap(m => m.topics);
  const completedTopics = allTopics.filter(t => t.completed);
  const totalTopics = allTopics.length;
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics.length / totalTopics) * 100) : 0;

  // Days remaining calculation
  const targetDate = new Date(currentPlan.examDate);
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold border border-indigo-400/20">
              <Sparkles className="w-3.5 h-3.5" /> Smart Exam Preparation Roadmap
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Interactive Syllabus Tracker & Study Planner
            </h1>
            <p className="text-indigo-100/80 text-sm max-w-xl">
              Track chapter-wise completion, high-yield exam weightage, remaining countdown days, and daily study targets.
            </p>
          </div>

          {/* Exam Selector Dropdown */}
          <div className="w-full md:w-auto">
            <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
              Select Target Roadmap
            </label>
            <select
              value={selectedExamKey}
              onChange={(e) => setSelectedExamKey(e.target.value)}
              className="bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-400 transition-all cursor-pointer w-full md:w-64"
            >
              <option value="ssc-cgl" className="text-slate-900">SSC CGL Tier-1 & Tier-2</option>
              <option value="sde-tech" className="text-slate-900">SDE-1 & Tech Placement</option>
            </select>
          </div>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Syllabus Covered</div>
            <div className="text-2xl font-black text-slate-800">{progressPercent}%</div>
            <div className="text-xs text-slate-400">{completedTopics.length} of {totalTopics} topics done</div>
          </div>
        </div>

        {/* Days Left */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Days Remaining</div>
            <div className="text-2xl font-black text-amber-600">{diffDays} Days</div>
            <div className="text-xs text-slate-400">Target Date: {currentPlan.examDate}</div>
          </div>
        </div>

        {/* Daily Study Goal */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Daily Study Goal</div>
            <div className="text-2xl font-black text-emerald-600">{currentPlan.targetHoursPerDay} hrs/day</div>
            <div className="text-xs text-slate-400">Consistency multiplier: 1.2x</div>
          </div>
        </div>

        {/* Modules Count */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Subjects</div>
            <div className="text-2xl font-black text-purple-600">{currentPlan.modules.length} Modules</div>
            <div className="text-xs text-slate-400">100% Exam Aligned</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Subject Modules & Topic Checklist */}
        <div className="lg:col-span-2 space-y-6">
          {currentPlan.modules.map((mod) => {
            const modCompleted = mod.topics.filter(t => t.completed).length;
            const modPercent = mod.topics.length > 0 ? Math.round((modCompleted / mod.topics.length) * 100) : 0;

            return (
              <div key={mod.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Module Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{mod.icon}</span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">{mod.name}</h3>
                      <div className="text-xs text-slate-400">
                        {modCompleted} of {mod.topics.length} topics completed ({modPercent}%)
                      </div>
                    </div>
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${mod.color} transition-all duration-500`} 
                      style={{ width: `${modPercent}%` }}
                    />
                  </div>
                </div>

                {/* Topics List */}
                <div className="divide-y divide-slate-100">
                  {mod.topics.map((topic) => (
                    <div 
                      key={topic.id}
                      onClick={() => toggleTopic(mod.id, topic.id)}
                      className={`p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        topic.completed ? 'bg-slate-50/50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className={`shrink-0 transition-colors ${
                            topic.completed ? 'text-emerald-600' : 'text-slate-300 hover:text-slate-400'
                          }`}
                        >
                          {topic.completed ? (
                            <CheckSquare className="w-5 h-5 fill-emerald-100" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>
                        <div>
                          <p className={`text-sm font-medium ${
                            topic.completed ? 'line-through text-slate-400' : 'text-slate-700'
                          }`}>
                            {topic.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                          {topic.weightage}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${
                          topic.priority === 'High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}>
                          {topic.priority}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTopic(mod.id, topic.id);
                          }}
                          className="p-1 text-slate-300 hover:text-rose-500 rounded transition-colors"
                          title="Delete topic"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Add Custom Topic & Study Tips */}
        <div className="space-y-6">
          {/* Add Custom Topic Box */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-800 text-sm">Add Custom Topic / Chapter</h3>
            </div>
            
            <form onSubmit={handleAddTopic} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Subject Module</label>
                <select
                  value={selectedModuleId}
                  onChange={(e) => setSelectedModuleId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {currentPlan.modules.map(m => (
                    <option key={m.id} value={m.id}>{m.icon} {m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Topic Name</label>
                <input
                  type="text"
                  placeholder="e.g., Vedic Math Shortcuts or Trees DP"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add to Study Roadmap
              </button>
            </form>
          </div>

          {/* Pomodoro & Revision Schedule Advice */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-3xl border border-indigo-800/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles className="w-4 h-4" />
              <h4 className="font-bold text-xs uppercase tracking-wider">Aspirant Revision Rule (1-7-30)</h4>
            </div>
            <p className="text-xs text-indigo-100/90 leading-relaxed">
              For 100% memory retention in competitive exams, revise every completed chapter at <strong>Day 1</strong>, <strong>Day 7</strong>, and <strong>Day 30</strong>. Pair each session with 25 minutes of active test solving.
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300">
              <span>Goal: 200+ Practice MCQs/day</span>
              <span className="text-emerald-300 font-semibold">Keep Going! 🚀</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
