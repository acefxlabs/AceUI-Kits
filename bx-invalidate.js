/*
 * Copyright 2015 - BoxedAll Platforms
 * https://boxedall.com
 * This script is written for all lovers of the web who belives things should be done easily without stress
 */

jQuery(document).ready(function(){
    jQuery('body').prepend('<style>.bx-error{ float: left; width: 100%; font-size: 70%; color: #FF0000; margin-top: 0px; padding-bottom: 10px; }</style>');
});

/* jQuery('.validateMe:visible').submit(function(evt){
    evt.preventDefault();
    var formname = jQuery(this).attr('name');
    validateMe(formname);
});*/

//Format Currency



jQuery('body').on('keydown', '.validateMe:visible .number', function(e){
    if (jQuery.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
}).on('keyup', '.validateMe:visible .money', function(){

    var re = /[a-zA-Z ]/i;
    var money  = jQuery(this).val();
    nx = money.replace(re, '');
    //alert(nx);
    jQuery(this).val(nx);

    //jQuery('.money').formatCurrency();

}).on('blur', '.validateMe:visible .money', function(){
    jQuery(this).formatCurrency({
        symbol : ''
    });
}).on('submit', '.validateMe:visible', function(evt){
    evt.preventDefault();
    var formname = jQuery(this).attr('name');

    validateMe(formname);
});



function validateMe(formname){

    //Gneeral Validation to ensure it is filled
    jQuery('form[name='+formname+']:visible .required').each(function(){
        jQuery(this).next('.bx-error').remove();
        //var toPranet = jQuery(this).parent('.item');
        if(jQuery(this).val() == '' || jQuery(this).val() === null){
            jQuery(this).after('<div class="smfont red-text tright left full bx-error">This field must not be empty</div>');
        }else{
            jQuery(this).next('.bx-error').remove();
        }
    });


    //Equalize fields
    jQuery('form[name='+formname+']:visible .equalto').each(function(){
        jQuery(this).next('.bx-error').remove();
        var data = jQuery(this).val();
        var target = jQuery(this).attr('equalto');
        var targetVal = jQuery('form[name='+formname+']:visible #'+target).val();

        if(data == targetVal && data != ''){
            jQuery(this).next('.bx-error').remove();
        }else{
            jQuery(this).after('<div class="smfont red-text tright left full bx-error">Value of field is not corresponding</div>');
        }

    });



    //Email
    jQuery('form[name='+formname+']:visible .email').each(function(){

        jQuery(this).next('.bx-error').remove();

        var email = jQuery(this).val();
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)jQuery/i;

        if(re.test(email) == false){
            jQuery(this).after('<div class="smfont red-text tright left full bx-error">Invalid email format</div>');
        }else{
            jQuery(this).next('.bx-error').remove();
        }
    });

    //Number
    jQuery('form[name='+formname+']:visible .number').each(function(){
        jQuery(this).next('.bx-error').remove();
        var num = jQuery(this).val();
        if(isNaN(num) || num == '' || num === null){
           jQuery(this).after('<div class="smfont red-text tright left full bx-error">Invalid number format</div>');
        }else{
            jQuery(this).next('.bx-error').remove();
        }
    });


    //Number Money
    jQuery('form[name='+formname+']:visible .money').each(function(){
        jQuery(this).next('.bx-error').remove();
        var money = jQuery(this).val();
        var re = /(?=.)^\jQuery?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?jQuery/;

        if(re.test(money) == false){
           jQuery(this).after('<div class="smfont red-text tright left full bx-error">Invalid money format</div>');
        }else{
            jQuery(this).next('.bx-error').remove();
        }
    });





    //Check loop
    if(jQuery('form[name='+formname+']:visible .bx-error').length > 0){
        return false; //Stop form completely
    }else{
        var call = jQuery('form[name='+formname+']:visible').attr('callback');
        //alert(jQuery(this).attr('callback'));
        if(call == null || call == '' || call == undefined){
            //alert('form[name='+formname+']:visible');
            //jQuery('form[name='+formname+']:visible').submit();
            document.forms[formname].submit();
        }else{
            window[call](formname);
        }
    }
}



//Include Money formatter [ jquery.formatCurrency-1.4.0.js ]
//  This file is part of the jQuery formatCurrency Plugin.
//
//    The jQuery formatCurrency Plugin is free software: you can redistribute it
//    and/or modify it under the terms of the GNU General Public License as published
//    by the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.

//    The jQuery formatCurrency Plugin is distributed in the hope that it will
//    be useful, but WITHOUT ANY WARRANTY; without even the implied warranty
//    of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License along with
//    the jQuery formatCurrency Plugin.  If not, see <http://www.gnu.org/licenses/>.

(function(jQuery) {

	jQuery.formatCurrency = {};

	jQuery.formatCurrency.regions = [];

	// default Region is en
	jQuery.formatCurrency.regions[''] = {
		symbol: 'jQuery',
		positiveFormat: '%s%n',
		negativeFormat: '(%s%n)',
		decimalSymbol: '.',
		digitGroupSymbol: ',',
		groupDigits: true
	};

	jQuery.fn.formatCurrency = function(destination, settings) {

		if (arguments.length == 1 && typeof destination !== "string") {
			settings = destination;
			destination = false;
		}

		// initialize defaults
		var defaults = {
			name: "formatCurrency",
			colorize: false,
			region: '',
			global: true,
			roundToDecimalPlace: 2, // roundToDecimalPlace: -1; for no rounding; 0 to round to the dollar; 1 for one digit cents; 2 for two digit cents; 3 for three digit cents; ...
			eventOnDecimalsEntered: false
		};
		// initialize default region
		defaults = jQuery.extend(defaults, jQuery.formatCurrency.regions['']);
		// override defaults with settings passed in
		settings = jQuery.extend(defaults, settings);

		// check for region setting
		if (settings.region.length > 0) {
			settings = jQuery.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);

		return this.each(function() {
			jQuerythis = jQuery(this);

			// get number
			var num = '0';
			num = jQuerythis[jQuerythis.is('input, select, textarea') ? 'val' : 'html']();

			//identify '(123)' as a negative number
			if (num.search('\\(') >= 0) {
				num = '-' + num;
			}

			if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
				return;
			}

			// if the number is valid use it, otherwise clean it
			if (isNaN(num)) {
				// clean number
				num = num.replace(settings.regex, '');

				if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
					return;
				}

				if (settings.decimalSymbol != '.') {
					num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arithmetic
				}
				if (isNaN(num)) {
					num = '0';
				}
			}

			// evalutate number input
			var numParts = String(num).split('.');
			var isPositive = (num == Math.abs(num));
			var hasDecimals = (numParts.length > 1);
			var decimals = (hasDecimals ? numParts[1].toString() : '0');
			var originalDecimals = decimals;

			// format number
			num = Math.abs(numParts[0]);
			num = isNaN(num) ? 0 : num;
			if (settings.roundToDecimalPlace >= 0) {
				decimals = parseFloat('1.' + decimals); // prepend "0."; (IE does NOT round 0.50.toFixed(0) up, but (1+0.50).toFixed(0)-1
				decimals = decimals.toFixed(settings.roundToDecimalPlace); // round
				if (decimals.substring(0, 1) == '2') {
					num = Number(num) + 1;
				}
				decimals = decimals.substring(2); // remove "0."
			}
			num = String(num);

			if (settings.groupDigits) {
				for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
					num = num.substring(0, num.length - (4 * i + 3)) + settings.digitGroupSymbol + num.substring(num.length - (4 * i + 3));
				}
			}

			if ((hasDecimals && settings.roundToDecimalPlace == -1) || settings.roundToDecimalPlace > 0) {
				num += settings.decimalSymbol + decimals;
			}

			// format symbol/negative
			var format = isPositive ? settings.positiveFormat : settings.negativeFormat;
			var money = format.replace(/%s/g, settings.symbol);
			money = money.replace(/%n/g, num);

			// setup destination
			var jQuerydestination = jQuery([]);
			if (!destination) {
				jQuerydestination = jQuerythis;
			} else {
				jQuerydestination = jQuery(destination);
			}
			// set destination
			jQuerydestination[jQuerydestination.is('input, select, textarea') ? 'val' : 'html'](money);

			if (
				hasDecimals &&
				settings.eventOnDecimalsEntered &&
				originalDecimals.length > settings.roundToDecimalPlace
			) {
				jQuerydestination.trigger('decimalsEntered', originalDecimals);
			}

			// colorize
			if (settings.colorize) {
				jQuerydestination.css('color', isPositive ? 'black' : 'red');
			}
		});
	};

	// Remove all non numbers from text
	jQuery.fn.toNumber = function(settings) {
		var defaults = jQuery.extend({
			name: "toNumber",
			region: '',
			global: true
		}, jQuery.formatCurrency.regions['']);

		settings = jQuery.extend(defaults, settings);
		if (settings.region.length > 0) {
			settings = jQuery.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);

		return this.each(function() {
			var method = jQuery(this).is('input, select, textarea') ? 'val' : 'html';
			jQuery(this)[method](jQuery(this)[method]().replace('(', '(-').replace(settings.regex, ''));
		});
	};

	// returns the value from the first element as a number
	jQuery.fn.asNumber = function(settings) {
		var defaults = jQuery.extend({
			name: "asNumber",
			region: '',
			parse: true,
			parseType: 'Float',
			global: true
		}, jQuery.formatCurrency.regions['']);
		settings = jQuery.extend(defaults, settings);
		if (settings.region.length > 0) {
			settings = jQuery.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);
		settings.parseType = validateParseType(settings.parseType);

		var method = jQuery(this).is('input, select, textarea') ? 'val' : 'html';
		var num = jQuery(this)[method]();
		num = num ? num : "";
		num = num.replace('(', '(-');
		num = num.replace(settings.regex, '');
		if (!settings.parse) {
			return num;
		}

		if (num.length == 0) {
			num = '0';
		}

		if (settings.decimalSymbol != '.') {
			num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arthmetic
		}

		return window['parse' + settings.parseType](num);
	};

	function getRegionOrCulture(region) {
		var regionInfo = jQuery.formatCurrency.regions[region];
		if (regionInfo) {
			return regionInfo;
		}
		else {
			if (/(\w+)-(\w+)/g.test(region)) {
				var culture = region.replace(/(\w+)-(\w+)/g, "jQuery1");
				return jQuery.formatCurrency.regions[culture];
			}
		}
		// fallback to extend(null) (i.e. nothing)
		return null;
	}

	function validateParseType(parseType) {
		switch (parseType.toLowerCase()) {
			case 'int':
				return 'Int';
			case 'float':
				return 'Float';
			default:
				throw 'invalid parseType';
		}
	}

	function generateRegex(settings) {
		if (settings.symbol === '') {
			return new RegExp("[^\\d" + settings.decimalSymbol + "-]", "g");
		}
		else {
			var symbol = settings.symbol.replace('jQuery', '\\jQuery').replace('.', '\\.');
			return new RegExp(symbol + "|[^\\d" + settings.decimalSymbol + "-]", "g");
		}
	}

})(jQuery);
