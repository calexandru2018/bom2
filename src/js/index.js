
import 'normalize.css';
import '../fonts/Antro_Vectra_Bolder.otf';
import '../css/main.css';
import '../img/bq.jpg';
import '../img/bq4.jpg';
import '../img/bq2.jpg';
import '../img/bq3.jpg';
import '../img/logo.png';

var parallaxScroll = document.querySelector('.parallax-wrapper');
var pixelScrollLimit = 450; 
var scrollToTopButton = document.getElementById('scroll-to-top');
var showLocatorBtn = document.getElementById('show-locator');
var scrollToProductsBtn = document.getElementById('scroll-to-products');

/* Nav buttons */
var scrollToHomeBtn = document.getElementById('scroll-to-home');
var scrollToConceptBtn = document.getElementById('scroll-to-concept');
// var scrollToProductBtn = document.getElementById('scroll-to-home');
var scrollToStoryBtn = document.getElementById('scroll-to-story');
var scrollToHashtagBtn = document.getElementById('scroll-to-hashtag');
var scrollToContactsBtn = document.getElementById('scroll-to-contacts');
var scrollToEventsBtn = document.getElementById('scroll-to-events');
/* Nav buttons */

document.querySelectorAll('.nav-toggle').forEach(el => {
    var mainNav = document.querySelector('.main-nav');
    el.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
});
parallaxScroll.addEventListener('scroll', () => {
    if (document.body.scrollTop > pixelScrollLimit || parallaxScroll.scrollTop > pixelScrollLimit) {
        scrollToTopButton.style.opacity = 1;
    } else {
        scrollToTopButton.style.opacity = 0;
    };
});
scrollToTopButton.addEventListener('click', () => {
    // document.body.scrollTop = 0; // For Safari
    // parallaxScroll.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    parallaxScroll.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
});
showLocatorBtn.addEventListener('click', () => {
    document.querySelector('.roadmap').classList.toggle('show-locator-toggle');
});
scrollToProductsBtn.addEventListener('click', () => {
    var top = document.getElementById('products').getBoundingClientRect();
    parallaxScroll.scroll({
        top: top.top,
        left: 0,
        behavior: "smooth"
    });
});
/* window.onload = (() => {
    parallaxScroll.scroll({
        top: 6700,
        // behavior: "smooth"
    });
}); */