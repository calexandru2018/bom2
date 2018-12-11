
import 'normalize.css';
import '../../node_modules/fullcalendar/dist/fullcalendar.min.css';
import '../fonts/Antro_Vectra_Bolder.otf';
import '../css/main.css';
import '../img/bq.jpg';
import '../img/bq4.jpg';
import '../img/bq2.jpg';
import '../img/bq3.jpg';
import '../img/logo.png';
import '../img/favicon16.ico';
import { Calendar } from 'fullcalendar';

var pixelScrollLimit = 450; 
var w = window.innerWidth;
var parallaxScroll = document.querySelector('.parallax-wrapper');
var mainNavigation = document.querySelector('.main-nav');
var navButtons = document.querySelectorAll('.btn-nav');
var scrollToTopButton = document.getElementById('scroll-to-top');
var mainToggleBtn = document.getElementById('main-toggle-button');
var showLocatorBtn = document.getElementById('show-locator');
var scrollToProductsBtn = document.getElementById('scroll-to-products');
var calendarEl = document.getElementById('calendar');
  
var calendar = new Calendar(calendarEl, {
    defaultView: 'month',
    locale: 'pt',
    height: 'parent',
    firstDay: 1,
    navLinks: false, //will change to true  so people can ask for events
    buttonText: {
        today:  'hoje'
    },
    events: [
        {
            title: 'Albufeira',
            start: '2018-12-01',
            end: '2018-12-05',
            description: 'This is a cool event',
            url: 'https://www.google.com/maps/dir/?api=1&destination=37.015578,-7.920545'
        },
        {
            title: 'Aljezur',
            start: '2018-12-07',
            end: '2018-12-10',
            description: 'This is a cool event',
            url: 'https://www.google.com/maps/dir/?api=1&destination=37.352141,-8.843425'
        }
    ],
    eventClick: (info) => {
        info.jsEvent.preventDefault(); // don't let the browser navigate

        if (info.event.url) {
          window.open(info.event.url, '_blank');
        }
    },
/*     navLinkDayClick: function(date, jsEvent) {
        console.log('day', date.toISOString());
        console.log('coords', jsEvent.pageX, jsEvent.pageY);
    } */
});

document.addEventListener('DOMContentLoaded', () =>  {
    calendar.render();
});
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
    scrollTo(document.getElementById('products'), false, ((w >= 992) ? true : false));
});
navButtons.forEach((el) => {
    el.addEventListener('click', () => {
        var respectiveDOM = document.getElementById(el.getAttribute('data-link'));
        scrollTo(respectiveDOM, true, ((w >= 992) ? true : false));
    });
});
function scrollTo(el, navigationBtnPressed, isDesktop){
    var top = el.getBoundingClientRect();
    var parent = window.pageYOffset || parallaxScroll.scrollTop || document.body.scrollTop;
    var scrollAmmount= ((el.id == 'homepage') ? 0 : top.top + parent);
    console.log(el.id);
     parallaxScroll.scroll({
        top: scrollAmmount,
        left: 0,
        behavior: "smooth"
    }); 
    if(navigationBtnPressed && !isDesktop)
        mainNavigation.classList.toggle('open'); 
}