// Function to show last visit message
function showLastVisitMessage() {
    const sidebar = document.getElementById("sidebar");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        sidebar.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        sidebar.textContent = daysBetween < 1 ? 
            "Back so soon! Awesome!" : 
            `You last visited ${daysBetween} day${daysBetween === 1 ? '' : 's'} ago.`;
    }

    localStorage.setItem("lastVisit", now);
}

// Function to fetch items and display cards
function loadItems() {
    fetch('data/items.json')
        .then(response => response.json())
        .then(data => {
            const cardsSection = document.querySelector('.cards');
            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h2>${item.name}</h2>
                    <figure>
                        <img src="${item.image}" alt="${item.name}">
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button onclick="window.location='${item.link}'">Learn More</button>
                `;
                cardsSection.appendChild(card);
            });
        })
        .catch(error => console.log('Error loading items:', error));
}

// Call functions to load content
window.onload = function() {
    showLastVisitMessage();
    loadItems();
};
