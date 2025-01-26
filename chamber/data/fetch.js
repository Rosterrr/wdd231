// Function to toggle between grid and list views
function toggleLayout(viewType) {
    const container = document.getElementById('directory-container');
    
    if (viewType === 'grid') {
        container.className = 'grid-layout'; // Apply grid class for grid view
    } else {
        container.className = 'list-layout'; // Apply list class for list view
    }
}

// Fetch member data from the members.json file
async function fetchMemberData() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Display member data dynamically
function displayMembers(members) {
    const container = document.getElementById('directory-container');
    container.innerHTML = ''; // Clear any previous data

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        // Create the member card content
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${member.membership_level === 3 ? 'Gold' : member.membership_level === 2 ? 'Silver' : 'Member'}</p>
            <p><strong>Other Info:</strong> ${member.other_info}</p>
        `;
        
        container.appendChild(memberCard);
    });
}

// Display the current year and last modified date
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Fetch and display member data when the page loads
fetchMemberData();
