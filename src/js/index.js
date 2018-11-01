
import 'normalize.css';
import '../fonts/Antro_Vectra_Bolder.otf';
import '../css/main.css';
import '../img/bq.jpg';
import '../img/bq4.jpg';
import '../img/bq2.jpg';
import '../img/bq3.jpg';
import '../img/logo.png';

var pixelScrollLimit = 450; 
var w = window.innerWidth;
var parallaxScroll = document.querySelector('.parallax-wrapper');
var mainNavigation = document.querySelector('.main-nav');
var navButtons = document.querySelectorAll('.btn-nav');
var scrollToTopButton = document.getElementById('scroll-to-top');
var mainToggleBtn = document.getElementById('main-toggle-button');
var showLocatorBtn = document.getElementById('show-locator');
var scrollToProductsBtn = document.getElementById('scroll-to-products');

window.addEventListener('resize', () => {
    w = window.innerWidth;
});
document.querySelectorAll('.nav-toggle').forEach(el => {
    el.addEventListener('click', () => {
        if(w >= 992){
            mainNavigation.classList.toggle('close-navigation');
            parallaxScroll.classList.toggle('expand-main');
            mainToggleBtn.classList.toggle('fullscreen-navigation-toggle');
        }else{
            mainNavigation.classList.toggle('open');
        }
        console.log(`Width is ${w}`);
        
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
    scrollTo(document.getElementById('products'), false);
});
navButtons.forEach((el) => {
    el.addEventListener('click', () => {
        var respectiveDOM = document.getElementById(el.getAttribute('data-link'));
        scrollTo(respectiveDOM, true);
    });
});
function scrollTo(el, navigationBtnPressed){
    var top = el.getBoundingClientRect();
    var parent = window.pageYOffset || parallaxScroll.scrollTop || document.body.scrollTop;
    parallaxScroll.scroll({
        top: top.top + parent,
        left: 0,
        behavior: "smooth"
    });
    if(navigationBtnPressed)
        mainNavigation.classList.toggle('open'); 
}
/* window.onload = (() => {
    parallaxScroll.scroll({
        top: 6700,
        // behavior: "smooth"
    });
}); */