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
        this.header_nav_ul_li_a_after = document.querySelector('.nav-bar .active a:after');
        console.log(this.header_nav_ul_li_a_after);
        for (let i = 0; i < this.sections.length; i++) {

            var scrollPos = window.scrollY;

            var sectionOffset = this.sections[i].offsetTop;
            sectionOffset = sectionOffset - this.navHeight;

            var sectionBg = window.getComputedStyle( this.sections[i] ,null).getPropertyValue('background-color');
            var sectioncolor = window.getComputedStyle( this.sections[i] ,null).getPropertyValue('color');

            if ( scrollPos >= sectionOffset ) {
                this.header_nav.style.backgroundColor = sectionBg;
                this.header_nav.style.color = sectioncolor;
                this.header_nav_ul_li_a_after = sectioncolor;
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
    $('.nav-bar ul a[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            || location.hostname == this.hostname) {
          var target = $(this.hash);
          var href = $.attr(this, 'href');
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
             scrollTop: target.offset().top - $('#navigation-container').outerHeight() + 1
            }, 1000, function () {
                window.location.hash = href;
            });
            return false;
          }
        }
    });
    var navLinkIDs = "";
    $('.nav-bar ul a[href*=\\#]:not([href=\\#])').each(function(index) {
        if(navLinkIDs != "") {
            navLinkIDs += ", ";
        }
        navLinkIDs += $('.nav-bar ul a[href*=\\#]:not([href=\\#])').eq(index).attr("href");
    });
    if( navLinkIDs ) {
       $(navLinkIDs).waypoint(function(direction) {
           if(direction=='down') {
               $('.nav-bar ul a').parent().removeClass("active");
               $('.nav-bar ul a[href="\\#'+$(this).attr('id')+'"]').parent().addClass("active");
           }
       }, { offset: 70 });
        $(navLinkIDs).waypoint(function(direction) {
           if(direction=='up') {
               $('.nav-bar ul a').parent().removeClass("active");
               $('.nav-bar ul a[href="\\#'+$(this).attr('id')+'"]').parent().addClass("active");
           }
       }, {  offset: function() {
           return -$(this).height() + 20;
       } });
    }
    /*-----------------------------------------------------------------------------------*/
    /* 		NAVIGATION SMOOTH SCROLL END
    /*-----------------------------------------------------------------------------------*/


});
