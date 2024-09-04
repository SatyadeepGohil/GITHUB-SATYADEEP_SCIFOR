let next = document.getElementById('right');
let previous = document.getElementById('left')
let cards = document.getElementsByClassName('card');

let cardWidth = cards[0].offsetWidth;
let cardMarginRight = parseInt(getComputedStyle(cards[0]).marginRight);
let move = cardWidth + cardMarginRight;
let currentIndex = 0;

function slidecards() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.transform = `translateX(${move * (currentIndex * -1)}px)`
    }
}

next.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        slidecards()
    }
})


previous.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        slidecards();
    }
})