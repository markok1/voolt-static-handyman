$(document).ready(function () {
  var leadID = null;
  let formData = {
    email: "",
    phone: "",
    comments: "",
  };
  let quoteForm = $("section.discount3");

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

  //Format phone
  $(".phone-js").on("input", function () {
    var value = $(this).val().replace(/\D/g, ""); // Remove non-digits
    if (value.length > 10) value = value.substring(0, 10); // Limit to 10 digits

    if (value.length <= 3) $(this).val(value);
    else if (value.length <= 6) $(this).val(`(${value.substring(0, 3)}) ${value.substring(3)}`);
    else $(this).val(`(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`);
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

    console.log("subbmit lead", data);

    formDataObject["hash"] = $('input[name="hash"]').val();
    formDataObject["leadId"] = leadID;
    formDataObject["pathUrl"] = window.location.href;
    formDataObject["gclid"] = getUrlParameter("gclid");
    formDataObject["googleClientId"] = getCookie("_ga") ? splitCookieForGTM(getCookie("_ga")) : "";

    if (!formDataObject.fullName && formDataObject.email) {
      const email = formDataObject.email;
      const match = email.match(/^([^@]+)/);
      formDataObject["fullName"] = match ? match[1] : null;
    }

    $("button").attr("disabled", "disabled");
    $.ajax({
      url: "https://api.voolt.com/api/public/websitev2/1/leads",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(formDataObject),
      success: function (response) {
        $("button").removeAttr("disabled");
        if (type == "form") {
          $(".form-holder").addClass("hide-form");
          $(".quote-form--completed").removeClass("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }

        if (type == "email-catcher") {
          $(".get-a-quote-email").addClass("hide-form");
          $(".get-a-quote-message").removeClass("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitEmailCatcher", { email: formDataObject["email"] });
        }
        if (type == "exit-intent-email-catcher") {
          $(".exit-intent-success").css("display", "block");
          var delay = 1000;
          setTimeout(function () {
            $(".show-exit-intent").css("display", "none");
            window._conv_q = window._conv_q || [];
            _conv_q.push(["triggerConversion", "100449874"]);
            sendEvent("submitEmailCatcher", { email: formDataObject["email"] });
          }, delay);
        }

        if (type == "comment-Hero") {
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }
        if (type == "comment") {
          $(".get-a-quote-message").addClass("hide-form");
          $(".get-a-quote-thank-you").removeClass("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }
        if (type == "form-js-not-popup") {
          $(".get-a-quote-email").addClass("hide-form");
          $(".get-a-quote-thank-you").removeClass("hide-form");
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100449874"]);
          sendEvent("submitLeadForm", { email: formDataObject["email"] });
        }

        leadID = response.data.leadId;
      },
      error: function (error) {},
    });
  }

  initForm("#topForm");
  initForm("#bottomForm");

  function initForm(formSelector) {
    var currentFormIndex = 0;
    var totalForms = $(formSelector + " .hero-form-content").length;
    var allInformation = "$$";

    function showNextForm() {
      if (currentFormIndex < totalForms - 1) {
        var currentForm = $(formSelector + " .hero-form-content").eq(currentFormIndex);
        var nextForm = $(formSelector + " .hero-form-content").eq(currentFormIndex + 1);

        currentForm.fadeOut(500, function () {
          nextForm.fadeIn(500);
        });

        currentFormIndex++;
      }
    }

    $(formSelector + " .nextHeroForm").click(function (e) {
      e.preventDefault();

      var verifyform = false;
      var currentForm = $(formSelector + " .hero-form-content").eq(currentFormIndex);
      var formTitle = currentForm.find("h5").text();
      var checkboxString = "";

      if (currentForm.hasClass("hero-form-1")) {
        currentForm.find('.option-block .custom-checkbox input[type="checkbox"]').each(function () {
          var checkbox = $(this);
          if (checkbox.prop("checked")) {
            var checkedText = checkbox.siblings(".input-text-span").text().trim();
            checkboxString += checkedText + "\n";
            checkbox.prop("checked", false);
            verifyform = true;
          } else {
            checkbox.siblings(".checkbox-border").addClass("invalid-input");
            $(formSelector + " .error-msg").show();
          }
        });

        if (verifyform) {
          $(formSelector + " .checkbox-border").removeClass("invalid-input");
          $(formSelector + " .error-msg").hide();
          allInformation += formTitle + "\n" + checkboxString;
          showNextForm();
        }
      } else if (currentForm.hasClass("hero-form-2")) {
        currentForm.find('.option-block .custom-radio input[type="radio"]').each(function () {
          var radio = $(this);
          if (radio.prop("checked")) {
            var checkedText = radio.siblings(".input-text-span").text().trim();
            allInformation += "\n" + formTitle + "\n" + checkedText + "\n";
            radio.prop("checked", false);
            verifyform = true;
          } else {
            radio.siblings(".radio-border").addClass("invalid-input");
            $(formSelector + " .error-msg").show();
          }
        });

        if (verifyform) {
          $(formSelector + " .radio-border").removeClass("invalid-input");
          $(formSelector + " .error-msg").hide();
          showNextForm();
        }
      } else if (currentForm.hasClass("hero-form-3")) {
        var emailValidation = false;
        var fullnameValidation = false;
        var fullnameInput = $(formSelector + " .verify-fullname");
        var emailInput = $(formSelector + " .verify-email");

        if (fullnameInput.val().length > 0) {
          formData["fullname"] = $(formSelector + " #fullname")
            .val()
            .trim();
          fullnameValidation = true;
          fullnameInput.removeClass("invalid-input");
          $(formSelector + " .fullname-error").hide();
        } else {
          fullnameInput.addClass("invalid-input");
          $(formSelector + " .fullname-error").show();
        }

        if (emailInput.val().length > 0) {
          if (emailInput[0].checkValidity()) {
            formData["email"] = $(formSelector + " #email")
              .val()
              .trim();
            formData["phone"] = $(formSelector + " #phone")
              .val()
              .trim();
            var textarea = $(formSelector + " #hero-text-area")
              .val()
              .trim();

            if (textarea) {
              allInformation = allInformation.replace("$$", "Message: \n" + textarea + "\n\n");
            }
            formData["comments"] = allInformation;
            emailValidation = true;
            $(formSelector + " .email-error").hide();
            emailInput.removeClass("invalid-input");
          } else {
            emailInput.addClass("invalid-input");
            $(formSelector + " .error-check-valid").show();
            $(formSelector + " .email-error").hide();
          }
        } else {
          emailInput.addClass("invalid-input");
          $(formSelector + " .email-error").show();
        }

        if (emailValidation && fullnameValidation) {
          $(formSelector + " .custom-textarea textarea").val(allInformation);
          showNextForm();
          resetForm(formSelector);
          submitLead(formData, (type = "form"));
        }
      }
    });

    function resetForm(formSelector) {
      $(formSelector + " .hero-name, " + formSelector + " .hero-last, " + formSelector + " .options-inputs .input-box input").val("");
      $(formSelector + " .custom-textarea textarea").val("");
      $(formSelector + " .verify-email").removeClass("invalid-input");
      $(formSelector + " .form-title").addClass("hidden-element");
      $(formSelector + " .error-msg, " + formSelector + " .error-check-valid").hide();

      if (window.innerWidth < 768) {
        $(formSelector + " .hero-form-holder").addClass("hidden-border");
      }
    }

    $(formSelector + " .get-another-quote").click(function (e) {
      e.preventDefault();
      $(formSelector + " .form-title").removeClass("hidden-element");
      $(formSelector + " .hero-form-holder").removeClass("hidden-border");
      currentFormIndex = -1;
      showNextForm();
    });
  }
});
