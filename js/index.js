let $scene = document.querySelector('#line');
let ctx = $scene.getContext('2d');

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let action = false;
let lineColor = '#01b05c';
let erazerColor = '#121212';
let lineWidth = 5;
let coords = [];
let isErazer = false;

$scene.width = windowWidth;
$scene.height = windowHeight;

let isReplay = false;


let key = JSON.parse(localStorage.getItem('coords'));

function replay() {
    isReplay = true;
    let key = JSON.parse(localStorage.getItem('coords'));
    ctx.clearRect(0, 0, windowWidth, windowHeight);

    let timer = setInterval(function () {
        if (!key.length) {
            clearInterval(timer);
            isReplay = false;
            ctx.beginPath();
            return
        }

        let currentCoords = key.shift();

        ctx.fillStyle = currentCoords.color;
        ctx.strokeStyle = currentCoords.color;
        ctx.lineTo(currentCoords.x, currentCoords.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(currentCoords.x, currentCoords.y, lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(currentCoords.x, currentCoords.y);
    }, 10);
}


$scene.addEventListener('mousedown', function (e) {
    action = true;
});

$scene.addEventListener('mouseup', function (e) {
    action = false;
    ctx.beginPath();

    localStorage.setItem('coords', JSON.stringify(coords));
});

$scene.addEventListener('mousemove', function (e) {
    if (action) {
        let x = e.clientX;
        let y = e.clientY;

        coords.push({
            x: x,
            y: y,
            color: lineColor
        });

        ctx.strokeStyle = lineColor;
        ctx.fillStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
    }
});

document.querySelector('.btns.delete').addEventListener('click', function (e) {
    ctx.clearRect(0, 0, windowWidth, windowHeight);
});

document.querySelector('.btns.play').addEventListener('click', function (e) {
    replay();
});

document.querySelectorAll('.color').forEach(function (element) {
    element.addEventListener('click', function () {
        lineColor = this.getAttribute('data-fill');
    })
});

document.querySelectorAll('.stroke-items').forEach(function (element) {
    element.addEventListener('click', function () {
        lineWidth = this.getAttribute('data-stroke');
        if (isErazer) {
            lineColor = '#01b05c';
            isErazer = false;
        }
    })
});

document.querySelectorAll('.erazer-items').forEach(function (element) {
    element.addEventListener('click', function () {
        lineWidth = this.getAttribute('data-clean');
        lineColor = erazerColor;
        isErazer = true;
    })
});

$('.stroke-items, .color-block, .stroke-block').click(function () {
    $('.dropdown .side-menu').removeClass('active');
});

$('.right-btns .btn').hover(function () {
    let target = $(this).attr('data-btn');
    $('right-btns .btn').removeClass('active');
    $(this).addClass('active');
    $('.dropdown .side-menu').removeClass('active');
    $('.dropdown .side-menu' + target).addClass('active');
});
