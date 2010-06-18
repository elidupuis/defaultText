/**
 *	jQuery defaultText plugin
 *	@version 0.4
 *	@date May 27, 2010
 *	@author Eli Dupuis
 *	@copyright (c) 2009 Lift Interactive (http://liftinteractive.com)
 *	Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 *	Requires: jQuery v1.3.2 or later (most likely works fine with earlier versions, but untested)

 *	TODO: testing in IE

*/

(function($) {

var ver = '0.4';

jQuery.fn.defaultText = function(options) {

	// iterate and reformat each matched element
	return this.each(function() {
		var $this = $(this);
		var opts = $.extend({}, $.fn.defaultText.defaults, options);
		
		//	store default text in $.data() :
		if (opts.force) {
			//	force forces the supplied text to be used, even if the value attribute has been declared. 
			$this.data('orig',opts.text);
			$this.val(opts.text);
		}else{
			//	use html value attirbute if it's not empty. otherwise use specified default text
	 		$this.data('orig',($this.val() != '') ? $this.val() : opts.text);
		};

		//	focus handler:
		$this.focus(function(){
			// if(window.console) window.console.log('focus');
			if ($(this).val() == $this.data('orig') || opts.clearOnFocus) {
				//	input contains default text. or clearOnFocus is set to true.
				$(this).val('');
			}else{
				//	input contains user text. select it, instead of clearing it.
				$(this).select();
			};
		});
		
		//	blur handler:
		$this.blur(function(){
			//	if input is empty, replace default text
			if ($(this).val() == '') $(this).val($this.data('orig'));
		});
		
		//	for webkit (on mouseup it places cursor at end of text, effectively clearing the selection)
		$this.mouseup(function(){ return false; });
		
		//	initialize text in input""
		$this.blur();

	});
};	

//	defaults
$.fn.defaultText.defaults = {
	text:'Search',			//	default text to use. html value attribute will override this unless option force is set to true
	force:false,			//	if true, option text will be used regardless of html value attribute
	clearOnFocus:false		//	if true, text will always be cleared on input focus. otherwise it's only cleared if it's the default text.
};

//	public function/method
$.fn.defaultText.ver = function() { return "jquery.defaultText ver. " + ver; };
	
// end of closure
})(jQuery);