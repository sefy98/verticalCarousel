var carousel = $(".carousel"),
    currdeg  = 0;
var elements = document.querySelectorAll('.vertical-carousel-form input:not([type="hidden"]):not([disabled])');
console.log(elements[0].clientHeight);
console.log(getTanDeg(18));
var tranzlateZ = parseInt((elements[0].clientHeight) / (getTanDeg(18)) * .78);
console.log(tranzlateZ);

$(".next").on("click", { direction: "next" }, rotate);
$(".prev").on("click", { direction: "previous" }, rotate);

for (var i = 0, element; element = elements[i++];) {
	if (element){
		element.style.transform = 'rotateX(' + 36 * (i - 1) + 'deg) translateZ(' + tranzlateZ + 'px)';
		if(i > 2) {
			element.type = 'hidden';
		}
		console.log(element);
	}
}

function rotate(e){
    if(e.data.direction == "next"){
        currdeg = currdeg - 36;
    }
    if(e.data.direction == "previous"){
        currdeg = currdeg + 36;
    }
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