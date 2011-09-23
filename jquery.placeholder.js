/*!
 * jQuery Placeholder Plugin
 * Copyright (c) Eli Dupuis
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.4 or later
 */

(function($) {

var ver = '0.5.1';

jQuery.fn.placeholder = function(options) {

	// iterate and reformat each matched element
	return this.each(function() {
		var $this = $(this);
		var opts = $.extend({}, $.fn.placeholder.defaults, options);

		//	use html value attirbute if it's not empty. otherwise use specified default text
		var sources = [$this[0].placeholder, opts.text]; //$this.val(),
		for (var i=0; i < sources.length; i++) {
		  if (sources[i] != '') {
        $this.data('placeholder.original', sources[i]);
		    break;
		  };
		};
    
    //  check for support of placeholder attribute:
    if (false){ // 'placeholder' in $this[0]
      if ( $this[0].placeholder === '' ) {
        $this.attr('placeholder', $this.data('placeholder.original'));
      };
      return; // browser supports native placeholder: abort.
    };
    
    
    // if(window.console) window.console.log('continuing with plugin');
		

		//	focus handler:
		$this.bind({
			focus: function(){
				if ($this.val() == $this.data('placeholder.original')) {
					//	input contains default text. or clearOnFocus is set to true.
					$this.val('');
				}else{
					//	input contains user text. select it, instead of clearing it.
					if (opts.selectOnFocus) {
					  $this.select();					  
					};
				};
				return false;
			},
			blur: function(){
				//	if input is empty, replace default text
				if ($this.val() == '') $this.val($this.data('placeholder.original'));
			},
			mouseup: function(){
				return false;
			}
		});
		
		//	initialize text in input
		$this.blur();

	});
};	

//	defaults
$.fn.placeholder.defaults = {
	text: 'from plugin',			//	default text to use. html value attribute will override this unless option force is set to true
  // clearOnFocus: false    //  if true, text will always be cleared on input focus. otherwise it's only cleared if it's the default text.
  selectOnFocus: true
};

//	public function/method
$.fn.placeholder.ver = function() { return "jquery.placeholder ver. " + ver; };
	
// end of closure
})(jQuery);