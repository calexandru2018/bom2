import 'normalize.css';
import '../css/dashboard.css';
import '../img/logo.png';
import '../img/favicon16.ico';
import '../img/edit.svg';
import '../img/remove.svg';
import '../img/settings.svg';
import '../img/logout.svg';

document.querySelectorAll('.btn-primary').forEach((btn) => {
    btn.addEventListener('click', () => {
        const nextEl = btn.nextElementSibling;
        nextEl.classList.toggle('display-grid'); 
    });
});
document.querySelectorAll('.btn-secondary').forEach((btn) => {
    btn.addEventListener('click', () => {
        const nextEl = btn.nextElementSibling;
        nextEl.classList.toggle('display-grid'); 
    });
});