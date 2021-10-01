const body = document.querySelector('body');
const diamond = document.querySelector('#diamond');
const start = document.querySelector('#start');
const count = document.querySelector('#count');
let isStarted = false;


diamond.addEventListener('click', function() {
    if (!isStarted) {
        start.style.display = 'none';
        count.style.display = 'block';
        isStarted = true;
        let time = 1;
        count.textContent = time;
        let timer = setInterval(() => {
            time++;
            count.textContent = time;
            if (time >= 4) {
                clearInterval(timer);
                start.style.display = 'block';
                count.style.display = 'none';
                time = 1;
                isStarted = false;
            }
        }, 1000);
    } 
});
diamond.addEventListener('mouseenter', function() {
    if (isStarted) body.style.background = 'rgb(191, 116, 241)';   
});
diamond.addEventListener('mouseleave', function() {
    body.style.background = 'white';
});
