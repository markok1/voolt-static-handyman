// $(document).ready(function () {
//   if ($(window).width() < 768) {
//     $(".burger-menu").on("click", function () {
//       $(".nav-menu").addClass("nav-active");
//       $(".burger-menu").hide();
//       $(".close-menu").show();
//     });

//     $(".close-menu").on("click", function () {
//       $(".nav-menu").removeClass("nav-active");
//       $(".close-menu").hide();
//       $(".burger-menu").show();
//     });
//   }

//   //   testimonial slider
//   // $(".testimonial-holder").slick({
//   //   centerMode: true,
//   //   centerPadding: "130px",
//   //   slidesToShow: 3,
//   //   dots: true,
//   //   arrows: false,
//   //   autoplay: true,
//   //   speed: 2000,
//   //   autoplaySpeed: 3000,

//   //   responsive: [
//   //     {
//   //       breakpoint: 1024,
//   //       settings: {
//   //         centerMode: true,
//   //         centerPadding: "40px",
//   //         slidesToShow: 2,
//   //       },
//   //     },
//   //     {
//   //       breakpoint: 600,
//   //       settings: {
//   //         centerMode: true,
//   //         centerPadding: "25px",
//   //         slidesToShow: 1,
//   //       },
//   //     },
//   //   ],
//   // });
//   // Function to set the height of testimonials
//   function setTestimonialHeight() {
//     var maxHeight = 0;
//     $(".testimonial").each(function () {
//       maxHeight = Math.max(maxHeight, $(this).height());
//     });
//     $(".testimonial").height(maxHeight);
//   }

//   // Initial setup
//   setTestimonialHeight();

//   // Resize event handler
//   $(window).resize(function () {
//     setTestimonialHeight();
//   });

//   //gallery slider

//   // $(".single-slider").slick({
//   //   slidesToShow: 1,
//   //   slidesToScroll: 1,
//   //   arrows: false,
//   //   fade: true,
//   //   autoplay: true,
//   //   speed: 2000,
//   //   autoplaySpeed: 3000,
//   //   asNavFor: ".bottom-slider",
//   //   prevArrow: "<button type='button' class='slick-prev pull-left'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10.5878 14.4109L7.01031 10.8334H14.9986V9.16672H7.01031L10.5878 5.58922L9.40948 4.41089L3.82031 10.0001L9.40948 15.5892L10.5878 14.4109Z' fill='#111111' fill-opacity='0.64'/></svg></button>",
//   //   nextArrow: "<button type='button' class='slick-next pull-right'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M9.41083 14.4109L10.5892 15.5892L16.1783 10.0001L10.5892 4.41089L9.41083 5.58922L12.9883 9.16672H5V10.8334H12.9883L9.41083 14.4109Z' fill='#111111' fill-opacity='0.64'/></svg></button>",
//   //   responsive: [
//   //     {
//   //       breakpoint: 1024,
//   //       settings: {
//   //         arrows: true,
//   //       },
//   //     },
//   //   ],
//   // });
//   // $(".bottom-slider").slick({
//   //   slidesToShow: 4,
//   //   slidesToScroll: 1,
//   //   asNavFor: ".single-slider",
//   //   dots: false,
//   //   arrows: true,
//   //   prevArrow: "<button type='button' class='slick-prev pull-left '><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10.5878 14.4109L7.01031 10.8334H14.9986V9.16672H7.01031L10.5878 5.58922L9.40948 4.41089L3.82031 10.0001L9.40948 15.5892L10.5878 14.4109Z' fill='#111111' fill-opacity='0.64'/></svg></button>",
//   //   nextArrow: "<button type='button' class='slick-next pull-right'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M9.41083 14.4109L10.5892 15.5892L16.1783 10.0001L10.5892 4.41089L9.41083 5.58922L12.9883 9.16672H5V10.8334H12.9883L9.41083 14.4109Z' fill='#111111' fill-opacity='0.64'/></svg></button>",
//   //   responsive: [
//   //     {
//   //       breakpoint: 1024,
//   //       settings: {
//   //         arrows: false,
//   //       },
//   //     },
//   //   ],
//   // });

//   //faq
//   (function ($) {
//     let section = $("section.faq-js");
//     if (section.length) {
//       $(".qa-item").click(function (e) {
//         e.preventDefault();
//         if ($(this).hasClass("opened")) {
//           $(this).removeClass("opened");
//           $(this).find(".answer").slideUp(150);
//         } else {
//           $(".qa-item").removeClass("opened");
//           $(".qa-item .answer").slideUp(150);
//           $(this).addClass("opened");
//           $(this).find(".answer").slideDown(150);
//         }
//       });
//     }
//   })(jQuery);
// });

$(document).ready(function () {
  if ($(window).width() < 768) {
    $(".burger-menu").on("click", function () {
      $(".nav-menu").addClass("nav-active");
      $(".burger-menu").hide();
      $(".close-menu").show();
    });

    $(".close-menu").on("click", function () {
      $(".nav-menu").removeClass("nav-active");
      $(".close-menu").hide();
      $(".burger-menu").show();
    });
  }

  function setTestimonialHeight() {
    var maxHeight = 0;
    $(".testimonial").each(function () {
      maxHeight = Math.max(maxHeight, $(this).height());
    });
    $(".testimonial").height(maxHeight);
  }

  // Initial setup
  setTestimonialHeight();

  // Resize event handler
  $(window).resize(function () {
    setTestimonialHeight();
  });

  //faq
  (function ($) {
    let section = $("section.faq-js");
    if (section.length) {
      $(".qa-item").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("opened")) {
          $(this).removeClass("opened");
          $(this).find(".answer").slideUp(150);
        } else {
          $(".qa-item").removeClass("opened");
          $(".qa-item .answer").slideUp(150);
          $(this).addClass("opened");
          $(this).find(".answer").slideDown(150);
        }
      });
    }
  })(jQuery);
});
