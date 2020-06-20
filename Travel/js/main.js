$(document).ready(function(){
	$("header nav .menu_icon").click(function(){
		$("body nav.mobile_menu").animate({left: "0px"},1000)
	});

	$("body nav.mobile_menu .close_icon").click(function(){
		$("body nav.mobile_menu").animate({left: "-100%"},1000)
	});

	$(".request").click(function(){
		$(".travel_is_beautiful .form").animate({top: "0px"},1000)
	});

	$(".travel_is_beautiful form .close_icon").click(function(){
		$(".travel_is_beautiful .form").animate({top: "-100%"},1000)
	})
});