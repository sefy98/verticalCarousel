var carousel = document.getElementsByClassName("carousel"),
    currdeg  = 0,
	elementPosition = 0,
	lastPosition = 0,
	currentPosition = 0;
var elements = document.querySelectorAll('.vertical-carousel-form input:not([type="hidden"]):not([disabled])');
var inputHeight = elements[0].clientHeight;
var tranzlateZ = parseInt((inputHeight) / (getTanDeg(18)) * .78);
// $(".next").on("click", { direction: "next" }, rotate);
// $(".prev").on("click", { direction: "previous" }, rotate);

processElements();
document.addEventListener("keydown", function(event) {
	var e = event || evt; // for trans-browser compatibility
	var charCode = e.which || e.keyCode;
	if (charCode == 9 ) {
		rotate('next');
	}
});
function rotate(event){
	direction = (typeof event === 'string') ? event : '';
    if(direction == "previous"){
        if(currentPosition !== 0) {
	        currentPosition--;
	        currdeg = currdeg - inputHeight;
	        processElements();
        }
    }
    if(direction == "next" && currentPosition !== lastPosition){
	    if(currentPosition + 1 !== lastPosition) {
		    currdeg = currdeg + inputHeight;
		    currentPosition++;
		    processElements();
	    }
    }
}

function getTanDeg(deg) {
	var rad = deg * Math.PI/180;
	return Math.tan(rad);
}

function processElements() {
	for (var elementPosition = 0, element; element = elements[elementPosition++];) {
		if (elementPosition >= currentPosition) {
			if (element && element.style.transform === "") {
				elements[elementPosition - 1].previousType = elements[elementPosition - 1].type;
				element.style.transform = 'rotateX(-' + inputHeight * (elementPosition - 1) + 'deg) translateZ(' + tranzlateZ + 'px)';
				element.position = elementPosition;
				lastPosition = elementPosition;
				(function(elementPos) {
					element.addEventListener('focus', function() {
						if (currentPosition > elementPos - 1) {
							rotate('previous');
						} else if (currentPosition < elementPos - 1) {
							rotate('next');
						}
					});
				})(elementPosition);
			}
			element.type = element.previousType;
			if (elementPosition > currentPosition + 2) {
				element.type = 'hidden';
			}
		} else {
			element.type = 'hidden';
		}
	}
	carousel[0].style.transform = "rotateX(" + currdeg + "deg)";
}