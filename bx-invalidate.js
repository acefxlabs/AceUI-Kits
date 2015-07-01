/*
 * Copyright 2015 - BoxedAll Platforms
 * https://boxedall.com
 * This script is written for all lovers of the web who belives things should be done easily without stress
 */
function validateMe(formname){
    //Ensure No Empty
    $('form[name='+formname+']:visible .validate').each(function(){
        var toPranet = $(this).parent('.item');
        if($(this).val() == ''){
            toPranet.addClass('error');
        }else{
            toPranet.removeClass('error');
        }
    }); 
    
    //Validate Email
    $('form[name='+formname+']:visible .validateEmail').each(function(){
        var toPranet = $(this).parent('.item');
        var email = $(this).val();
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        
        if(re.test(email) == true){
            toPranet.removeClass('error');
        }else{
            toPranet.addClass('error');
        }
    });
    
    //validate length
    $('form[name='+formname+']:visible .validateLenght').each(function(){
        var toPranet = $(this).parent('.item');
        var cnt = $(this).attr('size');
        if(cnt == '' || cnt != $(this).val().length){
           toPranet.addClass('error');
        }else{
            toPranet.removeClass('error');
        }
    });
    
    //validate compare
    $('form[name='+formname+']:visible .validateCompare').each(function(){
        var toPranet = $(this).parent('.item');
        var compare = $(this).attr('compare');
        if($(this).val() == $('#'+compare).val() && $(this).val() != ''){
           toPranet.removeClass('error');
        }else{
            toPranet.addClass('error');
        }
    });
    
    //validate Number
    $('form[name='+formname+']:visible .validateNum').each(function(){
        var toPranet = $(this).parent('.item');
        var num = $(this).val();
        if(isNaN(num) || num == ''){
           toPranet.addClass('error');
        }else{
            toPranet.removeClass('error');
        }
    });
    
    //validate Phone
    $('form[name='+formname+']:visible .validatePhone').each(function(){
        var toPranet = $(this).parent('.item');
        var re = /^\({0,1}[0-9]{4}\){0,1}[ \-\.]{0,1}[0-9]{3}[ \-\.]{0,1}[0-9]{4}$/;
        var phonenum = $(this).val();
        if(!re.test(phonenum)){
           toPranet.addClass('error');
        }else{
            phonenum = phonenum.replace(/\-/g,''); //Rmeove Dash
            
            if($(this).next('.addedHidded').length == 0){
                $(this).after('<input type="hidden" class="addedHidded" name="my'+$(this).attr(name)+'">').val(phonenum);
            }
            
            $(this).next('.addedHidded').val(phonenum);
            toPranet.removeClass('error');
        }
    });
    
    //validate Phone
    $('form[name='+formname+']:visible .validateCC').each(function(){
        var toPranet = $(this).parent('.item');
        var cardDetails = $(this).val();
        
        //Ensure card is not less than 16
        if(cardDetails.length < 16){
           toPranet.addClass('error'); 
        }
        
        
        
        //cardDetails = cardDetails.replace(/\-/g,''); //Rmeove Dash
        if(cardDetails.length != 16){
            toPranet.addClass('error'); 
        }else{
            
            if($(this).next('.addedHidded').length == 0){
                $(this).after('<input type="hidden" class="addedHidded" name="my'+$(this).attr(name)+'">').val(cardDetails);
            }
            
            $(this).next('.addedHidded').val(cardDetails);
            toPranet.removeClass('error');
        }
    });
    
    
    //Check loop
    if($('form[name='+formname+']:visible .error').length > 0){
        return 0;
    }else{
        return 1;
    }
    
    return 1;
}