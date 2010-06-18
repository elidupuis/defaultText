/*!
 * jQuery DefaultText Plugin
 * Copyright (c) 2010 Eli Dupuis
 * Version: 0.5 (June 17, 2010)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.4 or later
 */

(function($) {

var ver = '0.5';

jQuery.fn.defaultText = function(options) {

	// iterate and reformat each matched element
	return this.each(function() {
		var $this = $(this);
		var opts = $.extend({}, $.fn.defaultText.defaults, options);
		
		//	store default text in $.data() :
		if (opts.force) {
			//	force forces the supplied text to be used, even if the html value attribute has been declared. 
			$this.data('defaultText.original', opts.text);
			$this.val(opts.text);
		}else{
			//	use html value attirbute if it's not empty. otherwise use specified default text
	 		$this.data('defaultText.original', ($this.val() != '') ? $this.val() : opts.text);
		};

		//	focus handler:
		$this.bind({
			focus: function(){
				if ($this.val() == $this.data('defaultText.original') || opts.clearOnFocus) {
					//	input contains default text. or clearOnFocus is set to true.
					$this.val('');
				}else{
					//	input contains user text. select it, instead of clearing it.
					$this.select();
				};
				return false;
			},
			blur: function(){
				//	if input is empty, replace default text
				if ($this.val() == '') $this.val($this.data('defaultText.original'));
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
$.fn.defaultText.defaults = {
	text: 'Search',			//	default text to use. html value attribute will override this unless option force is set to true
	force: false,			//	if true, option text will be used regardless of html value attribute
	clearOnFocus: false		//	if true, text will always be cleared on input focus. otherwise it's only cleared if it's the default text.
};

//	public function/method
$.fn.defaultText.ver = function() { return "jquery.defaultText ver. " + ver; };
	
// end of closure
})(jQuery);