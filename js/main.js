// Toggle icon navbar
let menuIcon = document.querySelector('.bx-menu');
let menuIconX = document.querySelector('.bx-x');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
	menuIcon.classList.toggle('bx-n');
	menuIconX.classList.remove('bx-n');
	navbar.classList.toggle('active');
};

menuIconX.onclick = () => {
	menuIcon.classList.remove('bx-n');
	menuIconX.classList.toggle('bx-n');
	navbar.classList.remove('active');
};

// Scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
	sections.forEach(sec => {
		let top = window.scrollY;
		let offset = sec.offsetTop - 100;
		let height = sec.offsetHeight;
		let id = sec.getAttribute('id');

		if (top >= offset && top < offset + height) {
			// Active navbar links
			navLinks.forEach(links => {
				links.classList.remove('active');
			});
			const activeLink = document.querySelector('header nav a[href*=' + id + ']');
			if (activeLink) {
				activeLink.classList.add('active');
			}
			// Active sections for animate
			sec.classList.add('show-animate');
		} else {
			sec.classList.remove('show-animate');
		}
	});

	// Sticky header
	let header = document.querySelector('header');
	header.classList.toggle('sticky', window.scrollY > 100);

	// Remove toggle icon and navbar when scroll
	menuIconX.classList.add('bx-n');
	menuIcon.classList.remove('bx-n');
	navbar.classList.remove('active');

	// Animate footer
	let footer = document.querySelector('footer');
	footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
});

// Form handling with EmailJS
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
	contactForm.addEventListener('submit', async function (e) {
		e.preventDefault();

		const originalBtnText = submitBtn.innerHTML;
		submitBtn.disabled = true;
		submitBtn.innerHTML = '<span class="btn__spinner"></span><span class="btn__text">Отправка...</span>';
		formStatus.textContent = '';
		formStatus.className = 'field__message';

		try {
			const formData = {
				name: contactForm.name.value.trim(),
				email: contactForm.email.value.trim(),
				phone: contactForm.phone.value.trim(),
				subject: contactForm.subject.value.trim(),
				message: contactForm.message.value.trim()
			};

			// ЗАМЕНИТЕ на ваши данные от EmailJS
			const serviceID = 'YOUR_SERVICE_ID';
			const templateID = 'YOUR_TEMPLATE_ID';

			await emailjs.send(serviceID, templateID, formData);

			formStatus.textContent = 'Спасибо! Ваша заявка успешно отправлена. Я свяжусь с вами в ближайшее время.';
			formStatus.className = 'field__message field__message--success';
			contactForm.reset();
		} catch (error) {
			console.error('Error sending form:', error);
			formStatus.textContent = 'Ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь со мной напрямую.';
			formStatus.className = 'field__message field__message--error';
		} finally {
			submitBtn.disabled = false;
			submitBtn.innerHTML = originalBtnText;
		}
	});
}
