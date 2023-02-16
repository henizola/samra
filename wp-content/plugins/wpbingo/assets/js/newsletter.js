/**
 * Theme functions file
 *
 * Contains handlers for navigation, accessibility, header sizing
 * footer widgets and Featured Content slider
 *
 */
( function( $ ) {
	"use strict";
// Enable menu toggle for small screens.
	$(document).ready(function() {
		$('.newsletterpopup .close-popup').on( "click", function(){
			_wpbingo_HideNLPopup();
		});
		$('.popupshadow').on( "click", function(){
			_wpbingo_HideNLPopup();
		});
		$('input','.hidden-popup-newsletter').on( "click", function(){
			_wpbingo_HideNLPopup();
			$.cookie("wrish_lpopup", 1, { expires : 24 * 60 * 60 * 1000 });
		});		
	});
	/* Show/hide NewsLetter Popup */
	$( window ).load(function() {
		_wpbingo_ShowNLPopup();
		_wpbingo_campbar();
	});	
	/* Function Show NewsLetter Popup */
	function _wpbingo_ShowNLPopup() {
		if($('.newsletterpopup').length){
			var cookieValue = $.cookie("wrish_lpopup");
			if(cookieValue == 1) {
				$('.newsletterpopup').hide();
				$('.popupshadow').hide();
			}else{
				$('.newsletterpopup').show();
				$('.popupshadow').show();
			}				
		}
	}
	/* Function Hide NewsLetter Popup when click on button Close */
	function _wpbingo_HideNLPopup(){
		$('.newsletterpopup').hide();
		$('.popupshadow').hide();
	}
	function _wpbingo_campbar(){
		$(".close-campbar").on( "click", function() {
			$('.header-campbar').slideUp();
			$.cookie("wrish_campbar", 1, { expires : 24 * 60 * 60 * 1000 });
		});
		var cookieValue = $.cookie("wrish_campbar");
		if(cookieValue == 1) {
			$('.header-campbar').hide();
		}	
	}	
} )( jQuery );