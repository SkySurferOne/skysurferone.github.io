var app = (function($){
	'use strict';
    //========== cache DOM
    var $document = $(document),
        // my skills slider 
        $sliderSkills = $('.skills-slider'),
        // portfolio slider
        $sliderPortfolio = $('.portfolio-slider'),
        // navigation
        $menu = $('.nav'),
        // mobile-menu
        $mobileMenu = $('.mobile-menu'),
        // toggle menu button
        $toggleMenuBtn = $('.mobile-menu-btn'),
        // body
        $body = $(document.body),
        // page sections
        $sections = $('.header, section'),
        // second section
        $secondSection = $('section:nth-of-type(1)'),
        // navigation links
        $navLinks = $('.nav a');
    
    //========== general config 
    var config = {
        menuOpen : false
    }
    
    //========== smooth scrolling config
    var smoothScrollingConfig = {
        // the body animation speed
        animSpeed : 1000,
        // the body animation easing (jquery easing)
		animEasing : 'easeInOutExpo'
    }
    
    //========== sliders config
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
    function init() {
        //========== bind events 
        $toggleMenuBtn.click(toggleMenu);
        $navLinks.click(smoothScroll);
        $(window).scroll(onScroll);
        $(window).resize(onResize);
        
        // sliders
        $sliderSkills.bxSlider(sliderSkillsConfig);
        $sliderPortfolio.bxSlider(sliderPortfolioConfig);
    }
    
    function toggleMenu() {
        config.menuOpen = !config.menuOpen;
        $toggleMenuBtn.toggleClass( 'active' );
        $body.toggleClass( 'push-toleft' );
        $menu.toggleClass( 'open' );
    }
    
    function smoothScroll() {
        var indexOfAnchor = $( this ).parent().index();
        var offset = (indexOfAnchor % 2 === 0 && indexOfAnchor !== 0) ?
            247 : 0;
        console.log(indexOfAnchor +", offset"+ offset);
        scrollAnim( $sections.eq( indexOfAnchor ).offset().top, offset );
        return false;
    }
    
    function scrollAnim( top, offset ) {
        offset = offset || 0;
		$body.stop().animate( { scrollTop : top + offset }, 
                             smoothScrollingConfig.animSpeed, 
                             smoothScrollingConfig.animEasing );
	}
    
    function onResize() {
        if(config.menuOpen) toggleMenu();
    }
    
    function onScroll() {
         if(config.menuOpen) toggleMenu();
    }
    
    // sticky navigation
    $secondSection.waypoint({
			handler: function(direction) {
				if( direction === 'down' ) {
					$mobileMenu.addClass('is-sticky');
					
				} else if(direction === 'up') {
					$mobileMenu.removeClass('is-sticky');

				}	
			}
    });
    
    return {
        init : init 
    };
})(jQuery);

(function($) {
	$(document).ready(function() {
		app.init();
	});
})(jQuery);