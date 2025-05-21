const url = 'data/members.json';
const container = document.querySelector('.directory');

async function getMembers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error('Error loading members:', error);
  }
}

function displayMembers(members) {
  container.innerHTML = ''; // clear existing cards

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo">
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p class="level ${getLevelClass(member.membership)}">Membership Level: ${getLevelName(member.membership)}</p>
    `;

    container.appendChild(card);
  });
}

function getLevelName(level) {
  switch (level) {
    case 3: return 'Gold';
    case 2: return 'Silver';
    default: return 'Member';
  }
}

function getLevelClass(level) {
  switch (level) {
    case 3: return 'gold';
    case 2: return 'silver';
    default: return 'basic';
  }
}

// View toggle
document.getElementById('gridView').addEventListener('click', () => {
  container.classList.add('grid');
  container.classList.remove('list');
});

document.getElementById('listView').addEventListener('click', () => {
  container.classList.add('list');
  container.classList.remove('grid');
});

// Date Footer
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

getMembers();
