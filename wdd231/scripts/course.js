const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD231", name: "Frontend Development I", credits: 3, type: "WDD", completed: false },
  { code: "CSE110", name: "Intro to Programming", credits: 2, type: "CSE", completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 2, type: "CSE", completed: false },
];

const coursesContainer = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(list) {
  coursesContainer.innerHTML = "";
  list.forEach(course => {
    const div = document.createElement("div");
    div.className = "course" + (course.completed ? " completed" : "");
    div.innerHTML = `<h3>${course.code}: ${course.name}</h3>
                     <p>Credits: ${course.credits}</p>
                     <p>Type: ${course.type}</p>`;
    coursesContainer.appendChild(div);
  });

  // total credits
  const credits = list.reduce((sum, c) => sum + c.credits, 0);
  totalCredits.textContent = `Total Credits: ${credits}`;
}

document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.type === "WDD")));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.type === "CSE")));

displayCourses(courses);
