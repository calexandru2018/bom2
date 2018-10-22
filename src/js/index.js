
import 'normalize.css';
import '../fonts/Antro_Vectra_Bolder.otf';
import '../css/main.css';
import '../img/bq.jpg';
import '../img/bq4.jpg';
import '../img/bq2.jpg';
import '../img/bq3.jpg';
import '../img/logo.png';

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