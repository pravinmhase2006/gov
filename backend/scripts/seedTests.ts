import prisma from '../config/db.js';

const INITIAL_TESTS = [
  {
    title: 'SSC CGL 2026 Tier-1 All India Full Length Mock Test 01',
    slug: 'ssc-cgl-tier1-mock-1',
    examName: 'SSC CGL',
    examCategory: 'SSC',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 50,
    difficulty: 'MODERATE',
    attemptsCount: 1420,
    isLive: true,
    questions: [
      {
        questionText: 'Who was the founder of the Maurya Empire in ancient India?',
        questionHindi: 'प्राचीन भारत में मौर्य साम्राज्य के संस्थापक कौन थे?',
        subject: 'General Awareness',
        marks: 2,
        negativeMarks: 0.5,
        explanation: 'Chandragupta Maurya founded the Maurya Empire in 322 BCE with the help of Chanakya (Kautilya).',
        options: [
          { id: 'opt-1', text: 'Chandragupta Maurya', textHindi: 'चन्द्रगुप्त मौर्य', isCorrect: true },
          { id: 'opt-2', text: 'Ashoka the Great', textHindi: 'सम्राट अशोक', isCorrect: false },
          { id: 'opt-3', text: 'Bindusara', textHindi: 'बिन्दुसार', isCorrect: false },
          { id: 'opt-4', text: 'Samudragupta', textHindi: 'समुद्रगुप्त', isCorrect: false },
        ],
      },
      {
        questionText: 'If 12 men can complete a work in 15 days, in how many days can 20 men complete the same work?',
        questionHindi: 'यदि 12 पुरुष किसी कार्य को 15 दिनों में पूरा कर सकते हैं, तो 20 पुरुष उसी कार्य को कितने दिनों में पूरा करेंगे?',
        subject: 'Quantitative Aptitude',
        marks: 2,
        negativeMarks: 0.5,
        explanation: 'M1 * D1 = M2 * D2 => 12 * 15 = 20 * D2 => 180 = 20 * D2 => D2 = 9 days.',
        options: [
          { id: 'opt-1', text: '8 days', textHindi: '8 दिन', isCorrect: false },
          { id: 'opt-2', text: '9 days', textHindi: '9 दिन', isCorrect: true },
          { id: 'opt-3', text: '10 days', textHindi: '10 दिन', isCorrect: false },
          { id: 'opt-4', text: '12 days', textHindi: '12 दिन', isCorrect: false },
        ],
      },
      {
        questionText: 'Select the synonym of the given word: "METICULOUS"',
        questionHindi: 'दिए गए शब्द का पर्यायवाची चुनें: "METICULOUS"',
        subject: 'English Comprehension',
        marks: 2,
        negativeMarks: 0.5,
        explanation: 'Meticulous means showing great attention to detail; very careful and precise. Diligent/Painstaking.',
        options: [
          { id: 'opt-1', text: 'Careless', textHindi: 'लापरवाह', isCorrect: false },
          { id: 'opt-2', text: 'Careful and Precise', textHindi: 'सावधान और सटीक', isCorrect: true },
          { id: 'opt-3', text: 'Speedy', textHindi: 'तेज', isCorrect: false },
          { id: 'opt-4', text: 'Ignorant', textHindi: 'अज्ञानी', isCorrect: false },
        ],
      },
      {
        questionText: 'Complete the series: 3, 7, 15, 31, 63, ?',
        questionHindi: 'शृंखला पूरी करें: 3, 7, 15, 31, 63, ?',
        subject: 'General Intelligence & Reasoning',
        marks: 2,
        negativeMarks: 0.5,
        explanation: 'Each term is (previous * 2) + 1. So 63 * 2 + 1 = 127.',
        options: [
          { id: 'opt-1', text: '125', textHindi: '125', isCorrect: false },
          { id: 'opt-2', text: '127', textHindi: '127', isCorrect: true },
          { id: 'opt-3', text: '129', textHindi: '129', isCorrect: false },
          { id: 'opt-4', text: '131', textHindi: '131', isCorrect: false },
        ],
      },
    ],
  },
  {
    title: 'RRB NTPC 2026 Stage 1 CBT Grand Speed Test',
    slug: 'rrb-ntpc-cbt1-grand-speed-test',
    examName: 'RRB NTPC',
    examCategory: 'RAILWAYS',
    durationMinutes: 90,
    totalQuestions: 30,
    totalMarks: 30,
    difficulty: 'EASY',
    attemptsCount: 2310,
    isLive: true,
    questions: [
      {
        questionText: 'What is the SI unit of electric current?',
        questionHindi: 'विद्युत धारा का SI मात्रक क्या है?',
        subject: 'General Science',
        marks: 1,
        negativeMarks: 0.33,
        explanation: 'The SI unit of electric current is Ampere (A).',
        options: [
          { id: 'opt-1', text: 'Volt', textHindi: 'वोल्ट', isCorrect: false },
          { id: 'opt-2', text: 'Ampere', textHindi: 'एम्पीयर', isCorrect: true },
          { id: 'opt-3', text: 'Ohm', textHindi: 'ओम', isCorrect: false },
          { id: 'opt-4', text: 'Watt', textHindi: 'वाट', isCorrect: false },
        ],
      },
      {
        questionText: 'Which Indian railway station was the first in India to receive a 5-star Eat Right Station certification?',
        questionHindi: '5-स्टार ईट राइट स्टेशन प्रमाणन प्राप्त करने वाला भारत का पहला रेलवे स्टेशन कौन सा था?',
        subject: 'General Awareness',
        marks: 1,
        negativeMarks: 0.33,
        explanation: 'Chhatrapati Shivaji Maharaj Terminus (CSMT) in Mumbai was the first.',
        options: [
          { id: 'opt-1', text: 'New Delhi Railway Station', textHindi: 'नई दिल्ली रेलवे स्टेशन', isCorrect: false },
          { id: 'opt-2', text: 'CSMT Mumbai', textHindi: 'सीएसएमटी मुंबई', isCorrect: true },
          { id: 'opt-3', text: 'Howrah Junction', textHindi: 'हावड़ा जंक्शन', isCorrect: false },
          { id: 'opt-4', text: 'Varanasi Cantt', textHindi: 'वाराणसी कैंट', isCorrect: false },
        ],
      },
    ],
  },
  {
    title: 'IBPS PO Prelims 2026 Speed & Accuracy Sectional Test',
    slug: 'ibps-po-prelims-mock-1',
    examName: 'IBPS PO',
    examCategory: 'BANKING',
    durationMinutes: 45,
    totalQuestions: 20,
    totalMarks: 20,
    difficulty: 'HARD',
    attemptsCount: 980,
    isLive: true,
    questions: [
      {
        questionText: 'What is the full form of RTGS in Indian Banking?',
        questionHindi: 'भारतीय बैंकिंग में RTGS का पूर्ण रूप क्या है?',
        subject: 'Banking Awareness',
        marks: 1,
        negativeMarks: 0.25,
        explanation: 'Real Time Gross Settlement is a continuous settlement of funds on an order-by-order basis.',
        options: [
          { id: 'opt-1', text: 'Real Time Gross Settlement', textHindi: 'रियल टाइम ग्रॉस सेटलमेंट', isCorrect: true },
          { id: 'opt-2', text: 'Real Trade Gross System', textHindi: 'रियल ट्रेड ग्रॉस सिस्टम', isCorrect: false },
          { id: 'opt-3', text: 'Rapid Transfer General Scheme', textHindi: 'रैपिड ट्रांसफर जनरल स्कीम', isCorrect: false },
          { id: 'opt-4', text: 'Reserve Total Guaranteed Settlement', textHindi: 'रिजर्व टोटल गारंटीड सेटलमेंट', isCorrect: false },
        ],
      },
    ],
  },
];

async function seedTests() {
  console.log('Seeding MockTests into MongoDB...');
  try {
    for (const item of INITIAL_TESTS) {
      const existing = await prisma.mockTest.findUnique({ where: { slug: item.slug } });
      if (!existing) {
        const { questions, ...testData } = item;
        const createdTest = await prisma.mockTest.create({
          data: {
            ...testData,
            questions: {
              create: questions.map((q) => ({
                questionText: q.questionText,
                questionHindi: q.questionHindi,
                subject: q.subject,
                marks: q.marks,
                negativeMarks: q.negativeMarks,
                explanation: q.explanation,
                options: q.options,
              })),
            },
          },
        });
        console.log('Created test:', createdTest.title);
      }
    }
    console.log('Seed completed successfully.');
  } catch (err) {
    console.error('Error seeding tests:', err);
  } finally {
    await prisma.$disconnect();
  }
}

seedTests();
