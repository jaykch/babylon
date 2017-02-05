/**
 * Created by Jay on 2/5/2017.
 */
'use strict';

class headeranimation {
	constructor () {
		this.header = document.querySelector('#navigation-container');
		this.header_nav = document.querySelector('.nav-bar');
		this.header_nav_ul = document.querySelector('.nav-bar ul');
		this.container = document.querySelector('.container');
		this.section = Array.from(document.querySelectorAll('.section'));

		this.header_nav.style.backgroundColor = window.getComputedStyle( this.section[0] ,null).getPropertyValue('background-color');
		this.header_nav.style.color = window.getComputedStyle( this.section[0] ,null).getPropertyValue('color');
		
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
		for (let i = 0; i < this.section.length; i++) {

			var scrollPos = window.scrollY;

			var sectionOffset = this.section[i].offsetTop;
			sectionOffset = sectionOffset - this.navHeight;

			var sectionBg = window.getComputedStyle( this.section[i] ,null).getPropertyValue('background-color');
			var sectioncolor = window.getComputedStyle( this.section[i] ,null).getPropertyValue('color');

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
new headeranimation();
