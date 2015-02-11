/*
	Author:Kevin Rodrigues
	Purpose: Jquery Lightweight lightbox plugin.

	Tested with Jquery version 1.11.2.
*/


// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {

	"use strict";

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var litebox = "litebox",
				defaults = {
				speed: 500,
				animation: 'swing'
		},
		options = {};

		// The actual plugin constructor
		function Litebox (element, options, overlay, content) {
				this.element = element;
				this.settings = $.extend({}, defaults, options);
				this._defaults = defaults;
				this._name = litebox;
				this.overlay = document.getElementsByClassName('liteBox');
				this.content = document.getElementsByClassName('litebox-content');
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Litebox.prototype, {
				init: function () {
					//kick things off!
					this.openLightbox();
					this.closeLightbox();
				},
				openLightbox: function(image) {
					//add event listener 'click to element' so we can trigger the lightbox.
					this.element.addEventListener('click', function (e){
						image = this.getAttribute('href');
						// console.log(image);
						e.preventDefault();

						//check if the overlay first exists. bang bang (!!) to force a boolean
						if (!!this.overlay) {
							this.content.html('<img src="'+ image +'"');
							this.overlay.show();
						} else {
							var liteBox =
								'<div data-overlay="litebox" class="liteBox">' +
									'<div data-content="litebox">' +
										'<img src="' + image + '"/>' +
									'</div>' +
								'<div/>';
							$('body').append(liteBox);
						}
						// console.log('lightbox opened!');
					});
					
				},
				closeLightbox: function() {

					if (this.overlay) {
						$(document).on('click', '.liteBox', function() {
							$('.liteBox').fadeOut(options.speed, function() {
								$(this).remove();
							})
						});
					} else	return;
					
				}


		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[litebox] = function (options) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + litebox ) ) {
								$.data( this, "plugin_" + litebox, new Litebox(this, options));
						}
				});
		};

})( jQuery, window, document );



