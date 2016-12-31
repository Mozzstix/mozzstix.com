var panelH, stickH, stickYPos;
$(document).ready(function() {
	$(window).scroll(function () {
		if ($(window).width() < 1024){	
			panelH = 520;
			stickH = 70;
			stickYPos = 233;
		} else {
			panelH = 640;
			stickH = 100;
			stickYPos = 267;
		}

		var intrologoH = $('#intro').height() + panelH - 80;
		var introH = $('#intro').height();
		var scroll = $(window).scrollTop();
		if (scroll >= intrologoH) {
			if (!$('#logo').hasClass('lock-nav')) {
				$('#logo').addClass('lock-nav');
				$('#logo').removeAttr( 'style' );
				$('.logo-stick').removeAttr( 'style' );
				$('.logo-sans-stick').removeAttr( 'style' );
				$('#dotted-line').css('visibility', 'hidden');
				$('#home').css('padding-top', panelH+'px');	
			}
		} else {
			if ($('#logo').hasClass('lock-nav')) {
				$('.logo-sans-stick').css('visibility', 'visible');
				$('#dotted-line').css('visibility', 'visible');
				$('#logo').removeClass('lock-nav');
				$('#home').removeAttr( 'style' );
			}
			if (scroll < introH) {
				$('.nav-panel').removeAttr( 'style' );
				$('.logo-stick').removeAttr( 'style' );
				$('.logo-sans-stick').removeAttr( 'style' );
			}
			if (scroll >= introH) {
				var animationPercent = (scroll-introH)/(panelH-80);
				var rgb = colorFade(255, 198, 0, 209, 0, 0, animationPercent);
				$('#logo').css('background-color', rgb);
				var height = stickH * (1-animationPercent) + 40 * animationPercent;
				var degrees =  -27 * (1-animationPercent);
				var yPos =  stickYPos * (1-animationPercent) + 20 * animationPercent;
				$('.logo-stick').css('height', height+'px');	
				$('.logo-stick').css('top', yPos+scroll-introH+'px');				
				$('.logo-stick').css('transform', 'translateX(-50%) translateZ(4px) rotateZ('+degrees+'deg)');
				$('.logo-sans-stick').css('opacity', 1-((scroll-introH)/(panelH-160)));
			}		
		}
	});

	function colorFade (r1, g1, b1, r2, g2, b2, percent) {
		var r = Math.round(r1 * (1-percent) + r2 * percent);
		var g = Math.round(g1 * (1-percent) + g2 * percent);
		var b = Math.round(b1 * (1-percent) + b2 * percent);
		return ["rgb(",r,",",g,",",b,")"].join("");
	}
 });