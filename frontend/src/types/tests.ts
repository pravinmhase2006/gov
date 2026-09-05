export interface MockTestDetail {
  id: string;
  title: string;
  slug: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  passingMarks: number;
  positiveMarks?: number;
  negativeMarks?: number;
  instructions?: string;
  difficulty?: string;
  exam?: {
    name: string;
    slug: string;
    category?: string;
  };
  questions: {
    question: {
      id: string;
      topic?: string | null;
      questionText: string;
      questionTextHi?: string | null;
      optionA: string;
      optionB: string;
      optionC?: string | null;
      optionD?: string | null;
      optionAHi?: string | null;
      optionBHi?: string | null;
      optionCHi?: string | null;
      optionDHi?: string | null;
      correctAnswer?: string;
      explanation?: string | null;
      marks: number;
      negativeMarks: number;
    };
  }[];
}

export interface QuestionPaletteItem {
  index: number;
  status: 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_and_marked';
}

export interface TestResultReport {
  attemptId?: string;
  score: number;
  totalMarks: number;
  percentage: number;
  accuracy: number;
  timeTakenSeconds: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  questions?: {
    id: string;
    questionText: string;
    questionTextHi?: string | null;
    optionA: string;
    optionB: string;
    optionC?: string | null;
    optionD?: string | null;
    userAnswer?: string | null;
    correctAnswer: string;
    explanation?: string | null;
    isCorrect: boolean;
    marksObtained: number;
  }[];
  answers?: {
    id: string;
    questionText: string;
    questionTextHi?: string | null;
    optionA: string;
    optionB: string;
    optionC?: string | null;
    optionD?: string | null;
    userAnswer?: string | null;
    correctAnswer: string;
    explanation?: string | null;
    isCorrect: boolean;
    marksObtained: number;
  }[];
}
