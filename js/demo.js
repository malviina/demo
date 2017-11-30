// TRIGGERS

var trigger0_fade = new Waypoint({
    element: document.getElementById("trigger0"),
    handler: function(direction) {
        document.getElementById("figure1").classList.toggle("fade")
    },
    offset: "50%"
});

var trigger1_fade = new Waypoint({
    element: document.getElementById("trigger1"),
    handler: function(direction) {
        document.getElementById("figure1").classList.toggle("fade")
    },
    offset: "50%"
});


// DRAWING THE TRIANGE

var triangle = document.getElementById("triangle");
var length_triangle = triangle.getTotalLength();

triangle.style.strokeDasharray = length_triangle;

triangle.style.strokeDashoffset = length_triangle;

window.addEventListener("scroll", drawTriangle);

function drawTriangle() {

    var section_height = document.getElementById("triangle-section").scrollHeight;
    var client_height = document.documentElement.clientHeight;
    
    var elmnt = document.getElementById("triangle-section");
    var rect = elmnt.getBoundingClientRect();
    var y = document.documentElement.clientHeight - rect.top - 500; // the last value gives a little offset so that the drawing starts a bit later then when the sections top comes to view
    
    if (y < 0) {
        y = 0;
    }
    
    if (y > section_height) {
        y = section_height;
    }
    
    var scrollpercent = y / document.getElementById("triangle-section").scrollHeight;
    
    
    document.getElementById("timer").innerHTML = y + "<br>" + section_height + "<br>" + client_height + "<br>" + scrollpercent;

    var draw = length_triangle * scrollpercent;

    triangle.style.strokeDashoffset = length_triangle - draw;
};


// DRAWING THE ROUTE ON THE MAP

var reitti = document.getElementById("reitti");

// The length of the polyline needed some tweaking as the getTotalLength didn't work on Firefox. But this fixes it.

var length_reitti = 0;
var prevPos;
for (var i = 0 ; i < reitti.points.numberOfItems;i++) {
    var pos = reitti.points.getItem(i);
    if (i > 0) {
        var distance = Math.sqrt(Math.pow((pos.x - prevPos.x), 2) + Math.pow((pos.y - prevPos.y), 2));
        length_reitti += distance;
    }
    prevPos = pos;
}

reitti.style.strokeDasharray = length_reitti;

reitti.style.strokeDashoffset = length_reitti;

window.addEventListener("scroll", drawReitti);

function drawReitti() {
    var elmnt = document.getElementById("map-helper");
    
    var section_height = elmnt.scrollHeight;
    var client_height = document.documentElement.clientHeight;
    

    var rect = elmnt.getBoundingClientRect();
    var y = client_height - rect.top-600;
    
    if (y < 0) {
        y = 0;
    }
    
    if (y > section_height) {
        y = section_height;
    }
    
    var scrollpercent = y / elmnt.scrollHeight;
    
    var draw = length_reitti * scrollpercent;

    reitti.style.strokeDashoffset = length_reitti - draw;
}


// VIDEO AUTOPLAY

var videos = document.getElementsByTagName("video");

function checkSroll() {
    for(var i = 0; i < videos.length; i++) {
        var video = videos[i];
        
        var y = video.offsetTop,
            h = video.offsetHeight,
            b = y + h, // the bottom of the video
            
            visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset)),
            
            visible = visibleY / h,
            
            fraction = 0.4;
        
        if (visible > fraction) {
            video.play();
        } else {
            video.pause();
        }
        
    }
}

window.addEventListener("scroll", checkSroll, false);
window.addEventListener("resize", checkSroll, false);


// BG

var trigger_bg = new Waypoint({
    element: document.getElementById("bg2"),
    handler: function(direction) {
        if (direction == "down") {
            document.getElementById("bg-section").setAttribute("style", "background-image: url(./media/images/bg2.jpeg)")
        }
        
        if (direction == "up") {
            document.getElementById("bg-section").removeAttribute("style", "background-image: url(./media/images/bg2.jpeg)")
        }
    },
    offset: "50%"
});


