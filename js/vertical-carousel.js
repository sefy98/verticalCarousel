var carousel = $(".carousel"),
    currdeg  = 0,
	elementPosition = 0;
var elements = document.querySelectorAll('.vertical-carousel-form input:not([type="hidden"]):not([disabled])');
console.log(elements[0].clientHeight);
var tranzlateZ = parseInt((elements[0].clientHeight) / (getTanDeg(18)) * .78);

$(".next").on("click", { direction: "next" }, rotate);
$(".prev").on("click", { direction: "previous" }, rotate);

processElements(elementPosition);

function rotate(e){
    if(e.data.direction == "next"){
        currdeg = currdeg - 36;
        if(elementPosition !== 0) {
	        elementPosition--;
        }
    }
    if(e.data.direction == "previous"){
        currdeg = currdeg + 36;
	    elementPosition++;
    }
	processElements(elementPosition);
    carousel.css({
        "-webkit-transform": "rotateX("+currdeg+"deg)",
        "-moz-transform": "rotateX("+currdeg+"deg)",
        "-o-transform": "rotateX("+currdeg+"deg)",
        "transform": "rotateX("+currdeg+"deg)"
    });
}

function getTanDeg(deg) {
	var rad = deg * Math.PI/180;
	return Math.tan(rad);
}

function processElements(elementPosition) {
	var currentPosition = elementPosition;
	for (var elementPosition = 0, element; element = elements[elementPosition++];) {
		if (elementPosition >= currentPosition) {
			if (element && element.style.transform === "") {
				console.log(elements[elementPosition - 1].type);
				elements[elementPosition - 1].previousType = elements[elementPosition - 1].type;
				element.style.transform = 'rotateX(-' + 36 * (elementPosition - 1) + 'deg) translateZ(' + tranzlateZ + 'px)';
				console.log(element);
			}
			element.type = element.previousType;
			if (elementPosition > currentPosition + 2) {
				element.type = 'hidden';
			}
		} else {
			element.type = 'hidden';
		}
	}
}