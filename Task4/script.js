document.addEventListener('DOMContentLoaded', () => {
    // SPA Navigation
    const links = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view');

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            views.forEach((view) => view.classList.add('hidden'));
            document.getElementById(target).classList.remove('hidden');
        });
    });

    // Register and Login Handlers
    const profileInfo = document.getElementById('profileInfo');
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');

    registerBtn.addEventListener('click', () => {
        const name = prompt('Enter your name (min 3 characters):');
        const email = prompt('Enter your email:');
        const password = prompt('Enter your password (min 8 chars, 1 uppercase, 1 number, 1 special char):');

        if (!name || name.length < 3) {
            alert('Invalid name!');
            return;
        }
        if (!email || !email.includes('@')) {
            alert('Invalid email!');
            return;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password || !passwordRegex.test(password)) {
            alert('Invalid password!');
            return;
        }

        alert('Registration successful!');
        profileInfo.textContent = `Welcome, ${name}!`;
    });

    loginBtn.addEventListener('click', () => {
        const email = prompt('Enter your email:');
        const password = prompt('Enter your password:');

        if (!email || !password) {
            alert('Email and password are required!');
            return;
        }

        alert('Login successful!');
        profileInfo.textContent = `Logged in as: ${email}`;
    });

    // Dynamic Skill Selection
    const category = document.getElementById('category');
    const subtopics = document.getElementById('subtopics');

    const skills = {
        webdev: ['HTML', 'CSS', 'JavaScript', 'React'],
        datasci: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
        ai: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch'],
    };

    category.addEventListener('change', () => {
        const selected = category.value;
        subtopics.innerHTML = '';

        if (skills[selected]) {
            const list = document.createElement('ul');
            skills[selected].forEach((skill) => {
                const listItem = document.createElement('li');
                listItem.textContent = skill;
                list.appendChild(listItem);
            });
            subtopics.appendChild(list);
        }
    });
});
