var mixer = mixitup(".container-filter")

$(document).ready(function(){
	$('a[href^="#"]').click(function(){
		var target = $(this).attr('href');
		$("html, body").animate({
			scrollTop: $(target).offset().top
		},500);
		return false;
		
	});

	$(".menu_icon").click(function(){
		$(".menu_mobile").slideToggle(500).css("display","flex")
	})

	$(".close_icon").click(function(){
		$(".menu_mobile").slideToggle(500);
	})

	$(".menu_mobile menu li a").click(function(){
		$(".menu_mobile").slideToggle(500);
	})
});