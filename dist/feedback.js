/*!
 * InSalesFeedback v0.15.7
 * https://github.com/VladimirIvanin/InSalesFeedback
 * Vladimir Ivanin
 * 2019
 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var parseSerialize=require("./helpers").parseSerialize,getFailerrors=require("./helpers").getFailerrors,getDataAttrName=require("./helpers").getDataAttrName,checkAgree=require("./validate").checkAgree,system=require("../variables").system;function binding(){var e=this,s=e.options,n=e.$element,a=n.find(getDataAttrName(s.selectors.submit)),t=n.find(getDataAttrName(s.selectors.agree));function r(e){0==a.length&&(console.warn("Отсутствует кнопка отправления формы."),a=n.find('[type="submit"]')),e?(a.removeClass(s.classes.disabledButton).prop("disabled",!1).removeAttr("disabled","disabled"),t.removeClass(s.classes.errorAgree)):(a.addClass(s.classes.disabledButton).prop("disabled",!0).attr("disabled","disabled"),t.addClass(s.classes.errorAgree))}n.on("submit",function(s){e.eventMachine("before",n,{}),s.preventDefault();var a=e.options.selectors.agree,t=checkAgree(n,a,e.options.useAgree,e.options.errorMessages),r=parseSerialize(serialize(n.get(0))),o=e.options.customValidate;if(!t)return e.eventMachine("notagree",n,r),void e.eventMachine("after",n,r);o&&"function"==typeof o?o(n,r,e)?e.validateFormData(r).done(function(s){e.sendMessage(s).done(function(s){s.formData=r,e.eventMachine("success",n,s),e.eventMachine("after",n,r)}).fail(function(s){var a=getFailerrors(s);e.errorRender(a),e.eventMachine("fail",n,s),e.eventMachine("after",n,r)})}).fail(function(s){e.errorRender(s),e.eventMachine("error",n,s),e.eventMachine("after",n,r)}):(e.eventMachine("error",n,r),e.eventMachine("after",n,r)):e.validateFormData(r).done(function(s){e.sendMessage(s).done(function(s){s.formData=r,e.eventMachine("success",n,s),e.eventMachine("after",n,r)}).fail(function(s){var a=getFailerrors(s);e.errorRender(a),e.eventMachine("fail",n,s),e.eventMachine("after",n,r)})}).fail(function(s){e.errorRender(s),e.eventMachine("error",n,s),e.eventMachine("after",n,r)})}),t.click(function(a){var t=$(this).prop("checked");if(e.eventMachine("before",n,{}),t){var o=parseSerialize(n.serialize());e.eventMachine("agree",n,o),e.eventMachine("after",n,o),e.successRender(!0),r(!0)}else s.showMessageAgree&&e.errorRender([{name:"agree",errorMessage:e.options.errorMessages.agree}]),r(!1)}),$(document).on(system.events.success,function(s){e.UUID==s.InSalesFeedback.$target[0].InSalesFeedbackUUID&&(e.options.resetFormOnSubmit&&n.trigger("reset"),e.successRender())}),$(document).on(system.events.notagree,function(n){e.UUID==n.InSalesFeedback.$target[0].InSalesFeedbackUUID&&(s.showMessageAgree&&e.errorRender([{name:"agree",errorMessage:e.options.errorMessages.agree}]),r(!1))})}function serialize(e){if(e&&"FORM"===e.nodeName){var s,n,a=[];for(s=e.elements.length-1;s>=0;s-=1)if(""!==e.elements[s].name)switch(e.elements[s].nodeName){case"INPUT":switch(e.elements[s].type){case"text":case"tel":case"email":case"hidden":case"password":case"button":case"reset":case"submit":a.push(e.elements[s].name+"="+encodeURIComponent(e.elements[s].value));break;case"checkbox":case"radio":e.elements[s].checked&&a.push(e.elements[s].name+"="+encodeURIComponent(e.elements[s].value))}break;case"file":break;case"TEXTAREA":a.push(e.elements[s].name+"="+encodeURIComponent(e.elements[s].value));break;case"SELECT":switch(e.elements[s].type){case"select-one":a.push(e.elements[s].name+"="+encodeURIComponent(e.elements[s].value));break;case"select-multiple":for(n=e.elements[s].options.length-1;n>=0;n-=1)e.elements[s].options[n].selected&&a.push(e.elements[s].name+"="+encodeURIComponent(e.elements[s].options[n].value))}break;case"BUTTON":switch(e.elements[s].type){case"reset":case"submit":case"button":a.push(e.elements[s].name+"="+encodeURIComponent(e.elements[s].value))}}return a.join("&")}}module.exports=binding;
},{"../variables":10,"./helpers":3,"./validate":8}],2:[function(require,module,exports){
var system=require("../variables").system;function eventMachine(e,t,n){var i=getMethodName(e),s=getEventName(e),a={};a.$target=t,a[e]=n||{},"object"==typeof EventBus&&EventBus.publish&&EventBus.publish(s,a);var o=jQuery.Event(s);o.InSalesFeedback=a,$(document).trigger(o),this.options[i]&&"function"==typeof this.options[i]&&this.options[i](a)}function getEventName(e){return system.events[e]}function getMethodName(e){return"on"+capitalize(e)}var capitalize=function(e){return e.charAt(0).toUpperCase()+e.slice(1)};module.exports=eventMachine;
},{"../variables":10}],3:[function(require,module,exports){
function parseSerialize(e){if(""==e)return{};var t={},r=decodeURI(e).replace("?","").split("&"),n=new RegExp(/(([A-Za-z0-9])+)+/g);return $.each(r,function(e,r){if(""!==(r=(r=r.replace(/^feedback\[/g,"")).replace("]=","="))){(r=r.split("="))[1]=r[1].replace(/%(?!\d+)/g,"%25");var a,i=r[0].match(n),x=i[0];if(r[0].indexOf("[]")>-1)t[x]||(t[x]=[]),t[x].push(r[1]);else if(r[0].indexOf("[")>-1)x=r[0],t[i[0]]||(t[i[0]]=[]),t[i[0]][i[1]]||(t[i[0]][i[1]]=[]),"undefined"===(a=decodeURIComponent(r[1]))&&(a=""),t[i[0]][i[1]].push(a);else"undefined"===(a=decodeURIComponent(r[1]))&&(a=""),t[r[0]]=a}}),t}function getPageLink(){return'<a href="'+window.location.href+'">'+$("title").text()+"</a>"}function testRequire(e,t){return t.indexOf(e)>-1}function getPhoneNumberLength(e){e=e?decodeURIComponent(e.replace(/%(?!\d+)/g,"%25")):"";var t=new RegExp(/[\d]/g),r=e.match(t);return r||(r=[]),r.length}function emailTest(e){var t=e||"";return new RegExp(/.+@.+\..+/g).test(t)}function generateUUID(){var e=(new Date).getTime();return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var r=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?r:3&r|8).toString(16)})}function getFailerrors(e){var t=[];return e.errors&&$.each(e.errors,function(e,r){t.push({name:e,errorMessage:r[0]||""})}),t}function getDataAttrName(e,t){return"["+(t?e+'="'+t+'"':e)+"]"}module.exports={parseSerialize:parseSerialize,testRequire:testRequire,generateUUID:generateUUID,emailTest:emailTest,getFailerrors:getFailerrors,getPhoneNumberLength:getPhoneNumberLength,getDataAttrName:getDataAttrName,getPageLink:getPageLink};
},{}],4:[function(require,module,exports){
var defaults=require("../variables").defaults,binding=require("./binding"),eventMachine=require("./eventMachine"),sendMessage=require("./sendMessage"),errorRender=require("./render").errorRender,successRender=require("./render").successRender,checkProduct=require("./validate").checkProduct,checkNameContent=require("./validate").checkNameContent,validateFormData=require("./validate").validateFormData,generateUUID=require("./helpers").generateUUID,Feedback=function(e,t){this.$element=$(e);var r=generateUUID();return this.UUID=r,this.$element[0].InSalesFeedbackUUID=r,this.options=$.extend(!0,{},defaults,t),this.initBinding=binding,this.sendMessage=sendMessage,this.eventMachine=eventMachine,this.validateFormData=validateFormData,this.errorRender=errorRender,this.successRender=successRender,this.initFeedback(),this};Feedback.prototype.initFeedback=function(e,t){this.isPageProduct=checkProduct(),this.initBinding(),this.options.useDefaultContent||checkNameContent(this.$element)},module.exports=Feedback;
},{"../variables":10,"./binding":1,"./eventMachine":2,"./helpers":3,"./render":5,"./sendMessage":6,"./validate":8}],5:[function(require,module,exports){
var getDataAttrName=require("./helpers").getDataAttrName,system=require("../variables").system;function errorRender(e){var s=this,t=s.options.useJqueryToggle,r=getDataAttrName(s.options.selectors.field)+":first",n=getDataAttrName(s.options.selectors.inputError),o=getDataAttrName(s.options.selectors.error),i=getDataAttrName(s.options.selectors.errors),a=s.options.classes.errorInput,l=s.options.classes.errorField;function d(e,r,n){e.removeClass(a),r.removeClass(l),renderWithOptions(n,"","",!1,t),renderWithOptions(s.$element.find(o),"","",!1,t),renderWithOptions(s.$element.find(i),"","",!1,t)}$.each(e,function(e,o){var i=s.$element.find('[name="'+o.name+'"]'),m=i.parents(r),c=m.find(n);i.addClass(a),m.addClass(l),renderWithOptions(c,o.errorMessage,"",!0,t),s.options.hideErrorOnFocus&&i.on("click",function(e){d(i,m,c)})});var m=[];if($.each(e,function(e,s){m.push(s.name)}),$.each(system.names,function(e,t){if(-1==m.indexOf(t)){var o=s.$element.find('[name="'+t+'"]'),i=o.parents(r);d(o,i,i.find(n))}}),e&&e.length){s.$element.addClass(s.options.classes.errorForm),renderWithOptions(s.$element.find(o),s.options.messages.error,"",!0,t);var c="";_.forEach(e,function(e){c+=e.errorMessage+"<br />"}),renderWithOptions(s.$element.find(i),c,"",!0,t)}}function successRender(e){var s=this.$element,t=this.options.useJqueryToggle,r=this.options.hideSuccessMessageTimer,n=this.options.classes.errorInput,o=this.options.classes.errorField,i=getDataAttrName(this.options.selectors.field),a=getDataAttrName(this.options.selectors.inputError),l=getDataAttrName(this.options.selectors.error),d=getDataAttrName(this.options.selectors.errors),m=getDataAttrName(this.options.selectors.success);(this.$element.find("[name]").removeClass(n),this.$element.find(i).removeClass(o),this.$element.removeClass(this.options.classes.errorForm),renderWithOptions(s.find(l),"","",!1,t),renderWithOptions(s.find(d),"","",!1,t),renderWithOptions(s.find(a),"","",!1,t),e)||renderWithOptions(s.find(m),this.options.messages.success,"",!0,t,r)}function renderWithOptions(e,s,t,r,n,o){s&&e.html(s),r?e.addClass(t):e.removeClass(t),n&&(r?e.show():e.hide()),o&&setTimeout(function(){e.removeClass(t),e.html(""),n&&e.hide()},o)}module.exports={errorRender:errorRender,successRender:successRender};
},{"../variables":10,"./helpers":3}],6:[function(require,module,exports){
var parseSerialize=require("./helpers").parseSerialize;function sendMessage(e){var a=$.Deferred(),r={lang:parseSerialize(window.location.search).lang||"",feedback:e};return $.post("/client_account/feedback.json",$.param(r)).done(function(e){r&&"ok"==e.status?a.resolve(e):(e.message=r,a.reject(e))}),a.promise()}module.exports=sendMessage;
},{"./helpers":3}],7:[function(require,module,exports){
var getPageLink=require("./helpers").getPageLink;function updateContentData(t,e,n){var o=$.Deferred(),r=e||"";return r=getCustomContent(t,r),r=getContentHtml(t,r),t.isPageProduct&&t.options.includeProductInfo&&!n?$.ajax({url:window.location.pathname+".json",type:"GET",dataType:"json"}).done(function(e){e&&e.product?(t.options.messageContent&&(r=updateContentTop(r,t.options.messageContent)),r=getProductInfo(e.product,r),t.options.urlPageOnContent&&(r=updateContentFooter(r)),o.resolve(r)):(t.options.urlPageOnContent&&(r=updateContentFooter(r)),o.resolve(r))}).fail(function(){t.options.urlPageOnContent&&(r=updateContentFooter(r)),o.resolve(r)}):t.options.urlPageOnContent&&(r=updateContentFooter(r)),t.isPageProduct&&t.options.includeProductInfo&&!n||o.resolve(r),o.promise()}function getProductInfo(t,e){var n='<div><a href="'+t.url+'">';return t.first_image&&(n+='<img src="'+t.first_image.medium_url+'" />'),n+="</a></div>",n+=getRow("Товар",t.title),t.sku&&(n+=getRow("Артикул",t.sku)),e+n}function getRow(t,e){return $("<div>").append($("<div>").append($("<strong>",{text:e?t+": ":t})).append($("<span>",{text:e||""}))).html()}function getContentHtml(t,e){var n=e;return t.$element.find("["+t.options.selectors.html+"]").each(function(t,e){n+=$(e).html()}),n}function getCustomContent(t,e){var n=e;return t.$element.find("["+t.options.selectors.customContent+"]").each(function(e,o){var r=$(o).data(t.options.selectors.customContent.replace("data-","")),a=$(o).val();a||(a=$(o).html()),""===a&&(a="не заполнено"),$(o).is('[type="radio"]')||$(o).is('[type="checkbox"]')?$(o).is(":checked")&&(a="✓",$(o).is("[data-hide-checkbox-value]")?n+=getRow(r,!1):n+=getRow(r,a)):n+=getRow(r,a)}),n}function updateContentTop(t,e){return t+("<br />"+e+"<br />")}function updateContentFooter(t){return t+("<br /> Отправлено со страницы: "+getPageLink())}module.exports=updateContentData;
},{"./helpers":3}],8:[function(require,module,exports){
var system=require("../variables").system,updateContentData=require("./updateContentData"),testRequire=require("./helpers").testRequire,emailTest=require("./helpers").emailTest,getPhoneNumberLength=require("./helpers").getPhoneNumberLength;function checkDuplicateId(e){var r=!1,t=e.get(0);t.id&&($('[id="'+t.id+'"]').length>1&&(r=!0,console.warn("Внимание! Задвоенный идентификатор - #"+t.id+". Форма может некорректно отправляться.")));return r}function checkProduct(){return window.location.pathname.indexOf("/product/")>-1}function validateFormData(e){var r=this,t=$.Deferred(),a=[],n=r.options.require,o=e,s=testRequire("from",n),i=validateFrom(o.from,s,r.options.errorMessages.from);o.from=i.value,i.isError&&a.push({name:"from",errorMessage:i.errorMessage});var u=testRequire("phone",n),c=validatePhone(o.phone,u,r.options.phoneNumberLength,r.options.errorMessages.phone);o.phone=c.value,c.isError&&a.push({name:"phone",errorMessage:c.errorMessage});var l=testRequire("name",n),v=validateName(o.name,l,r.options.errorMessages.name);o.name=v.value,v.isError&&a.push({name:"name",errorMessage:v.errorMessage});var h=testRequire("subject",n),d=validateSubject(o.subject,h,r.options.errorMessages.subject);if(o.subject=d.value,d.isError&&a.push({name:"subject",errorMessage:d.errorMessage}),r.options.useDefaultContent||o.content)updateContentData(r,o.content,a.length>0).done(function(e){o.content=e;var n=validateContent(o.content,!r.options.useDefaultContent);o.content=n.value,n.isError&&a.push({name:"content",errorMessage:n.errorMessage}),a.length>0?t.reject(a):t.resolve(o)});else{var m=validateContent(o.content,!r.options.useDefaultContent,r.options.errorMessages.content);o.content=m.value,m.isError&&a.push({name:"content",errorMessage:m.errorMessage}),a.length>0?t.reject(a):t.resolve(o)}return t.promise()}function validatePhone(e,r,t,a){e||(e="");var n={isError:!1,errorMessage:a,value:decodeURIComponent(e.replace(/%(?!\d+)/g,"%25"))};(e=decodeURIComponent(e.replace(/%(?!\d+)/g,"%25")),!r&&e&&""==e||!r&&!e)?n.value=system.dataDefault.phone:r&&(e&&""!=e?t>getPhoneNumberLength(e)&&(n.isError=!0):n.isError=!0);return n}function validateFrom(e,r,t){e||(e="");var a={isError:!1,errorMessage:t,value:e};if(!r&&e&&""==e||!r&&!e){var n=window.location.host;-1==n.indexOf(".")&&(n="myinsales.ru"),a.value="shop@"+n}else e&&""!=e&&emailTest(e)||(a.isError=!0);return a}function validateName(e,r,t){e||(e="");var a={isError:!1,errorMessage:t,value:e};return!r&&e&&""==e||!r&&!e?a.value=system.dataDefault.name:e&&""!=e||(a.isError=!0),a}function validateSubject(e,r,t){e||(e="");var a={isError:!1,errorMessage:t,value:e};return!r&&e&&""==e||!r&&!e?a.value=system.dataDefault.subject:e&&""!=e||(a.isError=!0),a}function validateContent(e,r,t){var a={isError:!1,errorMessage:t,value:e},n=e.trim();return e&&""!=n?(!r&&e&&""==n||!r&&!e)&&(a.value=system.dataDefault.content):(a.isError=!0,a.value=""),a}function checkNameContent(e){0==e.find('[name="content"]').length&&console.warn("В форме отсутствует поле content",e)}function checkAgree(e,r,t,a){var n=!0;if(t){var o=e.find("["+r+"]");0!=o.length&&o.prop("checked")||(n=!1),0==o.length&&console.warn("Отсутствует чекбокс согласия на обработку персональных данных")}return n}module.exports={checkDuplicateId:checkDuplicateId,checkProduct:checkProduct,checkAgree:checkAgree,checkNameContent:checkNameContent,validateFormData:validateFormData};
},{"../variables":10,"./helpers":3,"./updateContentData":7}],9:[function(require,module,exports){
var Feedback=require("feedback"),system=require("variables").system,checkDuplicateId=require("./feedback/validate").checkDuplicateId;!function(e,a,t){var n=e.fn.InSalesFeedback;e.fn.InSalesFeedback=function(a){return this.each(function(t){var n=e(this),c="object"==typeof a&&a,s=n.data(system.NAME);(s||"destroy"!==a)&&(s||n.data(system.NAME,s=new Feedback(n,c)),"string"==typeof a&&s[a]())})},e.fn.InSalesFeedback.defaults=require("variables").defaults,e.fn.InSalesFeedback.noConflict=function(){return e.fn.InSalesFeedback=n,this}}(jQuery,window);
},{"./feedback/validate":8,"feedback":4,"variables":10}],10:[function(require,module,exports){
var defaults={useAgree:!1,showMessageAgree:!1,includeProductInfo:!0,messageContent:null,urlPageOnContent:!0,useJqueryToggle:!0,hideSuccessMessageTimer:5e3,hideErrorOnFocus:!0,resetFormOnSubmit:!0,useDefaultContent:!0,phoneNumberLength:11,require:[],onSuccess:function(){},onFail:function(){},onError:function(){},onBefore:function(){},onAfter:function(){},onAgree:function(){},onNotagree:function(){},customValidate:null,classes:{errorInput:"is-error-feedback-input",errorField:"is-error-feedback-field",errorForm:"is-error-feedback",errorAgree:"is-error-agree-feedback",disabledButton:"is-disabled-feedback",failForm:"is-fail-feedback"},errorMessages:{from:"Поле e-mail имеет неверное значение",phone:"Укажите номер в международном формате",name:"Не заполнено поле имя",subject:"Не заполнено поле тема сообщения",agree:"Необходимо принять условия передачи информации",content:"Не заполнено поле текст сообщения"},messages:{success:"Сообщение успешно отправлено!",fail:"Сообщение не отправлено, попробуйте ещё раз!",error:"Неверно заполнены поля!"},selectors:{html:"data-feedback-html",customContent:"data-feedback-custom-content",submit:"data-feedback-submit",agree:"data-feedback-agree",field:"data-feedback-field",input:"data-feedback-input",inputError:"data-feedback-input-error",success:"data-feedback-success",error:"data-feedback-error",errors:"data-feedback-errors"}},system={NAME:"InSalesFeedback",VERSION:"0.14.2",NAMESPACE:".InSalesFeedback",names:{from:"from",name:"name",phone:"phone",subject:"subject",content:"content"},dataDefault:{from:"shop@myinsales.ru",name:"не заполнено",phone:"не заполнено",subject:"Заказ обратного звонка.",content:"Заказ обратного звонка."},events:{before:"before::feedback",after:"after::feedback",success:"success::feedback",fail:"fail::feedback",agree:"agree::feedback",notagree:"notagree::feedback",error:"error::feedback"}};module.exports={defaults:defaults,system:system};
},{}]},{},[9]);
