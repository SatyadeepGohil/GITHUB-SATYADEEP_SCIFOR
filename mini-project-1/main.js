// Select buttons and container
let nextBtn = document.querySelector('.right');
let previousBtn = document.querySelector('.left');
let cardContainer = document.getElementById('card-container');
let cards = document.querySelectorAll('.card'); // Use querySelectorAll for NodeList

const cardWidth = cards[0].offsetWidth;
const cardMarginRight = parseFloat(window.getComputedStyle(cards[0]).marginRight);
const containerWidth = document.querySelector('#container').offsetWidth;

// Initialize offset
let offset = 0;

// Calculate the maximum offset
const totalWidth = Array.from(cards).reduce((acc, card) => acc + cardWidth + cardMarginRight, 0);
const maxOffset = -(totalWidth - containerWidth);

// Update the transform for the card container
function updateCardPosition() {
    cardContainer.style.transform = `translateX(${offset}px)`;
}

// Next button event listener
nextBtn.addEventListener('click', () => {
    const newOffset = offset - (cardWidth + cardMarginRight);
    offset = Math.max(newOffset, maxOffset);
    updateCardPosition();
});

// Previous button event listener
previousBtn.addEventListener('click', () => {
    const newOffset = offset + (cardWidth + cardMarginRight);
    offset = Math.min(newOffset, 0);
    updateCardPosition();
});

