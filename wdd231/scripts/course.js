import { courses } from './courses-data.js';

export const courses = [
  { name: "Web Frontend", code: "WDD 130", credits: 3, completed: true },
  { name: "Advanced JS", code: "WDD 231", credits: 3, completed: false },
  { name: "Intro to CS", code: "CSE 110", credits: 2, completed: true },
  { name: "Python Programming", code: "CSE 210", credits: 3, completed: false }
];


const courseContainer = document.getElementById('courses-container');
const creditDisplay = document.getElementById('totalCredits');

// Load all courses by default
displayCourses(courses);

// Filter event listeners
document.getElementById('all-btn').addEventListener('click', () => displayCourses(courses));
document.getElementById('wdd-btn').addEventListener('click', () => {
  const filtered = courses.filter(c => c.code.startsWith("WDD"));
  displayCourses(filtered);
});
document.getElementById('cse-btn').addEventListener('click', () => {
  const filtered = courses.filter(c => c.code.startsWith("CSE"));
  displayCourses(filtered);
});

function displayCourses(list) {
  courseContainer.innerHTML = ''; // Clear previous
  let totalCredits = list.reduce((sum, course) => sum + course.credits, 0);
  creditDisplay.textContent = totalCredits;

  list.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) card.classList.add('completed');
    card.innerHTML = `
      <h3>${course.name}</h3>
      <p><strong>Code:</strong> ${course.code}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Status:</strong> ${course.completed ? '✅ Completed' : '❌ Not Completed'}</p>
    `;
    courseContainer.appendChild(card);
  });
}

// Footer: dynamic year and last modified
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;
