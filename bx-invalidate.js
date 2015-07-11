/*
 * Copyright 2015 - BoxedAll Platforms
 * https://boxedall.com
 * This script is written for all lovers of the web who belives things should be done easily without stress
 */
 
$('.validateMe').submit(function(evt){
    evt.preventDefault();
    var formname = $(this).attr('name');
    validateMe(formname);
});
 
function validateMe(formname){ 
    
    //Gneeral Validation to ensure it is filled
    $('form[name='+formname+']:visible .required').each(function(){
        $(this).next('.error').remove();
        //var toPranet = $(this).parent('.item');
        if($(this).val() == '' || $(this).val() == null){
            $(this).after('<div class="smfont red-text tright left full error">This field must not be empty</div>');
        }else{
            $(this).next('.error').remove();
        }
    });
    
    //Email
    $('form[name='+formname+']:visible .email').each(function(){
        
        $(this).next('.error').remove();
        
        var email = $(this).val();
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        
        if(re.test(email) == false){
            $(this).after('<div class="smfont red-text tright left full error">Invalid email format</div>');
        }else{
            $(this).next('.error').remove(); 
        }
    });
    
    //Number
    $('form[name='+formname+']:visible .number').each(function(){
        $(this).next('.error').remove();
        var num = $(this).val();
        if(isNaN(num) || num == ''){
           $(this).after('<div class="smfont red-text tright left full error">Invalid number format</div>');
        }else{
            $(this).next('.error').remove();
        }
    });
    
    
    
    //Check loop
    if($('form[name='+formname+']:visible .error').length > 0){
        return false; //Stop form completely
    }else{
        return true; //
    }
}