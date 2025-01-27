async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const members = await response.json();
        console.log(members); // This will log the members data in the console
        
        const container = document.getElementById('member-directory');
        container.innerHTML = ''; // Clear any existing content

        if (members.length === 0) {
            container.innerHTML = '<p>No members found.</p>';
            return;
        }

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');

            // Add member data
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${member.membershipLevel}</p>
            `;

            // Append card to the container
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading members:', error);
    }
}

loadMembers(); // Call the function to load members when the page is ready
