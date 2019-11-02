var menuButton = document.querySelector('#menu-button');
var menuCloseButton = document.querySelector('#menu-close-button');
var page = document.querySelector('.page');
var pageOverlay = document.querySelector('.page-overlay');

menuButton.addEventListener('click', function() {
    openMenu();
});

menuCloseButton.addEventListener('click', function() {
    closeMenu();
});

pageOverlay.addEventListener('click', function() {
    closeMenu();
});

function openMenu() {
    page.classList.add('minimize');
    setTimeout(() => {
        pageOverlay.style.display = 'block';
    }, 900);
};

function closeMenu() {
    pageOverlay.style.display = 'none';
    page.classList.add('maximize');
    setTimeout(() => {
        page.classList.remove('minimize');
        page.classList.remove('maximize');
    }, 900);
};