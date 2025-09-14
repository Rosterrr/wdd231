// Fetch members.json and display
async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  const container = document.getElementById("members");
  container.innerHTML = "";
  members.forEach(member => {
    let card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p>Membership Level: ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}

// Toggle view
document.getElementById("gridBtn").addEventListener("click", () => {
  document.getElementById("members").className = "grid";
});

document.getElementById("listBtn").addEventListener("click", () => {
  document.getElementById("members").className = "list";
});

// Footer dynamic info
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Load data
getMembers();
