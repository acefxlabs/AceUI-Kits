/*
 * Copyright 2015 - BoxedAll Platforms
 * https://boxedall.com
 * This script is written for all lovers of the web who belives things should be done easily without stress
 */

$(document).ready(function(){
    $('body').prepend('<style>.bx-error{ float: left; width: 100%; font-size: 70%; color: #FF0000; margin-top: 0px; padding-bottom: 10px; }</style>');
});


/* $('.validateMe:visible').submit(function(evt){
    evt.preventDefault();
    var formname = $(this).attr('name');
    validateMe(formname);
});*/

$('body').on('keydown', '.validateMe:visible .number', function(e){
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
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
    var money  = $(this).val();
    nx = money.replace(re, '');
    alert(nx);
    $(this).val(nx);

}).on('submit', '.validateMe:visible', function(evt){
    evt.preventDefault();
    var formname = $(this).attr('name');
    validateMe(formname);
});
 
function validateMe(formname){ 
    //Gneeral Validation to ensure it is filled
    $('form[name='+formname+']:visible .required').each(function(){
        $(this).next('.bx-error').remove();
        //var toPranet = $(this).parent('.item');
        if($(this).val() == '' || $(this).val() == null){
            $(this).after('<div class="smfont red-text tright left full bx-error">This field must not be empty</div>');
        }else{
            $(this).next('.bx-error').remove();
        }
    });
    
    //Email
    $('form[name='+formname+']:visible .email').each(function(){
        
        $(this).next('.bx-error').remove();
        
        var email = $(this).val();
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        
        if(re.test(email) == false){
            $(this).after('<div class="smfont red-text tright left full bx-error">Invalid email format</div>');
        }else{
            $(this).next('.bx-error').remove(); 
        }
    });
    
    //Number
    $('form[name='+formname+']:visible .number').each(function(){
        var inputtype = $(this).attr('type');
        //Enforce input type to be text to ensure maximal functionality
        if(inputtype == 'number'){
            $(this).attr('type', 'text');
        }
        
        $(this).next('.bx-error').remove();
        var num = $(this).val();
        if(isNaN(num) || num == ''){
           $(this).after('<div class="smfont red-text tright left full bx-error">Invalid number format</div>');
        }else{
            $(this).next('.bx-error').remove();
        }
    });
    
    //Equal to
    $('form[name='+formname+']:visible .equalto').each(function(){
        $(this).parent().find('.bx-error').remove();
        var equal = $(this).attr('equals'); //Targetted field
        var mydata = $(this).val(); 
        if(mydata == '' && $('#'+equal).hasClass('required')){
            $(this).after('<div class="smfont red-text tright left full bx-error">This field must not be empty</div>');
        }else if(mydata != $('#'+equal).val()){
            $(this).after('<div class="smfont red-text tright left full bx-error">Field data is not equal to related</div>');
        }else{
            $(this).next('.bx-error').remove();
        }
        
    });
    
   
    
    //Check loop
    if($('form[name='+formname+']:visible .bx-error').length > 0){
        return false; //Stop form completely
    }else{
        var call = $('form[name='+formname+']:visible').attr('callback');
        //alert($(this).attr('callback'));
        if(call == null || call == '' || call == undefined){
            //alert('form[name='+formname+']:visible');
            //$('form[name='+formname+']:visible').submit();
            document.forms[formname].submit();
        }else{
            //window[call](formname);
            var fnstring = call;
            var fnparams = [formname];
            var fn = window[fnstring];
            
            if (typeof fn === "function") fn.apply(null, fnparams);
        }
    }
}