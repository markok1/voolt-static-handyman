document.addEventListener("DOMContentLoaded",function(){var e=null;let r={email:"",phone:"",comments:""};document.querySelector("section.discount3");var t=function e(r){var t,o,l=window.location.search.substring(1).split("&");for(o=0;o<l.length;o++)if((t=l[o].split("="))[0]===r)return void 0===t[1]||decodeURIComponent(t[1]);return null};let o=(e,r={},t=()=>{})=>{if(void 0===e||!e)return t();try{window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:e,...r}),setTimeout(()=>t(),250)}catch(o){console.log(o)}};function l(e){let r=e+"=",t=decodeURIComponent(document.cookie).split(";");for(let o=0;o<t.length;o++){let l=t[o];for(;" "==l.charAt(0);)l=l.substring(1);if(0==l.indexOf(r))return l.substring(r.length,l.length)}return""}function i(r,i="form"){var n=r;if(console.log("submit lead",r),n.hash=document.querySelector('input[name="hash"]').value,n.leadId=e,n.pathUrl=window.location.href,n.gclid=t("gclid"),n.googleClientId=l("_ga")?function e(r){if("boolean"==typeof r)return"";{let t=r.split(".");return`${t[2]}.${t[3]}`}}(l("_ga")):"",!n.fullName&&n.email){let a=n.email,s=a.match(/^([^@]+)/);n.fullName=s?s[1]:null}document.querySelectorAll("button").forEach(e=>e.setAttribute("disabled","disabled")),fetch("https://api.voolt.com/api/public/websitev2/1/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(e=>e.json()).then(r=>{document.querySelectorAll("button").forEach(e=>e.removeAttribute("disabled")),"form"===i&&(document.querySelector(".form-holder").classList.add("hide-form"),document.querySelector(".quote-form--completed").classList.remove("hide-form"),window._conv_q=window._conv_q||[],_conv_q.push(["triggerConversion","100449874"]),o("submitLeadForm",{email:n.email})),"email-catcher"===i&&(document.querySelector(".get-a-quote-email").classList.add("hide-form"),document.querySelector(".get-a-quote-message").classList.remove("hide-form"),window._conv_q=window._conv_q||[],_conv_q.push(["triggerConversion","100449874"]),o("submitEmailCatcher",{email:n.email})),"exit-intent-email-catcher"===i&&(document.querySelector(".exit-intent-success").style.display="block",setTimeout(function(){document.querySelector(".show-exit-intent").style.display="none",window._conv_q=window._conv_q||[],_conv_q.push(["triggerConversion","100449874"]),o("submitEmailCatcher",{email:n.email})},1e3)),"comment-Hero"===i&&(window._conv_q=window._conv_q||[],_conv_q.push(["triggerConversion","100449874"]),o("submitLeadForm",{email:n.email})),"comment"===i&&(document.querySelector(".get-a-quote-message").classList.add("hide-form"),document.querySelector(".get-a-quote-thank-you").classList.remove("hide-form"),window._conv_q=window._conv_q||[],_conv_q.push(["triggerConversion","100449874"]),o("submitLeadForm",{email:n.email})),"form-js-not-popup"===i&&(document.querySelector(".get-a-quote-email").classList.add("hide-form"),document.querySelector(".get-a-quote-thank-you").classList.remove("hide-form"),window._conv_q=window._conv_q||[],_conv_q.push(["triggerConversion","100449874"]),o("submitLeadForm",{email:n.email})),e=r.data.leadId}).catch(e=>{console.error("Error:",e)})}document.querySelectorAll(".phone-js").forEach(function(e){e.addEventListener("input",function(){var r=e.value.replace(/\D/g,"");r.length>10&&(r=r.substring(0,10)),r.length<=3?e.value=r:r.length<=6?e.value=`(${r.substring(0,3)}) ${r.substring(3)}`:e.value=`(${r.substring(0,3)}) ${r.substring(3,6)}-${r.substring(6)}`})}),a("#topForm"),a("#bottomForm");var n=0;function a(e){var t=document.querySelectorAll(e+" .hero-form-content").length,o="$$";function l(){if(n<t-1){var r=document.querySelectorAll(e+" .hero-form-content")[n],o=document.querySelectorAll(e+" .hero-form-content")[n+1];r.style.display="none",o.style.display="block",n++}else if(n=t-1){var r=document.querySelectorAll(e+" .hero-form-content")[n];r.style.display="none",n=0;var o=document.querySelectorAll(e+" .hero-form-content")[0];o.style.display="block"}}document.querySelectorAll(e+" .nextHeroForm").forEach(function(t){t.addEventListener("click",function(t){t.preventDefault();var i=!1,a=document.querySelectorAll(e+" .hero-form-content")[n],s=a.querySelector("h5").textContent,c="";if(a.classList.contains("hero-form-1"))a.querySelectorAll('.option-block .custom-checkbox input[type="checkbox"]').forEach(function(r){if(r.checked){var t=r.closest(".custom-checkbox").querySelector(".input-text-span");c+=t.textContent.trim()+"\n",r.checked=!1,i=!0}else{var t=r.closest(".custom-checkbox").querySelector(".checkbox-border");t.classList.add("invalid-input"),document.querySelector(e+" .hero-form-1 .error-msg").style.display="block"}}),i&&(document.querySelectorAll(e+" .checkbox-border").forEach(e=>e.classList.remove("invalid-input")),document.querySelector(e+" .hero-form-1 .error-msg").style.display="none",o+=s+"\n"+c,l());else if(a.classList.contains("hero-form-2"))a.querySelectorAll('.option-block .custom-radio input[type="radio"]').forEach(function(r){if(r.checked){var t=r.closest(".custom-radio").querySelector(".input-text-span");o+="\n"+s+"\n"+t.textContent.trim()+"\n",r.checked=!1,i=!0}else{var t=r.closest(".custom-radio").querySelector(".radio-border");t.classList.add("invalid-input"),document.querySelector(e+" .hero-form-2 .error-msg").style.display="block"}}),i&&(document.querySelectorAll(e+" .radio-border").forEach(e=>e.classList.remove("invalid-input")),document.querySelector(e+" .hero-form-2 .error-msg").style.display="none",l());else if(a.classList.contains("hero-form-3")){var u,m=!1,d=!1,y=document.querySelector(e+" .verify-fullname"),h=document.querySelector(e+" .verify-email");if(y.value.length>0?(r.fullname=document.querySelector(e+" #fullname").value.trim(),d=!0,y.classList.remove("invalid-input"),document.querySelector(e+" .fullname-error").style.display="none"):(y.classList.add("invalid-input"),document.querySelector(e+" .fullname-error").style.display="block"),h.value.length>0){if(h.checkValidity()){r.email=document.querySelector(e+" #email").value.trim(),r.phone=document.querySelector(e+" #phone").value.trim();var f=document.querySelector(e+" #hero-text-area").value.trim();f&&(o=o.replace("$$","Message: \n"+f+"\n\n")),r.comments=o,m=!0,document.querySelector(e+" .email-error").style.display="none",h.classList.remove("invalid-input")}else h.classList.add("invalid-input"),document.querySelector(e+" .error-check-valid").style.display="block",document.querySelector(e+" .email-error").style.display="none"}else h.classList.add("invalid-input"),document.querySelector(e+" .email-error").style.display="block";m&&d&&(document.querySelector(e+" .custom-textarea textarea").value=o,l(),u=e,document.querySelectorAll(u+" .hero-name, "+u+" .hero-last, "+u+" .options-inputs .input-box input").forEach(e=>e.value=""),document.querySelector(u+" .custom-textarea textarea").value="",document.querySelector(u+" .verify-email").classList.remove("invalid-input"),document.querySelector(u+" .form-title").classList.add("hidden-element"),document.querySelectorAll(u+" .error-msg, "+u+" .error-check-valid").forEach(e=>e.style.display="none"),window.innerWidth<768&&document.querySelector(u+" .hero-form-holder").classList.add("hidden-border"))}})}),document.querySelectorAll(e+" .get-another-quote").forEach(function(r){r.addEventListener("click",function(r){r.preventDefault(),document.querySelector(e+" .form-title").classList.remove("hidden-element"),l()})})}});