
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
var scrollButton = document.getElementById('scroll-to-top');

document.querySelectorAll('.nav-toggle').forEach(el => {
    var mainNav = document.querySelector('.main-nav');
    el.addEventListener('click', () => {
        if(mainNav.classList.contains('open') == false){
            mainNav.classList.add('open');
        }else{
            mainNav.classList.remove('open');
        }
    });
});
scrollButton.addEventListener('click', () => {
    document.body.scrollTop = 0; // For Safari
    parallaxScroll.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

/* parallaxScroll.addEventListener('scroll', function(e) {
    // console.log('Top: ' + parallaxScroll.scrollTop);
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}); */
parallaxScroll.onscroll =  () => {
    if (document.body.scrollTop > pixelScrollLimit || parallaxScroll.scrollTop > pixelScrollLimit) {
        scrollButton.style.display = 'grid';
    } else {
        scrollButton.style.display = 'none';
    };
}

/* function fadeIn(el, time) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
} */