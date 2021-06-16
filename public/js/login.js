const loginHandler = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const resp = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            document.location.replace('/');
        } else {
            alert("Failed to log in, either your account info is wrong, you have not created an account yet, or we couldn't access the database. Please try again!");
        }
    }
};

const signupHandler = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const resp = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            document.location.replace('/');
        } else {
            alert("Failed to create an account, please try again!");
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);
document.querySelector('.signup-form').addEventListener('submit', signupHandler);