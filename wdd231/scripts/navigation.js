const menuButton = document.getElementById("menu");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// add CSS for .show in small.css
document.head.insertAdjacentHTML("beforeend", `
<style>
  #navLinks.show { display: block; }
</style>
`);
