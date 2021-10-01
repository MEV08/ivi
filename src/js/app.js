const body = document.querySelector('body');
const diamond = document.querySelector('#diamond');
const start = document.querySelector('#start');
const count = document.querySelector('#count');
let isStarted = false;

diamond.addEventListener('click', () => {
    start.style.display = 'none';
    count.style.display = 'block';
    let time = 1;
    count.textContent = time;
    let timer = setInterval(() => {
        isStarted = true;
        time++;
        count.textContent = time;
        if (time >= 4) {
            clearInterval(timer);
            start.style.display = 'block';
            count.style.display = 'none';
            time = 1;
        }
    }, 1000);
});
diamond.addEventListener('mouseenter', () => {
    console.log('mouse is here');
    if (isStarted) body.style.background = 'rgb(191, 116, 241)'; 
       
});
diamond.addEventListener('mouseleave', () => {
    console.log('mouse is not here');
    body.style.background = 'white';
});
