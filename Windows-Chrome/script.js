var minimize = document.getElementById('minimize');
var square = document.getElementById('square');
var exit = document.getElementById('exit');
var titleBar = document.getElementById('title-bar');

////////////////// Hover listeners //////////////////
minimize.addEventListener('mouseover', function handleMouseOver() {
    minimize.style.backgroundColor = '#272727';
    minimize.style.cursor = 'context-menu';
});

minimize.addEventListener('mouseout', function handleMouseOut() {
    minimize.style.backgroundColor = 'black';
    minimize.style.cursor = 'default';
});

square.addEventListener('mouseover', function handleMouseOver() {
    square.style.backgroundColor = '#272727';
    square.style.cursor = 'context-menu';
});

square.addEventListener('mouseout', function handleMouseOut() {
    square.style.backgroundColor = 'black';
    square.style.cursor = 'default';
});

exit.addEventListener('mouseover', function handleMouseOver() {
    exit.style.backgroundColor = 'red';
    exit.style.cursor = 'context-menu';
});

exit.addEventListener('mouseout', function handleMouseOut() {
    exit.style.backgroundColor = 'black';
    exit.style.cursor = 'default';
});

titleBar.addEventListener('mouseover', function handleMouseOver() {
    titleBar.style.cursor = 'context-menu';
});

titleBar.addEventListener('mouseout', function handleMouseOver() {
    titleBar.style.cursor = 'default';
});

//////////////// Make window draggable start ////////////////
// Make the DIV element draggable:
var draggable = $('#window');
var title = $('#title-bar');
let oldLocation = { x: 0, y: 0 };

title.on('mousedown', function (e) {
    var dr = $(draggable).addClass('drag');
    height = dr.outerHeight();
    width = dr.outerWidth();
    (ypos = dr.offset().top + height - e.pageY), (xpos = dr.offset().left + width - e.pageX);
    $(document.body)
        .on('mousemove', function (e) {
            var itop = e.pageY + ypos - height;
            var ileft = e.pageX + xpos - width;
            if (dr.hasClass('drag')) {
                dr.offset({ top: itop, left: ileft });
            }
        })
        .on('mouseup', function (e) {
            dr.removeClass('drag');
        });
});
//////////////// Make window draggable end ////////////////

////////////////// Onclick listeners //////////////////
// X button functionality
$('#exit').click(function () {
    $("#window").toggleClass('visible');
});
$("#clickme").click(function(){
    $("#window").toggleClass('visible');
});

// Maximize button functionality
$('#square').click(enlarge);

function enlarge() {
    const window = draggable[0];
    if (square.classList.contains('enlarged')) {
        shrink();
        setLocation(oldLocation.x, oldLocation.y);
        console.log(oldLocation);
    } else {
        oldLocation = { x: window.offsetLeft, y: window.offsetTop };
        maximize();
        setLocation(0, 0);
    }
}

function setLocation(x, y) {
    draggable.offset({ left: x, top: y });
}

function shrink() {
    $('#window').css('width', '40%').css('height', '700px');
    $('#square').removeClass('enlarged');
}

function maximize() {
    $('#window').css('width', '100%').css('height', '100%');
    $('#square').addClass('enlarged');
}
