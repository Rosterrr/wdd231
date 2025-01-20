// Get the current year and update the footer's first paragraph
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get the document's last modified date and update the second paragraph
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;
