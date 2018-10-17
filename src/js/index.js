
import 'normalize.css';
import '../css/main.css';
import '../img/bq.jpg';
import '../img/bq4.jpg';

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