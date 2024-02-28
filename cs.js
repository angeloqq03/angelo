const chatHead = document.getElementById('chatHead');
const closeBtn = document.getElementById('closeBtn');

chatHead.addEventListener('click', () => {
  chatHead.classList.toggle('expanded');
});

closeBtn.addEventListener('click', (event) => {
  event.stopPropagation(); // Stop the click event from bubbling to the parent
  chatHead.classList.remove('expanded');
});
