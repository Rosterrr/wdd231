import { courses } from './courses-data.js'; // if you separate data

const container = document.getElementById("courses-container");
const creditDisplay = document.getElementById("totalCredits");

function displayCourses(courseList) {
  container.innerHTML = ""; // clear
  let totalCredits = 0;

  courseList.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `
      <h3>${course.name}</h3>
      <p>${course.code}</p>
      <p>Credits: ${course.credits}</p>
    `;

    container.appendChild(card);
    totalCredits += course.credits;
  });

  creditDisplay.textContent = totalCredits;
}

document.getElementById("all-btn").addEventListener("click", () => {
  displayCourses(courses);
});
document.getElementById("wdd-btn").addEventListener("click", () => {
  displayCourses(courses.filter(c => c.code.includes("WDD")));
});
document.getElementById("cse-btn").addEventListener("click", () => {
  displayCourses(courses.filter(c => c.code.includes("CSE")));
});

displayCourses(courses); // initial load
