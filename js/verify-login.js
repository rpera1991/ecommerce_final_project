function verifyIfUserHasLoggedIn() {
    return localStorage.getItem('email') !== null && localStorage.getItem('email') !== undefined && localStorage.getItem('password') !== null && localStorage.getItem('password') !== undefined;
}

document.addEventListener("DOMContentLoaded", function(e) {
    //1- Verify if user are loggedin    
    let areUserLoggedIn = verifyIfUserHasLoggedIn();
    if (!areUserLoggedIn) {
        window.location = 'login.html';
        localStorage.setItem('login-error', 'Debe iniciar sesion para acceder a esta pagina.');
    }
});