//Head text
	const getMousePos = (ev) => {
		let posx = 0;
		let posy = 0;
		if (!ev) ev = window.event;
		if (ev.pageX || ev.pageY) 	{
			posx = ev.pageX;
			posy = ev.pageY;
		}
		else if (ev.clientX || ev.clientY) 	{
			posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : posx, y : posy };
	};

	class Letter {
		constructor(letter) {
			this.DOM = {};
			this.CONFIG = {
				color: '#fff',
				trailDelay: 0,
				maxScaleX: 1,
				minScaleX: 0.8,
				maxScaleY: 1.6,
				minScaleY: 1,
				stretchTransition: 'transform 0.4s cubic-bezier(0.1,1,0.3,1)',
				reverseAnim: {
					duration: 1000,
					easing: 'easeOutElastic',
					elasticity: 600,
					scaleY: 1,
					scaleX: 1
				}
			};
			this.DOM.letter = letter;
			this.layout();
			this.initEvents();
		}
		layout() {
			this.DOM.letterInner = document.createElement('span');
			this.DOM.letterInner.innerHTML = this.DOM.letter.innerHTML;
			this.DOM.letter.innerHTML = '';
			this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			this.DOM.svg.setAttribute('width', '100px');
			this.DOM.svg.setAttribute('height', '150px');
			this.DOM.svg.setAttribute('viewBox', '0 0 100 150');
			this.DOM.svg.setAttribute('preserveAspectRatio', 'xMaxYMax meet');

			const r = 11;
			for (let i = 0; i < 3; i++) {
				const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
				circle.setAttribute('cx', 39*i+r);
				circle.setAttribute('cy', 139);
				circle.setAttribute('r', r);
				this.DOM.svg.appendChild(circle);
			};
			this.DOM.circles = Array.from(this.DOM.svg.querySelectorAll('circle'));
			this.DOM.letter.appendChild(this.DOM.svg);
			this.DOM.letter.appendChild(this.DOM.letterInner);
		}
		stretch(ev) {
			const mousepos = getMousePos(ev);
			const docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop};
			const bounds = this.DOM.letter.getBoundingClientRect();
			const relmousepos = { 
				x : mousepos.x - bounds.left - docScrolls.left, 
				y : mousepos.y - bounds.top - docScrolls.top 
			};
			anime.remove(this.DOM.letterInner);
			this.DOM.letterInner.style.transformOrigin = '50% 100%';
			const sX = (this.CONFIG.maxScaleX-this.CONFIG.minScaleX)/bounds.height * relmousepos.y + this.CONFIG.minScaleX;
			const sY = (this.CONFIG.minScaleY-this.CONFIG.maxScaleY)/bounds.height * relmousepos.y + this.CONFIG.maxScaleY;
			this.DOM.letterInner.style.transform = `scaleX(${sX}) scaleY(${sY})`;
		}
		initEvents() {
			this.mouseenterFn = () => this.mouseTimeout = setTimeout(() => {
				this.isActive = true;
				requestAnimationFrame(() => this.DOM.letterInner.style.transition = this.CONFIG.stretchTransition);
			}, 50);
			
			this.mousemoveFn = (ev) => {
				if( !this.isActive ) return;
				requestAnimationFrame(() => this.stretch(ev))
			};
			this.mouseleaveFn = () => {
				clearTimeout(this.mouseTimeout);
				if( !this.isActive ) return;
				this.isActive = false;
				this.DOM.letterInner.style.transition = 'none';
				requestAnimationFrame(() => {
					const scaleYCurrent = anime.stagger(this.DOM.letterInner, 'scaleY');

					anime.remove(this.DOM.letterInner);
					let animOpts = {targets: this.DOM.letterInner};
					anime(Object.assign(animOpts, this.CONFIG.reverseAnim));

					if( scaleYCurrent > 1.4 ) {
						anime.remove(this.DOM.circles);
						anime({
							targets: this.DOM.circles,
							duration: (t,i) => { return anime.random(300,400); },
							easing: [0.1,1,0.3,1],
							delay: (t,i) => { return i*40+parseInt(this.CONFIG.trailDelay); },
							opacity: [
								{value: 1, duration: 10, easing: 'linear'},
								{value: 0, duration: 200, easing: 'linear'}
							],
							translateY: (t,i) => { return [100,anime.random(-250,-120)]; },
							scaleX: [2,0.3],
							scaleY: [2,2]
						});
					}
				});
			};
			this.DOM.letter.addEventListener('mouseenter', this.mouseenterFn);
			this.DOM.letter.addEventListener('mousemove', this.mousemoveFn);
			this.DOM.letter.addEventListener('mouseleave', this.mouseleaveFn);
			this.DOM.letter.addEventListener('touchstart', this.mouseenterFn);
			this.DOM.letter.addEventListener('touchend', this.mouseleaveFn);
		}
	}

	class Word {
		constructor(word) {
			this.DOM = {};
			this.DOM.word = word;
			this.layout();
		}
		layout() {
			charming(this.DOM.word, {classPrefix: 'letter'});
			Array.from(this.DOM.word.querySelectorAll('span')).forEach(letter => new Letter(letter));
		}
	}

	Array.from(document.querySelectorAll('.word')).forEach((word) => new Word(word));
	//header anime

anime({
	targets: '.el',
	background: '#FFCB17',
	translateX: ('2000%'),
	rotate: 720,
	delay: 600,
	loop: true,
	direction: 'alternate', //репид обратка
	duration: 12000,
	delay: 2000,
})
anime({
	targets: '.em',
	background: '#FFCB17',
	translateX: ('-2000%'),
	rotate: 720,
	delay: 600,
	loop: true,
	direction: 'alternate', //репид обратка
	duration: 12000,
	delay: 2000,
})
anime({
	targets: '.eg',
	background: '#FFCB17',
	translateY: ('700%'),
	rotate: 720,
	delay: 600,
	loop: true,
	direction: 'alternate', //репид обратка
	duration: 12000,
	delay: 2000,
})
anime({
	targets: '.er',
	background: '#FFCB17',
	translateY: ('-700%'),
	rotate: 720,
	delay: 600,
	loop: true,
	direction: 'alternate', //репид обратка
	duration: 12000,
	delay: 2000,
})
anime({
	targets: '.kspan',
	color: '#934DA3',
	loop: true,
	direction: 'alternate',
	duration: 4000,
	delay: 2000,
})
anime({
	targets: '.section1--left--left--title',
	color:['#eee','#934DA3'],
	loop: true,
	direction: 'alternate',
	duration: 24000,
	delay: 12000,
})
anime({
	targets: '.Exp--Sector1-left',
	translateX: ['.1em', '0' , '-.1em'],
	rotate: ['1', '0', '1'],
	loop: true,
	direction: 'alternate',
	duration: 4000,
	delay: 2000,
})
anime({
	targets: '.line--Sector1--left',
	background:['#934DA3','#FFCB17','#eee','934DA3'],
	loop: true,
	direction: 'alternate',
	duration: 12000,
	delay: 2000,

})

anime({
	targets: '.headr',
	translateX: anime.stagger('-100%'),
	delay: function (hr, i, l) {
		return i * 100;
	},
	loop: true,
	direction: 'alternate', //репид обратка
});

anime({
	targets: '.sone--one',
	keyframes: [
	  {translateY: function (hr, i, l) {
		return i * 90;
	}},
		{background:"#FFCB17"},
	  {translateX: '84vh'},
	  {opacity:".6"},
	  {background:"#934DA3"},
	
	  {duration:'4000'},
	  {background:"#FFCB17"},
	  {duration:'4000'},
	  {translateX: '0'},
	  {translateY: '0'},
	],
	duration: 24000,
	easing: 'easeOutElastic(1, .8)',
	loop: true
  });
anime({
	targets: '.sone--two',
	translateX: '-100vh',
	background: ["#934DA3",  'rgba(255, 255, 255, 0)'],
	duration: 14000,
	loop: true,
});
anime({
	targets: '.stwo--one',
	translateX: '-100vh',
	background: ["#FFCB17",  'rgba(255, 255, 255, 0)'],
	duration: 14000,
	loop: true,
});
anime({
	targets: '.stwo--two',
	translateX: '100vh',
	background: ["#FFCB17",  'rgba(255, 255, 255, 0)'],
	duration: 14000,
	loop: true,
});
anime({
	targets: '.captext',
	color: ["#934DA3",  '#f7c206', '#eee'],
	delay: 2000,
	duration: 14000,
	loop: true,
	direction: 'alternate' //репид обратка
});
anime({
	targets: '.section2--s1--img',
	rotate: '720',
	delay: 2000,
	duration: 14000,
	loop: true,
	direction: 'alternate' //репид обратка
});




let button1 = document.getElementById('btn1');
let button2 = document.getElementById('btn2');
let button3 = document.getElementById('btn3');
button1.onclick = function() {
	document.getElementById('menu1').style.display = 'flex';
	anime({
		targets: '#menu1',
		scale: [
		  {value: .1, easing: 'easeOutSine', duration: 400},
		  {value: 1, easing: 'easeInOutQuad', duration: 400}
		],
	  });
	document.getElementById('menu2').style.display = 'none';
	document.getElementById('menu3').style.display = 'none';
	  };
button2.onclick = function() {
		document.getElementById('menu2').style.display = 'flex';
		anime({
			targets: '#menu2',
			scale: [
			  {value: .1, easing: 'easeOutSine', duration: 400},
			  {value: 1, easing: 'easeInOutQuad', duration: 400}
			],
		  });
		document.getElementById('menu1').style.display = 'none';
		document.getElementById('menu3').style.display = 'none';
		  };
button3.onclick = function() {
		document.getElementById('menu3').style.display = 'flex';
		anime({
			targets: '#menu3',
			scale: [
			  {value: .1, easing: 'easeOutSine', duration: 400},
			  {value: 1, easing: 'easeInOutQuad', duration: 400}
			],
		  });
		document.getElementById('menu1').style.display = 'none';
		document.getElementById('menu2').style.display = 'none';
		};