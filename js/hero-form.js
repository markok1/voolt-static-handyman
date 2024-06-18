// $(document).ready(function () {
//   var leadID = null;
//   let formData = {
//     email: "",
//     phone: "",
//     comments: "",
//   };
//   let quoteForm = $("section.discount3");

//   var getUrlParameter = function getUrlParameter(sParam) {
//     var sPageURL = window.location.search.substring(1),
//       sURLVariables = sPageURL.split("&"),
//       sParameterName,
//       i;

//     for (i = 0; i < sURLVariables.length; i++) {
//       sParameterName = sURLVariables[i].split("=");

//       if (sParameterName[0] === sParam) {
//         return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
//       }
//     }
//     return null;
//   };
//   const sendEvent = (eventName, props = {}, callback = () => {}) => {
//     if (typeof eventName === "undefined" || !eventName) return callback();
//     try {
//       window.dataLayer = window.dataLayer || [];
//       window.dataLayer.push({
//         event: eventName,
//         ...props,
//       });
//       setTimeout(() => {
//         return callback();
//       }, 250);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   //Format phone
//   $(".phone-js").on("input", function () {
//     var value = $(this).val().replace(/\D/g, ""); // Remove non-digits
//     if (value.length > 10) value = value.substring(0, 10); // Limit to 10 digits

//     if (value.length <= 3) $(this).val(value);
//     else if (value.length <= 6) $(this).val(`(${value.substring(0, 3)}) ${value.substring(3)}`);
//     else $(this).val(`(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`);
//   });

//   function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(";");
//     for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == " ") {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }

//   function splitCookieForGTM(gaCookie) {
//     if (typeof gaCookie === "boolean") {
//       return "";
//     } else {
//       let splitCookie = gaCookie.split(".");
//       return `${splitCookie[2]}.${splitCookie[3]}`;
//     }
//   }

//   function submitLead(data, type = "form") {
//     var formDataObject = data;

//     console.log("subbmit lead", data);

//     formDataObject["hash"] = $('input[name="hash"]').val();
//     formDataObject["leadId"] = leadID;
//     formDataObject["pathUrl"] = window.location.href;
//     formDataObject["gclid"] = getUrlParameter("gclid");
//     formDataObject["googleClientId"] = getCookie("_ga") ? splitCookieForGTM(getCookie("_ga")) : "";

//     if (!formDataObject.fullName && formDataObject.email) {
//       const email = formDataObject.email;
//       const match = email.match(/^([^@]+)/);
//       formDataObject["fullName"] = match ? match[1] : null;
//     }

//     $("button").attr("disabled", "disabled");
//     $.ajax({
//       url: "https://api.voolt.com/api/public/websitev2/1/leads",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify(formDataObject),
//       success: function (response) {
//         $("button").removeAttr("disabled");
//         if (type == "form") {
//           $(".form-holder").addClass("hide-form");
//           $(".quote-form--completed").removeClass("hide-form");
//           window._conv_q = window._conv_q || [];
//           _conv_q.push(["triggerConversion", "100449874"]);
//           sendEvent("submitLeadForm", { email: formDataObject["email"] });
//         }

//         if (type == "email-catcher") {
//           $(".get-a-quote-email").addClass("hide-form");
//           $(".get-a-quote-message").removeClass("hide-form");
//           window._conv_q = window._conv_q || [];
//           _conv_q.push(["triggerConversion", "100449874"]);
//           sendEvent("submitEmailCatcher", { email: formDataObject["email"] });
//         }
//         if (type == "exit-intent-email-catcher") {
//           $(".exit-intent-success").css("display", "block");
//           var delay = 1000;
//           setTimeout(function () {
//             $(".show-exit-intent").css("display", "none");
//             window._conv_q = window._conv_q || [];
//             _conv_q.push(["triggerConversion", "100449874"]);
//             sendEvent("submitEmailCatcher", { email: formDataObject["email"] });
//           }, delay);
//         }

//         if (type == "comment-Hero") {
//           window._conv_q = window._conv_q || [];
//           _conv_q.push(["triggerConversion", "100449874"]);
//           sendEvent("submitLeadForm", { email: formDataObject["email"] });
//         }
//         if (type == "comment") {
//           $(".get-a-quote-message").addClass("hide-form");
//           $(".get-a-quote-thank-you").removeClass("hide-form");
//           window._conv_q = window._conv_q || [];
//           _conv_q.push(["triggerConversion", "100449874"]);
//           sendEvent("submitLeadForm", { email: formDataObject["email"] });
//         }
//         if (type == "form-js-not-popup") {
//           $(".get-a-quote-email").addClass("hide-form");
//           $(".get-a-quote-thank-you").removeClass("hide-form");
//           window._conv_q = window._conv_q || [];
//           _conv_q.push(["triggerConversion", "100449874"]);
//           sendEvent("submitLeadForm", { email: formDataObject["email"] });
//         }

//         leadID = response.data.leadId;
//       },
//       error: function (error) {},
//     });
//   }

//   initForm("#topForm");
//   initForm("#bottomForm");

//   function initForm(formSelector) {
//     var currentFormIndex = 0;
//     var totalForms = $(formSelector + " .hero-form-content").length;
//     var allInformation = "$$";

//     function showNextForm() {
//       if (currentFormIndex < totalForms - 1) {
//         var currentForm = $(formSelector + " .hero-form-content").eq(currentFormIndex);
//         var nextForm = $(formSelector + " .hero-form-content").eq(currentFormIndex + 1);

//         currentForm.fadeOut(500, function () {
//           nextForm.fadeIn(500);
//         });

//         currentFormIndex++;
//       }
//     }

//     $(formSelector + " .nextHeroForm").click(function (e) {
//       e.preventDefault();

//       var verifyform = false;
//       var currentForm = $(formSelector + " .hero-form-content").eq(currentFormIndex);
//       var formTitle = currentForm.find("h5").text();
//       var checkboxString = "";

//       if (currentForm.hasClass("hero-form-1")) {
//         currentForm.find('.option-block .custom-checkbox input[type="checkbox"]').each(function () {
//           var checkbox = $(this);
//           if (checkbox.prop("checked")) {
//             var checkedText = checkbox.siblings(".input-text-span").text().trim();
//             checkboxString += checkedText + "\n";
//             checkbox.prop("checked", false);
//             verifyform = true;
//           } else {
//             checkbox.siblings(".checkbox-border").addClass("invalid-input");
//             $(formSelector + " .error-msg").show();
//           }
//         });

//         if (verifyform) {
//           $(formSelector + " .checkbox-border").removeClass("invalid-input");
//           $(formSelector + " .error-msg").hide();
//           allInformation += formTitle + "\n" + checkboxString;
//           showNextForm();
//         }
//       } else if (currentForm.hasClass("hero-form-2")) {
//         currentForm.find('.option-block .custom-radio input[type="radio"]').each(function () {
//           var radio = $(this);
//           if (radio.prop("checked")) {
//             var checkedText = radio.siblings(".input-text-span").text().trim();
//             allInformation += "\n" + formTitle + "\n" + checkedText + "\n";
//             radio.prop("checked", false);
//             verifyform = true;
//           } else {
//             radio.siblings(".radio-border").addClass("invalid-input");
//             $(formSelector + " .error-msg").show();
//           }
//         });

//         if (verifyform) {
//           $(formSelector + " .radio-border").removeClass("invalid-input");
//           $(formSelector + " .error-msg").hide();
//           showNextForm();
//         }
//       } else if (currentForm.hasClass("hero-form-3")) {
//         var emailValidation = false;
//         var fullnameValidation = false;
//         var fullnameInput = $(formSelector + " .verify-fullname");
//         var emailInput = $(formSelector + " .verify-email");

//         if (fullnameInput.val().length > 0) {
//           formData["fullname"] = $(formSelector + " #fullname")
//             .val()
//             .trim();
//           fullnameValidation = true;
//           fullnameInput.removeClass("invalid-input");
//           $(formSelector + " .fullname-error").hide();
//         } else {
//           fullnameInput.addClass("invalid-input");
//           $(formSelector + " .fullname-error").show();
//         }

//         if (emailInput.val().length > 0) {
//           if (emailInput[0].checkValidity()) {
//             formData["email"] = $(formSelector + " #email")
//               .val()
//               .trim();
//             formData["phone"] = $(formSelector + " #phone")
//               .val()
//               .trim();
//             var textarea = $(formSelector + " #hero-text-area")
//               .val()
//               .trim();

//             if (textarea) {
//               allInformation = allInformation.replace("$$", "Message: \n" + textarea + "\n\n");
//             }
//             formData["comments"] = allInformation;
//             emailValidation = true;
//             $(formSelector + " .email-error").hide();
//             emailInput.removeClass("invalid-input");
//           } else {
//             emailInput.addClass("invalid-input");
//             $(formSelector + " .error-check-valid").show();
//             $(formSelector + " .email-error").hide();
//           }
//         } else {
//           emailInput.addClass("invalid-input");
//           $(formSelector + " .email-error").show();
//         }

//         if (emailValidation && fullnameValidation) {
//           $(formSelector + " .custom-textarea textarea").val(allInformation);
//           showNextForm();
//           resetForm(formSelector);
//           submitLead(formData, (type = "form"));
//         }
//       }
//     });

//     function resetForm(formSelector) {
//       $(formSelector + " .hero-name, " + formSelector + " .hero-last, " + formSelector + " .options-inputs .input-box input").val("");
//       $(formSelector + " .custom-textarea textarea").val("");
//       $(formSelector + " .verify-email").removeClass("invalid-input");
//       $(formSelector + " .form-title").addClass("hidden-element");
//       $(formSelector + " .error-msg, " + formSelector + " .error-check-valid").hide();

//       if (window.innerWidth < 768) {
//         $(formSelector + " .hero-form-holder").addClass("hidden-border");
//       }
//     }

//     $(formSelector + " .get-another-quote").click(function (e) {
//       e.preventDefault();
//       $(formSelector + " .form-title").removeClass("hidden-element");
//       $(formSelector + " .hero-form-holder").removeClass("hidden-border");
//       currentFormIndex = -1;
//       showNextForm();
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  var leadID = null;
  let formData = {
    email: "",
    phone: "",
    comments: "",
  };
  let quoteForm = document.querySelector("section.discount3");

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
    return null;
  };

  const sendEvent = (eventName, props = {}, callback = () => {}) => {
    if (typeof eventName === "undefined" || !eventName) return callback();
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...props,
      });
      setTimeout(() => {
        return callback();
      }, 250);
    } catch (err) {
      console.log(err);
    }
  };

  // Format phone
  document.querySelectorAll(".phone-js").forEach(function (input) {
    input.addEventListener("input", function () {
      var value = input.value.replace(/\D/g, ""); // Remove non-digits
      if (value.length > 10) value = value.substring(0, 10); // Limit to 10 digits

      if (value.length <= 3) input.value = value;
      else if (value.length <= 6) input.value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
      else input.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
    });
  });

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function splitCookieForGTM(gaCookie) {
    if (typeof gaCookie === "boolean") {
      return "";
    } else {
      let splitCookie = gaCookie.split(".");
      return `${splitCookie[2]}.${splitCookie[3]}`;
    }
  }

  function submitLead(data, type = "form") {
    var formDataObject = data;

    console.log("submit lead", data);

    formDataObject["hash"] = document.querySelector('input[name="hash"]').value;
    formDataObject["leadId"] = leadID;
    formDataObject["pathUrl"] = window.location.href;
    formDataObject["gclid"] = getUrlParameter("gclid");
    formDataObject["googleClientId"] = getCookie("_ga") ? splitCookieForGTM(getCookie("_ga")) : "";

    if (!formDataObject.fullName && formDataObject.email) {
      const email = formDataObject.email;
      const match = email.match(/^([^@]+)/);
      formDataObject["fullName"] = match ? match[1] : null;
    }

    document.querySelectorAll("button").forEach((button) => button.setAttribute("disabled", "disabled"));

    fetch("https://api.voolt.com/api/public/websitev2/1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
      .then((response) => response.json())
      .then((response) => {
        document.querySelectorAll("button").forEach((button) => button.removeAttribute("disabled"));
        if (type === "form") {
          document.querySelector(".form-holder").classList.add("hide-form");
          document.querySelector(".quote-form--completed").classList.remove("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }

        if (type === "email-catcher") {
          document.querySelector(".get-a-quote-email").classList.add("hide-form");
          document.querySelector(".get-a-quote-message").classList.remove("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitEmailCatcher", { email: formDataObject["email"] });
        }
        if (type === "exit-intent-email-catcher") {
          document.querySelector(".exit-intent-success").style.display = "block";
          var delay = 1000;
          setTimeout(function () {
            document.querySelector(".show-exit-intent").style.display = "none";
            window._conv_q = window._conv_q || [];
            _conv_q.push(["triggerConversion", "100449874"]);
            sendEvent("submitEmailCatcher", { email: formDataObject["email"] });
          }, delay);
        }

        if (type === "comment-Hero") {
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }
        if (type === "comment") {
          document.querySelector(".get-a-quote-message").classList.add("hide-form");
          document.querySelector(".get-a-quote-thank-you").classList.remove("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }
        if (type === "form-js-not-popup") {
          document.querySelector(".get-a-quote-email").classList.add("hide-form");
          document.querySelector(".get-a-quote-thank-you").classList.remove("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }

        leadID = response.data.leadId;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  initForm("#topForm");
  initForm("#bottomForm");

  function initForm(formSelector) {
    var currentFormIndex = 0;
    var totalForms = document.querySelectorAll(formSelector + " .hero-form-content").length;
    var allInformation = "$$";

    function showNextForm() {
      if (currentFormIndex < totalForms - 1) {
        var currentForm = document.querySelectorAll(formSelector + " .hero-form-content")[currentFormIndex];
        var nextForm = document.querySelectorAll(formSelector + " .hero-form-content")[currentFormIndex + 1];

        currentForm.style.display = "none";
        nextForm.style.display = "block";

        currentFormIndex++;
      }
    }

    document.querySelectorAll(formSelector + " .nextHeroForm").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        var verifyform = false;
        var currentForm = document.querySelectorAll(formSelector + " .hero-form-content")[currentFormIndex];
        var formTitle = currentForm.querySelector("h5").textContent;
        var checkboxString = "";

        if (currentForm.classList.contains("hero-form-1")) {
          currentForm.querySelectorAll('.option-block .custom-checkbox input[type="checkbox"]').forEach(function (checkbox) {
            if (checkbox.checked) {
              var checkedText = checkbox.nextElementSibling.textContent.trim();
              checkboxString += checkedText + "\n";
              checkbox.checked = false;
              verifyform = true;
            } else {
              checkbox.nextElementSibling.classList.add("invalid-input");
              document.querySelector(formSelector + " .error-msg").style.display = "block";
            }
          });

          if (verifyform) {
            document.querySelectorAll(formSelector + " .checkbox-border").forEach((el) => el.classList.remove("invalid-input"));
            document.querySelector(formSelector + " .error-msg").style.display = "none";
            allInformation += formTitle + "\n" + checkboxString;
            showNextForm();
          }
        } else if (currentForm.classList.contains("hero-form-2")) {
          currentForm.querySelectorAll('.option-block .custom-radio input[type="radio"]').forEach(function (radio) {
            if (radio.checked) {
              var checkedText = radio.nextElementSibling.textContent.trim();
              allInformation += "\n" + formTitle + "\n" + checkedText + "\n";
              radio.checked = false;
              verifyform = true;
            } else {
              radio.nextElementSibling.classList.add("invalid-input");
              document.querySelector(formSelector + " .error-msg").style.display = "block";
            }
          });

          if (verifyform) {
            document.querySelectorAll(formSelector + " .radio-border").forEach((el) => el.classList.remove("invalid-input"));
            document.querySelector(formSelector + " .error-msg").style.display = "none";
            showNextForm();
          }
        } else if (currentForm.classList.contains("hero-form-3")) {
          var emailValidation = false;
          var fullnameValidation = false;
          var fullnameInput = document.querySelector(formSelector + " .verify-fullname");
          var emailInput = document.querySelector(formSelector + " .verify-email");

          if (fullnameInput.value.length > 0) {
            formData["fullname"] = document.querySelector(formSelector + " #fullname").value.trim();
            fullnameValidation = true;
            fullnameInput.classList.remove("invalid-input");
            document.querySelector(formSelector + " .fullname-error").style.display = "none";
          } else {
            fullnameInput.classList.add("invalid-input");
            document.querySelector(formSelector + " .fullname-error").style.display = "block";
          }

          if (emailInput.value.length > 0) {
            if (emailInput.checkValidity()) {
              formData["email"] = document.querySelector(formSelector + " #email").value.trim();
              formData["phone"] = document.querySelector(formSelector + " #phone").value.trim();
              var textarea = document.querySelector(formSelector + " #hero-text-area").value.trim();

              if (textarea) {
                allInformation = allInformation.replace("$$", "Message: \n" + textarea + "\n\n");
              }
              formData["comments"] = allInformation;
              emailValidation = true;
              document.querySelector(formSelector + " .email-error").style.display = "none";
              emailInput.classList.remove("invalid-input");
            } else {
              emailInput.classList.add("invalid-input");
              document.querySelector(formSelector + " .error-check-valid").style.display = "block";
              document.querySelector(formSelector + " .email-error").style.display = "none";
            }
          } else {
            emailInput.classList.add("invalid-input");
            document.querySelector(formSelector + " .email-error").style.display = "block";
          }

          if (emailValidation && fullnameValidation) {
            document.querySelector(formSelector + " .custom-textarea textarea").value = allInformation;
            showNextForm();
            resetForm(formSelector);
            submitLead(formData, "form");
          }
        }
      });
    });

    function resetForm(formSelector) {
      document.querySelectorAll(formSelector + " .hero-name, " + formSelector + " .hero-last, " + formSelector + " .options-inputs .input-box input").forEach((el) => (el.value = ""));
      document.querySelector(formSelector + " .custom-textarea textarea").value = "";
      document.querySelector(formSelector + " .verify-email").classList.remove("invalid-input");
      document.querySelector(formSelector + " .form-title").classList.add("hidden-element");
      document.querySelectorAll(formSelector + " .error-msg, " + formSelector + " .error-check-valid").forEach((el) => (el.style.display = "none"));

      if (window.innerWidth < 768) {
        document.querySelector(formSelector + " .hero-form-holder").classList.add("hidden-border");
      }
    }

    document.querySelectorAll(formSelector + " .get-another-quote").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(formSelector + " .form-title").classList.remove("hidden-element");
        document.querySelector(formSelector + " .hero-form-holder").classList.remove("hidden-border");
        currentFormIndex = -1;
        showNextForm();
      });
    });
  }
});
