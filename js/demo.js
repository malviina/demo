// WAYPOINTS

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

        var helper = document.getElementById("triangle-helper");
        var helper_height = helper.scrollHeight;
        var screen_height = document.documentElement.clientHeight;

        var rect = helper.getBoundingClientRect(); // This is to find the position of the helper in relation to the window screen
        var helper_scrolled = screen_height - rect.top - 500; // the last value gives some offset so that the drawing begins a bit later then when the sections top comes to view

        if (helper_scrolled < 0) {
            helper_scrolled = 0;
        }

        if (helper_scrolled > helper_height) {
            helper_scrolled = helper_height;
        }

        var scrollpercent = helper_scrolled / helper_height;
                    
    
    
    document.getElementById("timer").innerHTML = helper_scrolled + "<br>" + helper_height + "<br>" + screen_height + "<br>" + scrollpercent;

    var draw = length_triangle * scrollpercent;

    triangle.style.strokeDashoffset = length_triangle - draw;
};

// DRAWING THE ROUTE ON THE MAP

var reitti = document.getElementById("reitti");

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
    
    if (scrollpercent == 1) {
        document.getElementById("nice").setAttribute("style", "opacity: ''")
    };
    
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

var isVisible = false;

function showTimer() {
    var elmnt = document.getElementById("timerbox");
    var timer = document.getElementById("showTimer");
    if (!isVisible) {
        elmnt.setAttribute("style", "display: block;");
        timer.innerHTML = "Hide";
        isVisible = true;
    } else {
        elmnt.setAttribute("style", "");
        timer.innerHTML = "Show";
        isVisible = false;
    }
}

// BG

/*var bg_section = new Waypoint({
    element: document.getElementById("bg-trigger"),
    handler: function(direction) {
        if (direction == "down") {
            document.getElementById("changing-img").setAttribute("style", "position: fixed; top: 0;");
        }
        
        if (direction == "up") {
            document.getElementById("changing-img").setAttribute("style", "position: absolute;");
        }
    }
})*/

var trigger_bg = new Waypoint({
    element: document.getElementById("bg-trigger"),
    handler: function(direction) {
        if (direction == "down") {
            document.getElementById("bg1").setAttribute("style", "opacity: 0;");
            document.getElementById("bg2").setAttribute("style", "opacity: 1;");
        }
        
        if (direction == "up") {
            document.getElementById("bg1").setAttribute("style", "opacity: 1;");
            document.getElementById("bg2").setAttribute("style", "opacity: 0;");
        }
    },
    offset: "50%"
});

