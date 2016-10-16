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
        $body = $('html, body'),
        // page sections
        $sections = $('.header, section'),
        // second section
        $secondSection = $('section:nth-of-type(1)'),
        // navigation links
        $navLinks = $('.nav a'),
        // bxslider portfiolio object
        $bxSliderPortfolio = null;
    
    //========== configuration 
    // general config 
    var config = {
        menuOpen : false,
        currentLink : 0
    };
    
    // smooth scrolling config
    var smoothScrollingConfig = {
        // the body animation speed
        animSpeed : 1000,
        // the body animation easing (jquery easing)
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
    //initialize function
    function init() {
        // bind events 
        $toggleMenuBtn.click(toggleMenu);
        $navLinks.click(onNavLinkClick);
        $(window).scroll(onScroll);
        $(window).resize(onResize);
        $(window).on( 'debouncedresize', debouncedResize);
        
        // sliders
        $sliderSkills.bxSlider(sliderSkillsConfig);
        $bxSliderPortfolio = $sliderPortfolio.bxSlider(sliderPortfolioConfig);
    }
    
    // action after toggle menu
    function toggleMenu() {
        config.menuOpen = !config.menuOpen;
        $mobileMenu.toggleClass( 'active' );
        $toggleMenuBtn.toggleClass( 'active' );
        $body.toggleClass( 'push-toleft' );
        $menu.toggleClass( 'open' );
    }
    
    // on navigation link click
    function onNavLinkClick() {
        var indexOfAnchor = $( this ).parent().index();
        changeNav(indexOfAnchor);
        scrollToSection(indexOfAnchor);
        return false;
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
    
    // on resize event
    function onResize() {
        if(config.menuOpen) toggleMenu();
        if( window.innerWidth <= 991 ) { 
            $menu.removeClass('is-sticky');
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
        
        if( window.innerWidth > 991 && $(window).scrollTop() >= $secondSection.offset().top)
            $menu.addClass('is-sticky');
    }
    
    // on scroll event
    function onScroll() {
         if(config.menuOpen) toggleMenu();
    }
    
    // smoothly scroll to current section after window resize
    function debouncedResize() {
        scrollToSection(config.currentLink);
    } 
    
    // changes current navigation
    function changeNav(indexOfAnchor) {
        $navLinks.eq(config.currentLink).removeClass('current');
        config.currentLink = indexOfAnchor;
        $navLinks.eq(config.currentLink).addClass('current');
    }
    
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
    
    $sections.waypoint(function( direction ) {
        var ind = $( this.element ).index('header, section');
        if(direction === 'down') {
            if(ind % 2 === 0)
                $toggleMenuBtn.addClass("nobg");
            else 
                $toggleMenuBtn.removeClass("nobg");
        } else {
            if(ind % 2 === 1)
                $toggleMenuBtn.addClass("nobg");
            else 
                $toggleMenuBtn.removeClass("nobg");
        }
    });
    
    // sticky navigation
    $secondSection.waypoint({
			handler: function(direction) {
				if( direction === 'down' ) {
					$mobileMenu.addClass('is-sticky');
					if( window.innerWidth > 991 ) $menu.addClass('is-sticky');
                    
				} else if(direction === 'up') {
					$mobileMenu.removeClass('is-sticky');
                    if( window.innerWidth > 991 ) $menu.removeClass('is-sticky');
                    
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