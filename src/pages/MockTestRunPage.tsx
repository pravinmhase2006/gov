import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@/lib/navigation';
import Link from '@/components/common/Link';
import MockTestEngine from '@/components/tests/MockTestEngine';
import { dataService } from '@/services/dataService';
import { MockTestDetail } from '@/types';
import { ArrowLeft } from 'lucide-react';

export default function MockTestRunPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [testDetail, setTestDetail] = useState<MockTestDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTest() {
      setLoading(true);
      // Construct a mock test with sample CBT questions
      const mockQuestions = [
        {
          id: 'q1',
          questionText: 'Which Article of the Indian Constitution empowers the Parliament to amend the Constitution?',
          questionHindi: 'भारतीय संविधान का कौन सा अनुच्छेद संसद को संविधान में संशोधन करने की शक्ति देता है?',
          options: [
            { id: 'opt1', text: 'Article 352', isCorrect: false },
            { id: 'opt2', text: 'Article 368', isCorrect: true },
            { id: 'opt3', text: 'Article 370', isCorrect: false },
            { id: 'opt4', text: 'Article 356', isCorrect: false },
          ],
          explanation: 'Article 368 in Part XX of the Constitution of India deals with the powers of Parliament to amend the Constitution and its procedure.',
          subject: 'General Awareness / Polity',
          difficulty: 'EASY',
          marks: 2,
          negativeMarks: 0.5,
        },
        {
          id: 'q2',
          questionText: 'If 12 men can complete a work in 15 days working 8 hours a day, how many men are needed to complete double the work in 20 days working 6 hours a day?',
          questionHindi: 'यदि 12 पुरुष प्रतिदिन 8 घंटे काम करके एक काम को 15 दिनों में पूरा कर सकते हैं, तो प्रतिदिन 6 घंटे काम करके 20 दिनों में दोगुना काम पूरा करने के लिए कितने पुरुषों की आवश्यकता होगी?',
          options: [
            { id: 'opt1', text: '24 men', isCorrect: true },
            { id: 'opt2', text: '18 men', isCorrect: false },
            { id: 'opt3', text: '32 men', isCorrect: false },
            { id: 'opt4', text: '20 men', isCorrect: false },
          ],
          explanation: 'Formula: (M1 * D1 * H1) / W1 = (M2 * D2 * H2) / W2 -> (12 * 15 * 8) / 1 = (M2 * 20 * 6) / 2 -> 1440 = 60 * M2 -> M2 = 24.',
          subject: 'Quantitative Aptitude',
          difficulty: 'MEDIUM',
          marks: 2,
          negativeMarks: 0.5,
        },
        {
          id: 'q3',
          questionText: 'Select the related word from the given alternatives: Court : Justice :: School : ?',
          questionHindi: 'दिए गए विकल्पों में से संबंधित शब्द का चयन करें: न्यायालय : न्याय :: विद्यालय : ?',
          options: [
            { id: 'opt1', text: 'Teacher', isCorrect: false },
            { id: 'opt2', text: 'Student', isCorrect: false },
            { id: 'opt3', text: 'Education', isCorrect: true },
            { id: 'opt4', text: 'Classroom', isCorrect: false },
          ],
          explanation: 'Just as justice is delivered in a court, education is imparted in a school.',
          subject: 'General Intelligence & Reasoning',
          difficulty: 'EASY',
          marks: 2,
          negativeMarks: 0.5,
        },
        {
          id: 'q4',
          questionText: 'Choose the correct synonym of the given word: "METICULOUS"',
          questionHindi: '"METICULOUS" शब्द का सही समानार्थी चुनें:',
          options: [
            { id: 'opt1', text: 'Careless', isCorrect: false },
            { id: 'opt2', text: 'Painstaking / Thorough', isCorrect: true },
            { id: 'opt3', text: 'Hasty', isCorrect: false },
            { id: 'opt4', text: 'Lenient', isCorrect: false },
          ],
          explanation: 'Meticulous means showing great attention to detail; very careful and precise.',
          subject: 'English Comprehension',
          difficulty: 'MEDIUM',
          marks: 2,
          negativeMarks: 0.5,
        },
        {
          id: 'q5',
          questionText: 'Where is the headquarters of the Indian Space Research Organisation (ISRO) located?',
          questionHindi: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) का मुख्यालय कहाँ स्थित है?',
          options: [
            { id: 'opt1', text: 'New Delhi', isCorrect: false },
            { id: 'opt2', text: 'Bengaluru', isCorrect: true },
            { id: 'opt3', text: 'Hyderabad', isCorrect: false },
            { id: 'opt4', text: 'Thiruvananthapuram', isCorrect: false },
          ],
          explanation: 'The headquarters of ISRO is located in Bengaluru, Karnataka, established in 1969.',
          subject: 'General Awareness',
          difficulty: 'EASY',
          marks: 2,
          negativeMarks: 0.5,
        },
      ];

      const sampleDetail: MockTestDetail = {
        id: 'test-run-1',
        title: slug ? slug.replace(/-/g, ' ').toUpperCase() : 'ALL INDIA CBT SPEED TEST',
        slug: slug || 'all-india-mock-test',
        durationMinutes: 30,
        totalMarks: 50,
        totalQuestions: mockQuestions.length,
        positiveMarks: 2,
        negativeMarks: 0.5,
        passingMarks: 20,
        instructions: 'Read all questions carefully. Each correct answer carries 2 marks and 0.5 marks will be deducted for every incorrect attempt.',
        questions: mockQuestions as any,
      };

      setTestDetail(sampleDetail);
      setLoading(false);
    }
    loadTest();
  }, [slug]);

  if (loading || !testDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold">Initializing Exam Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <MockTestEngine test={testDetail} />
    </div>
  );
}
