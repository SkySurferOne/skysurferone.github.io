var app = (function($){
	'use strict';
    // cache DOM
    var $document = $(document);
    var $sliderSkills = null;
    
    // bind events 
	$document.ready(init);
    
    // sliders config
    var sliderSkillsConfig = {
        auto: true,
        mode: 'fade',
        controls: false,
    };
    
    // app functions
    function init() {
        // test
		console.log('DOM is ready!');
        
        // init DOM cache variables
        $sliderSkills = $('.skills-slider');
        
        // sliders
        $sliderSkills.bxSlider(sliderSkillsConfig);
    }
    
    return {};
})(jQuery);
