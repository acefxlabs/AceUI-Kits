/*!
 * AceUI Kit
 * (c) 2020 Abayomi Oyewumi, MIT License, https://gomakethings.com
 * Desc : InvalidateJS is a inline form Validation Plugin, the essense of this is to enable form validation without hiccups
 * This Plugin require no Javascript Framework or Library
 */

//TODO : Restrict Number Field or Required Number from Accepting Text
//TODO : Money Validation (format Money Alternative)
//TODO : EqualTo Validation


//If Element Contain Children Nodes
const validateMeErrorNode = (elm, message) => {
     // console.log(elm.classList);
     // console.log(message);
     elm.classList.add('validateMeError');

     let errorBox = elm.parentNode.querySelector('.validateMeErrorMessage');
     if(errorBox === null){
          errorBox = document.createElement('div');
          errorBox.classList.add('validateMeErrorMessage');
     }

     errorBox.innerHTML = message;
     elm.parentNode.append(errorBox);
     // return false;
}

//Append Error To Element`
const validateMeRemoveErrorNode = elm => {
     elm.classList.remove('validateMeError');
     let errorBox = elm.parentNode.querySelector('.validateMeErrorMessage');
     if(errorBox !== null){
          elm.parentNode.removeChild(errorBox);
     }
}

// Validate Form on Submit
const validateMeEventsListener = form => {
     let callBack = form.getAttribute('callback');

     //Loop Through Elements
     let elms = form.elements;
     let formElms = ["input", "select", "file", "textarea"];
     // console.log(elms);

     for(let i = 0; i < elms.length; i++){

          let tag = elms[i].tagName.toLowerCase();

          if(formElms.includes(tag)){
               validateMeElement(elms[i]);
          }
     }


     let errorState = form.querySelectorAll('.validateMeError');
     let errorMsg = form.querySelectorAll('.validateMeErrorMessage');

     if(errorState.length === 0 && errorMsg.length === 0){
          window[callBack](form, serializeData = validateMeSerializedToObject(form));
     }

}

//Validate Form Element
const validateMeElement = elm => {
     let validReq = elm.classList;

     //Validate General
     if(validReq.contains('required') && elm.value === '' || elm.value.trim() === '' && !validReq.contains('validateMeError')){
          validateMeErrorNode(elm, 'This field is required');
          return false;
     }else{
          validateMeRemoveErrorNode(elm);
     }

     //Email Validation
     if(validReq.contains('email') && !validReq.contains('validateMeError')){

          if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(elm.value) === true){
               validateMeRemoveErrorNode(elm);
          }else{
               validateMeErrorNode(elm, 'Content not a valid Email');
               return false;
          }
     }

     //Number Validation
     if(validReq.contains('number') && !validReq.contains('validateMeError')){
          console.log(Number(elm.value));
          if(isNaN(elm.value)){
               validateMeErrorNode(elm, 'Content not a valid Number');
               return false;
          }else{
               validateMeRemoveErrorNode(elm);
          }
     }
}

const validateMeSerializedToObject = (form) => {
     let serializeData = {};

     let elms = form.elements;
     let formElms = ["input", "select", "file", "textarea"];

     for(let x = 0; x < elms.length; x++){

          let tag = elms[x].tagName.toLowerCase();

          if(formElms.includes(tag)){
               // console.log(elms[x]);
               serializeData[elms[x].name] = elms[x].value;
          }
     }

     return serializeData;
}


(() => {
     //CSS Setter
     let style = document.createElement('style');
     style.setAttribute('id', 'validateMeStyle');

     style.innerHTML = `
          .validateMeError{
               border: solid 1px #C00;
          }
          .validateMeErrorMessage{
               float : right;
               padding : 0px 3px;
               color : #F00;
               font-size : 11px;
               font-family : sans-serif;
               font-weight: 400;
          }
     `;

     document.body.prepend(style);


     window.document.body.addEventListener('submit', (e) => {
          e.preventDefault();

          let form = e.target;
          if(form.classList.contains('validateMe')){
               validateMeEventsListener(form);
          }
     });



     //Focus Out
     window.document.body.addEventListener('focusout', e => {
          let elm = e.target;
          let tag = elm.tagName.toLowerCase();

          if( tag === 'input' || tag === 'select' || tag === 'textarea' || tag === 'file'){
               //Check if its a child of Validate Me
               if(elm.form !== null  && elm.form.classList.contains('validateMe')){
                    validateMeElement(elm);
               }
          }

     })

     //Focus In
     window.document.body.addEventListener('focusin', e => {
          let elm = e.target;

          let tag = elm.tagName.toLowerCase();

          if( tag === 'input' || tag === 'select' || tag === 'textarea' || tag === 'file'){
               //Check if its a child of Validate Me
               if(elm.form !== null  && elm.form.classList.contains('validateMe')){
                    validateMeRemoveErrorNode(elm);
               }
          }
     })
     // console.log(input);
})();



//BlockUI SI Version
(() => {
     let style = document.createElement('style');
     style.setAttribute('id', 'shadeUIStyle');

     style.innerHTML = `
          .shadeUIParent{
               position : relative;
          }
          .shadeUIBlock{
               top : -15px;
               left : -15px;
               position : absolute;
               width : 100%;
               height : 100%;
               background : #000;
               opacity : 0.8;
               z-index : 1000000;
               border-radius : 3px;
               padding : 15px;
          }
          .shadeUIMessage{
               padding : 15px 25px;
               border-radius : 5px;
               background : #FFF;
               float : left;
               color : #000;
               font-size : 13px;
               position : absolute;
               width : 250px;
               text-align: center;
          }
     `;
     document.head.append(style);
})();
function shadeUI(targetElm, message){
     targetElm.classList.add('shadeUIParent');


     let shades = targetElm.querySelectorAll('.shadeUIBlock');

     // Remove All of them
     if(shades.length > 0){
          for(let i = 0; i < shades.length; i++){
               shades[i].outerHTML = "";
          }
     }

     //Now Create Element
     if(shades.length === 0){

          let shadeUIBlock = document.createElement('div');
          shadeUIBlock.classList.add('shadeUIBlock');
          targetElm.append(shadeUIBlock);

          if(message === ''){
               message = 'Loading, please wait...';
          }

          let shadeUIMessage = document.createElement('div');
          shadeUIMessage.classList.add('shadeUIMessage');
          shadeUIMessage.innerHTML = message;
          shadeUIBlock.append(shadeUIMessage);

          shadeUIMessage.style.left = `calc( 50% - 155px )`;
          shadeUIMessage.style.top = `calc( 50% - 35px )`;
     }
}

function closeShadeUI(elm){
     let shades = elm.querySelectorAll('.shadeUIBlock');

     // Remove All of them
     if(shades.length > 0){
          for(let i = 0; i < shades.length; i++){
               shades[i].outerHTML = "";
          }
     }
}


//Show Notificaion Strip Message
(() => {
     //Create Element and Prepend it to body
     // let notificationStrip = document.querySelectorAll('.vp-output-message');
     let notificationStrip = document.querySelectorAll('.notificationStrip');
     // console.log();
     if(notificationStrip.length === 0){
          let style = document.createElement('style');
          style.setAttribute('id', 'notificationStrip');

          style.innerHTML = '.notificationStrip{position:fixed;opacity: 0;top:0;z-index:10000000;width:calc(100% - 30px);padding:10px 15px;color:#FFF;}.notificationStrip .container{width:calc(100% - 24px);text-align:center;font-weight:200;margin:0 12px}.notificationStrip .x{padding:1px 10px;font-weight:100;font-family:sans-serif;font-size:15px;position:absolute;right:5px;top:0;cursor:pointer;margin-top:7px}';

          document.head.append(style);

          notificationStrip = document.createElement('div');
          notificationStrip.classList.add('notificationStrip');
     }

     notificationStrip.innerHTML = '<div class="container"></div><div class="x">x</div>';
     document.body.prepend(notificationStrip);

     notificationStrip.addEventListener('click', (e) => {
          e.target.style.opacity = 1;
          clearStripMessage();
     });

})();

function showStripMessage(message, status){
     let theme = '#333';

     switch (status) {
          case 0:
               theme = '#f58400';
               break;

          case 1:
               theme = '#5ba200';
               break;

          case 2:
               theme = '#bd0000';
               break;
     }

     let notificationStrip = document.querySelector('.notificationStrip');
     // notificationStrip.style.display = 'block';
     notificationStrip.style.backgroundColor = theme;
     // console.log(theme);

     notificationStrip.querySelector('.container').innerHTML = message;

     let notificationStripHeight = notificationStrip.offsetHeight;
     // notificationStrip.style.display = 'none';
     let cnt = 0;

     let fadeIn = setInterval(() => {
          cnt = cnt + 0.1;
          notificationStrip.style.opacity = cnt;
          if(cnt >= 1){
               clearInterval(fadeIn);

               setTimeout(() => {
                    clearStripMessage();
               }, 4000);
          }
     }, 30);
}

//Clear Strip Message
function clearStripMessage(){
     let notificationStrip = document.querySelector('.notificationStrip');
     let cnt = 1;

     let fadeOut = setInterval(() => {
          cnt = cnt - 0.1;
          notificationStrip.style.opacity = cnt;
          if(cnt <= 0){
               clearInterval(fadeOut);
          }
     }, 10);
}
