const syllabus = [
  { title: 'Number & Numeration', icon: '123', color: '#e9f5ef', description: 'Place value, fractions, decimals, percentages, ratio and proportion.', lessons: ['Whole numbers and place value', 'Fractions, decimals and percentages', 'Ratio, proportion and rates'] },
  { title: 'Algebra', icon: 'x²', color: '#eef0ff', description: 'Expressions, equations, inequalities and formulas.', lessons: ['Simplifying algebraic expressions', 'Linear equations and inequalities', 'Substitution and formulas'] },
  { title: 'Geometry', icon: '△', color: '#fff4de', description: 'Lines, angles, triangles and polygons.', lessons: ['Types of angles and angle rules', 'Properties of triangles', 'Polygons and construction'] },
  { title: 'Measurement', icon: '□', color: '#fdecef', description: 'Length, area, perimeter and volume.', lessons: ['Perimeter and area', 'Surface area and volume', 'Time and money'] },
  { title: 'Statistics', icon: '∑', color: '#e7f6fb', description: 'Data collection, averages and charts.', lessons: ['Tally and frequency tables', 'Mean, median and mode', 'Bar charts and pie charts'] },
  { title: 'Probability', icon: '%', color: '#f2edfb', description: 'Simple chance and probability experiments.', lessons: ['The language of chance', 'Probability scale', 'Expected outcomes'] },
  { title: 'Commercial Maths', icon: '₦', color: '#eff4df', description: 'Profit, loss, discount and simple interest.', lessons: ['Profit and loss', 'Discount and commission', 'Simple interest'] },
  { title: 'Graphs & Coordinates', icon: '↗', color: '#e8f1f8', description: 'Cartesian plane and linear graphs.', lessons: ['Plotting coordinates', 'Reading graphs', 'Linear relationships'] }
];

const practiceQuestions = [
  { topic: 'Number & Numeration', question: 'Express ⅗ as a percentage.', options: ['35%', '60%', '65%', '75%'], answer: 1, solution: '⅗ × 100 = 60%.' },
  { topic: 'Number & Numeration', question: 'A ratio of boys to girls is 3 : 5. If there are 24 boys, how many girls are there?', options: ['32', '40', '45', '48'], answer: 1, solution: '3 parts = 24, so 1 part = 8. Girls = 5 × 8 = 40.' },
  { topic: 'Algebra', question: 'Simplify 5x + 3x − 2x.', options: ['6x', '10x', '5x²', '8x'], answer: 0, solution: 'Combine like terms: (5 + 3 − 2)x = 6x.' },
  { topic: 'Algebra', question: 'Solve 3y + 7 = 25.', options: ['y = 4', 'y = 6', 'y = 8', 'y = 10'], answer: 1, solution: 'Subtract 7: 3y = 18. Divide by 3: y = 6.' },
  { topic: 'Geometry', question: 'One angle of a triangle is 60° and another is 50°. Find the third angle.', options: ['50°', '60°', '70°', '80°'], answer: 2, solution: 'Angles in a triangle sum to 180°. 180 − (60 + 50) = 70°.' },
  { topic: 'Geometry', question: 'How many degrees are in the interior angle sum of a pentagon?', options: ['360°', '540°', '720°', '900°'], answer: 1, solution: '(n − 2) × 180 = (5 − 2) × 180 = 540°.' },
  { topic: 'Measurement', question: 'Find the area of a rectangle measuring 12 cm by 7 cm.', options: ['38 cm²', '84 cm²', '72 cm²', '19 cm²'], answer: 1, solution: 'Area = length × breadth = 12 × 7 = 84 cm².' },
  { topic: 'Statistics', question: 'Find the mean of 4, 6, 8 and 10.', options: ['6', '7', '8', '9'], answer: 1, solution: 'Mean = (4 + 6 + 8 + 10) ÷ 4 = 28 ÷ 4 = 7.' },
  { topic: 'Probability', question: 'A fair die is thrown. What is the probability of getting a 5?', options: ['1/6', '1/5', '1/3', '1/2'], answer: 0, solution: 'There is 1 favourable face out of 6 possible faces.' },
  { topic: 'Commercial Maths', question: 'An article costing ₦800 is sold for ₦960. Find the percentage profit.', options: ['20%', '25%', '30%', '15%'], answer: 0, solution: 'Profit = 160; percentage profit = 160/800 × 100 = 20%.' }
];

const pastQuestions = {};
for (let year = 2020; year <= 2026; year++) {
  pastQuestions[year] = practiceQuestions.slice((year - 2020) % 6, (year - 2020) % 6 + 4).map((q, i) => ({
    ...q,
    question: q.question,
    year
  }));
  if (pastQuestions[year].length < 4) pastQuestions[year] = practiceQuestions.slice(0, 4).map(q => ({ ...q, year }));
}

const quizQuestions = [
  { question: 'What is 25% of 240?', options: ['50', '60', '70', '80'], answer: 1 },
  { question: 'The coefficient in 7m is:', options: ['7', 'm', '7m', '0'], answer: 0 },
  { question: 'An equilateral triangle has every angle equal to:', options: ['45°', '60°', '90°', '180°'], answer: 1 },
  { question: 'The perimeter of a square of side 9 cm is:', options: ['18 cm', '36 cm', '81 cm', '27 cm'], answer: 1 },
  { question: 'Which fraction is the largest?', options: ['½', '⅓', '¾', '⅕'], answer: 2 }
];

let progress = JSON.parse(localStorage.getItem('jss3Progress') || '{}');
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function saveProgress() { localStorage.setItem('jss3Progress', JSON.stringify(progress)); }
function updateProgress() {
  const complete = Object.keys(progress).filter(k => progress[k]).length;
  const percent = Math.round((complete / syllabus.length) * 100);
  document.getElementById('progressText').textContent = `${percent}% complete`;
  document.getElementById('progressBar').style.width = `${percent}%`;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');
  document.getElementById('sidebar').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => navigate(button.dataset.page)));
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.go)));
document.getElementById('menuBtn').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));

document.getElementById('todayDate').textContent = new Date().toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

function renderStudyGrid() {
  document.getElementById('studyGrid').innerHTML = syllabus.slice(0, 4).map((item, i) => `
    <article class="study-card" data-topic="${item.title}">
      <div class="study-icon" style="background:${item.color}">${item.icon}</div>
      <div><h3>${item.title}</h3><p>${item.description}</p></div>
      <button class="round-arrow" aria-label="Open ${item.title}">→</button>
    </article>`).join('');
  document.querySelectorAll('.study-card').forEach(card => card.addEventListener('click', () => {
    navigate('syllabus');
    document.getElementById('topicSearch').value = card.dataset.topic;
    renderSyllabus(card.dataset.topic);
  }));
}

function renderSyllabus(filter = '') {
  const query = filter.trim().toLowerCase();
  const visible = syllabus.filter(item => `${item.title} ${item.description}`.toLowerCase().includes(query));
  document.getElementById('syllabusList').innerHTML = visible.map((item, i) => `
    <article class="accordion-item">
      <button class="accordion-head" aria-expanded="${i === 0}">
        <span class="topic-number" style="background:${item.color}">${item.icon}</span>
        <span class="topic-title"><strong>${item.title}</strong><small>${item.lessons.length} lessons • ${progress[item.title] ? 'Completed' : 'Not started'}</small></span>
        <span class="chevron">⌄</span>
      </button>
      <div class="accordion-body ${i === 0 ? 'open' : ''}">
        <p>${item.description}</p>
        <ul>${item.lessons.map(lesson => `<li><span>○</span>${lesson}</li>`).join('')}</ul>
        <button class="complete-btn ${progress[item.title] ? 'done' : ''}" data-complete="${item.title}">${progress[item.title] ? '✓ Completed' : 'Mark as completed'}</button>
      </div>
    </article>`).join('') || '<div class="empty-state">No topics match your search.</div>';
  document.querySelectorAll('.accordion-head').forEach(head => head.addEventListener('click', () => {
    const body = head.nextElementSibling;
    body.classList.toggle('open');
    head.setAttribute('aria-expanded', body.classList.contains('open'));
  }));
  document.querySelectorAll('[data-complete]').forEach(button => button.addEventListener('click', () => {
    progress[button.dataset.complete] = !progress[button.dataset.complete];
    saveProgress(); updateProgress(); renderSyllabus(document.getElementById('topicSearch').value || '');
  }));
}

document.getElementById('topicSearch').addEventListener('input', e => renderSyllabus(e.target.value));

function renderPractice(filter = 'all') {
  const items = filter === 'all' ? practiceQuestions : practiceQuestions.filter(q => q.topic === filter);
  document.getElementById('practiceList').innerHTML = items.map((q, i) => `
    <article class="question-card">
      <div class="question-top"><span>QUESTION ${i + 1}</span><span class="topic-tag">${q.topic}</span></div>
      <h3>${q.question}</h3>
      <div class="answer-options">${q.options.map((option, oi) => `<button data-question="${i}" data-option="${oi}"><span>${String.fromCharCode(65 + oi)}</span>${option}</button>`).join('')}</div>
      <div class="solution" id="solution-${i}"><strong>Solution:</strong> ${q.solution}</div>
    </article>`).join('');
  document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => {
    const cardIndex = Number(button.dataset.question);
    const chosen = Number(button.dataset.option);
    const card = button.closest('.question-card');
    card.querySelectorAll('.answer-options button').forEach((b, idx) => {
      b.classList.remove('correct', 'wrong');
      if (idx === items[cardIndex].answer) b.classList.add('correct');
      if (idx === chosen && idx !== items[cardIndex].answer) b.classList.add('wrong');
      b.disabled = true;
    });
    card.querySelector('.solution').classList.add('open');
  }));
}

const practiceFilter = document.getElementById('practiceFilter');
syllabus.forEach(topic => practiceFilter.add(new Option(topic.title, topic.title)));
practiceFilter.addEventListener('change', e => renderPractice(e.target.value));

function renderActivity() {
  const values = [45, 65, 38, 82, 58];
  document.getElementById('activityChart').innerHTML = ['Mon','Tue','Wed','Thu','Fri'].map((day, i) => `<div class="bar-wrap"><div class="bar" style="height:${values[i]}%"><span>${values[i]}%</span></div><small>${day}</small></div>`).join('');
}

function renderQuickPractice() {
  document.getElementById('quickPractice').innerHTML = practiceQuestions.slice(0, 3).map((q, i) => `
    <button class="quick-row" data-quick="${i}"><span class="quick-number">${i + 1}</span><span><strong>${q.topic}</strong><small>${q.question}</small></span><b>›</b></button>`).join('');
  document.querySelectorAll('[data-quick]').forEach(button => button.addEventListener('click', () => navigate('practice')));
}

function renderYears() {
  document.getElementById('yearGrid').innerHTML = Array.from({ length: 7 }, (_, i) => 2020 + i).map(year => `
    <button class="year-card" data-year="${year}"><span>JUNIOR WAEC</span><strong>${year}</strong><small>Practice paper</small><b>Open →</b></button>`).join('');
  document.querySelectorAll('[data-year]').forEach(button => button.addEventListener('click', () => openPastYear(Number(button.dataset.year))));
}

function openPastYear(year) {
  document.querySelectorAll('.year-card').forEach(card => card.classList.toggle('selected', Number(card.dataset.year) === year));
  document.getElementById('pastQuestionArea').innerHTML = `
    <div class="past-header"><div><p class="eyebrow">PRACTICE PAPER</p><h2>Junior WAEC Mathematics — ${year}</h2></div><button class="secondary-btn" id="printPaper">Print</button></div>
    ${pastQuestions[year].map((q, i) => `<article class="past-question"><span>${i + 1}</span><div><p>${q.question}</p><div class="past-options">${q.options.map((o, oi) => `<label><b>${String.fromCharCode(65 + oi)}</b> ${o}</label>`).join('')}</div><details><summary>Show answer</summary><strong>${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}</strong><p>${q.solution}</p></details></div></article>`).join('')}`;
  document.getElementById('printPaper').addEventListener('click', () => window.print());
  document.getElementById('pastQuestionArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderQuiz() {
  quizAnswered = false;
  const q = quizQuestions[quizIndex];
  document.getElementById('quizCount').textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
  document.getElementById('quizScore').textContent = `Score: ${quizScore}`;
  document.getElementById('quizProgress').style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
  document.getElementById('quizQuestion').textContent = q.question;
  document.getElementById('quizOptions').innerHTML = q.options.map((option, i) => `<button data-quiz-option="${i}"><span>${String.fromCharCode(65 + i)}</span>${option}</button>`).join('');
  document.getElementById('nextQuestion').disabled = true;
  document.getElementById('nextQuestion').textContent = quizIndex === quizQuestions.length - 1 ? 'See result →' : 'Next question →';
  document.querySelectorAll('[data-quiz-option]').forEach(button => button.addEventListener('click', () => {
    if (quizAnswered) return;
    quizAnswered = true;
    const chosen = Number(button.dataset.quizOption);
    document.querySelectorAll('[data-quiz-option]').forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add('correct');
      if (i === chosen && i !== q.answer) b.classList.add('wrong');
    });
    if (chosen === q.answer) quizScore++;
    document.getElementById('quizScore').textContent = `Score: ${quizScore}`;
    document.getElementById('nextQuestion').disabled = false;
  }));
}

document.getElementById('nextQuestion').addEventListener('click', () => {
  if (quizIndex < quizQuestions.length - 1) { quizIndex++; renderQuiz(); }
  else {
    document.querySelector('.quiz-card').innerHTML = `<div class="result"><div class="result-mark">${quizScore}/${quizQuestions.length}</div><h2>${quizScore >= 4 ? 'Excellent work!' : 'Good effort!'}</h2><p>You scored ${quizScore} out of ${quizQuestions.length}. Keep practicing to improve.</p><button class="primary-btn" id="tryAgain">Try again</button></div>`;
    document.getElementById('tryAgain').addEventListener('click', () => location.reload());
  }
});
document.getElementById('restartQuiz').addEventListener('click', () => location.reload());

document.getElementById('profileBtn').addEventListener('click', () => showToast('Welcome, JSS3 Scholar!'));

renderStudyGrid(); renderSyllabus(); renderPractice(); renderActivity(); renderQuickPractice(); renderYears(); renderQuiz(); updateProgress();
