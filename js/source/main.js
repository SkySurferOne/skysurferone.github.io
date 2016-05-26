var app = (function($){
	'use strict';
    // cache DOM
    var $document = $(document);
    var $sliderSkills = null;
    var $sliderPortfolio;
    
    // bind events 
	$document.ready(init);
    
    // sliders config
    var sliderSkillsConfig = {
        auto: true,
        mode: 'fade',
        controls: false,
    };
    
    var sliderPortfolioConfig = {
        slideWidth: 475,
        minSlides: 2,
        maxSlides: 2,
        moveSlides: 1,
        slideMargin: 30,
        pager: false,
        auto: true
    };
    
    // app functions
    function init() {
        // test
		console.log('DOM is ready!');
        
        // init DOM cache variables
        $sliderSkills = $('.skills-slider');
        $sliderPortfolio = $('.portfolio-slider');
        
        // sliders
        $sliderSkills.bxSlider(sliderSkillsConfig);
        $sliderPortfolio.bxSlider(sliderPortfolioConfig);
    }
    
    return {};
})(jQuery);
