//Get data from form
function getDataProfile() {
    let username = document.getElementById("username").value;
    let nombre = document.getElementById("nombreuser").value;
    let apellidos = document.getElementById("apellidosuser").value;
    let correo = document.getElementById('emailuser').value;
    let telefono = document.getElementById("celluser").value;
    let address = document.getElementById("adressuser").value;
    return { usuario: username, nombre: nombre, apellidos: apellidos, correo: correo, telefono: telefono, direccion: address };
}

function saveInfoLE(profiledata) {
    localStorage.setItem('usuario', profiledata.usuario);
    localStorage.setItem('nombre', profiledata.nombre);
    localStorage.setItem('apellidos', profiledata.apellidos);
    localStorage.setItem('correo', profiledata.correo);
    localStorage.setItem('telefono', profiledata.telefono);
    localStorage.setItem('direccion', profiledata.direccion);
}



document.addEventListener("DOMContentLoaded", function() {


    document.getElementById('butperfil').addEventListener('click', function(e) {

        var datasave = getDataProfile();
        saveInfoLE(datasave);



    });
});