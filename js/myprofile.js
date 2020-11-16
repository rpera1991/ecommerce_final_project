//Get data from form
function getDataProfile() {
    let username = document.getElementById("username").value;
    let nombre = document.getElementById("nombreuser").value;
    let apellidos = document.getElementById("apellidosuser").value;
    let correo = document.getElementById('emailuser').value;
    let telefono = document.getElementById("celluser").value;
    let edad = document.getElementById("adressuser").value;
    return { usuario: username, nombre: nombre, apellidos: apellidos, correo: correo, telefono: telefono, edad: edad };
}

function saveInfoLE(profiledata) {
    localStorage.setItem('usuario', profiledata.usuario);
    localStorage.setItem('nombre', profiledata.nombre);
    localStorage.setItem('apellidos', profiledata.apellidos);
    localStorage.setItem('correo', profiledata.correo);
    localStorage.setItem('telefono', profiledata.telefono);
    localStorage.setItem('edad', profiledata.edad);
}

function setElementsInput() {
    document.getElementById("username").innerHTML = localStorage.getItem('usuario');
    document.getElementById("nombreuser").innerHTML = localStorage.getItem('nombre');
    document.getElementById("apellidosuser").innerHTML = localStorage.getItem('apellidos');
    document.getElementById('emailuser').innerHTML = localStorage.getItem('correo');
    document.getElementById("celluser").innerHTML = localStorage.getItem('telefono');
    document.getElementById("adressuser").innerHTML = localStorage.getItem('edad');
}


document.addEventListener("DOMContentLoaded", function() {


    document.getElementById('butperfil').addEventListener('click', function(e) {

        var datasave = getDataProfile();
        saveInfoLE(datasave);
    });
    document.addEventListener('load', function() {

            document.getElementById("username").innerHTML = localStorage.getItem('usuario');
            document.getElementById("nombreuser").innerHTML = localStorage.getItem('nombre');
            document.getElementById("apellidosuser").innerHTML = localStorage.getItem('apellidos');
            document.getElementById('emailuser').innerHTML = localStorage.getItem('correo');
            document.getElementById("celluser").innerHTML = localStorage.getItem('telefono');
            document.getElementById("adressuser").innerHTML = localStorage.getItem('edad');
        })
        // var takephoto = document.getElementById('selectfile');
        // takephoto.onchange = (e) =>{
        //     let photo = e.target.files;
        // }
        // })

});