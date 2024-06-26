const candle = document.getElementById('candle');
const cake = document.getElementById('cake');
const message = document.getElementById('message');

candle.onmousedown = function(event) {
    let shiftX = event.clientX - candle.getBoundingClientRect().left;
    let shiftY = event.clientY - candle.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        candle.style.left = pageX - shiftX + 'px';
        candle.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        if (isOverlapping(cake, candle)) {
            message.style.display = 'block';
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
