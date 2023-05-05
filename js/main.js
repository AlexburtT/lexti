//toggle icon navbar
let menuIcon = document.querySelector('.bx-menu');
let menuIconX = document.querySelector('.bx-x')
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
	menuIcon.classList.toggle('bx-n');
	menuIconX.classList.remove('bx-n');
	navbar.classList.toggle('active');
}

menuIconX.onclick = () => {
	menuIcon.classList.remove('bx-n');
	menuIconX.classList.toggle('bx-n');
	navbar.classList.remove('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.header-nav__link');

window.onscroll = () => {
	sections.forEach(sec => {
		let top = window.scrollY;
		let offset = sec.offsetTop - 100;
		let height = sec.offsetHeight;
		let id = sec.getAttribute('id');

		if (top >= offset && top < offset + height) {
			//active navbar links
			navLinks.forEach(links => {
				links.classList.remove('active');
				document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
			});
			// active sections for animate
			sec.classList.add('show-animate');
		}
		else {
			sec.classList.remove('show-animate');
		}
	});

	//sticky header
	let header = document.querySelector('header');
	header.classList.toggle('sticky', window.scrollY > 100);

	// remove toggle icon and navbar when click links
	menuIconX.classList.add('bx-n');
	menuIcon.classList.remove('bx-n');
	navbar.classList.remove('active');

	// animate footer
	let footer = document.querySelector('footer');
	footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}


