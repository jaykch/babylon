'use strict';

/*-----------------------------------------------------------------------------------*/
/*      HEADER SCROLL TRANSITION
/*-----------------------------------------------------------------------------------*/
class headertransition {
    constructor () {
        this.header = document.querySelector('#navigation-container');
        this.header_nav = document.querySelector('.nav-bar');
        this.header_nav_ul = document.querySelector('.nav-bar ul');
        this.container = document.querySelector('.container');
        this.sections = Array.from(document.querySelectorAll('.section'));

        this.header_nav.style.backgroundColor = window.getComputedStyle( this.sections[0] ,null).getPropertyValue('background-color');
        this.header_nav.style.color = window.getComputedStyle( this.sections[0] ,null).getPropertyValue('color');
        
        const navHeightCalc = window.getComputedStyle( this.header_nav ,null).getPropertyValue('height');

        this.navHeight = this.header_nav.clientHeight;
        this.header.style.height = navHeightCalc;

        this.onScroll = this.onScroll.bind(this);
        this.addEventListeners();
    }

    addEventListeners () {
        document.addEventListener('scroll', this.onScroll);
    }

    onScroll (evt) {
        for (let i = 0; i < this.sections.length; i++) {

            var scrollPos = window.scrollY;

            var sectionOffset = this.sections[i].offsetTop;
            sectionOffset = sectionOffset - this.navHeight;

            var sectionBg = window.getComputedStyle( this.sections[i] ,null).getPropertyValue('background-color');
            var sectioncolor = window.getComputedStyle( this.sections[i] ,null).getPropertyValue('color');

            if ( scrollPos >= sectionOffset ) {
                this.header_nav.style.backgroundColor = sectionBg;
                this.header_nav.style.color = sectioncolor;
            }

            if ( scrollPos >= this.header.offsetTop) {
                this.header_nav.classList.add('nav-fixed'); 
                this.header_nav_ul.classList.add('nav-shadow'); 
                this.header_nav.style.width = window.getComputedStyle( this.container ,null).getPropertyValue('width');
            }else {
                this.header_nav.classList.remove('nav-fixed');
                this.header_nav_ul.classList.remove('nav-shadow');  
                this.header_nav.style.width = "100%";
            }

        }
    }

}
new headertransition();
/*-----------------------------------------------------------------------------------*/
/*      HEADER SCROLL TRANSITION END
/*-----------------------------------------------------------------------------------*/

jQuery(document).ready(function($) {
    "use strict"

    /*-----------------------------------------------------------------------------------*/
    /* 		NAVIGATION SMOOTH SCROLL
    /*-----------------------------------------------------------------------------------*/
    $('.nav-bar ul a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            || location.hostname == this.hostname) {
          var target = $(this.hash);
          var href = $.attr(this, 'href');
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
             scrollTop: target.offset().top
            }, 1000, function () {
                window.location.hash = href;
            });
            return false;
          }
        }
    });
    var navLinkIDs = "";
    $('.nav-bar ul a[href*=#]:not([href=#])').each(function(index) {
        if(navLinkIDs != "") {
            navLinkIDs += ", ";
        }
        navLinkIDs += $('.nav-bar ul a[href*=#]:not([href=#])').eq(index).attr("href");
    });
    if( navLinkIDs ) {
       $(navLinkIDs).waypoint(function(direction) {
           if(direction=='down') {
               $('.nav-bar ul a').parent().removeClass("active");
               $('.nav-bar ul a[href="#'+$(this).attr('id')+'"]').parent().addClass("active");
           }
       }, { offset: 70 });
        $(navLinkIDs).waypoint(function(direction) {
           if(direction=='up') {
               $('.nav-bar ul a').parent().removeClass("active");
               $('.nav-bar ul a[href="#'+$(this).attr('id')+'"]').parent().addClass("active");
           }
       }, {  offset: function() {
           return -$(this).height() + 20;
       } });
    }


    /*-----------------------------------------------------------------------------------*/
    /* 		Active Menu Item on Page Scroll
    /*-----------------------------------------------------------------------------------*/
/*    $(window).scroll(function(event) {
    		Scroll();
    });	
    $('.scroll a').click(function() {  
    		$('html, body').animate({scrollTop: $(this.hash).offset().top -10}, 1000);
    		return false;
    });
    // User define function
    function Scroll() {
    var contentTop      =   [];
    var contentBottom   =   [];
    var winTop      =   $(window).scrollTop();
    var rangeTop    =   200;
    var rangeBottom =   500;
    $('nav').find('.scroll a').each(function(){
    	contentTop.push( $( $(this).attr('href') ).offset().top);
    		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
    })
    $.each( contentTop, function(i){
    	if ( winTop > contentTop[i] - rangeTop ){
    		$('nav li.scroll')
    		  .removeClass('active')
    			.eq(i).addClass('active');			
    		}}
    )};*/

});
