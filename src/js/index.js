
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
var mainNavigation = document.querySelector('.main-nav');
var scrollToTopButton = document.getElementById('scroll-to-top');
var showLocatorBtn = document.getElementById('show-locator');
var scrollToProductsBtn = document.getElementById('scroll-to-products');

/* Nav buttons */
/* var scrollToHomeBtn = document.getElementById('scroll-home-btn'); */
var scrollToConceptBtn = document.getElementById('scroll-concept-btn');
var scrollToProductBtnNav = document.getElementById('scroll-products-btn');
var scrollToStoryBtn = document.getElementById('scroll-story-btn');
var scrollToHashtagBtn = document.getElementById('scroll-hashtag-btn');
var scrollToContactsBtn = document.getElementById('scroll-contacts-btn');
var scrollToEventsBtn = document.getElementById('scroll-events-btn');
var navButtons = document.querySelectorAll('.btn-nav');
/* Nav buttons */

document.querySelectorAll('.nav-toggle').forEach(el => {
    el.addEventListener('click', () => {
        mainNavigation.classList.toggle('open');
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
    var parent = window.pageYOffset || parallaxScroll.scrollTop || document.body.scrollTop;    
    parallaxScroll.scroll({
        top: top.top + parent,
        left: 0,
        behavior: "smooth"
    }); 
});
navButtons.forEach((el) => {
    el.addEventListener('click', () => {
        var respectiveDOM = document.getElementById(el.getAttribute('data-link'));
        scrollTo(respectiveDOM);
    });
});
function scrollTo(el){
    var top = el.getBoundingClientRect();
    var parent = window.pageYOffset || parallaxScroll.scrollTop || document.body.scrollTop;
    parallaxScroll.scroll({
        top: top.top + parent,
        left: 0,
        behavior: "smooth"
    });
    mainNavigation.classList.toggle('open'); 
}
/* window.onload = (() => {
    parallaxScroll.scroll({
        top: 6700,
        // behavior: "smooth"
    });
}); */