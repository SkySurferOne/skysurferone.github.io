/**
    File name: app.js
    Author: DH
    Description: Script implements navigation behavior,
    events on scrolling ect.

    init : Initializes app script.
           Should be invoked in onload/ready event handler.
*/
var app = (function($){
	'use strict';

	//========== cache DOM
    var $document = $(document),
    	// toggle menu button
     	$mobileMenuBtn = $('.mobile-menu-btn'),
    	// navigation list
    	$navCollapse = $('.nav-collapse'),
        // about section
        $aboutSection = $('section:nth-of-type(1)'),
        // navigation
        $navigation = $('.nav'),
        // navigation links
        $navLinks = $('.nav ul a'),
        // page sections
        $sections = $('.header, section'),
        // body
        $body = $('html, body'),
        // my skills slider
        $sliderSkills = $('.skills-slider'),
        // portfolio slider
        $sliderPortfolio = $('.portfolio-slider'),
        // bxslider portfiolio object
        $bxSliderPortfolio = null;

    //========== app config
    // general config
    var config = {
        navSlideSpeed : 250, // in ms
        menuOpen : false,
        currentLink : 0,
				lastScrollTop: 0,
				hideDelta: 5,
				autohideNavOffset: $($sections[0]).outerHeight()
    };

    // smooth scrolling config
    var smoothScrollingConfig = {
        // the body animation speed
        animSpeed : 1000,
        // the body animation easing (jquery easing plugin)
        animEasing : 'swing' //'easeInOutExpo'
    };

    // sliders config
    var sliderSkillsConfig = {
        // autorun
        auto: true,
        // slide effect
        mode: 'fade',
        // control arrows
        controls: false,
    };

    var sliderPortfolioConfig = {
        // slide width
        slideWidth: 475,
        // min abount of slides
        minSlides: 2,
        // max abount of slides
        maxSlides: 2,
        // number of moving slides
        moveSlides: 1,
        // margin bewteew slides
        slideMargin: 30,
        // pager buttons
        pager: false,
        // autorun
        auto: true
    };

    //========== app functions
    // initialize function
    function init() {
    	// bind events
    	$mobileMenuBtn.click(toggleMenu);
        $navLinks.click(onNavLinkClick);
        $(window).scroll(onScroll);
        $(window).resize(onResize);
        //$(window).on( 'debouncedresize', debouncedResize);

        // sliders
        $sliderSkills.bxSlider(sliderSkillsConfig);
        $bxSliderPortfolio = $sliderPortfolio.bxSlider(sliderPortfolioConfig);
    }

    // actions after toggle menu
    function toggleMenu() {
        config.menuOpen = !config.menuOpen;
    		$mobileMenuBtn.toggleClass('active');
        if ($navCollapse.hasClass('in'))
            $navCollapse.slideUp(config.navSlideSpeed);
        else
            $navCollapse.slideDown(config.navSlideSpeed);
        $navCollapse.toggleClass('in');
    }

    // on navigation link click
    function onNavLinkClick() {
        var indexOfAnchor = $( this ).parent().index();
        changeNav(indexOfAnchor);
        scrollToSection(indexOfAnchor);
        return false;
    }

    // changes current navigation
    function changeNav(indexOfAnchor) {
        $navLinks.eq(config.currentLink).removeClass('current');
        config.currentLink = indexOfAnchor;
        $navLinks.eq(config.currentLink).addClass('current');
    }

    // scroll to some section
    function scrollToSection(indexOfSection) {
        var offset = (indexOfSection % 2 === 0 && indexOfSection !== 0) ?
                     250 : 0;
        scrollAnim( $sections.eq( indexOfSection ).offset().top, offset );
    }

    // scroll animation
    function scrollAnim( top, offset ) {
        offset = offset || 0;
        $body.stop().animate( { scrollTop : top + offset },
                             smoothScrollingConfig.animSpeed,
                             smoothScrollingConfig.animEasing );
    }

    // on scroll event
    function onScroll() {
         if(config.menuOpen) {
             toggleMenu();
         }

				 hideOrShowNavOnScroll();
    }

    // on resize event
    function onResize() {
        if(!config.menuOpen && window.innerWidth > 767) {
            $navCollapse.css('display', '');
        }

        if( window.innerWidth <= 991 ) {
            $bxSliderPortfolio.reloadSlider({
                slideWidth: 475,
                minSlides: 1,
                maxSlides: 1,
                moveSlides: 1,
                slideMargin: 30,
                pager: false,
                auto: true
              });

        } else {
            $bxSliderPortfolio.reloadSlider(sliderPortfolioConfig);
        }
    }

    // smoothly scroll to current section after window resize
    function debouncedResize() {
        scrollToSection(config.currentLink);
    }

		function hideOrShowNavOnScroll() {
			var currentScrollTop = $(window).scrollTop();

			if(Math.abs(config.lastScrollTop - currentScrollTop) <= config.hideDelta)
        return;

				if (currentScrollTop > config.lastScrollTop &&
						currentScrollTop > config.autohideNavOffset){
					// on scroll down
					$navigation.css({
						"top": -$navigation.outerHeight()
					});

				} else {
					// on scroll up
					if(currentScrollTop + $(window).height() < $(document).height()) {
							$navigation.css({
								"top": 0
							});

					}
				}

			config.lastScrollTop = currentScrollTop;
		}

    // sticky navigation
    $aboutSection.waypoint({
        handler: function(direction) {
            if( direction === 'down' ) {
                $navigation.addClass('is-sticky');

            } else if(direction === 'up') {
                $navigation.removeClass('is-sticky');

            }
        }
    });

		// detect current section
		$sections.waypoint(function( direction ) {
				if( direction === 'down' ) {
						var ind = $( this.element ).index('header, section');
						changeNav( ind );
				}
		}, {
				offset: '30%'
		});

		$sections.waypoint(function( direction ) {
				if( direction === 'up' ) {
						var ind = $( this.element ).index('header, section');
						changeNav( ind );
				}
		}, {
				offset: '-30%'
		});

    return {
    	init : init
    };

})(jQuery);

// main.js
(function($) {
	$(document).ready(function() {
		app.init();
	});
})(jQuery);
