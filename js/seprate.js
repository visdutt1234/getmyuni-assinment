 $(document).ready(function() {
     $('#tab').gsp_tab({
         content_wrap: '#tab-container',
         defaultOpen: 1,
         responsive: false,
         layout: 'auto',
         breakpoint: 767
     });
 });

 $(document).ready(function() {
     $('#tab-1').gsp_tab({
         content_wrap: '#tab-container-1',
         defaultOpen: 1,
         responsive: false,
         layout: 'auto',
         breakpoint: 767
     });
 });

var distance = $('.specsMenus').offset().top;

$(window).scroll(function() {
    if ( $(this).scrollTop() >= distance ) {
        $('.specsMenus').addClass("specsMenusFixed");
    } else  {
        $('.specsMenus').removeClass("specsMenusFixed");
    }
});
var distance = $('#interstedForm').offset().top;
var footer = $('.footer').offset().top;
console.log(footer);

$(window).scroll(function() {
    if ( $(this).scrollTop() >= 100 && $(this).scrollTop() >= distance ) {
        $('#interstedForm').css({
        	"width": "366px",
        	"position": "fixed",
        	"top": "70px",
        	"right": "calc(50% - 560px)",
        	"margin-top": "0"
        });
    } else {
        $('#interstedForm').css({
        	"position": "unset",
        	"margin-top": "122px"
        });
    }
    if ($(this).scrollTop() >= footer) {
    	$('#interstedForm').css({
        	"position": "unset",
        	"margin-top": "122px"
        });
    }
});

$(document).ready(function() {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1.2,
        nav: true
      },
      600: {
        items: 3,
        nav: true
      },
      1000: {
        items: 3,
        nav: true,
        margin: 20
      }
    }
  })
})

$(document).ready(function(){
    if ($(window).width() < 768) {
        $('#menuButton').click(function(){
           $('nav').css({"left":"0"});
           $('.overlay').addClass("open-overlay");
           $('body').addClass("fixed");
        });

        $('.overlay, nav > ul li a').click(function(){
            $('nav').css({"left":"-300px"});
            $('.overlay').removeClass("open-overlay");;
            $('body').removeClass("fixed");

        });
    }
})