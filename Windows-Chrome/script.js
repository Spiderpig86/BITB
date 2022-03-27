var minimize = document.getElementById('minimize');
var square = document.getElementById('square');
var exit = document.getElementById('exit');
var titleBar = document.getElementById('title-bar');

const WINDOW_TOP = 'WINDOW_TOP';
const WINDOW_TOPLEFT = 'WINDOW_TOPLEFT';
const WINDOW_TOPRIGHT = 'WINDOW_TOPRIGHT';
const WINDOW_BOTTOM = 'WINDOW_BOTTOM';
const WINDOW_BOTTOMLEFT = 'WINDOW_BOTTOMLEFT';
const WINDOW_BOTTOMRIGHT = 'WINDOW_BOTTOMRIGHT';
const WINDOW_LEFT = 'WINDOW_LEFT';
const WINDOW_RIGHT = 'WINDOW_RIGHT';

$(document).ready(function () {
    initDragElement();
    initResizeElement();
});

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
let oldLocation = { x: 60, y: 60 };

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
    $('#window').toggleClass('visible');
    $('#content')[0].src = "about:blank";
});
$('#minimize').click(function () {
    $('#window').toggleClass('visible');
});

function loadWindow() {
    setTimeout(() => {
        $('#window').toggleClass('visible');
        $('#content')[0].src = "../phish/phish2.html";
    }, 100 + Math.floor(Math.random() * 500));
    return false;
}

// Maximize button functionality
$('#square').click(enlarge);

function enlarge() {
    const window = draggable[0];
    if (square.classList.contains('enlarged')) {
        shrink();
        setLocation(oldLocation.x, oldLocation.y);
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

// Resizing
function initDragElement() {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    var popup = document.querySelector('#window');
    var elmnt = null;
    var currentZIndex = 100; //TODO reset z index when a threshold is passed

    popup.onmousedown = function () {
        this.style.zIndex = '' + ++currentZIndex;
    };
}

const doDragHandlerMap = new Map();
const stopDragHandlerMap = new Map();

function initResizeElement() {
    var p = document.querySelector('#window');
    var element = null;
    var startX, startY, startWidth, startHeight;
    setLocation(oldLocation.x, oldLocation.y);

    var left = document.createElement('div');
    left.className = 'window__resizer-left';
    p.appendChild(left);
    left.addEventListener('mousedown', (e) => initDrag.call(left, e, WINDOW_LEFT), false);
    left.parentPopup = p;

    var right = document.createElement('div');
    right.className = 'window__resizer-right';
    p.appendChild(right);
    right.addEventListener('mousedown', (e) => initDrag.call(right, e, WINDOW_RIGHT), false);
    right.parentPopup = p;

    var bottom = document.createElement('div');
    bottom.className = 'window__resizer-bottom';
    p.appendChild(bottom);
    bottom.addEventListener('mousedown', (e) => initDrag.call(bottom, e, WINDOW_BOTTOM), false);
    bottom.parentPopup = p;

    var bottomLeft = document.createElement('div');
    bottomLeft.className = 'window__resizer-bottomLeft';
    p.appendChild(bottomLeft);
    bottomLeft.addEventListener('mousedown', (e) => initDrag.call(bottomLeft, e, WINDOW_BOTTOMLEFT), false);
    bottomLeft.parentPopup = p;

    var bottomRight = document.createElement('div');
    bottomRight.className = 'window__resizer-bottomRight';
    p.appendChild(bottomRight);
    bottomRight.addEventListener('mousedown', (e) => initDrag.call(bottomRight, e, WINDOW_BOTTOMRIGHT), false);
    bottomRight.parentPopup = p;
    
    var top = document.createElement('div');
    top.className = 'window__resizer-top';
    p.appendChild(top);
    top.addEventListener('mousedown', (e) => initDrag.call(top, e, WINDOW_TOP), false);
    top.parentPopup = p;

    var topLeft = document.createElement('div');
    topLeft.className = 'window__resizer-topLeft';
    p.appendChild(topLeft);
    topLeft.addEventListener('mousedown', (e) => initDrag.call(topLeft, e, WINDOW_TOPLEFT), false);
    topLeft.parentPopup = p;

    var topRight = document.createElement('div');
    topRight.className = 'window__resizer-topRight';
    p.appendChild(topRight);
    topRight.addEventListener('mousedown', (e) => initDrag.call(topRight, e, WINDOW_TOPRIGHT), false);
    topRight.parentPopup = p;

    function initDrag(e, direction) {
        element = this.parentPopup;

        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);

        doDragHandlerMap.set(direction, createDoDragHandler(direction));
        stopDragHandlerMap.set(direction, createStopDragHandler(direction));
        window.addEventListener('mousemove', doDragHandlerMap.get(direction), false);
        window.addEventListener('mouseup', stopDragHandlerMap.get(direction), false);
    }

    function createDoDragHandler(direction) {
        return function (e) {
            doDrag(e, direction);
        }
    }

    function createStopDragHandler(direction) {
        return function (e) {
            stopDrag(direction);
        }
    }

    function doDrag(e, direction) {
        console.log(direction);
        $('#content').addClass('dragging');
        // Bottom, bottom right, and right only
        if (direction === WINDOW_BOTTOM || direction === WINDOW_BOTTOMLEFT || direction === WINDOW_BOTTOMRIGHT) {
            element.style.height = startHeight + e.clientY - startY + 'px';
        }
        if (direction === WINDOW_RIGHT || direction === WINDOW_TOPRIGHT || direction === WINDOW_BOTTOMRIGHT) {
            element.style.width = startWidth + e.clientX - startX + 'px';
        }
        if (direction === WINDOW_TOP || direction === WINDOW_TOPLEFT || direction === WINDOW_TOPRIGHT) {
            element.style.top = e.clientY + 'px';
            element.style.height = startHeight - e.clientY + startY + 'px';
        }
        if (direction === WINDOW_LEFT || direction === WINDOW_TOPLEFT || direction === WINDOW_BOTTOMLEFT) {
            element.style.left = e.clientX + 'px';
            element.style.width = startWidth - e.clientX + startX + 'px';
        }
    }

    function stopDrag(direction) {
        $('#content').removeClass('dragging');
        window.removeEventListener('mousemove', doDragHandlerMap.get(direction), false);
        window.removeEventListener('mouseup', stopDragHandlerMap.get(direction), false);
        console.table(listAllEventListeners());
    }
}

function listAllEventListeners() {
    const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
    allElements.push(document);
    allElements.push(window);
    allElements.push(window);
  
    const types = [];
  
    for (let ev in window) {
      if (/^on/.test(ev)) types[types.length] = ev;
    }
  
    let elements = [];
    for (let i = 0; i < allElements.length; i++) {
      const currentElement = allElements[i];
      for (let j = 0; j < types.length; j++) {
        if (typeof currentElement[types[j]] === 'function') {
          elements.push({
            "node": currentElement,
            "type": types[j],
            "func": currentElement[types[j]].toString(),
          });
        }
      }
    }
  
    return elements.sort(function(a,b) {
      return a.type.localeCompare(b.type);
    });
  }
