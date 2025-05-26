// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// Sistema de Login
class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    register(userData) {
        // Verificar se o usuário já existe
        if (this.users.find(user => user.email === userData.email)) {
            throw new Error('Usuário já cadastrado');
        }

        // Adicionar novo usuário
        this.users.push({
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        });

        // Salvar no localStorage
        localStorage.setItem('users', JSON.stringify(this.users));
        return true;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Email ou senha inválidos');
        }

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    isAuthenticated() {
        return !!this.currentUser;
    }
}

// Inicializar sistema de autenticação
const auth = new AuthSystem();

// Gerenciar formulário de login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('[name="email"]').value;
        const password = this.querySelector('[name="password"]').value;

        try {
            const user = auth.login(email, password);
            alert('Login realizado com sucesso!');
            window.location.href = '/index.html';
        } catch (error) {
            alert(error.message);
        }
    });
}

// Gerenciar formulário de registro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userData = {
            name: this.querySelector('[name="name"]').value,
            email: this.querySelector('[name="email"]').value,
            password: this.querySelector('[name="password"]').value,
            phone: this.querySelector('[name="phone"]').value
        };

        try {
            auth.register(userData);
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/pages/login.html';
        } catch (error) {
            alert(error.message);
        }
    });
}

// Gerenciar formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: this.querySelector('[name="name"]').value,
            email: this.querySelector('[name="email"]').value,
            phone: this.querySelector('[name="phone"]').value,
            interest: this.querySelector('[name="interest"]').value,
            message: this.querySelector('[name="message"]').value,
            timestamp: new Date().toISOString()
        };

        // Salvar no localStorage
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(formData);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Redirecionar para WhatsApp
        const whatsappNumber = '5511999999999'; // Substitua pelo número correto
        const whatsappMessage = `Olá! Me chamo ${formData.name}. ${formData.message}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(whatsappUrl, '_blank');
        this.reset();
    });
}

// Gerenciar formulário de depoimentos
const testimonialForm = document.getElementById('testimonialForm');
if (testimonialForm) {
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const testimonial = {
            name: this.querySelector('[name="name"]').value,
            petName: this.querySelector('[name="petName"]').value,
            message: this.querySelector('[name="message"]').value,
            rating: this.querySelector('[name="rating"]').value,
            timestamp: new Date().toISOString()
        };

        // Salvar no localStorage
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials.push(testimonial);
        localStorage.setItem('testimonials', JSON.stringify(testimonials));

        alert('Depoimento enviado com sucesso!');
        this.reset();
    });
}

// Carregar depoimentos na página
function loadTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (!testimonialsContainer) return;

    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    testimonialsContainer.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="rating">
                ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
            </div>
            <p class="message">${testimonial.message}</p>
            <div class="author">
                <strong>${testimonial.name}</strong>
                <span>Pet: ${testimonial.petName}</span>
            </div>
        </div>
    `).join('');
}

// Carregar depoimentos quando a página carregar
document.addEventListener('DOMContentLoaded', loadTestimonials); 