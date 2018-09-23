const root = document.getElementById('root');
const canvas = document.createElement('canvas');
root.appendChild(canvas);
canvas.height = 1000;
canvas.width = 1000;
const pageX = canvas
    .getBoundingClientRect()
    .x;
const pageY = canvas
    .getBoundingClientRect()
    .y;
const ctx = canvas.getContext('2d');
async function begin() {

    var pic = new Image();
    pic.src = "https://maocanhua.cn/simple/static/images/girl2.png";
    await new Promise(resolve => pic.onload = () => resolve());

    ctx.drawImage(pic, 0, 0, 500, 500);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 20;
    ctx.globalCompositeOperation = "destination-out";
    


}

window.addEventListener('mousedown', tapStart);

function tapStart(e) {
    let startX = e.pageX - pageX;
    let startY = e.pageY - pageY;

    draw(startX, startY);

    function tapMove(e) {
        let moveX = e.pageX - pageX;
        let moveY = e.pageY - pageY;
        draw(startX, startY, moveX, moveY);
        startX = moveX;
        startY = moveY;
    }
    function tapEnd(e) {
        window.removeEventListener('mousemove', tapMove);
        window.removeEventListener('mouseup', tapEnd);
    }
    window.addEventListener('mousemove', tapMove);
    window.addEventListener('mouseup', tapEnd);
}

function draw(startX, startY, moveX, moveY) {
    if(moveX === undefined){
        ctx.save();
        ctx.beginPath();
        ctx.arc(startX, startY, 10, 0, 2 * Math.PI);
        ctx.clip();
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.restore();
    }else{
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(moveX,moveY);
        ctx.stroke();
        ctx.fill()
        ctx.clip();
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.restore();
    }
}

begin();