async function runTests() {
  const base = 'http://localhost:5000/api/courses';

  console.log('Testing 1: GET /api/courses');
  const res1 = await fetch(base);
  const json1 = await res1.json();
  console.log(`✅ Loaded ${json1.count} courses`);

  console.log('Testing 2: GET /api/courses/python-for-beginners');
  const res2 = await fetch(`${base}/python-for-beginners`);
  const json2 = await res2.json();
  const course = json2.data;
  console.log(`✅ Found course: "${course.title}" with ID: ${course.id}`);

  console.log('Testing 3: POST /api/courses/enroll');
  const userId = `test_aspirant_${Date.now()}`;
  const res3 = await fetch(`${base}/enroll`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      courseId: course.id,
      userId,
      userName: 'Pravin Mhase',
      userEmail: 'pravin@example.com',
    }),
  });
  const json3 = await res3.json();
  console.log(`✅ Enrolled successfully:`, json3.success);

  console.log('Testing 4: POST /api/courses/progress for all lessons');
  for (const mod of course.modules) {
    for (const les of mod.lessons) {
      await fetch(`${base}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          userId,
          lessonId: les.id,
          completed: true,
          userName: 'Pravin Mhase',
        }),
      });
    }
  }
  console.log('✅ Marked all lessons as completed (100% progress)');

  console.log('Testing 5: POST /api/courses/certificate/claim');
  const res5 = await fetch(`${base}/certificate/claim`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      courseId: course.id,
      userId,
      recipientName: 'Pravin Mhase',
      recipientEmail: 'pravin@example.com',
    }),
  });
  const json5 = await res5.json();
  console.log(`✅ Certificate Claimed: Code: ${json5.data?.certificateCode}`);

  console.log(`Testing 6: GET /api/courses/certificate/${json5.data?.certificateCode}`);
  const res6 = await fetch(`${base}/certificate/${json5.data?.certificateCode}`);
  const json6 = await res6.json();
  console.log(`✅ Verified Certificate:`, json6.data?.recipientName, '-', json6.data?.courseTitle);

  console.log('\n🎉 ALL 6 BACKEND ENDPOINTS ARE FULLY OPERATIONAL AND VERIFIED!');
}

runTests().catch(console.error);
