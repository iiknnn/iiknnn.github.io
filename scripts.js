const candle = document.getElementById('candle');
const cake = document.getElementById('cake');
const message = document.getElementById('message');

let isDraggable = true;

candle.onmousedown = function(event) {
    if (!isDraggable) return;

    let shiftX = event.clientX - candle.getBoundingClientRect().left;
    let shiftY = event.clientY - candle.getBoundingClientRect().top;

    candle.style.position = 'absolute';
    candle.style.zIndex = 1000;
    document.body.append(candle);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        candle.style.left = pageX - shiftX + 'px';
        candle.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        if (!isDraggable) return;

        moveAt(event.pageX, event.pageY);

        if (isOverlapping(cake, candle)) {
            message.style.display = 'block';
            isDraggable = false;
            document.removeEventListener('mousemove', onMouseMove);
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    candle.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        candle.onmouseup = null;
    };
};

candle.ondragstart = function() {
    return false;
};

function isOverlapping(cake, candle) {
    const cakeRect = cake.getBoundingClientRect();
    const candleRect = candle.getBoundingClientRect();

    return !(candleRect.right < cakeRect.left || 
             candleRect.left > cakeRect.right || 
             candleRect.bottom < cakeRect.top || 
             candleRect.top > cakeRect.bottom);
}
