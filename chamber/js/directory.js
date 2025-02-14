async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status}: ${response.statusText})`);
        }

        const members = await response.json();
        console.log('Fetched Members:', members);

        const container = document.getElementById('member-directory');
        container.innerHTML = ''; // Clear any existing content

        // Handle case where no members are found
        if (!Array.isArray(members) || members.length === 0) {
            container.innerHTML = '<p>No members found.</p>';
            return;
        }

        // Generate member cards
        members.forEach(member => {
            const card = createMemberCard(member);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading members:', error);

        // Fallback error message for the user
        const container = document.getElementById('member-directory');
        container.innerHTML = '<p>Unable to load member directory at this time. Please try again later.</p>';
    }
}

// Helper function to create a member card
function createMemberCard(member) {
    const card = document.createElement('div');
    card.classList.add('member-card');

    // Check for missing fields to prevent broken links or empty outputs
    const imageUrl = member.image ? `images/${member.image}` : 'images/default.png';
    const name = member.name || 'Unknown Member';
    const address = member.address || 'Address not provided';
    const phone = member.phone || 'Phone not provided';
    const website = member.website || '#';
    const membershipLevel = member.membershipLevel || 'Not specified';

    // Set card content
    card.innerHTML = `
        <img src="${imageUrl}" alt="${name}">
        <h3>${name}</h3>
        <p>${address}</p>
        <p>${phone}</p>
        <a href="${website}" target="_blank">Visit Website</a>
        <p>Membership Level: ${membershipLevel}</p>
    `;

    return card;
}

loadMembers(); // Call the function to load members when the page is ready
