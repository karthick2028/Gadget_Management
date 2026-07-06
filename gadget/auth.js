// Register Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        emailError.textContent = '';
        passwordError.textContent = '';
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        let hasError = false;
        
        // Get existing users or create empty array
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        if (users.find(user => user.email === email)) {
            emailError.textContent = 'Email already registered!';
            hasError = true;
        }
        
        if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters!';
            hasError = true;
        } else if (password !== confirmPassword) {
            passwordError.textContent = 'Passwords do not match!';
            hasError = true;
        }
        
        if (hasError) return;
        
        // Add new user
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        window.location.href = 'login.html';
    });
}

// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const loginEmailError = document.getElementById('loginEmailError');
        const loginPasswordError = document.getElementById('loginPasswordError');
        loginEmailError.textContent = '';
        loginPasswordError.textContent = '';
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'home.html';
        } else {
            const emailExists = users.find(u => u.email === email);
            if (!emailExists) {
                loginEmailError.textContent = 'Email not found!';
            } else {
                loginPasswordError.textContent = 'Incorrect password!';
            }
        }
    });
}

// Check if user is logged in (for protected pages)
function checkAuth() {
    const user = sessionStorage.getItem('loggedInUser');
    if (!user) {
        window.location.href = 'index.html';
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
