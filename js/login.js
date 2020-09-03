//Get data from form
function getData() {
    let email = document.getElementById('e-mail').value;
    let passw = document.getElementById('passw').value;
    return { email: email, password: passw };
}
//Save credentials to localStorage
function saveCredentialsInfo(credentials) {
    localStorage.setItem('email', credentials.email);
    localStorage.setItem('password', credentials.password);
}

//Validate data
function validateForm(credentials) {
    if (credentials !== undefined || credentials !== null) {
        if (credentials.email !== "" && credentials.password !== "" && isValidEmail(credentials.email)) {
            return true;
        }
        return false;
    }
    return false;
}

//Check if email has valid
function isValidEmail(email) {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(email);

}

//Verify if login error has
function getLoginError() {
    return localStorage.getItem('login-error');
}

function verifyIfUserHasLoggedIn() {
    return localStorage.getItem('email') !== null && localStorage.getItem('email') !== undefined && localStorage.getItem('password') !== null && localStorage.getItem('password') !== undefined;
}

document.addEventListener("DOMContentLoaded", function() {

    let areUserLoggedIn = verifyIfUserHasLoggedIn();
    if (areUserLoggedIn) {
        window.location = 'index.html';
    }

    let errorLogin = getLoginError();
    if (errorLogin !== null && errorLogin !== undefined && errorLogin !== "") {
        if (document.getElementById('login-error') !== null) {
            document.getElementById('login-error').innerHTML = errorLogin;
        }
    } else {
        if (document.getElementById('login-error') !== null) {
            document.getElementById('login-error').innerHTML = "";
        }
    }

    document.getElementById('btnlogin').addEventListener('click', function(e) {
        let credentials = getData();
        let isFormValid = validateForm(credentials);
        if (isFormValid) {
            saveCredentialsInfo(credentials);
            localStorage.removeItem('login-error');
            window.location = 'index.html';
        } else {
            alert('Las credenciales de acceso no son validas.');
        }
    });
});